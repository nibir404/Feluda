import fs from "node:fs";
import path from "node:path";
import EngineSvg from "./EngineSvg";

/** Engine — the isometric stack from the design, animated (plates float, wires dash-flow, investigate pulses). */
export default function Engine() {
  const svg = fs.readFileSync(path.join(process.cwd(), "lib/engine.svg"), "utf8")
    .replace("<svg ", '<svg class="engine-svg" role="img" aria-label="Isometric diagram: GitHub, GitLab, prod logs and Puku context feed five layers — observe, diff reader, investigate, codebase graph, resolve" ')
    .replace(/ width="1248" height="700"/, "");
  return (
    <section className="border-t border-border" aria-labelledby="engine-title">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-10 px-5 py-24 md:px-12 md:py-[112px] xl:px-24">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="flex flex-col gap-4">
            <p className="font-mono text-[12px] leading-4 tracking-[0.1em] text-accent">HOW IT WORKS</p>
            <h2 id="engine-title" className="max-w-[640px] text-[clamp(38px,4.5vw,56px)] font-semibold leading-[1.04] tracking-[-0.04em]">Five layers between a push and a verdict.</h2>
          </div>
        </div>
        <EngineSvg svg={svg} />
      </div>
    </section>
  );
}
