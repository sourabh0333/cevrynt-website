import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

import {
  homepageSections,
  getRouteDefinition,
  footerGroups,
  indexableRoutes,
  navigationGroups,
  siteClaims,
} from "../src/content/site-config.js";

test("only approved public routes are indexable", () => {
  assert.deepEqual(indexableRoutes, [
    "/",
    "/solutions/funder-sales",
    "/solutions/funder-pricing",
    "/partners/shopline",
  ]);
});

test("every public claim has a status and approved claims are confirmed", () => {
  for (const claim of siteClaims) {
    assert.ok(claim.status);
  }

  assert.equal(
    siteClaims.find((claim) => claim.id === "analysis-time").status,
    "confirmed",
  );
});

test("supporting pages are noindex until substantive content is ready", () => {
  const securityRoute = getRouteDefinition("/security");
  assert.equal(securityRoute.indexable, false);
  assert.equal(securityRoute.robots, "noindex, follow");
});

test("dynamic route metadata awaits Next.js route params", async () => {
  const routePage = await readFile(
    new URL("../src/app/[...segments]/page.jsx", import.meta.url),
    "utf8",
  );

  assert.match(routePage, /export async function generateMetadata/);
  assert.match(routePage, /const \{ segments \} = await params;/);
});

test("navigation exposes every approved route through grouped links", () => {
  const visiblePaths = [...navigationGroups, ...footerGroups].flatMap((group) => group.links.map((link) => link.href));
  assert.ok(visiblePaths.includes("/platform"));
  assert.ok(visiblePaths.includes("/solutions/funder-sales"));
  assert.ok(visiblePaths.includes("/partners/shopline"));
  assert.ok(visiblePaths.includes("/contact"));
});

test("the homepage establishes canonical and indexing metadata", async () => {
  const layout = await readFile(new URL("../src/app/layout.js", import.meta.url), "utf8");
  assert.match(layout, /alternates: \{ canonical: "\/" \}/);
  assert.match(layout, /robots: "index, follow"/);
});

test("homepage narrative covers every approved product subject with demonstration data", () => {
  const required = ["hero", "workflow", "workspace", "bank-analysis", "policy", "fraud", "report", "shopline", "audiences", "roadmap", "resources"];
  assert.ok(required.every((id) => homepageSections.some((section) => section.id === id)));
  assert.ok(homepageSections.every((section) => section.label));
});

test("smooth scrolling uses Lenis autoRaf with compatible scroll CSS", async () => {
  const provider = await readFile(new URL("../src/components/motion/motion-provider.jsx", import.meta.url), "utf8");
  const styles = await readFile(new URL("../src/app/globals.css", import.meta.url), "utf8");
  assert.match(provider, /autoRaf: true/);
  assert.doesNotMatch(provider, /requestAnimationFrame/);
  assert.match(styles, /\.lenis\.lenis-smooth\{scroll-behavior:auto!important\}/);
});

test("critical product content is never hidden while waiting for a reveal animation", async () => {
  const reveal = await readFile(new URL("../src/components/motion/reveal.jsx", import.meta.url), "utf8");
  assert.match(reveal, /initial=\{false\}/);
});

test("homepage groups the underwriting narrative into substantial product environments", async () => {
  const homepage = await readFile(new URL("../src/app/page.js", import.meta.url), "utf8");
  const environments = [
    "hero-environment",
    "workflow-environment",
    "workspace-environment",
    "policy-environment",
    "investigation-environment",
    "recommendation-environment",
    "ecosystem-environment",
    "control-environment",
  ];

  assert.ok(environments.every((id) => homepage.includes(`id=\"${id}\"`)));
  assert.doesNotMatch(homepage, /import \{ Reveal \}/);
});

test("homepage keeps one readable product-led hero without development-style markers", async () => {
  const homepage = await readFile(new URL("../src/app/page.js", import.meta.url), "utf8");
  const artDirection = await readFile(new URL("../src/app/art-direction.css", import.meta.url), "utf8");

  assert.match(homepage, /id="hero-environment"/);
  assert.match(homepage, /Turn documents into evidence your funding team can review\./);
  assert.match(homepage, /Funder review and final decision remain with your team\./);
  assert.doesNotMatch(homepage, /detail-index|Figma|wireframe|placeholder/i);
  assert.match(artDirection, /\.art-hero \{ display: grid; grid-template-columns: 1fr;/);
  assert.match(artDirection, /\.art-hero__copy \{[^}]*justify-items: center/);
  assert.match(artDirection, /font-size: clamp\(2\.4rem, 11vw, 3\.2rem\)/);
  assert.match(artDirection, /\.art-hero__assurance \{[^}]*flex-wrap: wrap/);
  assert.match(artDirection, /\.art-hero__product \.hero-scene \{ grid-template-columns: 1fr; min-height: 0; \}/);
  assert.match(artDirection, /\.art-hero__copy h1 \{ width: 100%;/);
});

test("development portal UI and annotation-like markers are not visible with the public site", async () => {
  const styles = await readFile(new URL("../src/app/globals.css", import.meta.url), "utf8");
  const homepage = await readFile(new URL("../src/app/page.js", import.meta.url), "utf8");
  const nextConfig = await readFile(new URL("../next.config.mjs", import.meta.url), "utf8");

  assert.match(styles, /nextjs-portal\{display:none!important\}/);
  assert.match(nextConfig, /devIndicators: false/);
  assert.doesNotMatch(homepage, /detail-index|scene-index|debug-navigation|annotation/i);
});
