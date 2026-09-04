import { useState } from "react";
import { FAQS, GALLERY, SCHEDULE, TESTIMONIALS, IMG } from "../data";
import { ClockIcon, PawIcon, PhoneIcon, PinIcon, Reveal, StarIcon } from "./decor";
import { SectionHead as Head } from "./Sections";

/* ================= daily schedule ================= */

export function Schedule() {
  return (
    <section id="schedule" className="relative bg-paper py-20 lg:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <Head
            kicker="режим дня"
            title={
              <>
                Один день из жизни <span className="text-tangerine">постояльца</span>
              </>
            }
            text="Расписание плотнее, чем у министра: гулять, есть, блистать на груминге и обязательно выспаться. Листайте вправо."
          />
          <Reveal delay={0.15} dir="right">
            <span className="inline-flex items-center gap-2 text-pine/60 font-semibold text-sm">
              <ClockIcon className="w-5 h-5 text-tangerine" /> время московское, настроение — всегда
            </span>
          </Reveal>
        </div>
      </div>

      <div className="relative">
        <div className="absolute left-0 right-0 top-1/2 h-1 border-t-2 border-dashed border-tangerine/30 hidden lg:block" aria-hidden />
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="flex gap-5 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-6 lg:pb-10 -mx-5 px-5 lg:mx-0 lg:px-0 lg:grid lg:grid-cols-4 lg:gap-6 lg:overflow-visible">
            {SCHEDULE.map((s, i) => (
              <Reveal key={s.time} delay={(i % 4) * 0.09} className="snap-center shrink-0 w-[260px] lg:w-auto">
                <div className="group relative h-full bg-cream border-2 border-pine-deep/10 hover:border-tangerine/60 rounded-3xl p-6 transition-all duration-400 hover:-translate-y-2 hover:shadow-lift">
                  <span className="absolute -top-3.5 left-6 bg-tangerine text-cream font-display font-bold text-sm px-3.5 py-1.5 rounded-full rotate-[-3deg] group-hover:rotate-2 transition-transform duration-300">
                    {s.time}
                  </span>
                  <p className="font-display font-extrabold text-5xl text-sunny-soft group-hover:text-sunny transition-colors duration-300 leading-none select-none">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="font-display font-bold text-lg mt-3 text-pine-deep">{s.title}</h3>
                  <p className="mt-2 text-sm text-pine/70 leading-relaxed">{s.text}</p>
                  <PawIcon className="absolute bottom-4 right-4 w-6 h-6 text-tangerine/25 group-hover:text-tangerine group-hover:rotate-12 transition-all duration-300" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================= gallery mosaic ================= */

const SPAN: Record<string, string> = {
  wide: "col-span-2 row-span-1",
  tall: "col-span-1 row-span-2",
  small: "col-span-1 row-span-1",
};

export function Gallery() {
  return (
    <section id="gallery" className="relative bg-cream py-20 lg:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <Head
          center
          kicker="фотогалерея"
          title={
            <>
              Подглядывать <span className="text-tangerine">разрешается</span>
            </>
          }
          text="Наведите курсор — фото оживут. А вживую всё ещё ярче: приходите на экскурсию, покажем каждый уголок."
        />

        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 auto-rows-[150px] sm:auto-rows-[190px] gap-4 lg:gap-5">
          {GALLERY.map((g, i) => (
            <Reveal key={g.src + i} delay={(i % 4) * 0.07} dir="zoom" className={SPAN[g.span]}>
              <figure className="group relative w-full h-full min-h-[150px] rounded-3xl overflow-hidden border-2 border-pine-deep/10 hover:border-sunny transition-colors duration-400">
                <img
                  src={g.src}
                  alt={g.caption}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-hover:rotate-1"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-pine-deep/85 via-pine-deep/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                <figcaption className="absolute bottom-0 inset-x-0 p-4 sm:p-5 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400 text-cream">
                  <p className="font-display font-bold text-sm sm:text-base">{g.caption}</p>
                  <p className="text-xs text-sunny font-semibold mt-0.5 flex items-center gap-1.5">
                    <PawIcon className="w-3.5 h-3.5" /> отель «МУР&amp;ГАВ»
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================= testimonials ================= */

export function Testimonials() {
  return (
    <section id="reviews" className="relative bg-paper py-20 lg:py-28 overflow-hidden">
      <div className="absolute top-10 right-10 w-40 h-40 rounded-full border-[12px] border-sunny/40 pointer-events-none" aria-hidden />
      <div className="max-w-7xl mx-auto px-5 lg:px-8 relative">
        <Head
          center
          kicker="отзывы"
          title={
            <>
              Хозяева пишут, <span className="text-tangerine">хвосты подтверждают</span>
            </>
          }
          text="4.9 из 5 на всех площадках. Вот несколько открыток от тех, кто уже доверил нам самое дорогое."
        />

        <div className="mt-16 grid sm:grid-cols-2 gap-8 lg:gap-10">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={(i % 2) * 0.12} dir={i % 2 ? "right" : "left"}>
              <article
                className={`group relative bg-cream border-2 border-pine-deep/10 rounded-3xl p-7 sm:p-8 shadow-card transition-all duration-500 hover:shadow-lift hover:-translate-y-2 hover:rotate-0 ${
                  i % 2 ? "lg:translate-y-8" : ""
                }`}
                style={{ transform: `rotate(${t.rotate}deg)`, transformOrigin: "center" }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "rotate(0deg) translateY(-8px)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = `rotate(${t.rotate}deg)`)}
              >
                {/* tape */}
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-24 h-7 bg-sunny/80 rotate-[-4deg] rounded-sm shadow-sm" aria-hidden />
                <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-tangerine border-2 border-tangerine-dark/40" aria-hidden />

                <div className="flex items-center gap-4">
                  <img
                    src={t.photo}
                    alt={t.name}
                    className="w-16 h-16 rounded-2xl object-cover border-3 border-sunny rotate-3 group-hover:rotate-6 transition-transform duration-300"
                  />
                  <div>
                    <p className="font-display font-bold text-pine-deep">{t.name}</p>
                    <p className="text-sm text-pine/60 font-medium">{t.role}</p>
                  </div>
                  <span className="ml-auto flex text-tangerine">
                    {[...Array(5)].map((_, s) => (
                      <StarIcon key={s} className="w-4 h-4" />
                    ))}
                  </span>
                </div>
                <p className="mt-5 text-pine/85 leading-relaxed">{t.text}</p>
                <p className="mt-5 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal">
                  <PawIcon className="w-4 h-4" /> проверенный гость
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================= FAQ ================= */

export function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="relative bg-cream py-20 lg:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 grid lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-16 items-start">
        <div className="lg:sticky lg:top-28">
          <Head
            kicker="вопросы и ответы"
            title={
              <>
                Спрашивают <span className="text-tangerine">чаще всего</span>
              </>
            }
            text="Если ответа не нашлось — звоните, администратор Оксана знает всё. Даже то, где спрятан второй мячик."
          />
          <Reveal delay={0.2}>
            <div className="mt-9 bg-pine-deep text-cream rounded-3xl p-7 relative overflow-hidden">
              <PawIcon className="absolute -right-6 -bottom-6 w-32 h-32 text-cream/10 rotate-12" />
              <p className="font-display font-bold text-lg">Не нашли ответ?</p>
              <p className="text-cream/70 text-sm mt-2">Работаем ежедневно с 8:00 до 22:00, ветеринар — круглосуточно.</p>
              <a href="tel:+74951234567" className="mt-5 inline-flex items-center gap-3 bg-tangerine hover:bg-tangerine-dark rounded-full px-5 py-3 font-display font-bold text-sm transition-all duration-300 hover:-translate-y-0.5 shadow-card">
                <PhoneIcon className="w-4 h-4" /> +7 495 123-45-67
              </a>
              <p className="mt-4 flex items-center gap-2 text-sm text-cream/60">
                <PinIcon className="w-4 h-4 text-sunny" /> Москва, Лесная опушка, 7 (5 мин от парка)
              </p>
            </div>
          </Reveal>
        </div>

        <div className="space-y-4">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={i * 0.06}>
                <div
                  className={`rounded-3xl border-2 transition-all duration-400 overflow-hidden ${
                    isOpen ? "bg-paper border-tangerine shadow-card" : "bg-paper/60 border-pine-deep/10 hover:border-tangerine/50"
                  }`}
                >
                  <button
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="w-full flex items-center gap-4 text-left px-6 sm:px-7 py-5"
                    aria-expanded={isOpen}
                  >
                    <span className={`w-9 h-9 shrink-0 rounded-xl flex items-center justify-center font-display font-bold text-sm transition-all duration-400 ${isOpen ? "bg-tangerine text-cream rotate-90" : "bg-sunny text-pine-deep"}`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display font-bold text-pine-deep text-[15px] sm:text-lg leading-snug grow">{f.q}</span>
                    <span className={`shrink-0 w-9 h-9 rounded-full border-2 flex items-center justify-center transition-all duration-400 ${isOpen ? "border-tangerine text-tangerine rotate-45" : "border-pine-deep/15 text-pine-deep/60"}`}>
                      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round">
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </span>
                  </button>
                  <div className="grid transition-all duration-500 ease-out" style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}>
                    <div className="overflow-hidden">
                      <p className="px-6 sm:px-7 pb-6 pl-[4.75rem] sm:pl-[5rem] text-pine/80 leading-relaxed">{f.a}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
