import { useMemo, useState } from "react";
import confetti from "canvas-confetti";
import { EXTRAS, PET_TYPES, ROOM_TARIFFS, fmt, type RoomId } from "../data";
import { CheckIcon, ClockIcon, FloatingPaws, PawIcon, PhoneIcon, PinIcon, Reveal, useReducedMotion } from "./decor";
import { SectionHead as Head } from "./Sections";

const toISO = (d: Date) => d.toISOString().slice(0, 10);
const addDays = (n: number) => {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d;
};
const fmtShort = (iso: string) =>
  new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "short" }).format(new Date(iso + "T12:00:00"));

const inputCls =
  "w-full bg-paper border-2 border-pine-deep/12 rounded-2xl px-4 py-3.5 text-pine-deep font-semibold placeholder:text-pine/40 placeholder:font-medium outline-none focus:border-tangerine focus:bg-cream transition-all duration-300";
const labelCls = "block font-display font-bold text-[13px] uppercase tracking-wider text-pine-deep mb-2";

export default function Booking() {
  const reduced = useReducedMotion();
  const [petName, setPetName] = useState("");
  const [owner, setOwner] = useState("");
  const [phone, setPhone] = useState("");
  const [petType, setPetType] = useState("dog");
  const [checkIn, setCheckIn] = useState(toISO(addDays(1)));
  const [checkOut, setCheckOut] = useState(toISO(addDays(4)));
  const [room, setRoom] = useState<RoomId>("standard");
  const [extras, setExtras] = useState<Set<string>>(new Set(["walk"]));
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState<null | { total: number; nights: number }>(null);

  const nights = useMemo(() => {
    const ms = new Date(checkOut).getTime() - new Date(checkIn).getTime();
    return Math.round(ms / 86400000);
  }, [checkIn, checkOut]);

  const calc = useMemo(() => {
    const validNights = Math.max(0, nights);
    const roomSum = validNights * ROOM_TARIFFS[room].price;
    const extrasSum = EXTRAS.filter((e) => extras.has(e.id)).reduce(
      (acc, e) => acc + (e.perNight ? e.price * validNights : e.price),
      0
    );
    const discount = validNights >= 7 ? 0.12 : 0;
    const total = Math.round((roomSum + extrasSum) * (1 - discount));
    return { roomSum, extrasSum, discount, total };
  }, [nights, room, extras]);

  const toggleExtra = (id: string) => {
    setExtras((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const err: Record<string, string> = {};
    if (petName.trim().length < 2) err.petName = "Как зовут постояльца?";
    if (owner.trim().length < 2) err.owner = "Представьтесь, пожалуйста";
    if (phone.replace(/\D/g, "").length < 10) err.phone = "Нужен телефон для подтверждения";
    if (nights < 1) err.dates = "Дата выезда должна быть позже даты заезда";
    setErrors(err);
    if (Object.keys(err).length) return;

    setDone({ total: calc.total, nights });
    if (!reduced) {
      const colors = ["#ff6b2c", "#ffc53d", "#0e7c6b", "#fdf4e0"];
      confetti({ particleCount: 90, spread: 75, origin: { y: 0.7 }, colors });
      setTimeout(() => confetti({ particleCount: 50, spread: 100, origin: { y: 0.6 }, colors }), 250);
    }
  };

  const reset = () => {
    setDone(null);
    setPetName("");
    setOwner("");
    setPhone("");
    setExtras(new Set());
    setErrors({});
  };

  const quickDates = [3, 10, 17].map((start) => ({
    in: toISO(addDays(start)),
    out: toISO(addDays(start + 3)),
    label: `${fmtShort(toISO(addDays(start)))} – ${fmtShort(toISO(addDays(start + 3)))}`,
  }));

  return (
    <section id="booking" className="relative bg-pine-deep text-cream py-20 lg:py-28 overflow-hidden">
      <FloatingPaws count={7} color="text-teal-light" />
      <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full border-[16px] border-tangerine/20 pointer-events-none" aria-hidden />

      <div className="relative max-w-7xl mx-auto px-5 lg:px-8">
        <Head
          dark
          center
          kicker="бронирование"
          title={
            <>
              Забронируйте номер <span className="text-sunny">за минуту</span>
            </>
          }
          text="Выберите даты и тариф — цену посчитаем сразу. Менеджер перезвонит в течение 15 минут и подтвердит бронь."
        />

        <div className="mt-14 grid lg:grid-cols-[1.08fr_0.92fr] gap-8 lg:gap-12 items-start">
          {/* -------- form -------- */}
          <Reveal dir="left">
            <div className="bg-cream text-pine-deep rounded-[2rem] p-6 sm:p-9 shadow-lift border-4 border-sunny/60 relative overflow-hidden">
              <span className="absolute top-0 right-0 bg-sunny text-pine-deep font-display font-bold text-xs uppercase tracking-wider px-5 py-2 rounded-bl-2xl">
                без предоплаты
              </span>

              {done ? (
                <div className="text-center py-8 anim-pop">
                  <div className="mx-auto w-20 h-20 rounded-full bg-teal text-cream flex items-center justify-center shadow-card">
                    <CheckIcon className="w-10 h-10" />
                  </div>
                  <h3 className="font-display font-extrabold text-2xl sm:text-3xl uppercase mt-6">
                    Гав! Бронь принята
                  </h3>
                  <p className="mt-3 text-pine/70 max-w-md mx-auto">
                    {petName.trim()} ждём <b>{fmtShort(checkIn)}</b> на {done.nights}{" "}
                    {done.nights === 1 ? "ночь" : done.nights < 5 ? "ночи" : "ночей"}. Менеджер перезвонит на{" "}
                    <b>{phone}</b> в течение 15 минут.
                  </p>
                  <div className="mt-6 bg-paper rounded-2xl p-5 max-w-sm mx-auto text-left">
                    <div className="flex justify-between text-sm font-semibold text-pine/70">
                      <span>{ROOM_TARIFFS[room].name}</span>
                      <span>{done.nights} × {fmt(ROOM_TARIFFS[room].price)}</span>
                    </div>
                    <div className="flex justify-between mt-2 font-display font-extrabold text-lg">
                      <span>Итого</span>
                      <span className="text-tangerine">{fmt(done.total)}</span>
                    </div>
                  </div>
                  <button
                    onClick={reset}
                    className="mt-7 bg-pine-deep hover:bg-pine text-cream font-display font-bold px-7 py-3.5 rounded-full transition-all duration-300 hover:-translate-y-0.5"
                  >
                    Оформить ещё одну бронь
                  </button>
                </div>
              ) : (
                <form onSubmit={submit} noValidate>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className={labelCls} htmlFor="petName">Кличка питомца</label>
                      <input id="petName" className={inputCls} placeholder="Например, Батон" value={petName} onChange={(e) => setPetName(e.target.value)} />
                      {errors.petName && <p className="text-tangerine-dark text-sm font-bold mt-1.5">{errors.petName}</p>}
                    </div>
                    <div>
                      <label className={labelCls} htmlFor="owner">Ваше имя</label>
                      <input id="owner" className={inputCls} placeholder="Иван" value={owner} onChange={(e) => setOwner(e.target.value)} />
                      {errors.owner && <p className="text-tangerine-dark text-sm font-bold mt-1.5">{errors.owner}</p>}
                    </div>
                    <div className="sm:col-span-2">
                      <label className={labelCls} htmlFor="phone">Телефон</label>
                      <input id="phone" type="tel" className={inputCls} placeholder="+7 (999) 123-45-67" value={phone} onChange={(e) => setPhone(e.target.value)} />
                      {errors.phone && <p className="text-tangerine-dark text-sm font-bold mt-1.5">{errors.phone}</p>}
                    </div>
                  </div>

                  <div className="mt-6">
                    <span className={labelCls}>Кто едет отдыхать?</span>
                    <div className="flex flex-wrap gap-2.5">
                      {PET_TYPES.map((p) => (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => setPetType(p.id)}
                          className={`px-5 py-2.5 rounded-full font-bold text-sm border-2 transition-all duration-300 ${
                            petType === p.id
                              ? "bg-tangerine border-tangerine text-cream shadow-card -translate-y-0.5"
                              : "border-pine-deep/15 text-pine/70 hover:border-tangerine/60"
                          }`}
                        >
                          {p.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className={labelCls} htmlFor="in">Заезд</label>
                      <input id="in" type="date" min={toISO(new Date())} className={inputCls} value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
                    </div>
                    <div>
                      <label className={labelCls} htmlFor="out">Выезд</label>
                      <input id="out" type="date" min={checkIn} className={inputCls} value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
                    </div>
                  </div>
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-pine/50">Быстрый выбор:</span>
                    {quickDates.map((q) => (
                      <button
                        key={q.in}
                        type="button"
                        onClick={() => {
                          setCheckIn(q.in);
                          setCheckOut(q.out);
                        }}
                        className={`text-xs font-bold px-3 py-1.5 rounded-full border-2 transition-all duration-300 ${
                          checkIn === q.in ? "border-teal bg-teal text-cream" : "border-pine-deep/12 text-pine/60 hover:border-teal/60"
                        }`}
                      >
                        {q.label}
                      </button>
                    ))}
                    {errors.dates && <p className="text-tangerine-dark text-sm font-bold w-full">{errors.dates}</p>}
                    {nights >= 1 && (
                      <span className="text-sm font-bold text-teal ml-auto">
                        {nights} {nights === 1 ? "ночь" : nights < 5 ? "ночи" : "ночей"}
                        {nights >= 7 && <span className="text-tangerine"> · скидка 12% ✓</span>}
                      </span>
                    )}
                  </div>

                  <div className="mt-6">
                    <span className={labelCls}>Тариф</span>
                    <div className="grid sm:grid-cols-3 gap-3">
                      {(Object.keys(ROOM_TARIFFS) as RoomId[]).map((r) => (
                        <button
                          key={r}
                          type="button"
                          onClick={() => setRoom(r)}
                          className={`rounded-2xl border-2 p-4 text-left transition-all duration-300 ${
                            room === r
                              ? "border-tangerine bg-tangerine/10 shadow-card -translate-y-0.5"
                              : "border-pine-deep/12 hover:border-tangerine/50"
                          }`}
                        >
                          <p className="font-display font-bold text-sm leading-tight">{ROOM_TARIFFS[r].name}</p>
                          <p className="mt-1.5 text-tangerine font-extrabold">{fmt(ROOM_TARIFFS[r].price)}<span className="text-xs text-pine/50 font-semibold">/ночь</span></p>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6">
                    <span className={labelCls}>Дополнительно</span>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {EXTRAS.map((x) => {
                        const on = extras.has(x.id);
                        return (
                          <button
                            key={x.id}
                            type="button"
                            onClick={() => toggleExtra(x.id)}
                            className={`flex items-center gap-3 rounded-2xl border-2 p-3.5 text-left transition-all duration-300 ${
                              on ? "border-teal bg-teal/10" : "border-pine-deep/12 hover:border-teal/50"
                            }`}
                          >
                            <span className={`w-6 h-6 shrink-0 rounded-lg border-2 flex items-center justify-center transition-all duration-300 ${on ? "bg-teal border-teal text-cream" : "border-pine-deep/25"}`}>
                              {on && <CheckIcon className="w-3.5 h-3.5" />}
                            </span>
                            <span className="grow text-sm font-bold leading-tight">{x.name}</span>
                            <span className="text-xs font-extrabold text-pine/60 whitespace-nowrap">
                              {fmt(x.price)}{x.perNight ? "/ночь" : ""}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-5 border-t-2 border-dashed border-pine-deep/15 pt-6">
                    <div className="grow">
                      <p className="text-xs font-bold uppercase tracking-wider text-pine/50">Итого за {Math.max(nights, 0)} {nights === 1 ? "ночь" : "ночей"}</p>
                      <p className="font-display font-extrabold text-4xl text-tangerine leading-tight">{fmt(Math.max(calc.total, 0))}</p>
                      {calc.discount > 0 && (
                        <p className="text-sm font-bold text-teal">скидка за долгий заезд −12% уже внутри</p>
                      )}
                    </div>
                    <button
                      type="submit"
                      className="group bg-tangerine hover:bg-tangerine-dark text-cream font-display font-bold text-lg px-9 py-4 rounded-full transition-all duration-300 hover:-translate-y-1 shadow-lift flex items-center justify-center gap-3"
                    >
                      Забронировать
                      <PawIcon className="w-5 h-5 group-hover:rotate-[25deg] transition-transform duration-300" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </Reveal>

          {/* -------- side info -------- */}
          <div className="space-y-6">
            <Reveal dir="right">
              <div className="bg-pine-soft/40 backdrop-blur-sm border border-cream/12 rounded-3xl p-7">
                <h3 className="font-display font-bold text-xl flex items-center gap-3">
                  <PinIcon className="w-6 h-6 text-sunny" /> Как нас найти
                </h3>
                <p className="mt-3 text-cream/75 leading-relaxed">Москва, Лесная опушка, 7 — зелёный дом с оранжевой крышей и будкой-ресепшеном. 5 минут пешком от входа в парк, парковка для гостей — бесплатная.</p>
              </div>
            </Reveal>

            <Reveal dir="right" delay={0.1}>
              <div className="bg-pine-soft/40 backdrop-blur-sm border border-cream/12 rounded-3xl p-7">
                <h3 className="font-display font-bold text-xl flex items-center gap-3">
                  <ClockIcon className="w-6 h-6 text-sunny" /> Часы работы
                </h3>
                <ul className="mt-4 space-y-2.5 text-cream/80 font-medium">
                  {[
                    ["Ресепшен и заселение", "ежедневно 8:00 – 22:00"],
                    ["Ветеринар", "круглосуточно"],
                    ["Видеоканал для хозяев", "24/7"],
                    ["Зоотакси", "7:00 – 23:00"],
                  ].map(([k, v]) => (
                    <li key={k} className="flex justify-between gap-4 border-b border-cream/8 pb-2.5 last:border-0">
                      <span className="text-cream/60">{k}</span>
                      <span className="font-bold text-right">{v}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal dir="right" delay={0.2}>
              <div className="bg-sunny text-pine-deep rounded-3xl p-7 relative overflow-hidden">
                <PawIcon className="absolute -right-5 -top-5 w-28 h-28 text-pine-deep/10 -rotate-12" />
                <h3 className="font-display font-extrabold text-xl">Сомневаетесь?</h3>
                <p className="mt-2 text-pine-deep/80 font-medium leading-relaxed">
                  Приезжайте на бесплатную экскурсию: покажем номера, познакомим с няньками и угостим питомца вкусняшкой из «Миски».
                </p>
                <a href="tel:+74951234567" className="mt-5 inline-flex items-center gap-2.5 bg-pine-deep text-cream font-display font-bold px-6 py-3.5 rounded-full transition-all duration-300 hover:-translate-y-0.5 hover:bg-pine shadow-card">
                  <PhoneIcon className="w-4 h-4 text-sunny" /> Записаться на экскурсию
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
