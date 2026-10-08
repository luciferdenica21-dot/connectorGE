import { useLang } from '../i18n.jsx'
import {
  EMAIL_URL,
  FACEBOOK_URL,
  PHONE_DISPLAY,
  PHONE_TEL,
  TELEGRAM_URL,
  WHATSAPP_URL,
} from '../config.js'
import {
  IconClock,
  IconFacebook,
  IconGmail,
  IconPhone,
  IconTelegram,
  IconWhatsApp,
} from './icons.jsx'

export default function Contacts() {
  const { t } = useLang()

  const socials = [
    { id: 'whatsapp', href: WHATSAPP_URL, label: 'WhatsApp', Icon: IconWhatsApp },
    { id: 'telegram', href: TELEGRAM_URL, label: 'Telegram', Icon: IconTelegram },
    { id: 'gmail', href: EMAIL_URL, label: 'Email', Icon: IconGmail },
    { id: 'facebook', href: FACEBOOK_URL, label: 'Facebook', Icon: IconFacebook },
  ]

  return (
    <section id="contacts" className="border-t border-zinc-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div>
            <h2 className="font-display text-[clamp(1.6rem,5vw,2.75rem)] font-normal uppercase leading-tight text-zinc-900 dark:text-slate-100">
              {t('contacts.title')}
            </h2>

            <p className="mt-6 text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-300">
              {t('contacts.lead')}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-4 py-2 text-[13px] text-zinc-700 dark:border-slate-700 dark:bg-slate-800 dark:text-zinc-300">
                <IconClock className="size-4 text-brand-600 dark:text-brand-400" />
                {t('contacts.hours')}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-4 py-2 text-[13px] text-brand-700 dark:border-brand-700 dark:bg-brand-800/40 dark:text-brand-300">
                {t('contacts.response')}
              </span>
            </div>
          </div>

          <div className="self-start">
            <a
              href={`tel:${PHONE_TEL}`}
              className="brand-gradient inline-flex items-center gap-2 rounded-2xl px-6 py-4 text-[15px] font-light text-white shadow-lg shadow-brand-600/20 transition hover:opacity-95"
            >
              <IconPhone className="size-4" />
              {t('contacts.call')}
              <span className="font-light text-white/85">{PHONE_DISPLAY}</span>
            </a>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              {socials.map(({ id, href, label, Icon }) => (
                <a
                  key={id}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="grid size-11 place-items-center rounded-full border border-zinc-200 bg-white text-zinc-600 transition hover:border-brand-500 hover:bg-brand-500 hover:text-white dark:border-slate-700 dark:bg-slate-800 dark:text-zinc-300"
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
