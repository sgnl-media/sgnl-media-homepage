import { useEffect, useRef, useState } from "react";

/**
 * Playback scheduler.
 *
 * Four source clips are uncompressed camera masters (~18 Mbps, 60-285MB);
 * the rest are properly encoded (0.7-6.6MB). Everything cannot stream at
 * once, so slots are rationed - but they are handed to whatever is closest
 * to the middle of the screen, and a nearer clip can take a slot from a
 * further one. Otherwise whichever section mounted first keeps the slots
 * and the section you are actually looking at stays frozen.
 */
const HEAVY: string[] = [];
const HEAVY_SEGMENT_S = 6;
const MAX_LIGHT = 8;
const MAX_HEAVY = 1;
const TICK_MS = 400;
const MARGIN = 120;
// A challenger must be this much closer to centre before it evicts a holder.
const EVICT_GAP_PX = 200;

const isHeavy = (src: string) => HEAVY.some((h) => src.includes(h));

const kick = (el: HTMLVideoElement) => {
  const p = el.play();
  if (p && typeof p.catch === "function") p.catch(() => {});
};

type Entry = { el: HTMLVideoElement; heavy: boolean; holding: boolean; setLoad: (v: boolean) => void };

const entries: Entry[] = [];
let activeLight = 0;
let activeHeavy = 0;
let timer: ReturnType<typeof setInterval> | null = null;

function metrics(el: HTMLVideoElement) {
  const r = el.getBoundingClientRect();
  if (r.width === 0 || r.height === 0) return { visible: false, dist: Infinity };
  const onScreen =
    r.top < window.innerHeight + MARGIN && r.bottom > -MARGIN && r.left < window.innerWidth + MARGIN && r.right > -MARGIN;
  const dy = r.top + r.height / 2 - window.innerHeight / 2;
  const dx = r.left + r.width / 2 - window.innerWidth / 2;
  return { visible: onScreen, dist: Math.hypot(dx, dy) };
}

function take(entry: Entry) {
  entry.holding = true;
  if (entry.heavy) activeHeavy += 1;
  else activeLight += 1;
  entry.setLoad(true);
}

function drop(entry: Entry, pause: boolean) {
  if (!entry.holding) return;
  entry.holding = false;
  if (entry.heavy) activeHeavy = Math.max(0, activeHeavy - 1);
  else activeLight = Math.max(0, activeLight - 1);
  if (pause) entry.el.pause();
}

function tick() {
  const state = entries.map((e) => ({ e, ...metrics(e.el) }));

  // Maintain current holders.
  for (const s of state) {
    if (!s.e.holding) continue;
    if (!s.visible) {
      drop(s.e, true);
      continue;
    }
    if (s.e.el.paused && s.e.el.getAttribute("src")) kick(s.e.el);
    if (s.e.heavy && s.e.el.currentTime > HEAVY_SEGMENT_S) {
      try {
        s.e.el.currentTime = 0;
      } catch {
        /* pre-metadata seek */
      }
    }
  }

  for (const heavy of [false, true]) {
    const cap = heavy ? MAX_HEAVY : MAX_LIGHT;
    const pool = state.filter((s) => s.e.heavy === heavy);
    const waiting = pool.filter((s) => s.visible && !s.e.holding).sort((a, b) => a.dist - b.dist);
    if (waiting.length === 0) continue;

    for (const cand of waiting) {
      const used = heavy ? activeHeavy : activeLight;
      if (used < cap) {
        take(cand.e);
        continue;
      }
      // Full: let a clearly closer clip take the worst-placed slot.
      const holders = pool.filter((s) => s.e.holding).sort((a, b) => b.dist - a.dist);
      const worst = holders[0];
      if (worst && worst.dist - cand.dist > EVICT_GAP_PX) {
        drop(worst.e, true);
        take(cand.e);
      } else {
        break;
      }
    }
  }
}

function register(entry: Entry) {
  entries.push(entry);
  if (!timer) timer = setInterval(tick, TICK_MS);
  tick();
}

function unregister(entry: Entry) {
  drop(entry, false);
  const i = entries.indexOf(entry);
  if (i >= 0) entries.splice(i, 1);
  if (entries.length === 0 && timer) {
    clearInterval(timer);
    timer = null;
  }
}

export default function LazyVideo({ src, className, title }: { src: string; className?: string; title?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const entry: Entry = { el, heavy: isHeavy(src), holding: false, setLoad };
    register(entry);
    return () => unregister(entry);
  }, [src]);

  useEffect(() => {
    const el = ref.current;
    if (!el || !load) return;
    el.load();
    kick(el);
  }, [load]);

  return <video ref={ref} className={className} title={title} src={load ? src : undefined} autoPlay muted loop playsInline preload="none" />;
}
