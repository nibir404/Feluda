"use client";
import dynamic from "next/dynamic";

const PaperTexture = dynamic(() => import("@paper-design/shaders-react").then((m) => m.PaperTexture), { ssr: false });

const ticket = "M 0 0 " + Array.from({ length: 14 }, (_, i) => `L ${4 + i * 20} 0 a 6 6 0 0 0 12 0`).join(" ") + " L 280 0 " +
  Array.from({ length: 16 }, (_, i) => `L 280 ${4 + i * 20} a 6 6 0 0 0 0 12`).join(" ") + " L 280 320 " +
  Array.from({ length: 14 }, (_, i) => `L ${276 - i * 20} 320 a 6 6 0 0 0 -12 0`).join(" ") + " L 0 320 " +
  Array.from({ length: 16 }, (_, i) => `L 0 ${316 - i * 20} a 6 6 0 0 0 0 -12`).join(" ") + " Z";

/** Perforated postage-stamp evidence ticket with Paper's paper-texture shader. Lifts on hover. */
export default function Ticket({ color, no, title, img, foot }: { color: string; no: string; title: React.ReactNode; img: string; foot: string }) {
  return (
    <div className="relative h-[320px] w-[280px] transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] hover:-translate-y-2 hover:rotate-[-3deg]" data-cursor>
      <svg width="280" height="320" viewBox="0 0 280 320" className="absolute inset-0 overflow-visible" aria-hidden>
        <defs><filter id="tk-shadow" x="-30%" y="-30%" width="160%" height="180%"><feDropShadow dx="0" dy="10" stdDeviation="10" floodColor="#000" floodOpacity=".35" /></filter></defs>
        <path d={ticket} filter="url(#tk-shadow)" fill="#EEEEE5" />
      </svg>
      <div className="absolute inset-0 opacity-[0.86] mix-blend-multiply" style={{ clipPath: `path("${ticket}")`, backgroundColor: "#EEF1EC" }}>
        <PaperTexture fit="cover" scale={0.9} blending={0.5} distortion={0} angle={0} seed={455} roughness={1} roughnessSize={0.5} roughnessRows={0.6} fiber={0.5} fiberSize={1} drops={0.2} colorBack="#00000000" colorPaper="#FFFFFFA8" colorShadow="#B3B3B3" style={{ width: 280, height: 320 }} />
      </div>
      <div className="absolute left-[22px] top-4 flex w-[236px] flex-col gap-2" style={{ color }}>
        <p className="font-mono text-[10px] leading-3 tracking-[1px]">{no}</p>
        <p className="text-[23px] font-semibold leading-[105%] tracking-[-0.4px]">{title}</p>
      </div>
      <div className="absolute left-3 top-[88px] h-[200px] w-[256px] bg-cover bg-center" style={{ backgroundImage: `url(${img})` }} />
      <p className="absolute left-[22px] top-[299px] font-mono text-[8px] font-medium leading-[10px] tracking-[1.2px]" style={{ color }}>{foot}</p>
    </div>
  );
}
