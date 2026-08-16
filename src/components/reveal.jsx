"use client";

import { Fragment, useEffect, useLayoutEffect, useRef } from "react";

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

let sharedObserver = null;

function getObserver() {
  if (sharedObserver) return sharedObserver;
  sharedObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.setAttribute("data-revealed", "");
        sharedObserver.unobserve(entry.target);
      }
    },
    { rootMargin: "0px 0px -12% 0px" },
  );
  return sharedObserver;
}

/**
 * Arms the hidden state only after JS confirms support and no reduced-motion
 * preference, so server-rendered copy stays visible without JavaScript.
 * Elements already on screen at mount skip the animation entirely.
 */
function useRevealRef(variant) {
  const ref = useRef(null);

  useIsoLayoutEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    if (typeof IntersectionObserver === "undefined") return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    if (node.getBoundingClientRect().top < window.innerHeight * 0.9) {
      node.setAttribute("data-revealed", "");
      return undefined;
    }

    node.setAttribute("data-reveal", variant);
    const observer = getObserver();
    observer.observe(node);
    return () => observer.unobserve(node);
  }, [variant]);

  return ref;
}

export function Reveal({
  as: Tag = "div",
  variant = "rise",
  delay = 0,
  className,
  style,
  children,
  ...rest
}) {
  const ref = useRevealRef(variant);

  return (
    <Tag
      ref={ref}
      className={className}
      style={delay ? { ...style, "--reveal-delay": `${delay}ms` } : style}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/**
 * Word-masked heading reveal. Every word ships as real text in the server HTML,
 * so the copy stays readable and crawlable with JavaScript disabled.
 */
export function RevealText({ as: Tag = "h2", text, delay = 0, className, ...rest }) {
  const ref = useRevealRef("words");
  const words = text.split(" ");

  return (
    <Tag ref={ref} className={className} style={{ "--reveal-delay": `${delay}ms` }} {...rest}>
      {words.map((word, index) => (
        <Fragment key={`${word}-${index}`}>
          <span className="hx-word">
            <span className="hx-word-inner" style={{ "--word-index": index }}>
              {word}
            </span>
          </span>
          {index < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </Tag>
  );
}
