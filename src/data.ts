export const IMG = {
  heroDog: "https://image.qwenlm.ai/generated-images/010ba6ed-be41-445b-98d0-dbd3ece83dbc/_result.png",
  catSuite: "https://image.qwenlm.ai/generated-images/01cceff0-85df-4ad7-a4a7-59e8a33f28b9/_result.png",
  dogPlay: "https://image.qwenlm.ai/generated-images/288a8bc3-68e0-4b4e-9e36-d7dc9f58feba/_result.png",
  spa: "https://image.qwenlm.ai/generated-images/7de2ad93-a3ae-4ea5-878d-3c188f46a042/_result.png",
  rabbit: "https://image.qwenlm.ai/generated-images/286d43d9-4086-4b91-86e8-e939faa0c782/_result.png",
  suite: "https://image.qwenlm.ai/generated-images/36611731-d2f9-4f08-905a-113d3a487908/_result.png",
  daycare: "https://image.qwenlm.ai/generated-images/a5185169-509a-486b-9e54-9de5e7ae26fd/_result.png",
  corgi: "https://image.qwenlm.ai/generated-images/b4e031a0-c495-4fa3-852f-8f65dd79718c/_result.png",
  maineCoon: "https://image.qwenlm.ai/generated-images/9a7a9e0e-47e0-426e-9b78-2db0b2a749da/_result.png",
};

export const TICKER_ITEMS = [
  "Собачий отель",
  "Кошачьи люксы",
  "Груминг-спа",
  "Ветеринар 24/7",
  "Дог- и кэт-ситтинг",
  "Зоотакси",
  "Живой видеоканал",
  "Щенячий детский сад",
];

export const STATS = [
  { value: 12, suffix: " лет", label: "заботы о хвостатых" },
  { value: 68, suffix: "", label: "уютных номеров" },
  { value: 9400, suffix: "+", label: "довольных постояльцев" },
  { value: 24, suffix: "/7", label: "ветеринар на связи" },
];

export type Service = {
  icon: "paw" | "bowl" | "scissors" | "stetho" | "camera" | "car";
  title: string;
  text: string;
  tag?: string;
  photo?: string;
  wide?: boolean;
  dark?: boolean;
};

export const SERVICES: Service[] = [
  {
    icon: "paw",
    title: "Проживание",
    text: "Номера с климат-контролем, ортопедическими лежанками и ежевечерним ритуалом «почесать за ушком».",
    tag: "от 990 ₽/ночь",
  },
  {
    icon: "bowl",
    title: "Ресторан «Миска»",
    text: "Пятиразовое питание по меню владельца или шеф-рацион от нашего зоодиетолога. Вода из фонтанчика — безлимит.",
  },
  {
    icon: "scissors",
    title: "Груминг-спа",
    text: "Стрижка, SPA-купание с пузырьками, чистка ушек и маникюр. Выходит — как с обложки журнала.",
    tag: "хит",
    photo: IMG.spa,
    wide: true,
  },
  {
    icon: "stetho",
    title: "Ветеринар 24/7",
    text: "Штатный врач живёт в соседнем кабинете. Ежедневный осмотр, приём таблеток по расписанию, отчёт владельцу.",
    dark: true,
  },
  {
    icon: "camera",
    title: "Видеоканал",
    text: "Смотрите на своего хвостатого из любой точки мира: 6 камер, трансляция в приложение и фотоотчёты трижды в день.",
  },
  {
    icon: "car",
    title: "Зоотакси",
    text: "Заберём из дома и привезём обратно. Переноски, автогамаки и водитель, который умеет говорить «хороший пёс».",
    photo: IMG.dogPlay,
    wide: true,
  },
];

export type Room = {
  name: string;
  price: number;
  area: string;
  photo: string;
  featured?: boolean;
  features: string[];
  badge?: string;
};

export const ROOMS: Room[] = [
  {
    name: "Эконом «Конура+»",
    price: 990,
    area: "6 м²",
    photo: IMG.daycare,
    features: [
      "Тёплый бокс с лежанкой",
      "Выгул 3 раза в день",
      "Кормление по графику",
      "Фотоотчёт 1 раз в день",
    ],
  },
  {
    name: "Стандарт «Нора»",
    price: 1590,
    area: "12 м²",
    photo: IMG.catSuite,
    featured: true,
    badge: "выбирают чаще всего",
    features: [
      "Отдельный номер с окном",
      "Игровые группы 2 раза в день",
      "Видеотрансляция 24/7",
      "Фотоотчёты 3 раза в день",
      "Ежедневный осмотр ветеринара",
    ],
  },
  {
    name: "Люкс «Берлога»",
    price: 2490,
    area: "20 м²",
    photo: IMG.suite,
    features: [
      "Двухкомнатный номер-студия",
      "Персональный нянька-кинолог",
      "SPA-процедуры каждую неделю",
      "Прогулки в лесопарке",
      "Ужин при свечах (почти)",
    ],
  },
];

export type Guest = { name: string; kind: string; quote: string; photo: string; stays: number };

export const GUESTS: Guest[] = [
  { name: "Барни", kind: "золотистый ретривер", quote: "Живу здесь, когда хозяева на Бали", photo: IMG.heroDog, stays: 14 },
  { name: "Клеопатра", kind: "британская кошка", quote: "Требую тунца и уважения", photo: IMG.catSuite, stays: 9 },
  { name: "Батон", kind: "корги", quote: "Пришёл за батоном — остался жить", photo: IMG.corgi, stays: 21 },
  { name: "Зефир", kind: "кролик", quote: "Сено — это высокая кухня", photo: IMG.rabbit, stays: 6 },
  { name: "Граф", kind: "мейн-кун", quote: "Шерсть сама себя не вылижет", photo: IMG.maineCoon, stays: 11 },
  { name: "Тайсон", kind: "джек-рассел", quote: "Мячики. МЯЧИКИ!!!", photo: IMG.dogPlay, stays: 17 },
];

export const SCHEDULE = [
  { time: "08:00", title: "Подъём и завтрак", text: "Шеф-повар «Миски» сервирует каши и паучи" },
  { time: "09:30", title: "Утренняя прогулка", text: "Парк, мячики и обязательные лужи" },
  { time: "11:00", title: "Игровые группы", text: "Собаки — в зал, кошки — на вертикальный город" },
  { time: "13:00", title: "Обед и тихий час", text: "Сон под классическую музыку для хвостов" },
  { time: "15:30", title: "SPA и груминг", text: "Купание, расчёсывание, маникюр" },
  { time: "17:30", title: "Вечерняя прогулка", text: "Закат, друзья и палка мечты" },
  { time: "19:30", title: "Ужин и видеозвонок", text: "Созвон с хозяином — по запросу" },
  { time: "21:00", title: "Обнимашки и отбой", text: "Ночная нянька проверяет одеялки" },
];

export const GALLERY = [
  { src: IMG.dogPlay, caption: "Игровой зал «Мяч&Лай»", span: "wide" },
  { src: IMG.catSuite, caption: "Кошачий вертикальный город", span: "tall" },
  { src: IMG.spa, caption: "SPA-салон «Пузырьки»", span: "small" },
  { src: IMG.suite, caption: "Люкс «Берлога»", span: "small" },
  { src: IMG.rabbit, caption: "Сено-лаунж для кроликов", span: "tall" },
  { src: IMG.daycare, caption: "Щенячий детский сад", span: "wide" },
];

export const TESTIMONIALS = [
  {
    name: "Анна и Батон",
    role: "корги, 4 года",
    photo: IMG.corgi,
    text: "Уезжали на месяц — Батон вернулся счастливее, чем был! Каждое утро присылали видео, как он носится с мячиком. Теперь он сам тянет поводок в сторону отеля.",
    rotate: -3,
  },
  {
    name: "Дмитрий и Клеопатра",
    role: "британская кошка, 6 лет",
    text: "Кошка-мизантроп, не любит никого, кроме дивана. Здесь её уговорили играть! Вернулась ухоженная, с маникюром и лёгким презрением к домашнему корму.",
    photo: IMG.maineCoon,
    rotate: 2,
  },
  {
    name: "Мария и Тайсон",
    role: "джек-рассел, 2 года",
    text: "Ветеринар заметил, что у Тайсона чувствительные уши, и поменял шампунь — без наших подсказок. Уровень заботы, о котором я даже не мечтала.",
    photo: IMG.dogPlay,
    rotate: -2,
  },
  {
    name: "Сергей и Зефир",
    role: "кролик, 3 года",
    text: "Кроликов мало кто берёт на передержку, а тут — целый сено-лаунж. Зефир загорел (морально) и выучил трюк «дай лапу». Не верю до сих пор.",
    photo: IMG.rabbit,
    rotate: 3,
  },
];

export const FAQS = [
  {
    q: "Что взять с собой при заселении?",
    a: "Ветпаспорт с отметками о прививках, привычный корм (или доверьтесь нашему зоодиетологу), любимую игрушку для спокойного сна и поводок. Всё остальное — миски, лежанки, пелёнки — у нас есть.",
  },
  {
    q: "А если мой питомец ни с кем не дружит?",
    a: "Не беда: у нас есть отдельные номера и индивидуальные прогулки. Зоопсихолог составит программу мягкой социализации — по желанию, а не по принуждению.",
  },
  {
    q: "Как я узнаю, что всё хорошо?",
    a: "Трижды в день — фотоотчёты в мессенджер, круглосуточно — видеотрансляция из номера и прогулок, плюс ежедневный вердикт ветеринара. Спойлер: почти всегда «спит, ест, счастлив».",
  },
  {
    q: "Можно ли к своему корму и графику кормления?",
    a: "Конечно. Мы кормим строго по вашему расписанию и граммовкам. Хотите — шеф-рацион от зоодиетолога: сначала дегустация, потом заселение.",
  },
  {
    q: "Принимаете ли кошек, кроликов и птиц?",
    a: "Да! Отдельный «тихий этаж» для кошек, сено-лаунж для кроликов и морских свинок, просторные вольеры для птиц. Собаки и кошки живут в разных крыльях и не пересекаются.",
  },
  {
    q: "Что если питомец заболеет?",
    a: "Штатный ветеринар осмотрит в течение 15 минут, при необходимости — партнёрская клиника в 10 минутах езды. Вы получите звонок и полный отчёт. Все действия согласуем с вами.",
  },
];

export type RoomId = "econom" | "standard" | "lux";

export const ROOM_TARIFFS: Record<RoomId, { name: string; price: number }> = {
  econom: { name: "Эконом «Конура+»", price: 990 },
  standard: { name: "Стандарт «Нора»", price: 1590 },
  lux: { name: "Люкс «Берлога»", price: 2490 },
};

export const EXTRAS = [
  { id: "groom", name: "Груминг-спа", price: 1200, perNight: false },
  { id: "walk", name: "Доп. прогулка 2 р/день", price: 350, perNight: true },
  { id: "video", name: "Видеозвонки с питомцем", price: 200, perNight: true },
  { id: "taxi", name: "Зоотакси (туда-обратно)", price: 900, perNight: false },
];

export const PET_TYPES = [
  { id: "dog", label: "Собака" },
  { id: "cat", label: "Кошка" },
  { id: "rabbit", label: "Кролик / грызун" },
  { id: "bird", label: "Птица" },
];

export const fmt = (n: number) => n.toLocaleString("ru-RU") + " ₽";
