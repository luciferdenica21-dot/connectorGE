import { useEffect, useState } from 'react'
import { SERVICE_DETAILS, SERVICES, useLang } from '../i18n.jsx'

function Block({ block }) {
  switch (block.k) {
    case 'h':
      return (
        <h4 className="mt-7 text-[11px] font-normal uppercase tracking-[0.2em] text-brand-600 dark:text-brand-400">
          {block.v}
        </h4>
      )
    case 'p':
      return <p className="mt-3 text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-300">{block.v}</p>
    case 'list':
      return (
        <ul className="mt-3 space-y-2">
          {block.items.map((item, i) => (
            <li key={i} className="text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-300">
              {item}
            </li>
          ))}
        </ul>
      )
    case 'chips':
      return (
        <>
          {/* Сначала опускаем поток ниже фото — рамка будет строго после текста и фото */}
          <div className="clear-both" aria-hidden="true" />
          <div className="mt-8">
            {block.label && (
              <p className="text-[11px] font-light uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
                {block.label}
              </p>
            )}
            {/* Рамка во всю ширину, с отступом сверху */}
            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 dark:border-slate-700 dark:bg-slate-800">
              <div className="flex flex-wrap gap-2">
                {block.items.map((item, i) => (
                  <span
                    key={i}
                    className="rounded-full border border-brand-200 bg-brand-50 px-4 py-2 text-[15px] font-light text-brand-700 dark:border-brand-700 dark:bg-brand-800/40 dark:text-brand-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </>
      )
    default:
      return null
  }
}

// Фото строки: слайд-шоу (авто-crossfade каждые 3 с),
// клик — лайтбокс с увеличением (Esc / стрелки).
function ServicePhoto({ service, photoLeft, alt }) {
  const photos = service.photos ?? [service.poster]
  const [index, setIndex] = useState(0)
  const [zoom, setZoom] = useState(false)
  const count = photos.length

  // Таймер перезапускается после каждой смены кадра (в т.ч. ручной);
  // пока открыт лайтбокс — автопрокрутка на паузе.
  useEffect(() => {
    if (count < 2 || zoom) return undefined
    const timer = window.setTimeout(() => setIndex((i) => (i + 1) % count), 3000)
    return () => window.clearTimeout(timer)
  }, [count, index, zoom])

  // Лайтбокс: Esc — закрыть, ←/→ — листать, скролл страницы заблокирован.
  useEffect(() => {
    if (!zoom) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') setZoom(false)
      else if (e.key === 'ArrowLeft') setIndex((i) => (i - 1 + count) % count)
      else if (e.key === 'ArrowRight') setIndex((i) => (i + 1) % count)
    }
    window.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [zoom, count])

  const go = (dir) => setIndex((i) => (i + dir + count) % count)

  return (
    <>
      {/* ПК: квадрат 500×500 без радиусов, float слева/справа —
          текст обтекает фото и после него выходит на всю ширину.
          Мобайл: фото 4:3 со скруглением над текстом (как было). */}
      <div
        className={`group relative mb-6 aspect-4/3 cursor-zoom-in overflow-hidden rounded-3xl border border-zinc-200 bg-zinc-100 dark:border-slate-700 dark:bg-slate-800 lg:mb-0 lg:aspect-auto lg:h-[500px] lg:w-[500px] lg:rounded-none ${
          photoLeft ? 'lg:float-left lg:mr-8' : 'lg:float-right lg:ml-8'
        }`}
        onClick={() => setZoom(true)}
      >
        {photos.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={i === 0 ? alt : ''}
            loading="lazy"
            className={`absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.04] ${
              i === index ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
      </div>

      {zoom && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/90 p-4"
          onClick={() => setZoom(false)}
          role="dialog"
          aria-modal="true"
          aria-label={alt}
        >
          <img
            src={photos[index]}
            alt={alt}
            className="h-[min(92svh,950px)] w-[min(92svh,950px)] max-w-[94vw] object-contain"
          />
          {count > 1 && (
            <>
              <button
                type="button"
                aria-label="Предыдущее фото"
                onClick={(e) => {
                  e.stopPropagation()
                  go(-1)
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full border border-white/25 bg-white/10 p-3 text-white transition hover:bg-white/25"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button
                type="button"
                aria-label="Следующее фото"
                onClick={(e) => {
                  e.stopPropagation()
                  go(1)
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full border border-white/25 bg-white/10 p-3 text-white transition hover:bg-white/25"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </>
          )}
          <button
            type="button"
            aria-label="Закрыть"
            onClick={(e) => {
              e.stopPropagation()
              setZoom(false)
            }}
            className="absolute right-4 top-4 rounded-full border border-white/25 bg-white/10 p-2.5 text-white transition hover:bg-white/25"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
    </>
  )
}

export default function Services() {
  const { lang, t } = useLang()

  return (
    <section className="border-t border-zinc-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      {/* Контейнер во всю ширину — как в Hero (px-4 sm:px-6 lg:px-8 xl:px-14) */}
      <div className="w-full px-4 py-16 sm:px-6 sm:py-20 lg:px-8 xl:px-14">
        <div className="mt-12 space-y-16 sm:mt-16 lg:mt-20 lg:space-y-24">
          {SERVICES.map((service, index) => {
            const details =
              SERVICE_DETAILS[lang]?.[service.id] ?? SERVICE_DETAILS.ru[service.id]
            if (!details) return null

            // Первая строка — фото справа, вторая — слева, дальше чередуется.
            const photoLeft = index % 2 === 1

            return (
              <article key={service.id} id={`svc-${service.id}`}>
                <ServicePhoto
                  service={service}
                  photoLeft={photoLeft}
                  alt={t(`services.${service.id}`)}
                />

                <h3 className="font-display text-[clamp(1.3rem,3.4vw,1.9rem)] font-normal uppercase leading-tight text-zinc-900 dark:text-slate-100">
                  {t(`services.${service.id}`)}
                </h3>

                <p className="mt-4 text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-300">{details.lead}</p>

                {details.blocks.map((block, i) => (
                  <Block key={i} block={block} />
                ))}

                {/* Очистка float, чтобы высота статьи учитывала фото */}
                <div className="clear-both" aria-hidden="true" />
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
