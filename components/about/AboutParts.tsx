"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Ticket from "../Ticket";
import { wrap } from "../ui";

export function AboutHero() {
  return (
    <section className="border-b border-border">
      <div className={`${wrap} flex flex-col items-center gap-14 pb-24 pt-36 md:pb-[112px] md:pt-[218px] lg:flex-row lg:gap-16`}>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} className="flex flex-1 flex-col gap-7">
          <p className="font-mono text-[12px] leading-4 tracking-[0.16em] text-accent">WHY A DETECTIVE</p>
          <h1 className="text-[clamp(48px,6.2vw,88px)] font-semibold leading-[0.955] tracking-[-0.05em]">Named after Bengal&apos;s sharpest mind.</h1>
          <p className="max-w-[560px] text-[18px] leading-[29px] text-[#C9CBBF] md:text-[19px] md:leading-[31px]">Feluda is Satyajit Ray&apos;s private investigator. He solves cases by watching closely, reasoning patiently and never guessing. We think software should be reviewed the same way.</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, rotate: 20, y: 60 }} animate={{ opacity: 1, rotate: 1, y: 0 }} transition={{ type: "spring", stiffness: 60, damping: 12, delay: 0.3 }} className="shrink-0">
          <Ticket color="#326B40" no="FELUDA / 03" title={<>Cause found.<br />Fix in hand.</>} img="/stamp-resolve.webp" foot="03 / RESOLVE · 3¢" />
        </motion.div>
      </div>
    </section>
  );
}

const principles = [["Observe before judging", "Read the whole case file: diff, callers and production evidence."], ["Prove, don't guess", "Every finding comes with evidence. Disproved theories are shown, too."], ["Speak only when it matters", "You set the threshold. Feluda stays quiet below it."]];
export function Principles() {
  return (
    <section className="border-b border-border">
      <div className={`${wrap} grid md:grid-cols-3`}>
        {principles.map(([t, d], i) => (
          <motion.div key={t} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
            className={`group flex flex-col gap-3.5 py-10 md:py-14 ${i === 0 ? "md:pr-10" : i === 1 ? "border-t border-border md:border-l md:border-t-0 md:px-10" : "border-t border-border md:border-l md:border-t-0 md:pl-10"}`}>
            <p className="font-mono text-[12px] leading-4 text-accent">0{i + 1}</p>
            <p className="text-[24px] font-semibold leading-8 tracking-[-0.02em] transition-transform duration-500 group-hover:translate-x-1 md:text-[26px]">{t}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

const trust = [["✓ ACCESS", "Least-privilege GitHub App and GitLab OAuth scopes", "contents: read · pull_requests: write · checks: write · admin: never"], ["✓ IDENTITY", "Puku sign-in · SSO on Enterprise", "SAML and OIDC, SCIM provisioning on Enterprise."], ["✓ PENTEST SAFETY", "Ownership verified, never-touch paths, rate caps", "Safe mode pauses on 5xx spikes; 10 req/s default cap."], ["[ ] DATA", "Retention window · training policy · subprocessors", "[To confirm with Puku security]"]];
export function Security() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section id="security" className="scroll-mt-20 border-b border-border bg-sidebar">
      <div className={`${wrap} flex flex-col gap-12 py-24 md:py-[112px] lg:flex-row lg:gap-16`}>
        <div className="flex shrink-0 flex-col gap-4 lg:w-[420px]">
          <p className="font-mono text-[12px] leading-4 tracking-[0.1em] text-success">SECURITY &amp; TRUST</p>
          <h2 className="text-[clamp(36px,4vw,48px)] font-semibold leading-[1.04] tracking-[-0.04em]">A detective you can let into the building.</h2>
        </div>
        <div className="grid flex-1 gap-4 sm:grid-cols-2">
          {trust.map(([k, t, d], i) => (
            <button key={k} onClick={() => setOpen(open === i ? null : i)} className={`flex flex-col gap-2.5 rounded-[12px] border bg-bg p-6 text-left transition-colors hover:border-[#4a4c42] ${i === 3 ? "border-dashed border-border" : "border-border"} ${open === i ? "border-success/50" : ""}`}>
              <span className={`font-mono text-[11px] leading-[14px] tracking-[0.1em] ${i === 3 ? "text-muted" : "text-success"}`}>{k}</span>
              <span className="text-[17px] leading-[22px]">{t}</span>
              <AnimatePresence>{open === i && <motion.span initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden font-mono text-[12px] leading-5 text-muted">{d}</motion.span>}</AnimatePresence>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  const [size, setSize] = useState("50–250");
  const [f, setF] = useState({ name: "", email: "", msg: "" });
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");
  const valid = f.name.trim() && /\S+@\S+\.\S+/.test(f.email);
  const input = "h-[46px] rounded-[8px] border border-border bg-bg px-3.5 text-[15px] outline-none transition-colors focus:border-accent";
  return (
    <section id="contact" className="scroll-mt-20">
      <div className={`${wrap} flex flex-col gap-12 py-24 md:py-[112px] lg:flex-row lg:gap-16`}>
        <div className="flex shrink-0 flex-col gap-4 lg:w-[420px]">
          <p className="font-mono text-[12px] leading-4 tracking-[0.1em] text-accent">OPEN A CONVERSATION</p>
          <h2 className="text-[clamp(36px,4vw,48px)] font-semibold leading-[1.04] tracking-[-0.04em]">Bring Feluda to your enterprise.</h2>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); if (!valid) return; setState("sending"); setTimeout(() => setState("sent"), 1200); }} className="relative flex flex-1 flex-col gap-4 overflow-hidden rounded-[16px] border border-border bg-panel p-6 md:p-8">
          <AnimatePresence mode="wait">
            {state === "sent" ? (
              <motion.div key="ok" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="flex min-h-[360px] flex-col items-center justify-center gap-4 text-center">
                <motion.span initial={{ scale: 2, rotate: -30, opacity: 0 }} animate={{ scale: 1, rotate: -12, opacity: 1 }} transition={{ type: "spring", stiffness: 200, damping: 12 }} className="rounded-[6px] border-2 border-success px-4 py-2 font-mono text-[13px] font-bold tracking-[0.3em] text-success">CASE OPENED</motion.span>
                <p className="text-[17px]">Thanks, {f.name.split(" ")[0]}. The Puku team will reply to {f.email} within a day.</p>
                <button type="button" onClick={() => { setState("idle"); setF({ name: "", email: "", msg: "" }); }} className="text-[14px] text-accent">Send another</button>
              </motion.div>
            ) : (
              <motion.div key="form" exit={{ opacity: 0 }} className="flex flex-col gap-4">
                <div className="flex flex-col gap-4 sm:flex-row">
                  <label className="flex flex-1 flex-col gap-2"><span className="text-[13px] leading-4 text-muted">Name</span><input required value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} className={input} /></label>
                  <label className="flex flex-1 flex-col gap-2"><span className="text-[13px] leading-4 text-muted">Work email</span><input required type="email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} className={input} /></label>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-[13px] leading-4 text-muted">Team size</span>
                  <div className="flex flex-wrap gap-2">{["10–50", "50–250", "250+"].map((s) => <button type="button" key={s} onClick={() => setSize(s)} className={`rounded-full border px-4 py-2.5 text-[14px] leading-[18px] transition-colors ${size === s ? "border-accent text-text" : "border-border text-muted hover:text-text"}`}>{s}</button>)}</div>
                </div>
                <label className="flex flex-col gap-2"><span className="text-[13px] leading-4 text-muted">What&apos;s the case?</span><textarea value={f.msg} onChange={(e) => setF({ ...f, msg: e.target.value })} className="h-[110px] resize-none rounded-[8px] border border-border bg-bg p-3.5 text-[15px] outline-none focus:border-accent" /></label>
                <button disabled={!valid || state === "sending"} className="btn btn-primary w-full disabled:opacity-50">{state === "sending" ? "Sending…" : "Send to the Puku team"}</button>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </div>
    </section>
  );
}
