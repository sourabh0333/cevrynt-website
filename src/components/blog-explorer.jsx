"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BlogCard } from "@/components/blog-card";
import { SearchIcon } from "@/components/icons";

gsap.registerPlugin(ScrollTrigger);

export function BlogExplorer({ posts, categories }) {
  const [topic, setTopic] = useState("all");
  const [query, setQuery] = useState("");
  const gridRef = useRef(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((post) => {
      const matchesTopic = topic === "all" || post.category === topic;
      const matchesQuery =
        !q || post.title.toLowerCase().includes(q) || post.excerpt.toLowerCase().includes(q) || post.category.toLowerCase().includes(q);
      return matchesTopic && matchesQuery;
    });
  }, [posts, topic, query]);

  useEffect(() => {
    const root = gridRef.current;
    const cards = root ? gsap.utils.toArray(".blog-card", root) : [];
    if (!cards.length) return undefined;

    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.set(cards, { autoAlpha: 0, y: 20 });
      ScrollTrigger.batch(cards, {
        start: "top 92%",
        once: true,
        onEnter: (batch) => gsap.to(batch, { autoAlpha: 1, y: 0, duration: 0.6, ease: "power2.out", stagger: 0.08 }),
      });
      return () => gsap.set(cards, { clearProps: "opacity,visibility,transform" });
    });

    return () => media.revert();
  }, [filtered.length, topic, query]);

  return (
    <div ref={gridRef}>
      <div className="blog-filter-row">
        <label className="blog-filter-select">
          <span className="sr-only">Filter by topic</span>
          <select value={topic} onChange={(event) => setTopic(event.target.value)}>
            <option value="all">All topics</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>
        <label className="blog-filter-search">
          <SearchIcon />
          <input
            type="search"
            placeholder="Search articles…"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            aria-label="Search articles"
          />
        </label>
      </div>

      {filtered.length ? (
        <div className="blog-grid">
          {filtered.map((post) => (
            <BlogCard post={post} key={post.slug} />
          ))}
        </div>
      ) : (
        <p className="blog-empty">No articles match that search yet. Try a different topic or keyword.</p>
      )}
    </div>
  );
}
