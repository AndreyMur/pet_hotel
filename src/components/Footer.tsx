import { IMG } from "../data";
import { ClockIcon, PawIcon, PhoneIcon, PinIcon } from "./decor";

const TG = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M21.9 4.6 18.8 19c-.2.9-.8 1.1-1.6.7l-4.5-3.3-2.2 2.1c-.2.2-.4.4-.9.4l.3-4.6L18.4 7c.4-.3-.1-.5-.6-.2L7.3 13.4l-4.5-1.4c-1-.3-1-1 .2-1.4l17.6-6.8c.8-.3 1.5.2 1.3.8z" />
  </svg>
);
const VK = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M12.7 18.5c-6.2 0-9.8-4.3-9.9-11.4h3.1c.1 5.2 2.4 7.4 4.2 7.9V7.1h3v4.5c1.8-.2 3.6-2.2 4.2-4.5h3c-.5 2.3-2.4 4.3-3.7 5.1 1.3.7 3.5 2.5 4.3 5.3h-3.3c-.6-2-2.2-3.6-4.5-3.8v3.8z" />
  </svg>
);
const WA = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.6-6.1c-.3-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.5.1-.2.3-.6.8-.8 1-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.5-1 .1-.2 0-.3 0-.5l-.8-1.9c-.2-.5-.4-.4-.5-.4h-.5c-.2 0-.5.1-.7.3-.9.9-1.2 2.2-.3 3.9 1.1 2 2.6 3.5 4.6 4.4 2.3 1.1 3.2.8 3.8.7.6-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2z" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="relative bg-pine-deep text-cream overflow-hidden">
      {/* big outlined brand */}
      <div className="relative border-b border-cream/10 overflow-hidden">
        <p
          aria-hidden
          className="font-display font-extrabold uppercase text-center leading-none text-[clamp(3.5rem,13vw,11rem)] text-stroke-paper select-none translate-y-[18%]"
        >
          Мур<span className="text-tangerine/70">&amp;</span>Гав
        </p>
        <div className="absolute top-8 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-tangerine text-cream font-display font-bold px-5 py-2.5 rounded-full rotate-[-2deg] shadow-card text-sm">
          <PawIcon className="w-4 h-4" /> до новых встреч, хвостатые!
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <a href="#top" className="flex items-center gap-2.5 w-fit">
            <span className="w-11 h-11 rounded-2xl bg-tangerine text-cream flex items-center justify-center rotate-6 shadow-card">
              <PawIcon className="w-6 h-6" />
            </span>
            <span className="font-display font-bold text-lg">
              МУР<span className="text-sunny">&amp;</span>ГАВ
            </span>
          </a>
          <p className="mt-4 text-cream/60 leading-relaxed text-sm">
            Гостиница для животных полного цикла: номера, ресторан, SPA, ветеринар и видеоканал. С 2012 года — 9 400+ счастливых хвостов.
          </p>
          <div className="mt-5 flex gap-3">
            {[
              { icon: TG, label: "Telegram", href: "#top" },
              { icon: VK, label: "ВКонтакте", href: "#top" },
              { icon: WA, label: "WhatsApp", href: "#top" },
            ].map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-11 h-11 rounded-xl bg-cream/8 hover:bg-tangerine border border-cream/12 flex items-center justify-center transition-all duration-300 hover:-translate-y-1 hover:rotate-6"
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="font-display font-bold uppercase text-sm tracking-wider text-sunny">Разделы</p>
          <ul className="mt-4 space-y-2.5 text-cream/70 font-medium">
            {[
              ["#services", "Услуги"],
              ["#rooms", "Номера и тарифы"],
              ["#guests", "Наши постояльцы"],
              ["#schedule", "Режим дня"],
              ["#gallery", "Фотогалерея"],
              ["#reviews", "Отзывы"],
              ["#faq", "Вопросы"],
            ].map(([href, label]) => (
              <li key={href}>
                <a href={href} className="hover:text-sunny transition-colors inline-flex items-center gap-2 group">
                  <PawIcon className="w-3.5 h-3.5 text-tangerine opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-display font-bold uppercase text-sm tracking-wider text-sunny">Контакты</p>
          <ul className="mt-4 space-y-3.5 text-cream/75 font-medium text-sm">
            <li className="flex gap-3">
              <PinIcon className="w-5 h-5 text-tangerine shrink-0" />
              Москва, Лесная опушка, 7 <br /> (вход со стороны парка)
            </li>
            <li className="flex gap-3 items-center">
              <PhoneIcon className="w-5 h-5 text-tangerine shrink-0" />
              <a href="tel:+74951234567" className="hover:text-sunny transition-colors font-bold">+7 495 123-45-67</a>
            </li>
            <li className="flex gap-3 items-center">
              <ClockIcon className="w-5 h-5 text-tangerine shrink-0" />
              Ресепшен: 8:00 – 22:00, вет — 24/7
            </li>
          </ul>
        </div>

        <div>
          <p className="font-display font-bold uppercase text-sm tracking-wider text-sunny">Наш шеф ресепшена</p>
          <div className="mt-4 flex items-center gap-4 bg-pine-soft/30 border border-cream/10 rounded-2xl p-4">
            <img src={IMG.corgi} alt="Корги Батон" className="w-16 h-16 rounded-xl object-cover border-2 border-sunny rotate-3" />
            <div>
              <p className="font-display font-bold">Батон</p>
              <p className="text-xs text-cream/60 leading-snug">контролирует качество мячиков и обнимашек</p>
            </div>
          </div>
          <a href="#booking" className="mt-4 block text-center bg-tangerine hover:bg-tangerine-dark font-display font-bold px-5 py-3.5 rounded-full transition-all duration-300 hover:-translate-y-0.5 shadow-card">
            Забронировать номер
          </a>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-cream/45 font-medium">
          <p>© 2012–2026 Гостиница для животных «МУР&amp;ГАВ». Все хвосты защищены.</p>
          <p className="flex items-center gap-2">
            сделано с <PawIcon className="w-4 h-4 text-tangerine" /> к хвостатым
          </p>
        </div>
      </div>
    </footer>
  );
}
