import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const heroImage = "https://cdn.poehali.dev/projects/dccd8e58-8398-4823-b8fa-f0862b88f2cf/files/e9ee7224-41f5-43e9-b0c6-dbd1e7ed51a7.jpg";

const directions = {
  "Творчество": [
    { icon: "Palette", name: "Изобразительное искусство", age: "6–16 лет", color: "hsl(35 100% 55%)" },
    { icon: "Music", name: "Вокал и хоровое пение", age: "7–18 лет", color: "hsl(330 80% 60%)" },
    { icon: "PersonStanding", name: "Бальные танцы", age: "5–17 лет", color: "hsl(270 70% 60%)" },
    { icon: "Scissors", name: "Декоративно-прикладное", age: "6–14 лет", color: "hsl(35 100% 55%)" },
    { icon: "Camera", name: "Театральная студия", age: "8–18 лет", color: "hsl(330 80% 60%)" },
    { icon: "Brush", name: "Дизайн и графика", age: "10–18 лет", color: "hsl(270 70% 60%)" },
  ],
  "Наука и техника": [
    { icon: "Bot", name: "Робототехника", age: "8–16 лет", color: "hsl(210 90% 60%)" },
    { icon: "Cpu", name: "Программирование", age: "10–18 лет", color: "hsl(160 70% 45%)" },
    { icon: "Plane", name: "Авиамоделирование", age: "9–16 лет", color: "hsl(210 90% 60%)" },
    { icon: "Microscope", name: "Юный химик", age: "11–16 лет", color: "hsl(160 70% 45%)" },
    { icon: "Rocket", name: "Ракетомоделирование", age: "12–18 лет", color: "hsl(210 90% 60%)" },
    { icon: "Zap", name: "Электроника", age: "11–17 лет", color: "hsl(160 70% 45%)" },
  ],
  "Спорт": [
    { icon: "Swords", name: "Самбо и дзюдо", age: "7–18 лет", color: "hsl(35 100% 55%)" },
    { icon: "Trophy", name: "Шахматы", age: "6–18 лет", color: "hsl(160 70% 45%)" },
    { icon: "Dumbbell", name: "Спортивная акробатика", age: "5–15 лет", color: "hsl(330 80% 60%)" },
    { icon: "Target", name: "Стрельба из лука", age: "10–18 лет", color: "hsl(35 100% 55%)" },
    { icon: "PersonStanding", name: "Туризм и ориентирование", age: "9–18 лет", color: "hsl(160 70% 45%)" },
    { icon: "Zap", name: "Скалолазание", age: "8–18 лет", color: "hsl(330 80% 60%)" },
  ],
} as const;

type DirectionKey = keyof typeof directions;

const news = [
  { tag: "Событие", title: "День защиты детей — праздник детства!", date: "1 июня 2025", color: "hsl(35 100% 55%)" },
  { tag: "Конкурс", title: "Наши роботостроители взяли первое место на городской олимпиаде", date: "15 мая 2025", color: "hsl(160 70% 45%)" },
  { tag: "Выступление", title: "Танцевальный коллектив «Искра» выступил на фестивале Байкал", date: "3 мая 2025", color: "hsl(330 80% 60%)" },
  { tag: "Набор", title: "Открываем новые группы по робототехнике и авиамоделированию", date: "28 апреля 2025", color: "hsl(210 90% 60%)" },
];

const testimonials = [
  { text: "Дочь ходит на бальные танцы уже три года. Педагоги — настоящие профессионалы, а главное — дети занимаются с огромным удовольствием!", name: "Анна Петрова", role: "мама ученицы, 9 лет", avatar: "👩" },
  { text: "Сын пришёл в кружок робототехники абсолютным новичком, а через год уже занял призовое место на городских соревнованиях. Спасибо педагогам!", name: "Дмитрий Соколов", role: "папа ученика, 12 лет", avatar: "👨" },
  { text: "Здесь не просто учат — здесь создают атмосферу, в которой хочется развиваться. Мой ребёнок ждёт каждого занятия с нетерпением.", name: "Марина Кузнецова", role: "мама ученицы, 7 лет", avatar: "👩‍🦱" },
  { text: "Шахматный кружок — это не просто игра. Здесь развивают логику, усидчивость и характер. Очень рад, что нашли это место.", name: "Олег Лебедев", role: "папа ученика, 10 лет", avatar: "🧔" },
];

const tickerItems = [
  "Творчество", "Наука", "Спорт", "Развитие", "Иркутск", "ДДТ №5",
  "Кружки для детей", "Запись открыта", "Бесплатные занятия",
  "Творчество", "Наука", "Спорт", "Развитие", "Иркутск", "ДДТ №5",
  "Кружки для детей", "Запись открыта", "Бесплатные занятия",
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

export default function Index() {
  const [activeTab, setActiveTab] = useState<DirectionKey>("Творчество");
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [heroLoaded, setHeroLoaded] = useState(false);

  const directionsSection = useInView();
  const missionSection = useInView();
  const newsSection = useInView();
  const testimonialsSection = useInView();
  const contactsSection = useInView();

  useEffect(() => {
    const timer = setTimeout(() => setHeroLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((p) => (p + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background">

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4"
        style={{ backdropFilter: "blur(20px)", background: "rgba(10,8,6,0.85)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold"
            style={{ background: "hsl(35 100% 55%)", color: "hsl(20 14% 4%)" }}>5</div>
          <span className="text-sm font-semibold tracking-wide hidden sm:block" style={{ color: "rgba(255,255,255,0.6)" }}>ДДТ №5 · Иркутск</span>
        </div>
        <div className="flex gap-2">
          <a href="#directions" className="hidden sm:block text-sm px-4 py-2 rounded-full transition-colors"
            style={{ color: "rgba(255,255,255,0.5)" }}>Направления</a>
          <a href="#contacts" className="text-sm px-4 py-2 rounded-full font-semibold transition-all hover:scale-105"
            style={{ background: "hsl(35 100% 55%)", color: "hsl(20 14% 4%)" }}>Записаться</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden"
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 92%, 0 100%)" }}>
        <div className="absolute inset-0">
          <img src={heroImage} alt="Дети в творческой студии" className="w-full h-full object-cover"
            style={{ filter: "brightness(0.22) saturate(0.7)" }} />
        </div>

        {/* Ambient blobs */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full opacity-25 blur-3xl animate-blob"
          style={{ background: "radial-gradient(circle, hsl(35 100% 55%) 0%, transparent 70%)" }} />
        <div className="absolute bottom-1/3 left-1/4 w-80 h-80 rounded-full opacity-15 blur-3xl animate-blob-2"
          style={{ background: "radial-gradient(circle, hsl(330 80% 60%) 0%, transparent 70%)" }} />

        {/* Spinning ring */}
        <div className="absolute right-16 top-28 opacity-[0.07] animate-spin-slow hidden lg:block">
          <svg width="320" height="320" viewBox="0 0 320 320">
            <circle cx="160" cy="160" r="150" fill="none" stroke="hsl(35 100% 55%)" strokeWidth="1" strokeDasharray="8 14" />
            <circle cx="160" cy="160" r="110" fill="none" stroke="hsl(330 80% 60%)" strokeWidth="1" strokeDasharray="4 18" />
          </svg>
        </div>

        <div className="relative z-10 container mx-auto px-6 pt-28 pb-40">
          <div className="max-w-4xl">
            <div className={`inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full text-sm font-medium opacity-0 ${heroLoaded ? "animate-fade-up" : ""}`}
              style={{ border: "1px solid hsl(35 100% 55% / 0.35)", color: "hsl(35 100% 55%)", background: "hsl(35 100% 55% / 0.1)" }}>
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "hsl(160 70% 45%)" }} />
              Набор в кружки открыт — 2025 год
            </div>

            <h1 className={`text-6xl sm:text-7xl lg:text-[6rem] font-bold uppercase leading-[0.95] mb-8 opacity-0 ${heroLoaded ? "animate-fade-up delay-200" : ""}`}>
              <span style={{ color: "rgba(255,255,255,0.95)" }}>Дом, где</span>
              <br />
              <span style={{ WebkitTextStroke: "2px hsl(35 100% 55%)", color: "transparent" }}>раскрываются</span>
              <br />
              <span style={{ color: "rgba(255,255,255,0.95)" }}>таланты</span>
            </h1>

            <p className={`text-lg text-white/50 max-w-lg mb-10 leading-relaxed opacity-0 ${heroLoaded ? "animate-fade-up delay-400" : ""}`}>
              Иркутский Дом детского творчества №5.<br />
              От первых шагов в искусстве до спортивных побед.
            </p>

            <div className={`flex flex-wrap gap-4 opacity-0 ${heroLoaded ? "animate-fade-up delay-500" : ""}`}>
              <a href="#contacts"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-base transition-all hover:scale-105"
                style={{ background: "hsl(35 100% 55%)", color: "hsl(20 14% 4%)", boxShadow: "0 0 50px hsl(35 100% 55% / 0.4)" }}>
                <Icon name="UserPlus" size={18} />
                Записаться в кружок
              </a>
              <a href="#directions"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-base transition-all hover:scale-105"
                style={{ border: "1px solid rgba(255,255,255,0.18)", color: "rgba(255,255,255,0.9)", background: "rgba(255,255,255,0.05)" }}>
                <Icon name="Calendar" size={18} />
                Узнать расписание
              </a>
            </div>

            <div className={`flex flex-wrap gap-10 mt-14 opacity-0 ${heroLoaded ? "animate-fade-up delay-700" : ""}`}>
              {[{ value: "40+", label: "кружков и секций" }, { value: "1 200+", label: "учеников в год" }, { value: "30+", label: "лет работы" }].map(s => (
                <div key={s.label}>
                  <div className="text-4xl font-bold" style={{ fontFamily: "Oswald, sans-serif", color: "hsl(35 100% 55%)" }}>{s.value}</div>
                  <div className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <div className="w-px h-10 animate-pulse" style={{ background: "rgba(255,255,255,0.2)" }} />
          <span className="text-xs tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.25)" }}>Скролл</span>
        </div>
      </section>

      {/* TICKER */}
      <div className="overflow-hidden py-4" style={{ background: "hsl(35 100% 55%)" }}>
        <div className="flex gap-12 animate-ticker whitespace-nowrap">
          {tickerItems.map((item, i) => (
            <span key={i} className="inline-flex items-center gap-4 text-sm font-bold uppercase tracking-widest flex-shrink-0"
              style={{ color: "hsl(20 14% 4%)" }}>
              {item}<span style={{ opacity: 0.35 }}>✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* DIRECTIONS */}
      <section id="directions" className="py-28 px-6" style={{ background: "hsl(20 12% 6%)", clipPath: "polygon(0 0, 100% 0, 100% 94%, 0 100%)" }}>
        <div ref={directionsSection.ref} className="container mx-auto">
          <div className={`mb-12 opacity-0 ${directionsSection.inView ? "animate-fade-up" : ""}`}>
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "hsl(35 100% 55%)" }}>02 — Направления</span>
            <h2 className="text-5xl sm:text-6xl font-bold uppercase mt-3" style={{ color: "rgba(255,255,255,0.95)" }}>
              Найди своё<br />
              <span style={{ color: "hsl(160 70% 45%)" }}>призвание</span>
            </h2>
          </div>

          <div className={`flex gap-3 mb-10 flex-wrap opacity-0 ${directionsSection.inView ? "animate-fade-up delay-200" : ""}`}>
            {(Object.keys(directions) as DirectionKey[]).map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className="px-6 py-3 rounded-full font-semibold text-sm transition-all hover:scale-105"
                style={activeTab === tab
                  ? { background: "hsl(35 100% 55%)", color: "hsl(20 14% 4%)" }
                  : { background: "hsl(20 12% 12%)", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.08)" }}>
                {tab}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {directions[activeTab].map((item, i) => (
              <div key={item.name}
                className={`p-6 rounded-2xl border cursor-pointer transition-all hover:-translate-y-2 hover:shadow-2xl opacity-0 ${directionsSection.inView ? "animate-fade-up" : ""}`}
                style={{ background: "hsl(20 12% 9%)", borderColor: "rgba(255,255,255,0.06)", animationDelay: `${i * 0.08}s` }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${item.color}22`, border: `1px solid ${item.color}44` }}>
                  <Icon name={item.icon as Parameters<typeof Icon>[0]["name"]} size={22} style={{ color: item.color }} />
                </div>
                <h3 className="text-lg font-bold mb-1" style={{ color: "rgba(255,255,255,0.9)" }}>{item.name}</h3>
                <p className="text-sm mb-4" style={{ color: "rgba(255,255,255,0.35)" }}>{item.age}</p>
                <button className="text-xs font-semibold uppercase tracking-wider flex items-center gap-1 transition-all hover:gap-2"
                  style={{ color: item.color }}>
                  Подробнее <Icon name="ArrowRight" size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section className="py-28 px-6" style={{ background: "hsl(20 14% 4%)" }}>
        <div ref={missionSection.ref} className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className={`text-xs font-bold uppercase tracking-widest opacity-0 ${missionSection.inView ? "animate-fade-up" : ""}`}
                style={{ color: "hsl(330 80% 60%)" }}>03 — Миссия</span>
              <h2 className={`text-5xl sm:text-6xl font-bold uppercase mt-3 mb-6 leading-none opacity-0 ${missionSection.inView ? "animate-fade-up delay-100" : ""}`}
                style={{ color: "rgba(255,255,255,0.95)" }}>
                Помогаем<br />каждому<br />
                <span style={{ color: "hsl(330 80% 60%)" }}>найти себя</span>
              </h2>
              <p className={`text-lg leading-relaxed max-w-md opacity-0 ${missionSection.inView ? "animate-fade-up delay-200" : ""}`}
                style={{ color: "rgba(255,255,255,0.45)" }}>
                Наша миссия — помочь каждому ребёнку найти своё призвание в мире науки, искусства и спорта. Мы создаём пространство, где таланты раскрываются сами.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: "Lightbulb", label: "Развиваем любознательность", color: "hsl(35 100% 55%)" },
                { icon: "Palette", label: "Раскрываем творческий потенциал", color: "hsl(330 80% 60%)" },
                { icon: "Medal", label: "Воспитываем характер через спорт", color: "hsl(160 70% 45%)" },
                { icon: "Heart", label: "Создаём сообщество единомышленников", color: "hsl(210 90% 60%)" },
              ].map((item, i) => (
                <div key={item.label}
                  className={`p-6 rounded-2xl opacity-0 ${missionSection.inView ? "animate-counter" : ""}`}
                  style={{ background: `${item.color}12`, border: `1px solid ${item.color}25`, animationDelay: `${0.2 + i * 0.1}s` }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                    style={{ background: `${item.color}20` }}>
                    <Icon name={item.icon as Parameters<typeof Icon>[0]["name"]} size={20} style={{ color: item.color }} />
                  </div>
                  <p className="text-sm font-medium leading-snug" style={{ color: "rgba(255,255,255,0.75)" }}>{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* NEWS */}
      <section className="py-28 px-6" style={{ background: "hsl(20 12% 6%)" }}>
        <div ref={newsSection.ref} className="container mx-auto">
          <div className={`flex items-end justify-between mb-12 opacity-0 ${newsSection.inView ? "animate-fade-up" : ""}`}>
            <div>
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "hsl(210 90% 60%)" }}>04 — Новости</span>
              <h2 className="text-5xl sm:text-6xl font-bold uppercase mt-3" style={{ color: "rgba(255,255,255,0.95)" }}>
                Живём<br /><span style={{ color: "hsl(210 90% 60%)" }}>ярко</span>
              </h2>
            </div>
            <button className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold transition-all hover:gap-3"
              style={{ color: "hsl(210 90% 60%)" }}>
              Все новости <Icon name="ArrowRight" size={16} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {news.map((item, i) => (
              <div key={i}
                className={`group p-6 rounded-2xl border cursor-pointer transition-all hover:-translate-y-2 opacity-0 ${newsSection.inView ? "animate-fade-up" : ""}`}
                style={{ background: "hsl(20 12% 9%)", borderColor: "rgba(255,255,255,0.06)", animationDelay: `${i * 0.1}s` }}>
                <div className="inline-block text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4"
                  style={{ background: `${item.color}22`, color: item.color }}>{item.tag}</div>
                <h3 className="text-base font-bold leading-snug mb-4 transition-colors" style={{ color: "rgba(255,255,255,0.85)" }}>{item.title}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>{item.date}</span>
                  <Icon name="ArrowUpRight" size={16} style={{ color: "rgba(255,255,255,0.25)" }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-28 px-6" style={{ background: "hsl(20 14% 4%)" }}>
        <div ref={testimonialsSection.ref} className="container mx-auto">
          <div className={`text-center mb-12 opacity-0 ${testimonialsSection.inView ? "animate-fade-up" : ""}`}>
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "hsl(270 70% 60%)" }}>05 — Отзывы</span>
            <h2 className="text-5xl sm:text-6xl font-bold uppercase mt-3" style={{ color: "rgba(255,255,255,0.95)" }}>
              Говорят<br /><span style={{ color: "hsl(270 70% 60%)" }}>родители</span>
            </h2>
          </div>

          <div className={`max-w-3xl mx-auto opacity-0 ${testimonialsSection.inView ? "animate-fade-up delay-200" : ""}`}>
            <div className="p-10 rounded-3xl relative overflow-hidden"
              style={{ background: "hsl(20 12% 7%)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="absolute top-4 right-8 text-8xl font-bold select-none opacity-[0.04]"
                style={{ fontFamily: "Oswald, sans-serif", color: "hsl(270 70% 60%)" }}>"</div>
              <p className="text-xl leading-relaxed mb-8 relative z-10" style={{ color: "rgba(255,255,255,0.75)" }}>
                "{testimonials[activeTestimonial].text}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
                  style={{ background: "hsl(20 12% 14%)" }}>
                  {testimonials[activeTestimonial].avatar}
                </div>
                <div>
                  <div className="font-bold" style={{ color: "rgba(255,255,255,0.9)" }}>{testimonials[activeTestimonial].name}</div>
                  <div className="text-sm" style={{ color: "rgba(255,255,255,0.35)" }}>{testimonials[activeTestimonial].role}</div>
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setActiveTestimonial(i)}
                  className="transition-all rounded-full"
                  style={{ width: i === activeTestimonial ? "24px" : "8px", height: "8px", background: i === activeTestimonial ? "hsl(270 70% 60%)" : "hsl(20 12% 20%)" }} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-28 px-6" style={{ background: "hsl(20 12% 5%)" }}>
        <div ref={contactsSection.ref} className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <span className={`text-xs font-bold uppercase tracking-widest opacity-0 ${contactsSection.inView ? "animate-fade-up" : ""}`}
                style={{ color: "hsl(160 70% 45%)" }}>06 — Контакты</span>
              <h2 className={`text-5xl sm:text-6xl font-bold uppercase mt-3 mb-8 leading-none opacity-0 ${contactsSection.inView ? "animate-fade-up delay-100" : ""}`}
                style={{ color: "rgba(255,255,255,0.95)" }}>
                Запишите<br /><span style={{ color: "hsl(160 70% 45%)" }}>ребёнка</span><br />сегодня
              </h2>

              <div className={`space-y-4 opacity-0 ${contactsSection.inView ? "animate-fade-up delay-200" : ""}`}>
                {[
                  { icon: "MapPin", label: "Адрес", value: "г. Иркутск, ул. Розы Люксембург, 8" },
                  { icon: "Phone", label: "Телефон", value: "+7 (3952) 20-09-87" },
                  { icon: "Clock", label: "Режим работы", value: "Пн–Пт: 9:00–19:00, Сб: 10:00–16:00" },
                ].map(c => (
                  <div key={c.label} className="flex items-start gap-4 p-4 rounded-2xl"
                    style={{ background: "hsl(20 12% 9%)", border: "1px solid rgba(255,255,255,0.05)" }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: "hsl(160 70% 45% / 0.12)" }}>
                      <Icon name={c.icon as Parameters<typeof Icon>[0]["name"]} size={18} style={{ color: "hsl(160 70% 45%)" }} />
                    </div>
                    <div>
                      <div className="text-xs mb-1" style={{ color: "rgba(255,255,255,0.35)" }}>{c.label}</div>
                      <div className="font-medium" style={{ color: "rgba(255,255,255,0.85)" }}>{c.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={`p-8 rounded-3xl opacity-0 ${contactsSection.inView ? "animate-fade-up delay-300" : ""}`}
              style={{ background: "linear-gradient(135deg, hsl(35 100% 55% / 0.12), hsl(330 80% 60% / 0.08))", border: "1px solid hsl(35 100% 55% / 0.18)" }}>
              <h3 className="text-3xl font-bold uppercase mb-2" style={{ color: "rgba(255,255,255,0.95)", fontFamily: "Oswald, sans-serif" }}>Готовы начать?</h3>
              <p className="mb-8" style={{ color: "rgba(255,255,255,0.45)" }}>Оставьте заявку, и наш администратор свяжется с вами в течение дня.</p>

              <div className="space-y-3 mb-6">
                <input type="text" placeholder="Имя ребёнка и возраст"
                  className="w-full px-5 py-4 rounded-2xl outline-none transition-all focus:ring-2 ring-orange-400"
                  style={{ background: "hsl(20 12% 8%)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.9)" }} />
                <input type="tel" placeholder="Ваш телефон"
                  className="w-full px-5 py-4 rounded-2xl outline-none transition-all focus:ring-2 ring-orange-400"
                  style={{ background: "hsl(20 12% 8%)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.9)" }} />
              </div>

              <button className="w-full py-4 rounded-2xl font-bold text-base transition-all hover:scale-[1.02]"
                style={{ background: "hsl(35 100% 55%)", color: "hsl(20 14% 4%)", boxShadow: "0 0 40px hsl(35 100% 55% / 0.3)" }}>
                Отправить заявку
              </button>

              <div className="flex gap-3 mt-4">
                <a href="https://t.me/" className="flex-1 py-3 rounded-xl text-center text-sm font-semibold transition-all hover:scale-105"
                  style={{ background: "rgba(41,182,246,0.12)", color: "#29b6f6", border: "1px solid rgba(41,182,246,0.2)" }}>Telegram</a>
                <a href="https://wa.me/" className="flex-1 py-3 rounded-xl text-center text-sm font-semibold transition-all hover:scale-105"
                  style={{ background: "rgba(37,211,102,0.12)", color: "#25d366", border: "1px solid rgba(37,211,102,0.2)" }}>WhatsApp</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 px-6" style={{ borderTop: "1px solid rgba(255,255,255,0.06)", background: "hsl(20 14% 3%)" }}>
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm"
          style={{ color: "rgba(255,255,255,0.25)" }}>
          <span>© 2025 Дом детского творчества №5, Иркутск</span>
          <span>МБУДО «ДДТ №5»</span>
        </div>
      </footer>
    </div>
  );
}
