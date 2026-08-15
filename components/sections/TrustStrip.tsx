import { Container } from "../primitives/Container";
import { trustStrip } from "@/lib/content";

export function TrustStrip() {
  return (
    <section className="hairline-b hairline-t">
      <Container size="wide">
        <div className="py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="label-mono text-ink-tertiary">{trustStrip.label}</p>
          <p className="font-mono text-xs text-ink-secondary tracking-wide">
            {trustStrip.items.join(" · ")}
          </p>
        </div>
      </Container>
    </section>
  );
}