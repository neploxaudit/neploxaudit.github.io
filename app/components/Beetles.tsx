"use client";

import { useEffect, useRef } from "react";

const TAU = Math.PI * 2;
const AREA_PER_BEETLE = 120000;
const MIN_BEETLES = 5;
const MAX_BEETLES = 14;
const EDGE_MARGIN = 48;
const GRAB_RADIUS = 0.8;

type Wobble = {
  frequency: number;
  amplitude: number;
  phase: number;
};

type Palette = {
  shell: string;
  detail: string;
  highlight: string;
};

const random = (min: number, max: number) => min + Math.random() * (max - min);

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

function wobbleOf(
  frequency: [number, number],
  amplitude: [number, number],
): Wobble {
  return {
    frequency: random(...frequency),
    amplitude: random(...amplitude),
    phase: random(0, TAU),
  };
}

class Beetle {
  x: number;
  y: number;
  size = random(20, 34);
  scale = 1;
  speed = random(18, 44);
  angle = random(0, TAU);
  turn = random(0.7, 1.1);
  slow = wobbleOf([0.09, 0.22], [0.15, 0.35]);
  fast = wobbleOf([0.25, 0.55], [0.25, 0.5]);
  legPhase = random(0, TAU);
  held = false;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  get radius() {
    return this.size * this.scale;
  }

  crawl(delta: number, time: number, width: number, height: number) {
    if (this.held) {
      return;
    }

    const { slow, fast } = this;
    this.angle +=
      (Math.sin(time * fast.frequency + fast.phase) * fast.amplitude +
        Math.sin(time * slow.frequency + slow.phase) * slow.amplitude) *
      this.turn *
      delta;

    const pace =
      this.speed * (0.9 + 0.1 * Math.sin(time * 1.6 + this.legPhase));
    this.x += Math.cos(this.angle) * pace * delta;
    this.y += Math.sin(this.angle) * pace * delta;

    let steer = 0;
    if (this.x < EDGE_MARGIN) steer += 0.8;
    if (this.x > width - EDGE_MARGIN) steer -= 0.8;
    if (this.y < EDGE_MARGIN) steer += 0.4;
    if (this.y > height - EDGE_MARGIN) steer -= 0.4;
    this.angle += steer * delta;

    this.x = clamp(this.x, this.radius, width - this.radius);
    this.y = clamp(this.y, this.radius, height - this.radius);
  }

  covers(x: number, y: number) {
    const reach = this.radius * GRAB_RADIUS;
    return (x - this.x) ** 2 + (y - this.y) ** 2 <= reach ** 2;
  }
}

function ellipse(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
) {
  ctx.beginPath();
  ctx.ellipse(x, y, width / 2, height / 2, 0, 0, TAU);
}

function drawBeetle(
  ctx: CanvasRenderingContext2D,
  beetle: Beetle,
  time: number,
  palette: Palette,
) {
  const s = beetle.radius;
  const wiggle = Math.sin(time * 4 + beetle.legPhase) * 7;

  ctx.save();
  ctx.translate(beetle.x, beetle.y);
  ctx.rotate(beetle.angle);

  ctx.lineWidth = 1.5;
  ctx.lineCap = "round";
  ctx.strokeStyle = palette.detail;

  for (let side = -1; side <= 1; side += 2) {
    for (let leg = -3; leg <= 3; leg += 3) {
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(
        s * 0.1 * leg - leg * 2.5,
        s * side * (0.32 + leg * 0.1),
        s * 0.1 * leg + leg * 2.5,
        s * side * (0.6 + wiggle * 0.02),
      );
      ctx.stroke();
    }

    ctx.beginPath();
    ctx.moveTo(s * 0.6, -s * 0.03 * side);
    ctx.quadraticCurveTo(
      s * 0.35,
      -s * 0.15 * side,
      s * 0.9,
      -s * 0.32 * side + wiggle * 0.5,
    );
    ctx.stroke();
  }

  ctx.fillStyle = palette.shell;
  ellipse(ctx, 0, 0, s * 1.3, s * 1.1);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = palette.detail;
  ellipse(ctx, s * 0.35, 0, s * 0.6, s * 0.9);
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(-s * 0.65, 0);
  ctx.lineTo(s * 0.1, 0);
  ctx.stroke();

  for (let side = -1; side <= 1; side += 2) {
    ellipse(ctx, 0, s * 0.25 * side, s * 0.16, s * 0.16);
    ctx.fill();
    ellipse(ctx, -s * 0.2, s * 0.35 * side, s * 0.25, s * 0.25);
    ctx.fill();
    ellipse(ctx, -s * 0.4, s * 0.2 * side, s * 0.16, s * 0.16);
    ctx.fill();

    ctx.fillStyle = palette.highlight;
    ellipse(ctx, s * 0.45, side * s * 0.2, s * 0.28, s * 0.28);
    ctx.fill();
    ctx.fillStyle = palette.detail;
    ellipse(ctx, s * 0.45, side * s * 0.2, s * 0.16, s * 0.16);
    ctx.fill();
  }

  ctx.restore();
}

export default function Beetles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) {
      return;
    }

    const readPalette = (): Palette => {
      const styles = getComputedStyle(document.documentElement);
      return {
        shell: styles.getPropertyValue("--theme").trim(),
        detail: styles.getPropertyValue("--element").trim(),
        highlight: styles.getPropertyValue("--surface").trim(),
      };
    };

    const scheme = window.matchMedia("(prefers-color-scheme: dark)");
    const still = window.matchMedia("(prefers-reduced-motion: reduce)");
    let palette = readPalette();
    const beetles: Beetle[] = [];
    let width = 0;
    let height = 0;
    let held: Beetle | null = null;
    let grab = { x: 0, y: 0 };
    let dragged = false;
    let cursor = "";
    let frame = 0;
    let last = performance.now();

    const setCursor = (value: string) => {
      if (cursor !== value) {
        cursor = value;
        document.body.style.cursor = value;
      }
    };

    const resize = () => {
      const ratio = Math.min(2, window.devicePixelRatio || 1);
      const bounds = canvas.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

      const wanted = Math.min(
        MAX_BEETLES,
        Math.max(MIN_BEETLES, Math.round((width * height) / AREA_PER_BEETLE)),
      );
      while (beetles.length < wanted) {
        beetles.push(
          new Beetle(
            random(EDGE_MARGIN, width - EDGE_MARGIN),
            random(EDGE_MARGIN, height - EDGE_MARGIN),
          ),
        );
      }

      start();
    };

    const draw = (now: number) => {
      const time = now / 1000;
      const delta = Math.min(0.033, (now - last) / 1000);
      last = now;

      ctx.clearRect(0, 0, width, height);
      for (const beetle of beetles) {
        if (!still.matches) {
          beetle.crawl(delta, time, width, height);
        }
        drawBeetle(ctx, beetle, still.matches ? 0 : time, palette);
      }

      frame = still.matches && !held ? 0 : requestAnimationFrame(draw);
    };

    const start = () => {
      if (!frame) {
        last = performance.now();
        frame = requestAnimationFrame(draw);
      }
    };

    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };

    const pointAt = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect();
      return { x: event.clientX - bounds.left, y: event.clientY - bounds.top };
    };

    const onPointerDown = (event: PointerEvent) => {
      if (
        event.button !== 0 ||
        (event.target as Element).closest("a, button, input, select, textarea")
      ) {
        return;
      }

      const point = pointAt(event);
      held = beetles.find((beetle) => beetle.covers(point.x, point.y)) ?? null;
      if (!held) {
        return;
      }

      event.preventDefault();
      held.held = true;
      held.scale = 1.15;
      grab = { x: point.x - held.x, y: point.y - held.y };
      dragged = false;
      setCursor("grabbing");
      start();
    };

    const onPointerMove = (event: PointerEvent) => {
      const point = pointAt(event);
      if (!held) {
        setCursor(
          beetles.some((beetle) => beetle.covers(point.x, point.y))
            ? "grab"
            : "",
        );
        return;
      }

      dragged = true;
      held.x = clamp(point.x - grab.x, held.radius, width - held.radius);
      held.y = clamp(point.y - grab.y, held.radius, height - held.radius);
    };

    const onPointerUp = () => {
      if (!held) {
        return;
      }

      held.angle = random(0, TAU);
      held.held = false;
      held.scale = 1;
      held = null;
      setCursor("");
    };

    const onClick = (event: MouseEvent) => {
      if (dragged) {
        dragged = false;
        event.stopPropagation();
        event.preventDefault();
      }
    };

    const onVisibilityChange = () => (document.hidden ? stop() : start());

    const onMediaChange = () => {
      palette = readPalette();
      start();
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);
    window.addEventListener("click", onClick, true);
    document.addEventListener("visibilitychange", onVisibilityChange);
    scheme.addEventListener("change", onMediaChange);
    still.addEventListener("change", onMediaChange);

    return () => {
      stop();
      setCursor("");
      observer.disconnect();
      scheme.removeEventListener("change", onMediaChange);
      still.removeEventListener("change", onMediaChange);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
      window.removeEventListener("click", onClick, true);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 h-full w-full"
    />
  );
}
