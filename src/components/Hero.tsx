import React, { useEffect, useRef, useState } from "react";
import { IMG } from "../data";
import { FloatingPaws, PawIcon, RotatingBadge, StarIcon, useReducedMotion } from "./decor";

const WORDS = ["собак", "кошек", "кроликов", "попугаев"];

export default function Hero() {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();
  const [word, setWord] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [guests, setGuests] = useState(47);

  useEffect(() => {
    if (reduced) return;
    const t = setInterval(() => setWord((w) => (w + 1) % WORDS.length), 2300);
    return () => clearInterval(t);
  }, [reduced]);

  useEffect(() => {
    if (reduced) return;
    const t = setInterval(() => setGuests((g) => Math.max(38, Math.min(56, g + (Math.random() > 0.5 ? 1 : -1)))), 5000);
    return () => clearInterval(t);
  }, [reduced]);

  const onMove = (e: React.MouseEvent) => {
    const el = stageRef.current;
    if (!el || reduced) return;
    const r = el.getBoundingClientRect();
    setTilt({
      x: ((e.clientX - r.left) / r.width - 0.5) * 16,
      y: ((e.clientY - r.top) / r.height - 0.5) * -14,
    });
  };

  return (
    <section
      id="top"
      className="relative bg-pine-deep text-cream overflow-hidden"
      style={{
        backgroundImage: "radial-gradient(rgba(253,244,224,0.07) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }}
    >
      <FloatingPaws color="text-teal-light" count={8} />

      {/* giant outlined paw watermark */}
      <div className="absolute -bottom-16 -left-16 w-[420px] h-[420px] text-cream opacity-[0.045] rotate-[-18deg] pointer-events-none" aria-hidden>
        <PawIcon className="w-full h-full" />
      </div>
      {/* rotating dashed ring */}
      <div className="absolute -top-24 right-[38%] w-72 h-72 rounded-full border-2 border-dashed border-cream/15 anim-spin-slow pointer-events-none" aria-hidden style={{ animationDuration: "40s" }} />

      <div className="relative max-w-7xl mx-auto px-5 lg:px-8 pt-32 lg:pt-40 pb-16 lg:pb-24 grid lg:grid-cols-[1.02fr_0.98fr] gap-14 lg:gap-8 items-center">
        {/* ---- left: words ---- */}
        <div>
          <div className="flex flex-wrap items-center gap-3 mb-7">
            <span className="flex items-center gap-2 bg-cream/10 border border-cream/15 rounded-full px-4 py-2 text-sm font-semibold backdrop-blur-sm">
              <span className="flex text-sunny">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="w-4 h-4" />
                ))}
              </span>
              4.9 · 1 200+ отзывов
            </span>
            <span className="flex items-center gap-2 bg-teal/40 border border-teal-light/30 text-teal-light rounded-full px-4 py-2 text-sm font-semibold">
              <span className="relative flex w-2.5 h-2.5">
                <span className="absolute inline-flex w-full h-full rounded-full bg-teal-light opacity-70 animate-ping" />
                <span className="relative inline-flex w-2.5 h-2.5 rounded-full bg-teal-light" />
              </span>
              сейчас в отеле {guests} хвостов
              <PawIcon className="w-4 h-4" />
            </span>
          </div>

          <h1 className="font-display font-extrabold uppercase leading-[1.04] text-[clamp(1.9rem,5.2vw,4.3rem)] tracking-tight">
            <span className="mask-line" style={{ ["--mask-delay" as any]: "0.05s" }}>
              <span>Отпуск — вам.</span>
            </span>
            <span className="mask-line text-sunny" style={{ ["--mask-delay" as any]: "0.18s" }}>
              <span>Санаторий —</span>
            </span>
            <span className="mask-line" style={{ ["--mask-delay" as any]: "0.31s" }}>
              <span className="flex items-center gap-3 flex-wrap">
                для&nbsp;
                <span className="inline-flex items-center gap-2 bg-tangerine text-cream px-4 py-1 rounded-2xl rotate-[-2deg] shadow-card">
                  <span key={word} className="word-swap lowercase">
                    {WORDS[word]}
                  </span>
                  <PawIcon className="w-[0.9em] h-[0.9em] -rotate-12" />
                </span>
              </span>
            </span>
          </h1>

          <p className="mt-7 max-w-xl text-lg text-cream/75 leading-relaxed">
            Гостиница <b className="text-cream">«МУР&amp;ГАВ»</b> — это 68 номеров с климат-контролем,
            ресторан «Миска», SPA с пузырьками и видеоканал, по которому вы будете подглядывать
            за своим хвостатым из любой точки мира.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#booking"
              className="group bg-tangerine hover:bg-tangerine-dark text-cream font-display font-bold px-8 py-4 rounded-full text-base transition-all duration-300 hover:-translate-y-1 shadow-lift flex items-center gap-3"
            >
              Забронировать номер
              <PawIcon className="w-5 h-5 group-hover:rotate-[25deg] transition-transform duration-300" />
            </a>
            <a
              href="#rooms"
              className="border-2 border-cream/25 hover:border-sunny hover:text-sunny text-cream font-display font-semibold px-7 py-[14px] rounded-full transition-all duration-300 hover:-translate-y-1"
            >
              Смотреть номера
            </a>
          </div>

          <div className="mt-12 flex flex-wrap gap-x-10 gap-y-5">
            {[
              ["12 лет", "заботы о хвостах"],
              ["24/7", "ветеринар в здании"],
              ["3 р/день", "фотоотчёты вам"],
            ].map(([n, t]) => (
              <div key={n} className="flex items-baseline gap-3">
                <span className="font-display font-bold text-2xl text-sunny">{n}</span>
                <span className="text-sm text-cream/60 max-w-[120px] leading-tight">{t}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ---- right: 3D photo stage ---- */}
        <div className="persp select-none" onMouseMove={onMove} onMouseLeave={() => setTilt({ x: 0, y: 0 })}>
          <div
            ref={stageRef}
            className="relative h-[440px] sm:h-[540px] lg:h-[620px] transition-transform duration-200 ease-out will-change-transform"
            style={{
              transform: `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
              transformStyle: "preserve-3d",
            }}
          >
            {/* sunny blob behind */}
            <div className="tilt-child absolute right-[6%] top-[4%] w-56 h-56 rounded-full bg-tangerine/25 blur-none" style={{ ["--tz" as any]: "-90px" }} aria-hidden />
            <div className="tilt-child absolute left-[2%] bottom-[10%] w-40 h-40 rounded-full border-[10px] border-sunny/30" style={{ ["--tz" as any]: "-60px" }} aria-hidden />

            {/* back photo card */}
            <div
              className="tilt-child absolute left-0 top-6 w-[58%] rounded-3xl overflow-hidden border-[6px] border-cream shadow-lift rotate-[-7deg]"
              style={{ ["--tz" as any]: "-70px" }}
            >
              <img src={IMG.catSuite} alt="Кошка в люксе" className="w-full h-64 sm:h-80 object-cover anim-kenburns" />
              <div className="absolute bottom-0 inset-x-0 bg-pine-deep/80 backdrop-blur-sm text-cream text-xs font-semibold px-4 py-2.5 flex justify-between">
                <span>Клеопатра · люкс</span>
                <span className="text-sunny">★ 5.0</span>
              </div>
            </div>

            {/* main photo card */}
            <div
              className="tilt-child absolute right-0 top-0 bottom-0 w-[64%] rounded-[2rem] overflow-hidden border-8 border-cream shadow-lift rotate-[3deg]"
              style={{ ["--tz" as any]: "60px" }}
            >
              <img src={IMG.heroDog} alt="Пёс Барни на ресепшене отеля" className="w-full h-full object-cover" />
              <div className="absolute bottom-0 inset-x-0 bg-cream/95 text-pine-deep px-5 py-3.5">
                <p className="font-display font-bold text-sm">Барни — chief happiness officer</p>
                <p className="text-xs text-pine/70 font-medium">встречает гостей у ресепшена с 2012 года</p>
              </div>
            </div>

            {/* price sticker */}
            <div
              className="tilt-child absolute -left-2 sm:left-2 top-[46%] bg-sunny text-pine-deep rounded-2xl px-5 py-3 rotate-[-8deg] shadow-card anim-floaty"
              style={{ ["--tz" as any]: "130px", animationDuration: "5s" }}
            >
              <p className="text-[11px] font-bold uppercase tracking-wider opacity-70">номер от</p>
              <p className="font-display font-extrabold text-2xl leading-none">990 ₽<span className="text-sm">/ночь</span></p>
            </div>

            {/* rotating badge */}
            <div className="tilt-child absolute -right-3 sm:right-0 -top-4 text-cream" style={{ ["--tz" as any]: "110px" }}>
              <div className="bg-teal rounded-full p-1.5 shadow-card">
                <div className="bg-pine-deep rounded-full p-4">
                  <RotatingBadge className="w-28 h-28 sm:w-32 sm:h-32 text-sunny" />
                </div>
              </div>
            </div>

            {/* floating bone + paws on Z layers */}
            <div className="tilt-child absolute left-[30%] -bottom-3 text-blush anim-floaty" style={{ ["--tz" as any]: "90px", animationDelay: "0.8s" }}>
              <PawIcon className="w-10 h-10 rotate-12" />
            </div>
          </div>
        </div>
      </div>

      {/* scroll hint */}
      <div className="relative max-w-7xl mx-auto px-5 lg:px-8 pb-8 flex items-center gap-3 text-cream/50 text-sm font-medium">
        <span className="w-10 h-[2px] bg-cream/25 rounded-full" />
        листайте — там мячики и SPA
        <span className="anim-bob inline-block">↓</span>
      </div>
    </section>
  );
}
