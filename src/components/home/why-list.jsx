"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * The four principles as an editorial definition list, with a preview that
 * follows the cursor.
 *
 * Hovering a row raises the matching product view and trails it with the
 * pointer, so the claim and the thing it describes are on screen together
 * without the layout having to carry four permanent images.
 *
 * Every preview is server-rendered inside its row, so the images are real
 * markup with alt text rather than something JavaScript invents. The trailing
 * behaviour is a fine-pointer enhancement only — on touch, and with reduced
 * motion, the previews simply never show and the list reads as a list.
 */
export function WhyList({ items }) {
  const scope = useRef(null);

  useEffect(() => {
    const root = scope.current;
    if (!root) return undefined;

    const media = gsap.matchMedia();

    // Rows rule in as they arrive — this runs on every device.
    media.add({ motionOk: "(prefers-reduced-motion: no-preference)" }, ({ conditions }) => {
      if (!conditions.motionOk) return undefined;

      const rows = gsap.utils.toArray(".wy-row", root);
      rows.map((row) => {
        const rule = row.querySelector(".wy-rule");
        const term = row.querySelector(".wy-term-inner");
        const meta = row.querySelector(".wy-meta");
        const tl = gsap.timeline({ scrollTrigger: { trigger: row, start: "top 90%", once: true } });
        tl.fromTo(rule, { scaleX: 0 }, { scaleX: 1, duration: 0.7, ease: "power2.inOut" }, 0);
        tl.fromTo(term, { yPercent: 108 }, { yPercent: 0, duration: 0.86, ease: "power3.out" }, 0.12);
        tl.fromTo(meta, { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.7, ease: "power3.out" }, 0.24);
        return tl;
      });
    });

    // Cursor-trailing preview.
    media.add(
      { finePointer: "(pointer: fine)", motionOk: "(prefers-reduced-motion: no-preference)" },
      ({ conditions }) => {
        if (!conditions.finePointer || !conditions.motionOk) return undefined;

        const rows = gsap.utils.toArray(".wy-row", root);
        const cleanups = [];
        root.dataset.previewOn = "true";

        rows.forEach((row) => {
          const preview = row.querySelector(".wy-preview");
          if (!preview) return;

          const moveX = gsap.quickTo(preview, "x", { duration: 0.62, ease: "power3" });
          const moveY = gsap.quickTo(preview, "y", { duration: 0.62, ease: "power3" });

          const onMove = (event) => {
            const rect = row.getBoundingClientRect();
            moveX(event.clientX - rect.left);
            moveY(event.clientY - rect.top);
          };
          const onEnter = (event) => {
            const rect = row.getBoundingClientRect();
            // Start where the pointer is, so it does not fly in from a corner.
            gsap.set(preview, { x: event.clientX - rect.left, y: event.clientY - rect.top });
            gsap.to(preview, { autoAlpha: 1, scale: 1, rotate: 0, duration: 0.44, ease: "power3.out" });
          };
          const onLeave = () => {
            gsap.to(preview, { autoAlpha: 0, scale: 0.92, rotate: -2, duration: 0.3, ease: "power2.out" });
          };

          row.addEventListener("pointerenter", onEnter);
          row.addEventListener("pointermove", onMove, { passive: true });
          row.addEventListener("pointerleave", onLeave);
          cleanups.push(() => {
            row.removeEventListener("pointerenter", onEnter);
            row.removeEventListener("pointermove", onMove);
            row.removeEventListener("pointerleave", onLeave);
          });
        });

        return () => {
          delete root.dataset.previewOn;
          cleanups.forEach((fn) => fn());
        };
      },
    );

    return () => media.revert();
  }, []);

  return (
    <dl className="wy-list" ref={scope}>
      {items.map(({ term, detail, image, imageAlt }, index) => (
        <div className="wy-row" key={term}>
          <span className="wy-rule" aria-hidden="true" />
          <span className="hx-mono wy-index">{String(index + 1).padStart(2, "0")}</span>
          <dt className="wy-term">
            <span className="wy-term-inner">{term}</span>
          </dt>
          <dd className="wy-meta">{detail}</dd>

          <span className="wy-preview" aria-hidden="true">
            <Image src={image} alt={imageAlt} width={900} height={620} loading="lazy" sizes="300px" />
          </span>
        </div>
      ))}
    </dl>
  );
}
