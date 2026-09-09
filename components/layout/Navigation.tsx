"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, X, ArrowUpRight } from "lucide-react";
import { Logo } from "../primitives/Logo";
import { productNav } from "@/lib/content";

export function Navigation() {
  const [open, setOpen] = useState(false);
  const [features, setFeatures] = useState(false);
  const root = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const mobileToggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const close = (e: PointerEvent) => { if (!root.current?.contains(e.target as Node)) { setFeatures(false); setOpen(false); } };
    const key = (e: KeyboardEvent) => { if (e.key === "Escape") { setFeatures(false); setOpen(false); (window.innerWidth <= 900 ? mobileToggle : toggle).current?.focus(); } };
    document.addEventListener("pointerdown", close); document.addEventListener("keydown", key);
    return () => { document.removeEventListener("pointerdown", close); document.removeEventListener("keydown", key); };
  }, []);
  return <header className="f-nav" ref={root}>
    <nav aria-label="Primary navigation">
      <Link className="f-brand" href="/" aria-label="Feluda home"><Logo height={44} width={164} forceTheme="light"/></Link>
      <div className="f-desktop-nav">
        <Link href="/#casebook">Casebook</Link><Link href="/pricing">Pricing</Link>
        <div className="f-dropdown"><button ref={toggle} aria-expanded={features} aria-controls="feature-menu" onClick={() => setFeatures(!features)}>Product <ChevronDown size={12}/></button>
        {features && <div id="feature-menu" className="f-feature-menu">{productNav[0].items.map(i => <Link key={i.href} href={i.href} onClick={() => setFeatures(false)}><strong>{i.title}</strong><span>{i.description}</span></Link>)}</div>}</div>
        <Link href="/enterprise">Enterprise</Link><Link href="/how-it-works">How it works</Link><Link href="/docs">Docs</Link>
      </div>
      <div className="f-nav-actions"><Link href="/contact" className="cut-button charcoal contact-nav">Contact sales</Link><Link href="/signup" className="cut-button orange">Get started <ArrowUpRight size={14}/></Link><button ref={mobileToggle} className="f-menu-toggle" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</button></div>
    </nav>
    {open && <div id="mobile-navigation" className="f-mobile-menu">{[["Product","/product"],["Casebook","/#casebook"],["Pricing","/pricing"],["Enterprise","/enterprise"],["How it works","/how-it-works"],["Documentation","/docs"],["Contact sales","/contact"]].map(([label,href]) => <Link key={href} href={href} onClick={() => setOpen(false)}>{label}<ArrowUpRight size={15}/></Link>)}</div>}
  </header>;
}
