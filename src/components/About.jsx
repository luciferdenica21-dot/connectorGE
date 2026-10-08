import { useLang } from '../i18n.jsx'

export default function About() {
  const { t } = useLang()

  const points = [
    { key: 'point1', label: t('about.point1'), sub: t('about.point1sub') },
    { key: 'point2', label: t('about.point2'), sub: t('about.point2sub') },
    { key: 'point3', label: t('about.point3'), sub: t('about.point3sub') },
  ]

  return (
    <section id="about" className="border-t border-zinc-200 bg-zinc-50 dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div>             <h2 className="font-display text-[clamp(1.6rem,5vw,2.75rem)] font-normal uppercase leading-tight text-zinc-900 dark:text-slate-100">
              {t('about.lead')}
            </h2>

            <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-300">
              <p>{t('about.p1')}</p>
              <p>{t('about.p2')}</p>
              <p>{t('about.p3')}</p>
            </div>
          </div>          <div className="self-start">
            <ul className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {points.map((point) => (
                <li
                  key={point.key}
                  className="rounded-2xl border border-zinc-200 bg-white p-5 transition hover:border-brand-400 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-brand-400"
                >
                  <span className="block text-[15px] font-normal text-zinc-900 dark:text-slate-100">{point.label}</span>
                  <span className="mt-1 block text-[13px] leading-snug text-zinc-500 dark:text-zinc-400">{point.sub}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
