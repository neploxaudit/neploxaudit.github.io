"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";
import Images from "@/app/components/Images";
import ScrollDown from "@/app/components/ScrollDown";

export default function Custom404() {
  const canvasRef = useRef(null);
  const beetlesRef = useRef([]);
  const MAX_BEETLES = 32;
  const draggingRef = useRef(null);
  const offsetRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    function resize() {
      const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    // function resize() {
    //   const parent = canvas.parentElement;
    //   const rect = parent.getBoundingClientRect();
    //   parentWidth = rect.width;
    //   parentHeight = rect.height;

    //   const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    //   canvas.width = Math.floor(rect.width * dpr);
    //   canvas.height = Math.floor(rect.height * dpr);
    //   canvas.style.width = rect.width + "px";
    //   canvas.style.height = rect.height + "px";
    //   ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    // }

    window.addEventListener("resize", resize, { passive: true });
    resize();

    const rand = (a, b) => a + Math.random() * (b - a);
    const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
    const TAU = Math.PI * 2;

    function wobbler(t, s1, s2) {
      return (
        Math.sin(t * s1.freq + s1.phase) * s1.amp +
        Math.sin(t * s2.freq + s2.phase) * s2.amp
      );
    }

    class Beetle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = rand(30, 50);
        this.scale = rand(0.9, 1.15);
        this.speed = rand(20, 50);
        this.angle = rand(0, TAU);
        this.turnMax = rand(0.7, 1.1);
        this.s1 = {
          freq: rand(0.25, 0.55),
          amp: rand(0.25, 0.5),
          phase: rand(0, TAU),
        };
        this.s2 = {
          freq: rand(0.09, 0.22),
          amp: rand(0.15, 0.35),
          phase: rand(0, TAU),
        };
        this.legPhase = rand(0, TAU);
        this.dragged = false;
      }

      update(dt, t) {
        if (this.dragged) return;
        const turn = wobbler(t, this.s1, this.s2) * this.turnMax;
        this.angle += turn * dt;
        const crawl =
          this.speed * (0.9 + 0.1 * Math.sin(t * 1.6 + this.legPhase));
        this.x += Math.cos(this.angle) * crawl * dt;
        this.y += Math.sin(this.angle) * crawl * dt;

        const margin = 40;
        let steer = 0;
        if (this.x < margin) steer += 0.8;
        if (this.x > window.innerWidth - margin) steer -= 0.8;
        if (this.y < margin) steer += 0.4;
        if (this.y > window.innerHeight - margin) steer -= 0.4;
        this.angle += steer * dt;

        this.x = clamp(this.x, -5, window.innerWidth + 5);
        this.y = clamp(this.y, -5, window.innerHeight + 5);
      }

      draw(ctx, t) {
        const x = this.x,
          y = this.y,
          s = this.size * this.scale;

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(this.angle);

        // hind legs
        const legWiggle = Math.sin(t * 4 + this.legPhase) * 7;
        ctx.lineWidth = 1.5;
        ctx.lineCap = "round";
        ctx.strokeStyle = "oklch(29% 0.009 320)";
        for (let i = -1; i <= 1; i += 2) {
          for (let j = -3; j <= 3; j += 3) {
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.quadraticCurveTo(
              s * -0.1 * -j - j * 2.5,
              s * i * (0.32 + j * 0.1),
              s * -0.1 * -j + j * 2.5,
              s * i * (0.6 + legWiggle * 0.02)
            );
            ctx.stroke();
          }
        }

        // antennas
        ctx.strokeStyle = "oklch(29% 0.009 320)";
        ctx.lineWidth = 1.5;
        for (let i = -1; i <= 1; i += 2) {
          ctx.beginPath();
          ctx.moveTo(s * 0.6, -s * 0.03 * i);
          ctx.quadraticCurveTo(
            s * 0.35,
            -s * 0.15 * i,
            s * 0.9,
            -s * 0.32 * i + legWiggle * 0.5
          );
          ctx.stroke();
        }

        // body color
        ctx.fillStyle = "oklch(65.5% 0.1995 41.5)";
        ctx.strokeStyle = "oklch(29% 0.009 320)";
        ctx.lineWidth = 1.5;
        roundedEllipse(ctx, 0, 0, s * 1.3, s * 1.1);
        ctx.fill();
        ctx.stroke();

        // head color
        ctx.fillStyle = "oklch(29% 0.009 320)";
        roundedEllipse(ctx, s * 0.35, 0, s * 0.6, s * 0.9);
        ctx.fill();

        // spine
        ctx.beginPath();
        ctx.moveTo(-s * 0.65, 0);
        ctx.quadraticCurveTo(0, 0, 2, s * 0);
        ctx.strokeStyle = "oklch(29% 0.009 320)";
        ctx.stroke();

        // spine spots
        for (let i = -1; i <= 1; i += 2) {
          ctx.fillStyle = "oklch(29% 0.009 320)";
          roundedEllipse(ctx, s * 0, s * 0.25 * i, s * 0.16, s * 0.16);
          ctx.fill();
          roundedEllipse(ctx, -s * 0.2, s * 0.35 * i, s * 0.25, s * 0.25);
          ctx.fill();
          roundedEllipse(ctx, -s * 0.4, s * 0.2 * i, s * 0.16, s * 0.16);
          ctx.fill();
        }

        // eyes
        for (let j = -1; j <= 1; j += 2) {
          const blink = Math.max(
            0.05,
            0.9 + 0.1 * Math.sin(t * 2 + this.legPhase + j)
          );
          for (let i = -1; i <= 1; i += 2) {
            ctx.beginPath();
            ctx.fillStyle = "white";
            ctx.arc(s * 0.45, i * s * 0.2, s * 0.14, 0, TAU);
            ctx.fill();
            ctx.beginPath();
            ctx.fillStyle = "oklch(29% 0.009 320)";
            roundedEllipse(
              ctx,
              s * 0.45,
              i * s * 0.2,
              s * 0.25 * blink,
              s * 0.25
            );
            ctx.fill();
          }
        }

        ctx.restore();
      }

      containsPoint(px, py) {
        const s = this.size * this.scale;
        const dx = px - this.x;
        const dy = py - this.y;
        return dx * dx + dy * dy <= (s * 0.8) * (s * 0.8);
      }
    }

    function roundedEllipse(ctx, x, y, w, h) {
      const k = 0.5522847498307936;
      const rx = w * 0.5,
        ry = h * 0.5;
      ctx.beginPath();
      ctx.moveTo(x - rx, y);
      ctx.bezierCurveTo(x - rx, y - k * ry, x - k * rx, y - ry, x, y - ry);
      ctx.bezierCurveTo(x + k * rx, y - ry, x + rx, y - k * ry, x + rx, y);
      ctx.bezierCurveTo(x + rx, y + k * ry, x + k * rx, y + ry, x, y + ry);
      ctx.bezierCurveTo(x - k * rx, y + ry, x - rx, y + k * ry, x - rx, y);
    }

    function spawn(
      x = rand(40, window.innerWidth - 40),
      y = rand(40, window.innerHeight - 40)
    ) {
      if (beetlesRef.current.length < MAX_BEETLES) {
        beetlesRef.current.push(new Beetle(x, y));
      }
    }

    for (let i = 0; i < 10; i++) spawn();

    // shared handlers for mouse/touch
    function startDrag(mx, my) {
      for (let b of beetlesRef.current) {
        if (b.containsPoint(mx, my)) {
          draggingRef.current = b;
          b.dragged = true;
          offsetRef.current = { x: mx - b.x, y: my - b.y };
          break;
        }
      }
    }
    function moveDrag(mx, my) {
      if (draggingRef.current) {
        draggingRef.current.x = mx - offsetRef.current.x;
        draggingRef.current.y = my - offsetRef.current.y;
        draggingRef.current.scale = 1.16;
      }
    }
    function endDrag() {
      if (draggingRef.current) {
        draggingRef.current.dragged = false;
        draggingRef.current.scale = 1;
        draggingRef.current = null;
      }
    }

    // Mouse events
    function onMouseDown(e) {
      const rect = canvas.getBoundingClientRect();
      startDrag(e.clientX - rect.left, e.clientY - rect.top);
    }
    function onMouseMove(e) {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;

      moveDrag(mx, my);

      // Hover detection
      if (!draggingRef.current) {
        let hovering = false;
        for (let b of beetlesRef.current) {
          if (b.containsPoint(mx, my)) {
            hovering = true;
            break;
          }
        }
        canvas.style.cursor = hovering ? "pointer" : "default";
      }
    }
    function onMouseUp() {
      endDrag();
      canvas.style.cursor = "default";
    }

    // Touch events
    function onTouchStart(e) {
      const rect = canvas.getBoundingClientRect();
      const t = e.touches[0];
      startDrag(t.clientX - rect.left, t.clientY - rect.top);
    }
    function onTouchMove(e) {
      const rect = canvas.getBoundingClientRect();
      const t = e.touches[0];
      moveDrag(t.clientX - rect.left, t.clientY - rect.top);
    }
    function onTouchEnd() {
      endDrag();
    }

    canvas.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    canvas.addEventListener("touchstart", onTouchStart, { passive: false });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd);

    let last = performance.now();
    function tick(now) {
      const t = now / 1000;
      const dt = Math.min(0.033, (now - last) / 1000);
      last = now;

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      for (const b of beetlesRef.current) {
        b.update(dt, t);
        b.draw(ctx, t);
      }

      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);

      canvas.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, []);


  return (
    <>
      <header className="header-grid default-header sticky top-0 z-200 page-margin mb-8 flex-none py-4 before:absolute before:inset-0 before:-z-10 before:-mx-[4vw] before:bg-surface before:shadow-[0_7px_6px_-6px_rgba(0,0,0,0.25)] md:static md:mb-12 md:border-b md:border-stone-500 md:py-6 md:before:hidden lg:mb-16 lg:py-8 dark:md:border-raisin-600">
        {/* Branding sm */}
        <Link href="/" className="justify-self-start md:hidden">
          {/* Same width as "go to bottom" button */}
          <Images.Logo className="h-auto w-12 scale-125" />
        </Link>
        {/* Branding md+ */}
        <Link
          href="/"
          className="hidden flex-row gap-x-8 pl-4 md:flex lg:pl-12"
        >
          <Images.Logo className="h-8 w-auto scale-150 lg:h-12" />
          <h1 className="font-horizon text-4xl leading-none text-theme lg:text-5xl">
            NEPLOX
          </h1>
        </Link>

        <div className="sm:hidden">
          <nav className="mx-auto flex h-full max-w-lg justify-center gap-x-4">
            <Nav.Element
              key="home"
              href=""
              path="home"
              blocked={false}
              className="default-nav"
            />
          </nav>
        </div>
        {/* Nav sm+ */}
        <div className="hidden sm:block">
          <nav className="mx-auto flex h-full max-w-lg justify-between gap-x-4">
            {Nav.paths.map(({ path, href, blocked }) => (
              <Nav.Element
                key={path}
                href={href}
                path={path}
                blocked={blocked}
                className="default-nav"
                selected=""
              />
            ))}
          </nav>
        </div>

        <ScrollDown path="404" className="w-12 justify-self-end sm:hidden" />
      </header>

      <main className="text-center align-middle page-margin flex-auto w-screen mr-auto ml-0">
        <div className="m-auto pointer-events-none">
          <h1 className="lg:text-8xl md:text-7xl text-6xl text-theme font-horizon-outlined" style={{ WebkitTextStrokeWidth: "0.01em" }}>error <span className="font-horizon">404</span></h1>
        </div>
        <div className="m-auto md:text-xl text-lg my-10 mb-10">
          <div className="py-10 m-auto w-fit">
            <p className="font-theme-serif text-justify italic">The page you seek has gone away,<br/>
            But <b className="text-highlight">&thinsp;bugs&thinsp;</b> we find, both night and day.<br/>
            Would you like us to lend a hand,<br/>
            And guard your product as we planned?</p>
          </div>
          <Link href="/#contact-us">
            <button
              className="absolute -ml-25 z-200 rounded-3xl rounded-tl-none border-2 border-theme bg-surface py-3 font-theme-sans font-medium text-theme transition duration-300 hover:cursor-pointer hover:bg-theme hover:text-surface w-56 text-lg"
            >
              <span className="align-middle">&ensp;GET IN TOUCH</span>
            </button>
          </Link>
        </div>
        <canvas ref={canvasRef} className="bg-transparent absolute top-0 left-0 w-screen h-screen z-100 overflow-hidden" />
      </main>

      <Footer className="page-margin flex-none z-200" />
    </>
  );
}