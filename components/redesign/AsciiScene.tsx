"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play, RotateCcw } from "lucide-react";

type Point = { x: number; y: number; z: number; shade: number; seed: number };

/** Image-derived point geometry, projected with a perspective camera.
 * Pointer movement changes the camera; brightness determines depth and glyph density.
 * Everything is local: no model, tracking, or external rendering service. */
export function AsciiScene() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const pointer = useRef({ x: 0, y: 0, active: false });
  const controls = useRef({ paused: false, mode: "dots" });
  const [paused, setPaused] = useState(false);
  const [mode, setMode] = useState("dots");
  const [ready, setReady] = useState(false);

  useEffect(() => { controls.current.paused = paused; controls.current.mode = mode; }, [paused, mode]);
  useEffect(() => {
    const el = canvas.current;
    if (!el) return;
    const ctx = el.getContext("2d");
    if (!ctx) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let points: Point[] = [], frame = 0, width = 0, height = 0, active = true, disposed = false;
    let rotationX = 0, rotationY = 0, clock = 0, last = 0;
    const resize = () => {
      const rect = el.getBoundingClientRect();
      width = rect.width; height = rect.height;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      el.width = Math.round(width * ratio); el.height = Math.round(height * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    };
    const observer = new ResizeObserver(resize); observer.observe(el);
    const visibility = new IntersectionObserver(([entry]) => { active = entry.isIntersecting; }); visibility.observe(el);
    const source = new Image();
    source.src = "/Light BG.png";
    source.onload = () => {
      if (disposed) return;
      const sample = document.createElement("canvas");
      sample.width = 260; sample.height = Math.round(260 * source.height / source.width);
      const sc = sample.getContext("2d", { willReadFrequently: true });
      if (!sc) return;
      sc.drawImage(source, 0, 0, sample.width, sample.height);
      const pixels = sc.getImageData(0, 0, sample.width, sample.height).data;
      for (let y = 0; y < sample.height; y += 2) {
        for (let x = 0; x < sample.width; x += 2) {
          const i = (y * sample.width + x) * 4;
          if (pixels[i + 3] < 60) continue;
          const shade = (pixels[i] + pixels[i + 1] + pixels[i + 2]) / 765;
          points.push({ x: (x / sample.width - .5) * 2, y: (y / sample.height - .5) * 2.42,
            z: Math.sin(x / sample.width * Math.PI) * .24 + shade * .23,
            shade, seed: ((x * 17 + y * 13) % 101) / 101 });
        }
      }
      setReady(true);
    };
    const draw = (time: number) => {
      frame = requestAnimationFrame(draw);
      if (!active || document.hidden || time - last < 32) return;
      last = time;
      const still = controls.current.paused || reduced.matches;
      if (!still) clock += .016;
      rotationY += ((still ? 0 : pointer.current.x * .24 + Math.sin(clock * .45) * .055) - rotationY) * .07;
      rotationX += ((still ? 0 : pointer.current.y * -.1) - rotationX) * .07;
      ctx.clearRect(0, 0, width, height);
      if (!points.length) return;
      const scale = Math.min(width * .63, height * .43);
      const cy = Math.cos(rotationY), sy = Math.sin(rotationY), cx = Math.cos(rotationX), sx = Math.sin(rotationX);
      ctx.font = '9px monospace'; ctx.textAlign = "center";
      for (const p of points) {
        const x = p.x * cy + p.z * sy;
        const z1 = p.z * cy - p.x * sy;
        const y = p.y * cx - z1 * sx;
        const z = p.y * sx + z1 * cx;
        const perspective = 3.8 / (3.8 - z);
        const px = width * .51 + x * scale * perspective;
        const py = height * .51 + y * scale * perspective;
        const scan = Math.abs(p.y - Math.sin(clock * .65) * 1.2) < .035 && !still;
        const nearPointer = pointer.current.active && Math.hypot(px - (pointer.current.x + 1) * width / 2, py - (pointer.current.y + 1) * height / 2) < 65;
        const accent = scan || (nearPointer && !still) || p.seed > .978;
        ctx.fillStyle = accent ? `rgba(222,91,33,${.7 + p.shade * .3})` : `rgba(55,54,65,${.35 + (1 - p.shade) * .6})`;
        if (controls.current.mode === "ascii") {
          const chars = ".:+=*#@";
          ctx.fillText(chars[Math.min(6, Math.floor((1 - p.shade) * 7))], px, py);
        } else {
          const r = (.65 + (1 - p.shade) * .8) * perspective;
          ctx.beginPath(); ctx.arc(px, py, r, 0, Math.PI * 2); ctx.fill();
        }
      }
    };
    resize(); frame = requestAnimationFrame(draw);
    return () => { disposed = true; cancelAnimationFrame(frame); observer.disconnect(); visibility.disconnect(); source.onload = null; points = []; };
  }, []);

  return <div className="ascii-scene" onPointerMove={e => { const r = e.currentTarget.getBoundingClientRect(); pointer.current = {x: ((e.clientX-r.left)/r.width-.5)*2,y: ((e.clientY-r.top)/r.height-.5)*2,active:true}; }} onPointerLeave={() => { pointer.current = {x:0,y:0,active:false}; }}>
    {!ready && <img className="ascii-fallback" src="/Light BG.png" alt="Feluda investigating a codebase" />}
    <canvas ref={canvas} aria-label="Interactive 3D dot portrait of Feluda. Move your pointer to change perspective." role="img" />
    <div className="scene-top"><span className="signal-dot" /> MAGAJASTRA / ONLINE <span>FIG. 001</span></div>
    <div className="scene-label"><span>CONTEXT RESOLVED</span><b>Every dot. A connection.</b></div>
    <div className="scene-controls" aria-label="3D visualization controls">
      <div className="render-modes"><button aria-pressed={mode === "dots"} onClick={() => setMode("dots")}>DOTS</button><button aria-pressed={mode === "ascii"} onClick={() => setMode("ascii")}>ASCII</button></div>
      <button aria-label={paused ? "Play animation" : "Pause animation"} onClick={() => setPaused(!paused)}>{paused ? <Play size={13}/> : <Pause size={13}/>}</button>
      <button aria-label="Reset perspective" onClick={() => { pointer.current = {x:0,y:0,active:false}; }}><RotateCcw size={13}/></button>
      <span>MOVE TO EXPLORE</span>
    </div>
  </div>;
}
