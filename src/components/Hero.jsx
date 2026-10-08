import { useEffect, useRef, useState } from 'react'
import { SERVICES, useLang } from '../i18n.jsx'
import { TELEGRAM_URL, WHATSAPP_URL } from '../config.js'

// Слайд услуг: подпись того клипа, что сейчас играет (без фона и бордера).
// align: 'center' (моб) | 'left' (пк); tone: 'white' (на видео) | 'dark' (на белом под видео).
function ServicesSlide({ activeIndex, align = 'center', tone = 'white' }) {
  const { t } = useLang()
  const service = SERVICES[activeIndex]

  return (
    <div className={align === 'left' ? 'flex justify-start' : 'flex justify-center'}>
      <span
        key={service.id}         className={`chip-in inline-flex whitespace-nowrap rounded-full text-[14px] font-light sm:text-[15px] lg:text-base ${
          tone === 'dark'
            ? 'text-black dark:text-slate-100'
            : 'text-white [text-shadow:0_1px_8px_rgba(0,0,0,0.55)]'
        }`}
      >
        {t(`services.${service.id}`)}
      </span>
    </div>
  )
}

export default function Hero() {
  const { t } = useLang()
  const [index, setIndex] = useState(0)
  const videoRefs = useRef([])

  // Автослайдер: каждый клип играется до конца (~2 с), затем переход к следующему.
  useEffect(() => {
    const active = videoRefs.current[index]
    if (!active) return

    videoRefs.current.forEach((video, i) => {
      if (video && i !== index) {
        video.pause()
        video.currentTime = 0
      }
    })

    active.currentTime = 0
    const playing = active.play()
    if (playing) playing.catch(() => {})

    const handleEnded = () => setIndex((i) => (i + 1) % SERVICES.length)

    // Браузер может сам поставить клип на паузу (например, при скрытии вкладки) —
    // следим и возобновляем, а зависший в конце клип переходим дальше.
    const ensurePlaying = () => {
      if (!active.paused) return
      const duration = active.duration
      if (
        active.ended ||
        (Number.isFinite(duration) && duration > 0 && active.currentTime >= duration - 0.05)
      ) {
        setIndex((i) => (i + 1) % SERVICES.length)
        return
      }
      const resuming = active.play()
      if (resuming) resuming.catch(() => {})
    }

    const ticker = window.setInterval(ensurePlaying, 1000)
    const handleVisibility = () => {
      if (!document.hidden) ensurePlaying()
    }
    document.addEventListener('visibilitychange', handleVisibility)

    active.addEventListener('ended', handleEnded)
    return () => {
      window.clearInterval(ticker)
      document.removeEventListener('visibilitychange', handleVisibility)
      active.removeEventListener('ended', handleEnded)
    }
  }, [index])

  return (
    <section id="top" className="flex min-h-[100svh] flex-col bg-white lg:flex-row dark:bg-slate-900">
      {/* ПК: левая колонка на белом фоне — заголовок, текст, кнопки */}
      <div className="hidden w-1/2 flex-col px-8 pb-26 pt-24 xl:px-14 lg:flex">
        <div className="flex min-h-0 flex-1 items-center">
          <div className="w-full">
            <h1 className="font-display leading-[1.03] text-zinc-900 dark:text-slate-100">
              <span className="brand-gradient-text block text-[clamp(2.5rem,5.5vw,5.5rem)] font-bold uppercase tracking-tight">
                {t('hero.brand')}
              </span>               <span className="mt-3 block text-[clamp(1.25rem,2vw,2.1rem)] font-light text-zinc-800 dark:text-slate-300">
                {t('hero.title')}
              </span>
            </h1>

            <p className="mt-8 max-w-2xl text-base leading-relaxed text-zinc-600 dark:text-zinc-300 xl:text-[17px]">
              {t('hero.subtitle')}
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href={TELEGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="brand-gradient inline-flex items-center justify-center rounded-xl px-6 py-4 text-sm font-light text-white shadow-lg shadow-brand-600/20 transition opacity-95 hover:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
          >
            {t('hero.ctaTelegram')}
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-xl border border-zinc-300 bg-white px-6 py-4 text-sm font-light text-zinc-900 transition hover:border-brand-500 hover:text-brand-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:hover:border-brand-400 dark:hover:text-brand-300"
          >
            {t('hero.ctaWhatsapp')}
          </a>
        </div>
      </div>

      {/* Правая колонка (ПК) / видео-окно (моб) */}
      <div className="flex min-h-0 flex-1 flex-col lg:w-1/2 lg:justify-center">
        <div
          id="services"
          className="relative min-h-[300px] flex-1 overflow-hidden bg-zinc-950 lg:h-[calc(100svh-9rem)] lg:flex-none lg:rounded-3xl"
        >
          {SERVICES.map((service, i) => (
            <video
              key={service.id}
              ref={(el) => {
                videoRefs.current[i] = el
              }}
              src={service.video}
              poster={service.poster}
              muted
              playsInline
              preload="auto"
              disablePictureInPicture
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
                i === index ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/75" />

          {/* ПК: плавный переход размытия у самой рамки видео */}
          <div className="pointer-events-none absolute inset-0 hidden lg:block">
            <div className="absolute inset-x-0 top-0 h-16 backdrop-blur-[14px] [mask-image:linear-gradient(to_bottom,black,transparent)]" />
            <div className="absolute inset-x-0 bottom-0 h-16 backdrop-blur-[14px] [mask-image:linear-gradient(to_top,black,transparent)]" />
            <div className="absolute inset-y-0 left-0 w-16 backdrop-blur-[14px] [mask-image:linear-gradient(to_right,black,transparent)]" />
            <div className="absolute inset-y-0 right-0 w-16 backdrop-blur-[14px] [mask-image:linear-gradient(to_left,black,transparent)]" />
          </div>

          {/* МОБ: текст по центру видео, слайд внизу */}
          <div className="absolute inset-0 flex flex-col lg:hidden">
            <div className="flex min-h-0 flex-1 items-center pt-16">
              <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
                <h1 className="rise font-display leading-[1.03]">
                  <span className="brand-gradient-text block text-[clamp(2.5rem,10vw,6rem)] font-bold uppercase tracking-tight">
                    {t('hero.brand')}
                  </span>                   <span className="mt-2 block max-w-3xl text-[clamp(1.05rem,3.2vw,2rem)] font-light text-white">
                    {t('hero.title')}
                  </span>
                </h1>

                <p
                  className="rise mt-8 max-w-2xl text-[14px] leading-relaxed text-zinc-200 sm:text-base"
                  style={{ animationDelay: '80ms' }}
                >
                  {t('hero.subtitle')}
                </p>
              </div>
            </div>

          </div>

          {/* ПК: слайд услуг внутри видео — слева внизу, без бордера */}
          <div className="absolute inset-x-0 bottom-0 hidden px-8 pb-8 lg:block">
            <ServicesSlide activeIndex={index} align="left" />
          </div>
        </div>
      </div>

      {/* МОБ: фраза под видео — его высота ужимается автоматически (flex-1) */}
      <div className="mx-auto w-full max-w-6xl px-4 pt-5 sm:px-6 lg:hidden">
        <p className="mx-auto w-fit rounded-2xl border-2 border-zinc-300 bg-white px-5 py-2.5 text-center text-[17px] font-normal text-zinc-900 shadow-sm sm:text-lg dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100">
          {t('hero.order')}
        </p>
      </div>

      {/* МОБ: слайд услуг под видео — без фона, чёрный текст */}
      <div className="mx-auto w-full max-w-6xl px-4 pb-6 pt-3 lg:hidden">
        <ServicesSlide activeIndex={index} tone="dark" />
      </div>

      {/* МОБ: кнопки связи под видео */}
      <div className="mx-auto w-full max-w-6xl px-4 pb-5 sm:px-6 sm:pb-6 lg:hidden">
        <div className="rise flex flex-row gap-3" style={{ animationDelay: '240ms' }}>
          <a
            href={TELEGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="brand-gradient inline-flex flex-1 items-center justify-center rounded-xl px-6 py-4 text-sm font-light text-white shadow-lg shadow-brand-600/20 transition opacity-95 hover:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
          >
            {t('hero.ctaTelegram')}
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex flex-1 items-center justify-center rounded-xl border border-zinc-300 bg-white px-6 py-4 text-sm font-light text-zinc-900 transition hover:border-brand-500 hover:text-brand-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:hover:border-brand-400 dark:hover:text-brand-300"
          >
            {t('hero.ctaWhatsapp')}
          </a>
        </div>
      </div>
    </section>
  )
}
