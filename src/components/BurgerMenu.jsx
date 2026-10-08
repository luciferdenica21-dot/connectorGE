import { useEffect } from 'react'
import { SERVICES, useLang } from '../i18n.jsx'
import { PHONE_DISPLAY, PHONE_TEL, PXD_URL } from '../config.js'
import { IconClose, IconPhone } from './icons.jsx'

export default function BurgerMenu({ open, onClose }) {
  const { t } = useLang()

  // Якорная навигация из меню: снимаем overflow-блокировку синхронно,
  // иначе браузер не может проскроллить по хешу в момент клика.
  // Если хеш уже совпадает с целью, перехода не происходит — скроллим вручную.
  const handleNav = (event) => {
    document.body.style.overflow = ''
    onClose()
    const href = event.currentTarget.getAttribute('href')
    if (href && href.startsWith('#') && window.location.hash === href) {
      event.preventDefault()
      const target = document.querySelector(href)
      if (target) target.scrollIntoView({ behavior: 'smooth' })
      else window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

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
        className={`absolute inset-y-0 left-0 flex w-full max-w-md flex-col border-r border-zinc-200 bg-white shadow-2xl transition-transform duration-300 ease-out dark:border-slate-700 dark:bg-slate-900 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-zinc-200 px-5 py-4">           <span className="text-[11px] font-light uppercase tracking-[0.25em] text-zinc-400 dark:text-zinc-500">
            {t('nav.menu')}
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label={t('nav.close')}
            className="grid size-9 place-items-center rounded-full border border-zinc-200 text-zinc-700 transition hover:border-brand-500 hover:text-brand-600 dark:border-slate-700 dark:text-zinc-300 dark:hover:border-brand-400 dark:hover:text-brand-300"
          >
            <IconClose />
          </button>
        </div>

        <div className="no-scrollbar flex-1 overflow-y-auto px-5 py-6">
          <a
            href="#top"
            onClick={handleNav}
            className="block rounded-xl px-3 py-3 text-[15px] font-light leading-snug text-zinc-800 transition hover:bg-brand-50 hover:text-brand-700 dark:text-zinc-200 dark:hover:bg-slate-800 dark:hover:text-brand-300"
          >
            {t('nav.home')}
          </a>

          <ul className="space-y-0.5">
            {SERVICES.map((service) => (
              <li key={service.id}>
                <a
                  href={`#svc-${service.id}`}
                  onClick={handleNav}
                  className="block rounded-xl px-3 py-3 text-[15px] leading-snug text-zinc-800 transition hover:bg-brand-50 hover:text-brand-700 dark:text-zinc-200 dark:hover:bg-slate-800 dark:hover:text-brand-300"
                >
                  {t(`services.${service.id}`)}
                </a>
              </li>
            ))}
          </ul>

          <div className="my-5 h-px bg-zinc-200 dark:bg-slate-700" />

          <a
            href="#about"
            onClick={handleNav}             className="block rounded-xl px-3 py-3 text-[15px] font-light leading-snug text-zinc-800 transition hover:bg-brand-50 hover:text-brand-700 dark:text-zinc-200 dark:hover:bg-slate-800 dark:hover:text-brand-300"
          >
            {t('menu.about')}
          </a>

          <a
            href="#contacts"
            onClick={handleNav}
            className="block rounded-xl px-3 py-3 text-[15px] font-light leading-snug text-zinc-800 transition hover:bg-brand-50 hover:text-brand-700 dark:text-zinc-200 dark:hover:bg-slate-800 dark:hover:text-brand-300"
          >
            {t('nav.contacts')}
          </a>

          <a
            href={`tel:${PHONE_TEL}`}             className="brand-gradient mt-5 flex flex-col items-center gap-1 rounded-2xl px-4 py-4 text-center font-light text-white shadow-lg shadow-brand-600/20 transition hover:opacity-95"
          >
            <span className="flex items-center gap-2">
              <IconPhone className="size-4" />
              {t('menu.call')}
            </span>             <span className="text-[13px] font-light text-white/85">{PHONE_DISPLAY}</span>
          </a>
        </div>         <div className="border-t border-zinc-200 px-5 py-4 text-center text-[10px] font-light uppercase tracking-[0.3em] text-zinc-400 dark:border-slate-700 dark:text-zinc-500">
          <a
            href={PXD_URL}
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-brand-600 dark:hover:text-brand-400"
          >
            {t('menu.credit')}
          </a>
        </div>
      </aside>
    </div>
  )
}
