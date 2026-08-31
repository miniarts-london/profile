"use client";

import { useEffect, useRef } from "react";

export function MagneticCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    document.documentElement.classList.add("has-magnetic-cursor");

    const position = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const target = { ...position };
    let hovering = false;
    let frame = 0;
    let running = true;

    const render = () => {
      if (!running) return;
      frame = window.requestAnimationFrame(render);
      position.x += (target.x - position.x) * 0.18;
      position.y += (target.y - position.y) * 0.18;
      cursor.style.transform = `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%)`;
      cursor.dataset.hover = hovering ? "true" : "false";
    };

    const onMove = (event: PointerEvent) => {
      target.x = event.clientX;
      target.y = event.clientY;
      const hit = (event.target as HTMLElement | null)?.closest(
        "a, button, [data-magnetic]",
      );
      hovering = Boolean(hit);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    render();

    return () => {
      running = false;
      window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.classList.remove("has-magnetic-cursor");
    };
  }, []);

  return (
    <div ref={cursorRef} className="magnetic-cursor" aria-hidden>
      <span />
    </div>
  );
}
