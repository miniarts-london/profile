"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  tone: number;
};

export function FieldCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return;

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return;

    let frame = 0;
    let width = 0;
    let height = 0;
    let running = true;
    const mouse = { x: 0.62, y: 0.42, active: false };
    const particles: Particle[] = [];

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const seed = () => {
      particles.length = 0;
      const count = Math.round(Math.min(140, (width * height) / 14000));
      for (let i = 0; i < count; i += 1) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          r: Math.random() * 1.8 + 0.6,
          tone: Math.random(),
        });
      }
    };

    const onPointer = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect();
      mouse.x = (event.clientX - bounds.left) / bounds.width;
      mouse.y = (event.clientY - bounds.top) / bounds.height;
      mouse.active = true;
    };

    const draw = () => {
      if (!running) return;
      frame = window.requestAnimationFrame(draw);
      context.clearRect(0, 0, width, height);

      const mx = mouse.x * width;
      const my = mouse.y * height;

      for (const particle of particles) {
        const dx = mx - particle.x;
        const dy = my - particle.y;
        const dist = Math.hypot(dx, dy) + 40;
        const force = mouse.active ? 28 / dist : 8 / dist;
        particle.vx += (dx / dist) * force * 0.02;
        particle.vy += (dy / dist) * force * 0.02;
        particle.vx += Math.sin((particle.y + particle.x) * 0.004) * 0.02;
        particle.vy += Math.cos(particle.x * 0.003) * 0.018;
        particle.vx *= 0.96;
        particle.vy *= 0.96;
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < -20) particle.x = width + 20;
        if (particle.x > width + 20) particle.x = -20;
        if (particle.y < -20) particle.y = height + 20;
        if (particle.y > height + 20) particle.y = -20;

        const color =
          particle.tone > 0.66
            ? "168, 88, 132"
            : particle.tone > 0.33
              ? "196, 176, 188"
              : "150, 148, 158";
        context.beginPath();
        context.fillStyle = `rgba(${color}, ${0.18 + particle.r * 0.12})`;
        context.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2);
        context.fill();
      }

      context.strokeStyle = "rgba(240, 238, 241, 0.08)";
      context.lineWidth = 1;
      for (let i = 0; i < particles.length; i += 1) {
        for (let j = i + 1; j < particles.length; j += 1) {
          const a = particles[i];
          const b = particles[j];
          const gap = Math.hypot(a.x - b.x, a.y - b.y);
          if (gap < 90) {
            context.globalAlpha = (1 - gap / 90) * 0.45;
            context.beginPath();
            context.moveTo(a.x, a.y);
            context.lineTo(b.x, b.y);
            context.stroke();
          }
        }
      }
      context.globalAlpha = 1;
    };

    resize();
    seed();
    draw();

    const observer = new ResizeObserver(() => {
      resize();
      seed();
    });
    observer.observe(canvas);
    window.addEventListener("pointermove", onPointer, { passive: true });

    return () => {
      running = false;
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("pointermove", onPointer);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="field-canvas pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden
    />
  );
}
