"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function Eyebrow({ children }) { return <p className="eyebrow">{children}</p>; }
export function ButtonLink({ href, children, tone = "primary", className = "" }) { return <Link href={href} className={`button button--${tone} ${className}`}>{children}<ArrowUpRight aria-hidden="true" size={16} strokeWidth={1.8} /></Link>; }
export function TextLink({ href, children }) { return <Link href={href} className="text-link">{children}<ArrowUpRight aria-hidden="true" size={15} strokeWidth={1.8} /></Link>; }
export function Breadcrumb({ route }) { if (route.path === "/") return null; return <nav className="breadcrumb" aria-label="Breadcrumb"><Link href="/">Cevrynt</Link><span aria-hidden="true">/</span><span aria-current="page">{route.title.replace(" | Cevrynt", "")}</span></nav>; }
export function Status({ children, tone = "blue" }) { return <span className={`status status--${tone}`}><span aria-hidden="true" />{children}</span>; }
