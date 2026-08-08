"use client";

import { application } from "@/content/demo-data";
import { Status } from "@/components/ui/primitives";

export function ProductShell({ title, children, status = "Demonstration data", tone = "blue", tabs = [], stage = "Recommendation review" }) {
  return <section className="product-shell" aria-label={`${title} product demonstration`}><header><div><span className="product-kicker">Cevrynt / {title}</span><Status tone={tone}>{status}</Status></div>{tabs.length > 0 && <nav aria-label={`${title} views`}>{tabs.map((tab, index) => <span className={index === 0 ? "is-active" : ""} key={tab}>{tab}</span>)}</nav>}</header><div className="product-shell__context"><span>Deal · {application.business}</span><span>Owner · {application.owner}</span><span>Workflow · {stage}</span><Status tone="amber">Funder review</Status></div>{children}</section>;
}

export function Metric({ label, value, note, tone = "blue" }) { return <div className="product-metric"><span>{label}</span><strong>{value}</strong><Status tone={tone}>{note}</Status></div>; }
