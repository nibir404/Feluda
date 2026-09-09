import Link from "next/link";
import { Logo } from "../primitives/Logo";
import { footerContent } from "@/lib/content";
export function Footer() {
 return <footer className="f-footer"><div className="footer-grid"><div className="footer-brand"><Link href="/" aria-label="Feluda home"><Logo height={55} width={200} forceTheme="light"/></Link><p>Codebase intelligence.<br/>Evidence, not guesswork.</p><span className="mono">BUILT FOR THE CURIOUS.</span></div>{footerContent.columns.map(col => <div key={col.title}><h3>{col.title}</h3>{col.links.map(l => <Link key={l.href} href={l.href}>{l.label}</Link>)}</div>)}</div><div className="footer-bottom"><span>© 2026 Feluda. All rights reserved.</span><span>OBSERVE. CONNECT. INVESTIGATE.</span><Link href="/enterprise/security">Security & privacy ↗</Link></div></footer>;
}
