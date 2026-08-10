"use client";

import { useEffect, useRef } from "react";

const vertexShader = `
  attribute vec2 aPosition;
  varying vec2 vUv;
  void main() {
    vUv = aPosition * 0.5 + 0.5;
    gl_Position = vec4(aPosition, 0.0, 1.0);
  }
`;

const fragmentShader = `
  precision mediump float;
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uTrail[1];
  uniform float uMouseMoved;
  uniform float uScrollDelta;
  varying vec2 vUv;

  float waveNoise(vec2 p, float t) {
    float a = sin(p.x * 2.2 + sin(p.y * 1.7 + t) + t);
    float b = sin(p.y * 2.0 - cos(p.x * 1.5 - t * 0.7) - t * 0.8);
    return a * b * 0.5 + 0.5;
  }

  void main() {
    vec2 uv = vUv;
    float aspect = uResolution.x / max(uResolution.y, 1.0);
    float slowTime = uTime * 0.08;
    vec2 flowUv = uv + vec2(0.0, uScrollDelta * 0.00012);
    float lavaA = pow(waveNoise(flowUv * 2.2, slowTime), 3.0);
    float lavaB = pow(waveNoise((flowUv + vec2(0.31, -0.17)) * 2.7, -slowTime), 2.0);
    float palettePhase = sin(uTime * 0.16) * 0.5 + 0.5;
    vec3 baseDeep = vec3(0.008, 0.125, 0.122);
    vec3 baseGreen = vec3(0.018, 0.270, 0.245);
    vec3 baseSoft = vec3(0.205, 0.410, 0.255);
    vec3 movingGreen = mix(baseGreen, baseSoft, palettePhase);
    float paletteLift = 0.19 + palettePhase * 0.09;
    vec3 color = mix(baseDeep, movingGreen, paletteLift + uv.y * 0.09 + lavaB * 0.055 + lavaA * 0.065);

    float trail = 0.0;
    vec2 point = vec2(uTrail[0].x, 1.0 - uTrail[0].y);
    vec2 delta = uv - point;
    delta.x *= aspect;
    trail = 1.0 - smoothstep(0.0, 0.16, length(delta));
    trail *= uMouseMoved;

    float pulse = 0.88 + 0.12 * sin(uTime * 1.25);
    color = mix(color, vec3(0.31, 0.72, 0.48), trail * pulse * 0.34);

    vec2 dotGrid = fract(uv * vec2(150.0, 150.0 / aspect)) - 0.5;
    float dots = 1.0 - smoothstep(0.075, 0.17, length(dotGrid));
    float edgeDistance = length((uv - vec2(0.5, 0.56)) * vec2(1.0, 0.86));
    float edgeField = smoothstep(0.40, 0.66, edgeDistance);
    color += vec3(0.42, 0.62, 0.57) * dots * edgeField * 0.19;

    float vignette = smoothstep(0.95, 0.22, length((uv - 0.5) * vec2(0.92, 1.0)));
    gl_FragColor = vec4(color * (0.84 + vignette * 0.16), 1.0);
  }
`;

function compileShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export function HeroWebGLBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const hero = canvas?.closest(".home-hero");
    const shouldRender = window.matchMedia("(min-width: 900px) and (pointer: fine) and (prefers-reduced-motion: no-preference)").matches;
    const constrainedDevice = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;
    if (!canvas || !hero || !shouldRender || constrainedDevice) return undefined;

    const gl = canvas.getContext("webgl", { alpha: false, antialias: false, depth: false, stencil: false, powerPreference: "high-performance" });
    if (!gl) return undefined;

    const vertex = compileShader(gl, gl.VERTEX_SHADER, vertexShader);
    const fragment = compileShader(gl, gl.FRAGMENT_SHADER, fragmentShader);
    if (!vertex || !fragment) return undefined;

    const program = gl.createProgram();
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return undefined;
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, "aPosition");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const timeUniform = gl.getUniformLocation(program, "uTime");
    const resolutionUniform = gl.getUniformLocation(program, "uResolution");
    const trailUniform = gl.getUniformLocation(program, "uTrail[0]");
    const mouseMovedUniform = gl.getUniformLocation(program, "uMouseMoved");
    const scrollUniform = gl.getUniformLocation(program, "uScrollDelta");
    const trail = [{ x: 0.5, y: 0.35 }];
    const trailData = new Float32Array(2);
    const pointer = { x: 0.5, y: 0.35, moved: 0 };
    let scrollY = window.scrollY;
    let scrollDelta = 0;
    const startedAt = performance.now();
    let frame = 0;
    let lastRenderedAt = 0;
    let visible = true;

    const resize = () => {
      const width = Math.max(hero.clientWidth, 1);
      const height = Math.max(hero.clientHeight, 1);
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }
    };

    const onPointerMove = (event) => {
      const rect = hero.getBoundingClientRect();
      pointer.x = (event.clientX - rect.left) / rect.width;
      pointer.y = (event.clientY - rect.top) / rect.height;
      pointer.moved = 1;
    };

    const onScroll = () => {
      const nextY = window.scrollY;
      scrollDelta += nextY - scrollY;
      scrollY = nextY;
    };

    const render = (now) => {
      if (visible && !document.hidden && now - lastRenderedAt >= 33) {
        lastRenderedAt = now;
        trail[0].x += (pointer.x - trail[0].x) * 0.18;
        trail[0].y += (pointer.y - trail[0].y) * 0.18;
        trail.forEach((point, index) => {
          trailData[index * 2] = point.x;
          trailData[index * 2 + 1] = point.y;
        });
        scrollDelta *= 0.9;
        gl.uniform1f(timeUniform, (now - startedAt) / 1000);
        gl.uniform2f(resolutionUniform, canvas.width, canvas.height);
        gl.uniform2fv(trailUniform, trailData);
        gl.uniform1f(mouseMovedUniform, pointer.moved);
        gl.uniform1f(scrollUniform, scrollDelta);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
      }
      frame = requestAnimationFrame(render);
    };

    const resizeObserver = new ResizeObserver(resize);
    const visibilityObserver = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }, { rootMargin: "120px" });
    resizeObserver.observe(hero);
    visibilityObserver.observe(hero);
    hero.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    hero.setAttribute("data-webgl-ready", "");
    resize();
    frame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      hero.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", onScroll);
      hero.removeAttribute("data-webgl-ready");
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
    };
  }, []);

  return <canvas className="hero-webgl-background" ref={canvasRef} aria-hidden="true" />;
}
