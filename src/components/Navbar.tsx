import { useEffect, useState } from "react";
import { PawIcon, PhoneIcon } from "./decor";

const LINKS = [
  { href: "#services", label: "Услуги" },
  { href: "#rooms", label: "Номера" },
  { href: "#guests", label: "Постояльцы" },
  { href: "#gallery", label: "Фото" },
  { href: "#reviews", label: "Отзывы" },
  { href: "#faq", label: "Вопросы" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-pine-deep/95 backdrop-blur-md shadow-lift py-2.5" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-8 flex items-center justify-between gap-4">
        <a href="#top" className="flex items-center gap-2.5 group" aria-label="МУР и ГАВ — на главную">
          <span className="w-11 h-11 rounded-2xl bg-tangerine text-cream flex items-center justify-center rotate-6 group-hover:rotate-12 transition-transform duration-300 shadow-card">
            <PawIcon className="w-6 h-6" />
          </span>
          <span className="font-display font-bold text-cream text-lg tracking-tight leading-none">
            МУР<span className="text-sunny">&amp;</span>ГАВ
            <span className="block text-[10px] font-body font-medium tracking-[0.28em] text-teal-light uppercase mt-1">
              отель для животных
            </span>
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-7">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="relative text-sm font-semibold text-cream/85 hover:text-sunny transition-colors duration-300 after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-0 after:bg-tangerine after:rounded-full after:transition-all after:duration-300 hover:after:w-full"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <a href="tel:+74951234567" className="flex items-center gap-2 text-cream/90 hover:text-sunny transition-colors text-sm font-bold">
            <PhoneIcon className="w-4 h-4" /> +7 495 123-45-67
          </a>
          <a
            href="#booking"
            className="bg-tangerine hover:bg-tangerine-dark text-cream font-display font-semibold text-sm px-5 py-3 rounded-full transition-all duration-300 hover:-translate-y-0.5 shadow-card anim-ring"
          >
            Забронировать
          </a>
        </div>

        <button
          className="lg:hidden w-11 h-11 rounded-xl bg-cream/10 text-cream flex flex-col items-center justify-center gap-1.5"
          onClick={() => setOpen(!open)}
          aria-label="Меню"
        >
          <span className={`block w-5 h-0.5 bg-current transition-transform duration-300 ${open ? "translate-y-1 rotate-45" : ""}`} />
          <span className={`block w-5 h-0.5 bg-current transition-opacity duration-300 ${open ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-0.5 bg-current transition-transform duration-300 ${open ? "-translate-y-3 -rotate-45" : ""}`} />
        </button>
      </div>

      <div
        className={`lg:hidden overflow-hidden transition-all duration-500 ${open ? "max-h-96" : "max-h-0"}`}
      >
        <nav className="px-5 py-4 bg-pine-deep/95 backdrop-blur-md flex flex-col gap-1 border-t border-cream/10">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-cream/90 hover:text-sunny font-semibold py-2.5 border-b border-cream/5 transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#booking"
            onClick={() => setOpen(false)}
            className="mt-3 bg-tangerine text-cream font-display font-semibold text-center px-5 py-3.5 rounded-full"
          >
            Забронировать номер
          </a>
        </nav>
      </div>
    </header>
  );
}
