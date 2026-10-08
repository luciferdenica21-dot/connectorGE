import { useLang } from '../i18n.jsx'
import { PHONE_DISPLAY, PHONE_TEL } from '../config.js'
import { SOCIALS } from './BurgerMenu.jsx'
import { IconArrow, IconPhone } from './icons.jsx'

export default function About() {
  const { t } = useLang()

  const points = [
    { key: 'point1', label: t('about.point1'), sub: t('about.point1sub') },
    { key: 'point2', label: t('about.point2'), sub: t('about.point2sub') },
    { key: 'point3', label: t('about.point3'), sub: t('about.point3sub') },
  ]

  return (
    <section id="about" className="border-t border-zinc-200 bg-zinc-50">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div>             <h2 className="font-display text-[clamp(1.6rem,5vw,2.75rem)] font-normal uppercase leading-tight text-zinc-900">
              {t('about.lead')}
            </h2>

            <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-zinc-600">
              <p>{t('about.p1')}</p>
              <p>{t('about.p2')}</p>
            </div>

            <a
              href={`tel:${PHONE_TEL}`}               className="brand-gradient mt-7 inline-flex items-center gap-2 rounded-xl px-5 py-3.5 text-sm font-light text-white shadow-lg shadow-brand-600/20 transition hover:opacity-95"
            >
              <IconPhone className="size-4" />
              {t('about.contact')}               <span className="font-light text-white/85">{PHONE_DISPLAY}</span>
              <IconArrow className="size-4" />
            </a>
          </div>          <div className="self-start">
            <ul className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {points.map((point) => (
                <li
                  key={point.key}
                  className="rounded-2xl border border-zinc-200 bg-white p-5 transition hover:border-brand-400"
                >
                  <span className="block text-[15px] font-normal text-zinc-900">{point.label}</span>
                  <span className="mt-1 block text-[13px] leading-snug text-zinc-500">{point.sub}</span>
                </li>
              ))}
            </ul>

            {/* Соцсети перенесены из футера — под рамками */}
            <div className="mt-5 flex items-center gap-3">
              {SOCIALS.map(({ id, href, label, Icon }) => (
                <a
                  key={id}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="grid size-10 place-items-center rounded-full border border-zinc-200 bg-white text-zinc-600 transition hover:border-brand-500 hover:bg-brand-500 hover:text-white"
                >
                  <Icon className="size-[18px]" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
