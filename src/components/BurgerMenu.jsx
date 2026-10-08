import { useEffect } from 'react'
import { SERVICES, useLang } from '../i18n.jsx'
import { EMAIL_URL, PHONE_DISPLAY, PHONE_TEL, TELEGRAM_URL, WHATSAPP_URL } from '../config.js'
import { IconClose, IconGmail, IconPhone, IconTelegram, IconWhatsApp } from './icons.jsx'

const SOCIALS = [
  { id: 'whatsapp', href: WHATSAPP_URL, label: 'WhatsApp', Icon: IconWhatsApp },
  { id: 'telegram', href: TELEGRAM_URL, label: 'Telegram', Icon: IconTelegram },
  { id: 'gmail', href: EMAIL_URL, label: 'Email', Icon: IconGmail },
]

export { SOCIALS }

export default function BurgerMenu({ open, onClose }) {
  const { t } = useLang()

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [onClose])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <div
      id="site-menu"
      className={`fixed inset-0 z-40 ${open ? '' : 'pointer-events-none'}`}
      aria-hidden={!open}
    >
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-zinc-950/40 backdrop-blur-sm transition-opacity duration-300 ${
          open ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label={t('nav.menu')}
        className={`absolute inset-y-0 left-0 flex w-full max-w-md flex-col border-r border-zinc-200 bg-white shadow-2xl transition-transform duration-300 ease-out ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-zinc-200 px-5 py-4">           <span className="text-[11px] font-light uppercase tracking-[0.25em] text-zinc-400">
            {t('nav.menu')}
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label={t('nav.close')}
            className="grid size-9 place-items-center rounded-full border border-zinc-200 text-zinc-700 transition hover:border-brand-500 hover:text-brand-600"
          >
            <IconClose />
          </button>
        </div>

        <div className="no-scrollbar flex-1 overflow-y-auto px-5 py-6">
          <ul className="space-y-0.5">
            {SERVICES.map((service) => (
              <li key={service.id}>
                <a
                  href={`#svc-${service.id}`}
                  onClick={onClose}
                  className="block rounded-xl px-3 py-3 text-[15px] leading-snug text-zinc-800 transition hover:bg-brand-50 hover:text-brand-700"
                >
                  {t(`services.${service.id}`)}
                </a>
              </li>
            ))}
          </ul>

          <div className="my-5 h-px bg-zinc-200" />

          <a
            href="#about"
            onClick={onClose}             className="block rounded-xl px-3 py-3 text-[15px] font-light leading-snug text-zinc-800 transition hover:bg-brand-50 hover:text-brand-700"
          >
            {t('menu.about')}
          </a>

          <div className="mt-6 flex items-center gap-3">
            {SOCIALS.map(({ id, href, label, Icon }) => (
              <a
                key={id}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="grid size-11 place-items-center rounded-full border border-zinc-200 bg-white text-zinc-600 transition hover:border-brand-500 hover:bg-brand-500 hover:text-white"
              >
                <Icon className="size-[18px]" />
              </a>
            ))}
          </div>

          <a
            href={`tel:${PHONE_TEL}`}             className="brand-gradient mt-5 flex flex-col items-center gap-1 rounded-2xl px-4 py-4 text-center font-light text-white shadow-lg shadow-brand-600/20 transition hover:opacity-95"
          >
            <span className="flex items-center gap-2">
              <IconPhone className="size-4" />
              {t('menu.call')}
            </span>             <span className="text-[13px] font-light text-white/85">{PHONE_DISPLAY}</span>
          </a>
        </div>         <div className="border-t border-zinc-200 px-5 py-4 text-center text-[10px] font-light uppercase tracking-[0.3em] text-zinc-400">
          {t('menu.credit')}
        </div>
      </aside>
    </div>
  )
}
