"use client";
import { useEffect, useState } from "react";

export function ArticleToc({ items }) {
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    if (!items.length) return;

    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-80px 0px -70% 0px", threshold: 0 }
    );

    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [items]);

  const activeIndex = items.findIndex((i) => i.id === activeId);

  return (
    <>
      <p className="article-toc-label">On this page</p>
      <nav className="article-toc" aria-label="Article sections">
        {items.map((item, idx) => {
          const isActive = item.id === activeId;
          const isDone = activeIndex >= 0 && idx < activeIndex;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={isActive ? "is-active" : isDone ? "is-done" : ""}
            >
              {item.text}
            </a>
          );
        })}
      </nav>
    </>
  );
}
