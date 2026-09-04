import { useEffect, useState } from "react";
import { GUESTS } from "../data";
import { ArrowIcon, PawIcon, Reveal, useReducedMotion } from "./decor";
import { SectionHead } from "./Sections";

export default function Carousel3D() {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();
  const n = GUESTS.length;
  const angle = 360 / n;

  useEffect(() => {
    if (reduced || paused) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % n), 3800);
    return () => clearInterval(t);
  }, [reduced, paused, n]);

  const go = (d: number) => setIdx((i) => (i + d + n) % n);

  return (
    <section id="guests" className="relative bg-pine-deep text-cream py-20 lg:py-28 overflow-hidden">
      {/* giant outlined word */}
      <p
        aria-hidden
        className="font-display font-extrabold uppercase absolute top-6 left-1/2 -translate-x-1/2 text-[clamp(3rem,11vw,9rem)] whitespace-nowrap text-stroke-paper pointer-events-none select-none leading-none"
      >
        постояльцы
      </p>

      <div className="relative max-w-7xl mx-auto px-5 lg:px-8 pt-16 lg:pt-24">
        <div className="text-center max-w-2xl mx-auto">
          <SectionHead
            dark
            center
            kicker="знакомьтесь"
            title={
              <>
                Наши <span className="text-tangerine">звёздные</span> постояльцы
              </>
            }
            text="Кольцо славы крутится само — листайте стрелками, если хотите рассмотреть каждого. У всех есть любимая лежанка и мнение о корме."
          />
        </div>

        <div
          className="relative mt-6 h-[430px] sm:h-[470px] persp"
          style={{ perspective: "1500px" }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div
            className="carousel-3d absolute left-1/2 top-1/2"
            style={{ transform: `translate(-50%, -50%) translateZ(var(--ring-z)) rotateY(${-idx * angle}deg)` }}
          >
            {GUESTS.map((g, i) => {
              const isFront = i === ((idx % n) + n) % n;
              return (
                <div
                  key={g.name}
                  className="carousel-card absolute w-[230px] sm:w-[270px]"
                  style={{ transform: `translate(-50%, -50%) rotateY(${i * angle}deg) translateZ(var(--ring-r))` }}
                >
                  <div
                    className={`rounded-3xl overflow-hidden border-4 shadow-lift transition-all duration-500 ${
                      isFront ? "border-sunny scale-[1.06] bg-cream" : "border-cream/60 bg-cream/95"
                    }`}
                  >
                    <div className="relative h-56 sm:h-64 overflow-hidden">
                      <img src={g.photo} alt={g.name} className="w-full h-full object-cover" draggable={false} />
                      <span className="absolute top-3 right-3 bg-pine-deep/85 text-sunny text-[11px] font-bold px-2.5 py-1.5 rounded-full backdrop-blur-sm">
                        {g.stays} заездов
                      </span>
                      {isFront && (
                        <span className="absolute top-3 left-3 bg-tangerine text-cream text-[11px] font-display font-bold uppercase px-2.5 py-1.5 rounded-full anim-pop">
                          сейчас в отеле
                        </span>
                      )}
                    </div>
                    <div className="p-5 text-pine-deep">
                      <p className="font-display font-extrabold text-xl leading-none">{g.name}</p>
                      <p className="text-sm text-pine/70 font-medium mt-1">{g.kind}</p>
                      <p className="mt-3 text-sm italic text-pine/85 leading-snug">«{g.quote}»</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* controls */}
        <div className="flex items-center justify-center gap-6 mt-4">
          <button
            onClick={() => go(-1)}
            aria-label="Предыдущий гость"
            className="w-13 h-13 sm:w-14 sm:h-14 rounded-full border-2 border-cream/25 hover:border-sunny hover:text-sunny text-cream flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 p-4"
          >
            <ArrowIcon className="w-6 h-6 rotate-180" />
          </button>
          <div className="flex items-center gap-2.5">
            {GUESTS.map((g, i) => (
              <button
                key={g.name}
                onClick={() => setIdx(i)}
                aria-label={`Показать: ${g.name}`}
                className={`rounded-full transition-all duration-400 ${
                  i === idx ? "w-8 h-3 bg-tangerine" : "w-3 h-3 bg-cream/30 hover:bg-cream/60"
                }`}
              />
            ))}
          </div>
          <button
            onClick={() => go(1)}
            aria-label="Следующий гость"
            className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-tangerine hover:bg-tangerine-dark text-cream flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 shadow-card p-4"
          >
            <ArrowIcon className="w-6 h-6" />
          </button>
        </div>

        <Reveal delay={0.15}>
          <p className="text-center text-cream/50 text-sm font-medium mt-8 flex items-center justify-center gap-2">
            <PawIcon className="w-4 h-4 text-tangerine" />
            сейчас на карусели — {GUESTS[idx].name}, {GUESTS[idx].kind}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
