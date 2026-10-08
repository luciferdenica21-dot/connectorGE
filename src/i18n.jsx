import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

export const LANGS = ['ru', 'en', 'ge']
const STORAGE_KEY = 'connector.lang'

const messages = {
  ru: {
    'nav.menu': 'Меню',
    'nav.close': 'Закрыть',
    'nav.language': 'Язык',
    'nav.theme': 'Тёмная тема',
    'nav.services': 'Услуги',
    'nav.about': 'О компании',
    'nav.contacts': 'Контакты',
    'menu.about': 'О компании',
    'menu.call': 'Позвонить',
    'menu.credit': 'created by PXD STUDIO',

    'services.bending': 'Гибочные работы по металлам',
    'services.laserGeneral': 'Лазерная резка и гравировка',
    'services.laserMetal': 'Лазерная резка металлов',
    'services.laserNonMetal': 'Лазерная резка и гравировка неметаллов',
    'services.powder': 'Порошковая окраска',
    'services.welding': 'Сварка',
    'services.mech': 'Традиционная механическая обработка',
    'services.cnc': 'ЧПУ фрезеровка',
    'hero.brand': 'CONNECTOR',
    'hero.title': '— производственные услуги по вашим запросам',
    'hero.subtitle':
      'Полный производственный цикл обработки металлов и неметаллов на современных ЧПУ-станках. Обеспечиваем точное соответствие спецификациям, строгое соблюдение допусков и прозрачные сроки выполнения по договору.',
    'hero.ctaTelegram': 'Telegram',
    'hero.ctaWhatsapp': 'WhatsApp',
    'hero.order': 'Здесь вы можете заказать:',

    'about.title': 'О компании',
    'about.lead': 'CONNECTOR — производственная база полного цикла',
    'about.p1':
      'CONNECTOR объединяет в единую систему полный спектр технологий металлообработки и работы с листовыми материалами. Мы закрываем весь цепной процесс внутри одной площадки: от проработки конструкторской документации и раскроя до точной механообработки, сварки и финишного защитного покрытия.',
    'about.p2':
      'Автоматизированный парк станков с ЧПУ и инженерный контроль на каждом этапе позволяют нам реализовывать сложные технологические задачи — от единичных прототипов и авторских архитектурных элементов до крупносерийных промышленных партий со строгим соблюдением геометрии и допусков.',
    'about.p3':
      'Работаем по договору, предоставляем документы с НДС, соблюдаем сроки и гарантируем точность на всех операциях — лазерная резка, гибка, ЧПУ-фрезеровка, сварка и порошковая окраска.',
    'about.point1': 'Сроки от 1 дня',
    'about.point1sub': 'Срочные партии и образцы',
    'about.point2': 'ЧПУ-оборудование',
    'about.point2sub': 'Точность на всей партии',
    'about.point3': 'По договору и с НДС',
    'about.point3sub': 'Документы и гарантия качества',
    'about.contact': 'Связаться с нами',

    'contacts.title': 'Контакты',
    'contacts.lead':
      'Свяжитесь с нами любым удобным способом — отвечаем ежедневно с 9:00 до 22:00. Расскажем о возможностях, сроках и стоимости по вашему чертежу.',
    'contacts.hours': 'Ежедневно с 9:00 до 22:00',
    'contacts.response': 'Ответим в течение рабочего дня',
    'contacts.call': 'Позвонить',
    'contacts.write': 'Написать',
  },

  en: {
    'nav.menu': 'Menu',
    'nav.close': 'Close',
    'nav.language': 'Language',
    'nav.theme': 'Dark theme',
    'nav.services': 'Services',
    'nav.about': 'About us',
    'nav.contacts': 'Contacts',
    'menu.about': 'About us',
    'menu.call': 'Call us',
    'menu.credit': 'created by PXD STUDIO',

    'services.bending': 'Metal bending services',
    'services.laserGeneral': 'Laser cutting and engraving',
    'services.laserMetal': 'Metal laser cutting',
    'services.laserNonMetal': 'Laser cutting and engraving of non-metals',
    'services.powder': 'Powder coating',
    'services.welding': 'Welding',
    'services.mech': 'Conventional machining',
    'services.cnc': 'CNC milling',
    'hero.brand': 'CONNECTOR',
    'hero.title': '— manufacturing services on your request',
    'hero.subtitle':
      'Full production cycle of metal and non-metal machining on modern CNC machines. We ensure exact compliance with specifications, strict tolerance control and transparent timelines under contract.',
    'hero.ctaTelegram': 'Telegram',
    'hero.ctaWhatsapp': 'WhatsApp',
    'hero.order': 'You can order here:',

    'about.title': 'About us',
    'about.lead': 'CONNECTOR — a full-cycle manufacturing facility',
    'about.p1':
      'CONNECTOR brings the full range of metalworking and sheet-material technologies into a single system. We cover the entire production chain on one site — from engineering documentation and cutting to precision machining, welding and the final protective coating.',
    'about.p2':
      'Our automated CNC machine park and engineering control at every stage let us deliver complex manufacturing tasks — from one-off prototypes and custom architectural elements to large-scale industrial batches with strict geometry and tolerance compliance.',
    'about.p3':
      'We work under contract, provide VAT documents, meet deadlines and guarantee accuracy at every operation — laser cutting, bending, CNC milling, welding and powder coating.',
    'about.point1': 'From 1 day',
    'about.point1sub': 'Urgent batches and prototypes',
    'about.point2': 'CNC equipment',
    'about.point2sub': 'Accuracy across the batch',
    'about.point3': 'Contract and VAT',
    'about.point3sub': 'Documents and quality warranty',
    'about.contact': 'Contact us',

    'contacts.title': 'Contacts',
    'contacts.lead':
      'Reach us any way you prefer — we reply every day from 9:00 to 22:00. We will walk you through capabilities, lead times and pricing for your drawing.',
    'contacts.hours': 'Every day from 9:00 to 22:00',
    'contacts.response': 'We reply within the same business day',
    'contacts.call': 'Call us',
    'contacts.write': 'Message us',
  },

  ge: {
    'nav.menu': 'მენიუ',
    'nav.close': 'დახურვა',
    'nav.language': 'ენა',
    'nav.theme': 'მუქი თემა',
    'nav.services': 'სერვისები',
    'nav.about': 'ჩვენ შესახებ',
    'nav.contacts': 'კონტაქტები',
    'menu.about': 'ჩვენ შესახებ',
    'menu.call': 'დარეკეთ',
    'menu.credit': 'created by PXD STUDIO',

    'services.bending': 'ლითონების მოხვევის სამუშაოები',
    'services.laserGeneral': 'ლაზერული ჭრა და გრავირება',
    'services.laserMetal': 'ლითონების ლაზერული ჭრა',
    'services.laserNonMetal': 'არალითონების ლაზერული ჭრა და გრავირება',
    'services.powder': 'ფხვნილოვანი საღებავით შეღება',
    'services.welding': 'შედუღება',
    'services.mech': 'ტრადიციული მექანიკური დამუშავება',
    'services.cnc': 'CNC ფრეზერება',
    'hero.brand': 'CONNECTOR',
    'hero.title': '— საწარმოო მომსახურება თქვენი მოთხოვნების მიხედვით',
    'hero.subtitle':
      'ლითონებისა და არალითონების დამუშავების სრული საწარმოო ციკლი თანამედროვე CNC დანადგარებზე. ვუზრუნველყოფთ სპეციფიკაციების ზუსტ შესაბამისობას, ტოლერანსების მკაცრ დაცვას და ხელშეკრულებით განსაზღვრულ გამჭვირვალე ვადებს.',
    'hero.ctaTelegram': 'Telegram',
    'hero.ctaWhatsapp': 'WhatsApp',
    'hero.order': 'აქ შეგიძლიათ შეუკვეთოთ:',

    'about.title': 'ჩვენ შესახებ',
    'about.lead': 'CONNECTOR — სრული ციკლის საწარმო ბაზა',
    'about.p1':
      'CONNECTOR აერთიანებს ლითონისა და ფურცლოვანი მასალების დამუშავების სრულ სპექტრს ერთ სისტემაში. ჩვენ ვფარავთ მთელ საწარმოო ციკლს ერთ მოედანზე: საკონსტრუქციო დოკუმენტაციის დამუშავებიდან და ამოჭრიდან ზუსტ მექანიკურ დამუშავებამდე, შედუღებამდე და საბოლოო დამცავ საფარამდე.',
    'about.p2':
      'CNC დანადგარების ავტომატიზებული პარკი და ინჟინრული კონტროლი ყოველ ეტაპზე გვაძლევს საშუალებას განვახორციელოთ რთული საწარმოო ამოცანები — ერთეული პროტოტიპებიდან და ავტორული არქიტექტურული ელემენტებიდან მსხვილ სერიულ სამრეწველო პარტიებამდე, გეომეტრიისა და ტოლერანსების მკაცრი დაცვით.',
    'about.p3':
      'ვმუშაობთ ხელშეკრულებით, ვაწვდით დოკუმენტებს დღგ-ით, ვიცავთ ვადებს და ვიძლევით სიზუსტის გარანტიას ყველა ოპერაციაზე — ლაზერული ჭრა, მოხვევა, CNC ფრეზერება, შედუღება და ფხვნილოვანი შეღება.',
    'about.point1': 'ვადები 1 დღიდან',
    'about.point1sub': 'სასწრაფო პარტიები და ნიმუშები',
    'about.point2': 'CNC აღჭურვილობა',
    'about.point2sub': 'სიზუსტე მთელ პარტიაზე',
    'about.point3': 'ხელშეკრულებით და დღგ-ით',
    'about.point3sub': 'დოკუმენტები და ხარისხის გარანტია',
    'about.contact': 'დაგვიკავშირდით',

    'contacts.title': 'კონტაქტები',
    'contacts.lead':
      'დაგვიკავშირდით ნებისმიერი მოსახერხებელი გზით — პასუხს ვცემთ ყოველდღე 9:00-დან 22:00-მდე. მოგითხრობთ შესაძლებლობებზე, ვადებსა და ფასებზე თქვენი ნახაზის მიხედვით.',
    'contacts.hours': 'ყოველდღე 9:00-დან 22:00-მდე',
    'contacts.response': 'პასუხს ვცემთ სამუშაო დღის განმავლობაში',
    'contacts.call': 'დარეკეთ',
    'contacts.write': 'მოგვწერეთ',
  },
}

const LangContext = createContext(null)

export function LangProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    if (typeof window === 'undefined') return 'ru'
    const saved = window.localStorage.getItem(STORAGE_KEY)
    return LANGS.includes(saved) ? saved : 'ru'
  })

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, lang)
    document.documentElement.lang = lang === 'ge' ? 'ka' : lang
  }, [lang])

  const t = useCallback(
    (key) => {
      const table = messages[lang] || messages.ru
      return table[key] ?? messages.ru[key] ?? key
    },
    [lang],
  )

  const value = useMemo(() => ({ lang, setLang: setLangState, t, langs: LANGS }), [lang, t])

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}

export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang must be used inside <LangProvider>')
  return ctx
}

// Порядок услуг совпадает с порядком в бургер-меню.
// photos — фото-карусель услуги: файлы <префикс><номер>.webp, все 500×500.
// poster — первое фото набора (старых одиночных постеров в assets больше нет).
const photoSet = (prefix, count) =>
  Array.from({ length: count }, (_, i) => `/assets/${prefix}${i + 1}.webp`)

export const SERVICES = [
  {
    id: 'bending',
    video: '/assets/bending.mp4',
    poster: '/assets/b1.webp',
    photos: photoSet('b', 9),
  },
  {
    id: 'laserGeneral',
    video: '/assets/graving.mp4',
    poster: '/assets/g1.webp',
    photos: photoSet('g', 12),
  },
  {
    id: 'laserMetal',
    video: '/assets/lasermetal.mp4',
    poster: '/assets/lc1.webp',
    photos: photoSet('lc', 8),
  },
  {
    id: 'laserNonMetal',
    video: '/assets/cutting.mp4',
    poster: '/assets/nm1.webp',
    photos: photoSet('nm', 7),
  },
  {
    id: 'powder',
    video: '/assets/paint.mp4',
    poster: '/assets/p1.webp',
    photos: photoSet('p', 11),
  },
  {
    id: 'welding',
    video: '/assets/welding.mp4',
    poster: '/assets/w1.webp',
    photos: photoSet('w', 10),
  },
  {
    id: 'mech',
    video: '/assets/mech.mp4',
    poster: '/assets/m1.webp',
    photos: photoSet('m', 12),
  },
  {
    id: 'cnc',
    video: '/assets/cnc.mp4',
    poster: '/assets/c1.webp',
    photos: photoSet('c', 9),
  },
]

// Детальные тексты услуг для секции «Услуги» (структурированные блоки).
// Блоки: lead — вводный абзац; h — подзаголовок; p — абзац;
// list — пункты «в рамках»; chips — пилюли материалов.
// Услуг, которых нет в SERVICES (жидкостная окраска, продажа материалов,
// подготовка файлов), здесь намеренно нет.
export const SERVICE_DETAILS = {
  ru: {
    bending: {
      lead:
        'ЧПУ-гибка листовых металлических материалов (пресс-брейк) — высокоточное формирование деталей. Это процесс холодного формования, который позволяет создавать объёмные детали с заданными углами и радиусами.',
      blocks: [
        {
          k: 'p',
          v: 'Процесс гибки осуществляется с помощью гидравлического или электромеханического пресса. Листовой материал заготовки помещается между двумя основными элементами:',
        },
        {
          k: 'list',
          items: [
            'Матрица (V-образная канавка) — неподвижная нижняя часть, определяющая форму изгиба.',
            'Пуансон (клинообразный инструмент) — подвижная верхняя часть, которая опускается и вдавливает лист в матрицу.',
          ],
        },
        {
          k: 'p',
          v: 'Станок, работающий с усилием до 300 тонн, обеспечивает точное и мощное давление, необходимое для пластической деформации даже толстых и высокопрочных металлических листов. ЧПУ-система контролирует глубину опускания пуансона и положение задних упоров, гарантируя высокую повторяемость и точность угла гиба.',
        },
        {
          k: 'list',
          items: [
            'Прецизионность: точность угла гиба до 0.1 градуса.',
            'Высокая производительность: автоматизация и ЧПУ-управление ускоряют процесс изготовления серийных деталей.',
            'Снижение стоимости: замена сварных соединений гибкой уменьшает количество технологических операций.',
          ],
        },
        {
          k: 'p',
          v: 'Технология незаменима в машиностроении, строительстве, производстве корпусов и элементов вентиляционных систем.',
        },
        {
          k: 'chips',
          items: [
            'Углеродистые (чёрные) стали',
            'Нержавеющие стали',
            'Оцинкованные стали',
            'Алюминиевые сплавы',
            'Медные и латунные листы',
          ],
        },
      ],
    },
    laserGeneral: {
      lead:
        'Лазерная гравировка — современный способ нанесения изображений и надписей, при котором тонкий лазерный луч испаряет верхний слой материала. Это не просто печать: изменение структуры поверхности делает изображение практически вечным.',
      blocks: [
        {
          k: 'list',
          items: [
            'Долговечность: гравировка не стирается, не выцветает на солнце и не боится влаги — она служит столько же, сколько и само изделие.',
            'Ювелирная точность: детализация до 0,01 мм позволяет наносить сложные логотипы, мелкие шрифты и детальные фотографии.',
            'Безопасность для изделия: бесконтактный метод исключает деформацию или повреждение предмета.',
            'Универсальность: работаем с металлом, деревом, кожей, стеклом, пластиком и камнем.',
          ],
        },
        {
          k: 'chips',
          items: [
            'Металл',
            'Дерево',
            'Кожа',
            'Стекло',
            'Пластик',
            'Камень',
          ],
        },
      ],
    },
    laserMetal: {
      lead:
        'Лазерная резка — высокоточный метод термической обработки материалов на основе сфокусированного лазера. Луч высокой мощности направляется на поверхность металла, мгновенно нагревая и расплавляя или испаряя его в точке контакта.',
      blocks: [
        {
          k: 'p',
          v: 'Для удаления расплава и продуктов горения из зоны реза используется вспомогательный газ (кислород, азот или воздух), подаваемый под давлением. Это позволяет получать узкий, чистый рез с минимальной зоной термического влияния (ЗТВ), что практически исключает деформацию заготовки.',
        },
        { k: 'h', v: 'Ключевые технологические характеристики' },
        {
          k: 'list',
          items: [
            'Прецизионность: точность позиционирования до десятых и сотых долей миллиметра.',
            'Универсальность: чёрные и нержавеющие стали, а также цветные металлы (алюминий, медь).',
            'Качество кромки: гладкий рез, не требующий последующей механической обработки.',
            'Программное управление: ЧПУ обеспечивает высокую повторяемость и изготовление деталей сложной конфигурации.',
          ],
        },
        { k: 'p', v: 'Эта технология оптимальна для задач, требующих высокой точности и чистоты реза.' },
        {
          k: 'chips',
          items: [
            'Углеродистая сталь',
            'Нержавеющая сталь',
            'Алюминий',
            'Медь',
          ],
        },
      ],
    },
    laserNonMetal: {
      lead:
        'Лазерная обработка неметаллических материалов, как правило, осуществляется с помощью CO2-лазеров с длиной волны около 10,6 мкм. Принцип действия основан на высокоточной термической сублимации: сфокусированный луч мгновенно нагревает материал, вызывая его испарение или плавление по заданному контуру.',
      blocks: [
        {
          k: 'p',
          v: 'Процесс обеспечивает точные, узкие резы и минимизирует зону теплового воздействия (ЗТВ), сохраняя свойства материала. В режиме гравировки лазер контролируемо снимает тонкий верхний слой, создавая рельефное или цветовое изображение.',
        },
        {
          k: 'list',
          items: [
            'Контроль глубины: высокая управляемость позволяет выполнять как сквозную резку, так и поверхностную гравировку.',
            'Прецизионность: точность позиционирования, обеспечиваемая системами ЧПУ, гарантирует высокую повторяемость изделий.',
            'Чистота обработки: отсутствие механического контакта исключает износ инструмента и обеспечивает гладкую кромку.',
          ],
        },
        {
          k: 'p',
          v: 'Технология незаменима для производства сувенирной продукции, рекламных конструкций и высокоточных дизайнерских элементов.',
        },
        {
          k: 'chips',
          items: [
            'Органическое стекло (акрил)',
            'Фанера и дерево',
            'Картон и бумага',
            'Кожа, текстиль и фетр',
            'Резина',
            'Пластики (кроме ПВХ)',
          ],
        },
      ],
    },
    powder: {
      lead:
        'Порошковая окраска — современная технология получения высококачественных защитно-декоративных покрытий без жидких растворителей. Метод обеспечивает исключительную долговечность, экологичность и экономичность.',
      blocks: [
        { k: 'h', v: 'Принцип технологии' },
        {
          k: 'p',
          v: 'Процесс основан на электростатическом нанесении порошка. Частицы полимерной краски заряжаются в специальном пистолете (аппликаторе) и распыляются на заземлённое металлическое изделие. За счёт электростатического притяжения порошок равномерно оседает на всей поверхности, включая сложные формы.',
        },
        {
          k: 'p',
          v: 'После нанесения изделие перемещается в камеру полимеризации, где при 160–200 °C порошок плавится и образует монолитное покрытие. Процесс быстр: не требуется долгого высыхания — покрытие готово сразу после остывания изделия.',
        },
        { k: 'h', v: 'Ключевые характеристики покрытия' },
        {
          k: 'list',
          items: [
            'Твёрдость и износостойкость: устойчивость к механическим повреждениям, истиранию и химическим воздействиям.',
            'Высокая адгезия: за счёт полимеризации покрытие прочно сцепляется с металлом.',
            'Идеальная равномерность: электростатическое поле гарантирует однородность слоя, исключая подтеки и пропуски.',
            'Широкие возможности: богатая палитра цветов и текстур (глянец, мат, муар, шагрень).',
          ],
        },
        {
          k: 'p',
          v: 'Порошковая окраска незаменима для деталей, эксплуатируемых в агрессивных средах или требующих эстетически безупречного и долговечного покрытия.',
        },
        {
          k: 'chips',
          items: [
            'Глянец',
            'Матовое',
            'Муар',
            'Шагрень',
            'Цвета по RAL',
          ],
        },
      ],
    },
    welding: {
      lead:
        'Сварка — фундаментальный технологический процесс получения неразъёмных соединений путём сплавления деталей при локальном или общем нагреве. В зависимости от типа энергии и защитной среды выделяют несколько ключевых методов.',
      blocks: [
        { k: 'h', v: 'MIG / MAG сварка' },
        {
          k: 'p',
          v: 'Проволочный электрод непрерывно подаётся в зону сварки, где расплавляется электрической дугой. Зона защищена от атмосферы газом: инертным (MIG, например аргон) или активным (MAG, например смесь аргона с CO2). Преимущества: высокая скорость и возможность автоматизации делают метод оптимальным для серийного производства. MAG чаще используется для углеродистых сталей, MIG — для цветных металлов.',
        },
        { k: 'h', v: 'TIG сварка' },
        {
          k: 'p',
          v: 'Используется неплавящийся вольфрамовый электрод. Присадочный материал подаётся в зону отдельно или не используется. Сварочная зона и электрод защищены чистым инертным газом (аргон, гелий). Преимущества: исключительное качество и чистота шва, минимальное разбрызгивание, прецизионность и полный контроль над процессом. Незаменимый метод для сварки тонких металлов, нержавеющей стали и алюминия.',
        },
        { k: 'h', v: 'Лазерная сварка' },
        {
          k: 'p',
          v: 'Соединение происходит под действием высококонцентрированного лазерного луча, который мгновенно расплавляет кромки деталей с высокой скоростью. Процесс часто требует минимального количества присадочного материала или обходится без него. Преимущества: сверхмалая зона термического влияния (ЗТВ) исключает деформацию; высокая скорость, точность, возможность сваривать разнородные материалы и тонколистовой металл с глубоким проплавлением.',
        },
        {
          k: 'p',
          v: 'Эти методы обеспечивают прочные и надёжные соединения, являясь основой современного машиностроения и металлообработки.',
        },
        {
          k: 'chips',
          items: [
            'MIG / MAG',
            'TIG',
            'Лазерная сварка',
            'Нержавеющая сталь',
            'Алюминий',
          ],
        },
      ],
    },
    mech: {
      lead:
        'Традиционная механическая обработка — фундаментальный метод создания деталей, основанный на обработке металла резанием. Она включает два основных и взаимодополняющих процесса.',
      blocks: [
        { k: 'h', v: 'Токарная обработка' },
        {
          k: 'list',
          items: [
            'Применяется для формирования деталей, имеющих форму тел вращения (втулки, валы, оси, диски).',
            'Принцип: заготовка жёстко закрепляется в патроне и приводится во вращение; резец перемещается вдоль или поперёк оси, снимая слой материала.',
            'Возможности: обточка, подрезка торцов, растачивание внутренних отверстий и нарезание резьбы.',
          ],
        },
        { k: 'h', v: 'Фрезерная обработка' },
        {
          k: 'list',
          items: [
            'Используется для обработки плоских и фасонных поверхностей, пазов, канавок и корпусных деталей со сложной геометрией.',
            'Принцип: главное движение совершает многолезвийный вращающийся инструмент — фреза; заготовка на рабочем столе перемещается вручную или механизированными подачами.',
            'Возможности: создание плоских поверхностей, выборка пазов и карманов, обработка уступов; эффективна для раскроя и формообразования деталей, не являющихся телами вращения.',
          ],
        },
        {
          k: 'chips',
          items: [
            'Токарная обработка',
            'Фрезерная обработка',
            'Нарезание резьбы',
            'Растачивание отверстий',
            'Пазы и карманы',
          ],
        },
      ],
    },
    cnc: {
      lead:
        'Фрезеровка на станках с ЧПУ (CNC Router) — высокоэффективный метод механической обработки, основанный на удалении материала вращающейся фрезой. Технология позволяет выполнять как точную фрезеровку элементов, так и скоростной раскрой крупноформатных листовых материалов, обеспечивая чистый рез и высокую повторяемость.',
      blocks: [
        {
          k: 'list',
          items: [
            '2D-фрезеровка: плоский раскрой, вырезка контуров, создание пазов, отверстий и гравировка на одной плоскости.',
            '3D-фрезеровка: изготовление объёмных изделий и создание рельефов за счёт точного синхронного управления по трём осям (X, Y, Z).',
          ],
        },
        {
          k: 'p',
          v: 'Современные станки оснащаются системой автоматической смены инструмента (ATC): оборудование самостоятельно меняет фрезы для разных этапов обработки (черновой раскрой, чистовая фрезеровка) без участия оператора. Это значительно ускоряет выполнение сложных и многооперационных проектов.',
        },
        {
          k: 'p',
          v: 'Технология ЧПУ-фрезеровки незаменима в производстве мебели, наружной рекламы и сложных дизайнерских элементов.',
        },
        {
          k: 'chips',
          items: [
            'Фанера, МДФ, ДСП, массив дерева',
            'Оргстекло (акрил), ПВХ, поликарбонат, ПЭТ',
            'Алюминиевые композитные панели (АКП)',
          ],
        },
      ],
    },
  },

  en: {
    bending: {
      lead:
        'CNC sheet metal bending (press brake) is high-precision part forming — a cold-forming process that allows creating three-dimensional parts with specified angles and radii.',
      blocks: [
        {
          k: 'p',
          v: 'The bending process is carried out using a hydraulic or electromechanical press. The sheet metal workpiece is placed between two primary elements:',
        },
        {
          k: 'list',
          items: [
            'Die (V-shaped groove) — the stationary bottom part that determines the shape of the bend.',
            'Punch (wedge-shaped tool) — the mobile upper part that descends and presses the sheet into the die.',
          ],
        },
        {
          k: 'p',
          v: 'Operating with a force of up to 300 tons, the machine provides the precise and powerful pressure required for plastic deformation of even thick and high-strength metal sheets. The CNC system controls the punch stroke depth and the position of the back gauges, guaranteeing high repeatability and precision of the bend angle.',
        },
        {
          k: 'list',
          items: [
            'Precision: bend angle accuracy of up to 0.1 degrees.',
            'High productivity: automation and CNC control accelerate the manufacturing of mass-produced parts.',
            'Cost reduction: replacing welded joints with bends reduces the number of technological operations.',
          ],
        },
        {
          k: 'p',
          v: 'This technology is indispensable in mechanical engineering, construction, and the production of enclosures and ventilation system components.',
        },
        {
          k: 'chips',
          items: [
            'Carbon (mild) steels',
            'Stainless steels',
            'Galvanized steels',
            'Aluminum alloys',
            'Copper and brass sheets',
          ],
        },
      ],
    },
    laserGeneral: {
      lead:
        'Laser engraving is a modern method of applying images and inscriptions where a thin laser beam evaporates the top layer of the material. This is not merely printing — altering the surface structure makes the image practically eternal.',
      blocks: [
        {
          k: 'list',
          items: [
            'Durability: the engraving does not wear off, does not fade in the sun and is moisture-proof — it lasts as long as the item itself.',
            'Jewelry-grade precision: detail down to 0.01 mm allows complex logos, small fonts and detailed photographs.',
            'Product safety: the non-contact method eliminates deformation or damage to the object.',
            'Versatility: we work with metal, wood, leather, glass, plastic and stone.',
          ],
        },
        {
          k: 'chips',
          items: [
            'Metal',
            'Wood',
            'Leather',
            'Glass',
            'Plastic',
            'Stone',
          ],
        },
      ],
    },
    laserMetal: {
      lead:
        'Laser cutting is a high-precision thermal processing method based on a focused laser. A high-power beam is directed onto the metal surface, instantly heating and melting or evaporating it at the point of contact.',
      blocks: [
        {
          k: 'p',
          v: 'An assist gas (oxygen, nitrogen or air) supplied under pressure removes the melt and combustion products from the cutting zone. This produces a narrow, clean kerf with a minimal heat-affected zone (HAZ), which practically eliminates workpiece deformation.',
        },
        { k: 'h', v: 'Key technological characteristics' },
        {
          k: 'list',
          items: [
            'Precision: positioning accuracy down to tenths and hundredths of a millimeter.',
            'Versatility: carbon and stainless steels, as well as non-ferrous metals (aluminum, copper).',
            'Edge quality: a smooth cut that requires no subsequent mechanical machining.',
            'Program control: CNC ensures high repeatability and parts with complex configurations.',
          ],
        },
        { k: 'p', v: 'This technology is optimal for tasks requiring high precision and a clean cut.' },
        {
          k: 'chips',
          items: [
            'Carbon steel',
            'Stainless steel',
            'Aluminum',
            'Copper',
          ],
        },
      ],
    },
    laserNonMetal: {
      lead:
        'Laser processing of non-metallic materials is generally carried out using CO2 lasers with a wavelength of about 10.6 μm. The principle is based on high-precision thermal sublimation: a focused beam instantly heats the material, causing it to evaporate or melt along a specified contour.',
      blocks: [
        {
          k: 'p',
          v: 'The process produces precise, narrow cuts and minimizes the heat-affected zone (HAZ), preserving material properties. In engraving mode the laser removes a thin top layer in a controlled manner, creating a relief or color image.',
        },
        {
          k: 'list',
          items: [
            'Depth control: high controllability allows both through-cutting and surface engraving.',
            'Precision: positioning accuracy provided by CNC systems guarantees high repeatability.',
            'Processing cleanliness: no mechanical contact eliminates tool wear and ensures a smooth edge.',
          ],
        },
        {
          k: 'p',
          v: 'This technology is indispensable for souvenir products, advertising structures and high-precision design elements.',
        },
        {
          k: 'chips',
          items: [
            'Organic glass (acrylic)',
            'Plywood and wood',
            'Cardboard and paper',
            'Leather, textiles and felt',
            'Rubber',
            'Plastics (except PVC)',
          ],
        },
      ],
    },
    powder: {
      lead:
        'Powder coating is a modern technology for high-quality protective and decorative coatings without liquid solvents. The method provides exceptional durability, environmental friendliness and cost-effectiveness.',
      blocks: [
        { k: 'h', v: 'Technology principle' },
        {
          k: 'p',
          v: 'The process is based on electrostatic powder application. Particles of polymer paint are charged in a special spray gun (applicator) and sprayed onto a grounded metal product. Due to electrostatic attraction, the powder settles uniformly over the entire surface, including complex shapes.',
        },
        {
          k: 'p',
          v: 'After application the product moves into a polymerization chamber where at 160–200 °C the powder melts and forms a monolithic coating. The process is fast: no long drying time — the coating is ready as soon as the product cools down.',
        },
        { k: 'h', v: 'Key coating characteristics' },
        {
          k: 'list',
          items: [
            'Hardness and wear resistance: resistant to mechanical damage, abrasion and chemical influences.',
            'High adhesion: polymerization bonds the coating firmly to the metal.',
            'Perfect uniformity: the electrostatic field guarantees a homogeneous layer, eliminating sags and gaps.',
            'Vast possibilities: a rich palette of colors and textures (gloss, matte, moiré, shagreen).',
          ],
        },
        {
          k: 'p',
          v: 'Powder coating is indispensable for parts operated in aggressive environments or requiring an aesthetically flawless and durable finish.',
        },
        {
          k: 'chips',
          items: [
            'Gloss',
            'Matte',
            'Moiré',
            'Shagreen',
            'RAL colours',
          ],
        },
      ],
    },
    welding: {
      lead:
        'Welding is a fundamental technological process for creating permanent joints by fusing parts through local or general heating. Depending on the energy type and shielding environment, several key methods are distinguished.',
      blocks: [
        { k: 'h', v: 'MIG / MAG welding' },
        {
          k: 'p',
          v: 'A wire electrode is continuously fed into the welding zone where it is melted by an electric arc. The zone is shielded from the atmosphere by a gas: inert (MIG, e.g. argon) or active (MAG, e.g. an argon/CO2 mixture). Advantages: high speed and automation potential make it optimal for mass production. MAG is mostly used for carbon steels, MIG for non-ferrous metals.',
        },
        { k: 'h', v: 'TIG welding' },
        {
          k: 'p',
          v: 'A non-consumable tungsten electrode is used. Filler material is fed into the zone separately or not used at all. The welding zone and electrode are protected by pure inert gas (argon, helium). Advantages: exceptional weld quality and cleanliness, minimal spattering, precision and full control of the process. An indispensable method for welding thin metals, stainless steel and aluminum.',
        },
        { k: 'h', v: 'Laser welding' },
        {
          k: 'p',
          v: 'Joining occurs under a highly concentrated laser beam that instantly melts the edges of the parts at high speed. The process often requires minimal filler material or none at all. Advantages: an ultra-small heat-affected zone (HAZ) eliminates deformation, with high speed, precision, and the ability to weld dissimilar materials and thin-sheet metal with deep penetration.',
        },
        {
          k: 'p',
          v: 'These methods provide strong and reliable joints, forming the foundation of modern mechanical engineering and metalworking.',
        },
        {
          k: 'chips',
          items: [
            'MIG / MAG',
            'TIG',
            'Laser welding',
            'Stainless steel',
            'Aluminum',
          ],
        },
      ],
    },
    mech: {
      lead:
        'Traditional mechanical machining is a fundamental method of creating metal and other parts based on metal cutting. It includes two primary and complementary processes.',
      blocks: [
        { k: 'h', v: 'Turning' },
        {
          k: 'list',
          items: [
            'Used to form parts shaped as bodies of revolution (bushings, shafts, axles, discs).',
            'Principle: the workpiece is rigidly clamped in a chuck and set into rotation; the tool moves along or across the rotation axis, removing a layer of material.',
            'Capabilities: turning, facing, boring of internal holes and thread cutting.',
          ],
        },
        { k: 'h', v: 'Milling' },
        {
          k: 'list',
          items: [
            'Used for machining flat and contoured surfaces, slots, grooves and housing parts with complex geometry.',
            'Principle: the main motion is performed by a multi-edged rotating tool — the cutter; the workpiece on the table is moved manually or by mechanized feeds.',
            'Capabilities: creating flat surfaces, machining slots and pockets, processing shoulders; effective for sizing and shaping parts that are not bodies of revolution.',
          ],
        },
        {
          k: 'chips',
          items: [
            'Turning',
            'Milling',
            'Thread cutting',
            'Boring',
            'Slots and pockets',
          ],
        },
      ],
    },
    cnc: {
      lead:
        'CNC milling (CNC Router) is a highly efficient mechanical processing method based on material removal with a rotating cutter. The technology allows both precise milling of elements and high-speed cutting of large-format sheet materials, ensuring a clean cut and high repeatability.',
      blocks: [
        {
          k: 'list',
          items: [
            '2D milling: flat cutting, contouring, creation of slots and holes, and engraving on a single plane.',
            '3D milling: manufacturing of three-dimensional products and creation of reliefs through precise synchronous control along three axes (X, Y, Z).',
          ],
        },
        {
          k: 'p',
          v: 'Modern machines are equipped with an Automatic Tool Changer (ATC): the equipment changes cutters for different processing stages (rough cutting, finish milling) without operator intervention. This significantly accelerates complex, multi-operation projects.',
        },
        {
          k: 'p',
          v: 'CNC milling technology is indispensable in the production of furniture, outdoor advertising and complex design elements.',
        },
        {
          k: 'chips',
          items: [
            'Plywood, MDF, chipboard, solid wood',
            'Organic glass (acrylic), PVC, polycarbonate, PET',
            'Aluminum composite panels (ACP)',
          ],
        },
      ],
    },
  },

  ge: {
    bending: {
      lead:
        'ფურცლის ლითონის ღუნვა რიცხვითი პროგრამული მართვის მქონე დაზგებზე (Press Brake) — დეტალების მაღალი სიზუსტით ფორმირება. ეს ცივი ფორმირების პროცესია, რომელიც მითითებული კუთხეების და რადიუსების მქონე მოცულობითი დეტალების შექმნის საშუალებას იძლევა.',
      blocks: [
        {
          k: 'p',
          v: 'ღუნვის პროცესი ხორციელდება ჰიდრავლიკური ან ელექტრომექანიკური პრესის მეშვეობით. ნამზადის ფურცლოვანი მასალა თავსდება ორ ძირითად ელემენტს შორის:',
        },
        {
          k: 'list',
          items: [
            'მატრიცა (V-მაგვარი ღარი) — ღუნვის ფორმის განმსაზღვრელი უძრავი ქვედა ნაწილი.',
            'პუანსონი (სოლისმაგვარი ინსტრუმენტი) — მოძრავი ზედა ნაწილი, რომელიც ეშვება და ფურცელს მატრიცაში ახვეჭს.',
          ],
        },
        {
          k: 'p',
          v: '300-ტონამდე ძალით მომუშავე დაზგა უზრუნველყოფს ზუსტ და ძლიერ წნევას, რომელიც აუცილებელია სქელი და მაღალი გამძლეობის ლითონის ფურცლების პლასტიკური დეფორმაციისთვის. რპმ-სისტემა აკონტროლებს პუანსონის დაშვების სიღრმეს და უკანა ბრჯენების მდგომარეობას, რითაც მაღალ გამეორებადობასა და ღუნვის კუთხის სიზუსტს იძლევა.',
        },
        {
          k: 'list',
          items: [
            'პრეციზიულობა: ღუნვის კუთხის სიზუსტე 0.1 გრადუსამდე.',
            'მაღალი მწარმოებლობა: ავტომატიზაცია და რპმ-მართვა აჩქარებს სერიული დეტალების დამზადებას.',
            'ღირებულების შემცირება: შედუღებული შეერთებების ღუნვით ჩანაცვლება ამცირებს ტექნოლოგიური ოპერაციების რაოდენობას.',
          ],
        },
        {
          k: 'p',
          v: 'ტექნოლოგია შეუცვლელია მანქანათმშენებლობაში, მშენებლობაში, კორპუსებისა და სავენტილაციო სისტემების ელემენტების წარმოებაში.',
        },
        {
          k: 'chips',
          items: [
            'ნახშირბადიანი (შავი) ფოლადები',
            'უჟანგავი ფოლადები',
            'მოთუთიებული ფოლადები',
            'ალუმინის ნაერთები',
            'სპილენძისა და თითბერის ფურცლები',
          ],
        },
      ],
    },
    laserGeneral: {
      lead:
        'ლაზერული გრავირება — გამოსახულებებისა და წარწერების დატანის თანამედროვე მეთოდი, რომლის დროსაც თხელი ლაზერული სხივი აორთქლებს მასალის ზედა შრეს. ეს მხოლოდ ბეჭდვა არაა — ზედაპირის სტრუქტურის ცვლილება გამოსახულებას თითქმის მარადს ხდის.',
      blocks: [
        {
          k: 'list',
          items: [
            'ხანგრძლივობა: გრავირება არ იცვითება, არ ხუნდება მზეზე და არ ეშინია ნესტის — ის ისევე დიდხანს ძლებს, რამდენიც თავად ნაკეთობა.',
            'საიუველირო სიზუსტე: 0,01 მმ-მდე დეტალიზაცია საშუალებას იძლევა დაიტანოს რთული ლოგოტიპები, წვრილი შრიფტები და დეტალური ფოტოსურათები.',
            'ნაკეთობის უსაფრთხოება: უკონტაქტო მეთოდი გამორიცხავს დეფორმაციას ან დაზიანებას.',
            'უნივერსალურობა: ვმუშაობთ ლითონთან, ხესთან, ტყავთან, მინასთან, პლასტიკთან და ქვასთან.',
          ],
        },
        {
          k: 'chips',
          items: [
            'ლითონი',
            'ხე',
            'ტყავი',
            'მინა',
            'პლასტმასი',
            'ქვა',
          ],
        },
      ],
    },
    laserMetal: {
      lead:
        'ლაზერული ჭრა — მასალების თერმული დამუშავების მაღალი სიზუსტის მეთოდი ფოკუსირებული ლაზერის გამოყენებით. მაღალი სიძლიერის სხივი მიმართულია ლითონის ზედაპირზე და წამიერად აცხელებს, ადნობს ან აორთქლებს მას შეხების წერტილში.',
      blocks: [
        {
          k: 'p',
          v: 'ჭრის ზონიდან ნადნობისა და წვის პროდუქტების მოსაშორებლად გამოიყენება დამხმარე აირი (ჟანგბადი, აზოტი ან ჰაერი) მაღალი წნევით. ეს საშუალებას იძლევა მივიღოთ ვიწრი, სუფთა ჭრილი მინიმალური თერმული ზემოქმედების ზონით (თზზ), რაც პრაქტიკულად გამორიცხავს ნამზადის დეფორმაციას.',
        },
        { k: 'h', v: 'საკვანძო ტექნოლოგიური მახასიათებლები' },
        {
          k: 'list',
          items: [
            'პრეციზიულობა: პოზიციონირების სიზუსტე მილიმეტრის მეათედ და მეასედ ნაწილამდე.',
            'უნივერსალურობა: შავი და უჟანგავი ფოლადები, ასევე ფერადი ლითონები (ალუმინი, სპილენძი).',
            'ნაწიბურის ხარისხი: გლუვი ჭრა, რომელიც შემდგომ მექანიკურ დამუშავებას არ საჭიროებს.',
            'პროგრამული მართვა: რპმ უზრუნველყოფს მაღალ გამეორებადობას და რთული კონფიგურაციის დეტალების დამზადებას.',
          ],
        },
        { k: 'p', v: 'ეს ტექნოლოგია ოპტიმალურია მაღალი სიზუსტისა და სუფთა ჭრის მოთხოვნის მქონე ამოცანებისთვის.' },
        {
          k: 'chips',
          items: [
            'ნახშირბადიანი ფოლადი',
            'უჟანგავი ფოლადი',
            'ალუმინი',
            'სპილენძი',
          ],
        },
      ],
    },
    laserNonMetal: {
      lead:
        'არალითონური მასალების ლაზერული დამუშავება, როგორც წესი, ხორციელდება CO2-ლაზერით, რომელიც 10,6 მკმ სიგრძის ტალღიან სხივს აწარმოებს. მოქმედების პრინციპი ეყრდნობა მაღალი სიზუსტის თერმულ სუბლიმაციას: ფოკუსირებული სხივი წამიერად აცხელებს მასალას და იწვევს მის აორთქლებას ან დნობას მიცემული კონტურით.',
      blocks: [
        {
          k: 'p',
          v: 'პროცესი უზრუნველყოფს ზუსტ, ვიწრო ჭრილებს და ამცირებს თბური ზემოქმედების ზონას (თზზ), ინარჩუნებს რა მასალის თვისებებს. გრავირების რეჟიმში ლაზერი კონტროლირებად ხსნის თხელ ზედა შრეს და ქმნის რელიეფურ ან ფერად გამოსახულებას.',
        },
        {
          k: 'list',
          items: [
            'სიღრმის კონტროლი: მაღალი მართვადობა საშუალებას იძლევა შევასრულოთ როგორც გამჭოლი ჭრა, ასევე ზედაპირული გრავირება.',
            'პრეციზიულობა: რპმ-სისტემებით უზრუნველყოფილი პოზიციონირების სიზუსტე მაღალ გამეორებადობას იძლევა.',
            'დამუშავების სისუფთავე: მექანიკური კონტაქტის არარსებობა გამორიცხავს ინსტრუმენტის ცვეთას და უზრუნველყოფს გლუვ ნაწიბურს.',
          ],
        },
        {
          k: 'p',
          v: 'ტექნოლოგია შეუცვლელია სუვენირული პროდუქციის, სარეკლამო კონსტრუქციებისა და მაღალი სიზუსტის მქონე დიზაინის ელემენტების წარმოებისთვის.',
        },
        {
          k: 'chips',
          items: [
            'ორგანული მინა (აკრილი)',
            'ფანერა და ხე',
            'მუყაო და ქაღალდი',
            'ტყავი, ტექსტილი და ფეტრი',
            'რეზინი',
            'პლასტიკები (პვჰ-ის გარდა)',
          ],
        },
      ],
    },
    powder: {
      lead:
        'ფხვნილოვანი შეღებვა — მაღალი ხარისხის დამცავ-დეკორატიული საფარვების მიღების თანამედროვე ტექნოლოგია თხევადი გამხსნელების გარეშე. მეთოდი უზრუნველყოფს გამორჩეულ ხანგრძლივობას, ეკოლოგიურობასა და ეკონომიურობას.',
      blocks: [
        { k: 'h', v: 'ტექნოლოგიის პრინციპი' },
        {
          k: 'p',
          v: 'პროცესი ეფუძნება ფხვნილის ელექტროსტატიკურ დატანას. პოლიმერული საღებავის ნაწილაკები იმუხტება სპეციალურ პისტოლეტში (აპლიკატორში) და შეფრქვევია დამიწებულ ლითონის ნაკეთობაზე. ელექტროსტატიკური მიზიდულობით ფხვნილი თანაბრად ილექება მთელ ზედაპირზე, რთული ფორმების ჩათვლით.',
        },
        {
          k: 'p',
          v: 'დატანის შემდეგ ნაკეთობა მიდის პოლიმერიზაციის კამერაში, სადაც 160–200 °C-ზე ფხვნილი დნება და მონოლიტურ საფარს ქმნის. პროცესი სწრაფია: ხანგრძლივი შრობა არ არის საჭირო — საფარი მზადაა გაციებისთანავე.',
        },
        { k: 'h', v: 'დაფარვის საკვანძო მახასიათებლები' },
        {
          k: 'list',
          items: [
            'სიმკვრივე და ცვეთამედგობა: მექანიკური დაზიანების, ცვეთისა და ქიმიური ზემოქმედების მიმართ მდგრადობა.',
            'მაღალი ადგეზია: პოლიმერიზაციის გამო საფარი ძლიერად ეკრობა ლითონს.',
            'იდეალური თანაბრობა: ელექტროსტატიკური ველი უზრუნველყოფს ფენის ერთგვაროვნებას, გამორიცხავს ღვენთვასა და ნაკლს.',
            'ფართო შესაძლებლობები: ფერებისა და ტექსტურების (გლუვი, მქრქალი, მუარი, შაგრენი) მდიდარი პალიტრა.',
          ],
        },
        {
          k: 'p',
          v: 'ფხვნილოვანი შეღებვა შეუცვლელია აგრესიულ გარემოში მომუშავე ან ესთეტურად უნაკლო და ხანგრძლივ საფარს მოთხოვნილი დეტალებისთვის.',
        },
        {
          k: 'chips',
          items: [
            'გლუვი',
            'მქრქალი',
            'მუარი',
            'შაგრენი',
            'RAL ფერები',
          ],
        },
      ],
    },
    welding: {
      lead:
        'შედუღება — ფუნდამენტალური ტექნოლოგიური პროცესია არადაშლადი შეკავშირების მისაღებად, დეტალების ლოკალური ან საერთო გახურებით. ენერგიის ტიპისა და დამცავი გარემოს მიხედვით რამდენიმე საკვანძო მეთოდი გამოიყოფა.',
      blocks: [
        { k: 'h', v: 'MIG / MAG შედუღება' },
        {
          k: 'p',
          v: 'მავლი ელექტროდი უწყვეტად მიეწოდება შედუღების ზონაში, სადაც ელექტრო რკალით დნება. ზონა დაცულია ატმოსფეროსგან გაზით: ინერტულით (MIG, მაგ. არგონი) ან აქტიურით (MAG, მაგ. არგონისა და CO2-ის ნარევი). უპირატესობა: მაღალი სიჩქარე და ავტომატიზაციის შესაძლებლობა მას სერიული წარმოებისთვის ოპტიმალურს ხდის. MAG უფრო ხშირად გამოიყენება ნახშირბადიანი ფოლადებისთვის, MIG — ფერადი ლითონებისთვის.',
        },
        { k: 'h', v: 'TIG შედუღება' },
        {
          k: 'p',
          v: 'გამოიყენება არადნობადი ვოლფრამის ელექტროდი. შემავსებელი მასალა ზონაში ცალკე მიეწოდება ან საერთოდ არ გამოიყენება. შედუღების ზონა და ელექტროდი დაცულია სუფთა ინერტული გაზით (არგონი, ჰელიუმი). უპირატესობა: ნაკერის გამორჩეული ხარისხი და სიწმინდე, მინიმალური შხეფები, პრეციზიულობა და პროცესზე სრული კონტროლი. შეუცვლელია თხელი ლითონების, უჟანგავი ფოლადისა და ალუმინის შედუღებისთვის.',
        },
        { k: 'h', v: 'ლაზერული შედუღება' },
        {
          k: 'p',
          v: 'შეერთება ხდება მაღალკონცენტრირებული ლაზერული სხივის ზემოქმედებით, რომელიც წამიერად ადნობს დეტალების ნაწიბურებს მაღალი სიჩქარით. პროცესი ხშირად მინიმალურ შემავსებელ მასალას მოითხოვს ან საერთოდ არ საჭიროებს. უპირატესობა: ზემცირე თერმული ზემოქმედების ზონა (თზზ) გამორიცხავს დეფორმაციას; მაღალი სიჩქარე, სიზუსტე, სხვადასხვაგვარი მასალებისა და თხელფურცლოვანი ლითონის ღრმა შედუღების შესაძლებლობა.',
        },
        {
          k: 'p',
          v: 'ეს მეთოდები უზრუნველყოფენ მყარ და საიმედო შეკავშირებებს და თანამედროვე მანქანათმშენებლობისა და ლითონის დამუშავების საფუძველს წარმოადგენენ.',
        },
        {
          k: 'chips',
          items: [
            'MIG / MAG',
            'TIG',
            'ლაზერული შედუღება',
            'უჟანგავი ფოლადი',
            'ალუმინი',
          ],
        },
      ],
    },
    mech: {
      lead:
        'ტრადიციული მექანიკური დამუშავება — ლითონისა და სხვა დეტალების შექმნის ფუნდამენტალური მეთოდი, რომელიც ლითონის ჭრით დამუშავებას ეფუძნება. ის ორ ძირითად და ურთიერთშემავსემებელ პროცესს მოიცავს.',
      blocks: [
        { k: 'h', v: 'სახარატო დამუშავება' },
        {
          k: 'list',
          items: [
            'გამოიყენება ბრუნვის სხეულების ფორმის მქონე დეტალების (მილისები, ლილვები, ღერძები, დისკები) ფორმირებისთვის.',
            'პრინციპი: ნამზადი მჭიდროდ მაგრდება ვაზნაში და ბრუნვას იწყებს; საჭრელი ღერძის გასწვრივ ან განივ მოძრაობს და მასალის ფენას ხსნის.',
            'შესაძლებლობები: გაჩარხვა, ტორსის მოჭრა, შიდა ხვრელების შიგჩარხვა და კუთხვილის ჭრა.',
          ],
        },
        { k: 'h', v: 'საფრეზერო დამუშავება' },
        {
          k: 'list',
          items: [
            'გამოიყენება ბრტყელი, ფასონური ზედაპირების, ღარების, ფოსოებისა და რთული გეომეტრიის კორპუსული დეტალების დასამუშავებლად.',
            'პრინციპი: მთავარ მოძრაობას ასრულებს მრავალსაჭრელიანი ბრუნვადი ინსტრუმენტი — ფრეზი; ნამზადი სამუშაო მაგიდაზე ხელით ან მექანიზებული კვებით გადაადგილდება.',
            'შესაძლებლობები: ბრტყელი ზედაპირების შექმნა, ღარებისა და ჯიბეების არჩევა, რაფების დამუშავება; ეფექტურია არაბრუნვადი დეტალების დასაჭრელად და ფორმირებისთვის.',
          ],
        },
        {
          k: 'chips',
          items: [
            'სახარატო დამუშავება',
            'საფრეზერო დამუშავება',
            'კუთხვილის ჭრა',
            'ხვრელების შიგჩარხვა',
            'ღარები და ჯიბეები',
          ],
        },
      ],
    },
    cnc: {
      lead:
        'ფრეზირება რპმ-დაზგებზე (CNC Router) — მაღალეფექტიანი მექანიკური დამუშავების მეთოდი, რომელიც ბრუნვადი ფრეზით მასალის მოშორებას ეფუძნება. ტექნოლოგია საშუალებას იძლევა შევასრულოთ როგორც ელემენტების ზუსტი ფრეზირება, ასევე დიდფორმატიანი ფურცლოვანი მასალების ჩქაროსნული ჭრა, სუფთა ჭრილით და მაღალი გამეორებადობით.',
      blocks: [
        {
          k: 'list',
          items: [
            '2D-ფრეზირება: ბრტყელი მონიშვნა-მოჭრა, კონტურების ამოჭრა, ღარებისა და ხვრელების შექმნა და გრავირება ერთ სიბრტყეზე.',
            '3D-ფრეზირება: მოცულობითი ნაკეთობების დამზადება და რელიეფების შექმნა სამ ღერძზე (X, Y, Z) ზუსტი სინქრონული მართვით.',
          ],
        },
        {
          k: 'p',
          v: 'თანამედროვე დაზგები აღჭურვილია ინსტრუმენტის ავტომატური შეცვლის სისტემით (ATC): აღჭურვილობა თავად ცვლის ფრეზებს დამუშავების სხვადასხვა ეტაპისთვის (შავად ჭრა, წმინდა ფრეზირება) ოპერატორის მონაწილეობის გარეშე. ეს მნიშვნელოვნად აჩქარებს რთული და მრავალოპერაციული პროექტების შესრულებას.',
        },
        {
          k: 'p',
          v: 'რპმ-ფრეზირების ტექნოლოგია შეუცვლელია ავეჯის, გარე რეკლამისა და რთული დიზაინის ელემენტების წარმოებაში.',
        },
        {
          k: 'chips',
          items: [
            'ფანერი, მდფ, დსპ, ხის მასივი',
            'ორგმინა (აკრილი), პვჰ, პოლიკარბონატი, პეტ',
            'ალუმინის კომპოზიტური პანელები (აკპ)',
          ],
        },
      ],
    },
  },
}
