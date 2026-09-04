import { GUESTS, ROOMS, SERVICES, STATS, TICKER_ITEMS, fmt } from "../data";
import {
  CheckIcon,
  FloatingPaws,
  PawIcon,
  Reveal,
  SERVICE_ICONS,
  SquiggleUnderline,
  TiltCard,
  useCountUp,
  useInView,
} from "./decor";

/* ================= ticker ================= */

export function Ticker({ className = "" }: { className?: string }) {
  const row = (key: string) => (
    <div key={key} className="flex items-center shrink-0">
      {TICKER_ITEMS.map((t, i) => (
        <span key={i} className="flex items-center">
          <span className="font-display font-bold uppercase text-pine-deep text-lg sm:text-xl px-6 py-4 whitespace-nowrap tracking-tight">
            {t}
          </span>
          <PawIcon className="w-5 h-5 text-pine-deep/70 -rotate-12" />
        </span>
      ))}
    </div>
  );
  return (
    <div className={`relative bg-sunny border-y-4 border-pine-deep overflow-hidden marquee-hover ${className}`}>
      <div className="marquee-track" style={{ ["--marquee-dur" as any]: "32s" }}>
        {row("a")}
        {row("b")}
      </div>
    </div>
  );
}

/* ================= stats ================= */

function StatCell({ value, suffix, label, i }: { value: number; suffix: string; label: string; i: number }) {
  const { ref, shown } = useInView<HTMLDivElement>(0.4);
  const n = useCountUp(value, shown, 1600 + i * 200);
  return (
    <div ref={ref} className="text-center lg:text-left">
      <p className="font-display font-extrabold text-4xl sm:text-5xl text-sunny leading-none">
        {n.toLocaleString("ru-RU")}
        <span className="text-tangerine">{suffix}</span>
      </p>
      <p className="mt-3 text-cream/70 font-medium text-sm sm:text-base">{label}</p>
    </div>
  );
}

export function Stats() {
  return (
    <section className="relative bg-pine-deep text-cream overflow-hidden">
      <FloatingPaws count={5} color="text-cream" />
      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-16 lg:py-20 grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.1} dir="zoom">
            <StatCell {...s} i={i} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ================= services ================= */

export function SectionHead({
  kicker,
  title,
  text,
  dark = false,
  center = false,
}: {
  kicker: string;
  title: React.ReactNode;
  text?: string;
  dark?: boolean;
  center?: boolean;
}) {
  return (
    <div className={`max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      <Reveal>
        <p className={`inline-flex items-center gap-2 font-display font-semibold text-sm uppercase tracking-[0.2em] ${dark ? "text-sunny" : "text-tangerine"}`}>
          <PawIcon className="w-4 h-4 -rotate-12" /> {kicker}
        </p>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className={`font-display font-extrabold uppercase text-[clamp(1.6rem,3.6vw,2.9rem)] leading-[1.08] mt-4 tracking-tight ${dark ? "text-cream" : "text-pine-deep"}`}>
          {title}
        </h2>
      </Reveal>
      {center && (
        <Reveal delay={0.12}>
          <div className="mt-3 max-w-[220px] mx-auto">
            <SquiggleUnderline className={dark ? "text-tangerine" : "text-tangerine"} />
          </div>
        </Reveal>
      )}
      {text && (
        <Reveal delay={0.16}>
          <p className={`mt-5 text-lg leading-relaxed ${dark ? "text-cream/70" : "text-pine/80"}`}>{text}</p>
        </Reveal>
      )}
    </div>
  );
}

const ICON_BG = ["bg-tangerine", "bg-teal", "bg-sunny", "bg-blush", "bg-pine-soft", "bg-tangerine"];
const ICON_FG = ["text-cream", "text-cream", "text-pine-deep", "text-pine-deep", "text-cream", "text-cream"];

export function Services() {
  return (
    <section id="services" className="relative bg-paper py-20 lg:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-14">
          <SectionHead
            kicker="услуги"
            title={
              <>
                Всё, чтобы хвост <span className="text-tangerine">вилял</span>, а усы — топорщились
              </>
            }
            text="Мы продумали каждый день постояльца: от пятиразового меню до вечерних обнимашек. Хозяину остаётся только скучать — и смотреть трансляцию."
          />
          <Reveal delay={0.2} dir="right" className="shrink-0">
            <a href="#booking" className="group inline-flex items-center gap-3 font-display font-bold text-pine-deep border-2 border-pine-deep/15 hover:border-tangerine hover:text-tangerine rounded-full px-6 py-3.5 transition-all duration-300 hover:-translate-y-1">
              Собрать свой пакет
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </Reveal>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SERVICES.map((s, i) => {
            const Icon = SERVICE_ICONS[s.icon];
            return (
              <Reveal
                key={s.title}
                delay={(i % 4) * 0.08}
                className={s.wide ? "sm:col-span-2" : ""}
              >
                <div
                  className={`group h-full rounded-3xl p-7 border-2 transition-all duration-400 hover:-translate-y-2 hover:shadow-lift overflow-hidden relative ${
                    s.dark
                      ? "bg-pine-deep border-pine-deep text-cream"
                      : "bg-cream border-pine-deep/10 hover:border-tangerine/50"
                  }`}
                >
                  {s.photo && (
                    <div className="absolute right-0 top-0 h-full w-[46%] hidden md:block overflow-hidden rounded-l-3xl">
                      <img src={s.photo} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1" />
                      <div className={`absolute inset-0 bg-gradient-to-r ${s.dark ? "from-pine-deep" : "from-cream"} via-transparent to-transparent`} />
                    </div>
                  )}
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${ICON_BG[i % ICON_BG.length]} ${ICON_FG[i % ICON_FG.length]} rotate-3 group-hover:rotate-12 group-hover:scale-110 transition-all duration-300 shadow-card`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <div className={`relative ${s.wide ? "md:pr-[46%]" : ""}`}>
                    <h3 className={`font-display font-bold text-xl mt-5 ${s.dark ? "text-cream" : "text-pine-deep"}`}>{s.title}</h3>
                    <p className={`mt-3 leading-relaxed ${s.dark ? "text-cream/70" : "text-pine/75"}`}>{s.text}</p>
                    {s.tag && (
                      <span className={`inline-block mt-4 text-xs font-display font-bold uppercase tracking-wider px-3 py-1.5 rounded-full ${s.tag === "хит" ? "bg-tangerine text-cream" : "bg-sunny text-pine-deep"}`}>
                        {s.tag}
                      </span>
                    )}
                  </div>
                </div>
              </Reveal>
            );
          })}

          {/* playful filler card */}
          <Reveal delay={0.16} className="sm:col-span-2 lg:col-span-1">
            <a href="#guests" className="group h-full min-h-[220px] rounded-3xl bg-tangerine text-cream p-7 flex flex-col justify-between border-2 border-tangerine transition-all duration-400 hover:-translate-y-2 hover:bg-tangerine-dark hover:shadow-lift overflow-hidden relative">
              <PawIcon className="absolute -bottom-6 -right-6 w-36 h-36 text-cream/15 rotate-12 group-hover:rotate-45 transition-transform duration-700" />
              <p className="font-display font-extrabold text-2xl uppercase leading-tight">
                {GUESTS.length} звёзд сейчас гостят у нас
              </p>
              <span className="inline-flex items-center gap-2 font-display font-bold text-sm mt-6 group-hover:gap-4 transition-all">
                познакомиться <span>→</span>
              </span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ================= rooms ================= */

export function Rooms() {
  return (
    <section id="rooms" className="relative bg-pine text-cream py-20 lg:py-28 overflow-hidden">
      <FloatingPaws count={6} color="text-cream" />
      <div className="max-w-7xl mx-auto px-5 lg:px-8 relative">
        <SectionHead
          dark
          center
          kicker="номера и тарифы"
          title={
            <>
              От уютной конуры <br className="hidden sm:block" /> до <span className="text-sunny">берлоги мечты</span>
            </>
          }
          text="Во всех номерах: климат-контроль, свежая вода безлимитно, кварцевание воздуха и человек, который честно скажет «кто тут самый красивый»."
        />

        <div className="mt-16 grid md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {ROOMS.map((r, i) => (
            <Reveal key={r.name} delay={i * 0.12} dir="zoom" className="h-full">
              <TiltCard max={7} className={`h-full ${r.featured ? "md:-translate-y-4" : ""}`}>
                <div
                  className={`relative h-full flex flex-col rounded-[1.8rem] overflow-hidden border-2 transition-colors duration-300 ${
                    r.featured ? "bg-cream text-pine-deep border-sunny shadow-lift" : "bg-pine-deep/70 backdrop-blur-sm text-cream border-cream/12 hover:border-teal-light/50"
                  }`}
                >
                  {r.badge && (
                    <span className="absolute top-4 left-1/2 -translate-x-1/2 z-10 bg-tangerine text-cream font-display font-bold text-[11px] uppercase tracking-wider px-4 py-2 rounded-full shadow-card whitespace-nowrap">
                      ★ {r.badge}
                    </span>
                  )}
                  <div className="relative h-48 overflow-hidden">
                    <img src={r.photo} alt={r.name} className="w-full h-full object-cover anim-kenburns" />
                    <span className="absolute bottom-3 right-3 bg-pine-deep/80 text-cream text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-sm">
                      {r.area}
                    </span>
                  </div>
                  <div className="p-7 flex flex-col grow">
                    <h3 className="font-display font-bold text-xl">{r.name}</h3>
                    <p className="mt-4 flex items-baseline gap-2">
                      <span className={`font-display font-extrabold text-4xl ${r.featured ? "text-tangerine" : "text-sunny"}`}>
                        {fmt(r.price)}
                      </span>
                      <span className={r.featured ? "text-pine/60" : "text-cream/60"}>/ ночь</span>
                    </p>
                    <ul className="mt-6 space-y-3 grow">
                      {r.features.map((f) => (
                        <li key={f} className="flex items-start gap-3 text-[15px] leading-snug">
                          <span className={`mt-0.5 w-5 h-5 shrink-0 rounded-full flex items-center justify-center ${r.featured ? "bg-teal text-cream" : "bg-teal-light/20 text-teal-light"}`}>
                            <CheckIcon className="w-3 h-3" />
                          </span>
                          <span className={r.featured ? "text-pine/85" : "text-cream/80"}>{f}</span>
                        </li>
                      ))}
                    </ul>
                    <a
                      href="#booking"
                      className={`mt-8 block text-center font-display font-bold py-4 rounded-full transition-all duration-300 hover:-translate-y-0.5 ${
                        r.featured
                          ? "bg-tangerine text-cream hover:bg-tangerine-dark shadow-card"
                          : "border-2 border-cream/25 hover:border-sunny hover:text-sunny"
                      }`}
                    >
                      Выбрать «{r.name.split("«")[1]?.replace("»", "") ?? r.name}»
                    </a>
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <p className="mt-12 text-center text-cream/60 font-medium">
            Живёте дольше недели? <a href="#booking" className="text-sunny font-bold underline decoration-tangerine decoration-2 underline-offset-4 hover:text-tangerine transition-colors">Скидка 12%</a> на весь заезд — считается автоматически.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
