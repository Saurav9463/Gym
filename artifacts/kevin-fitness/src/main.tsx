import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import Lenis from "lenis";

// ── Lenis smooth scroll ──────────────────────────────────────────────────────
const lenis = new Lenis({
  duration: 1.15,
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  touchMultiplier: 1.5,
} as ConstructorParameters<typeof Lenis>[0]);

function raf(time: number) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Expose lenis globally so components can use it (e.g. ScrollTrigger proxy)
(window as any).__lenis = lenis;

createRoot(document.getElementById("root")!).render(<App />);
