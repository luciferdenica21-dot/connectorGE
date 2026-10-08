import { useEffect, useRef, useState } from 'react'
import { LANGS, SERVICES, useLang } from '../i18n.jsx'
import useTheme from '../useTheme.js'
import { IconGlobe, IconMoon, IconSun } from './icons.jsx'

export default function Navbar({ menuOpen, onToggleMenu }) {
  const { lang, setLang, t } = useLang()
  const [theme, toggleTheme] = useTheme()
  const [servicesOpen, setServicesOpen] = useState(false)
  const dropdownRef = useRef(null)

  const nextLang = () => {
    const index = LANGS.indexOf(lang)
    setLang(LANGS[(index + 1) % LANGS.length])
  }

  useEffect(() => {
    if (!servicesOpen) return

    const handleOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setServicesOpen(false)
      }
    }
    const handleKey = (event) => {
      if (event.key === 'Escape') setServicesOpen(false)
    }
    document.addEventListener('mousedown', handleOutside)
    document.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('mousedown', handleOutside)
      document.removeEventListener('keydown', handleKey)
    }
  }, [servicesOpen])

  const linkClass =     'rounded-lg px-3 py-2 text-sm font-light text-zinc-700 transition hover:bg-zinc-50 hover:text-brand-600 dark:text-zinc-300 dark:hover:bg-slate-800 dark:hover:text-brand-300'

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-zinc-200 bg-white/95 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/95">
      {/* Полная ширина, без узкого контейнера */}
      <div className="flex h-16 w-full items-center justify-between px-4 sm:h-[72px] sm:px-6">
        <a href="#top" className="flex items-center" aria-label="CONNECTOR">
          <img
            src="/assets/logobrand.png"
            alt="CONNECTOR"
            className="h-11 w-auto sm:h-14"
            width="233"
            height="216"
          />
        </a>

        <div className="flex items-center gap-1 sm:gap-2">
          {/* ПК-навигация */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label={t('nav.menu')}>
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setServicesOpen((open) => !open)}
                aria-expanded={servicesOpen}
                aria-haspopup="true"                 className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-light transition hover:bg-zinc-50 hover:text-brand-600 dark:text-zinc-300 dark:hover:bg-slate-800 dark:hover:text-brand-300 ${
                  servicesOpen
                    ? 'bg-zinc-50 text-brand-600 dark:bg-slate-800 dark:text-brand-300'
                    : 'text-zinc-700'
                }`}
              >
                {t('nav.services')}
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className={`size-4 transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`}
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
                </svg>
              </button>

              {servicesOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 rounded-2xl border border-zinc-200 bg-white p-2 shadow-2xl dark:border-slate-700 dark:bg-slate-900">
                  <ul>
                    {SERVICES.map((service) => (
                      <li key={service.id}>
                        <a
                          href={`#svc-${service.id}`}
                          onClick={() => setServicesOpen(false)}
                          className="block rounded-xl px-3 py-2.5 text-sm leading-snug text-zinc-700 transition hover:bg-brand-50 hover:text-brand-700 dark:text-zinc-300 dark:hover:bg-slate-800 dark:hover:text-brand-300"
                        >
                          {t(`services.${service.id}`)}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <a href="#about" className={linkClass}>
              {t('nav.about')}
            </a>
            <a href="#contacts" className={linkClass}>
              {t('nav.contacts')}
            </a>
          </nav>

          <button
            type="button"
            onClick={nextLang}
            aria-label={t('nav.language')}
            title={t('nav.language')}
            className="flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-3 py-2 text-zinc-900 transition hover:border-brand-500 hover:text-brand-600 dark:border-slate-700 dark:bg-slate-900 dark:text-zinc-200 dark:hover:border-brand-400 dark:hover:text-brand-300"
          >
            <IconGlobe className="size-4" />             <span className="text-[12px] font-light uppercase tracking-widest">{lang}</span>
          </button>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label={t('nav.theme')}
            aria-pressed={theme === 'dark'}
            title={t('nav.theme')}
            className="flex size-10 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-900 transition hover:border-brand-500 hover:text-brand-600 dark:border-slate-700 dark:bg-slate-900 dark:text-zinc-200 dark:hover:border-brand-400 dark:hover:text-brand-300"
          >
            {theme === 'dark' ? <IconSun className="size-[18px]" /> : <IconMoon className="size-[18px]" />}
          </button>

          <button
            type="button"
            onClick={onToggleMenu}
            aria-label={menuOpen ? t('nav.close') : t('nav.menu')}
            aria-expanded={menuOpen}
            aria-controls="site-menu"
            className={`flex size-10 flex-col items-center justify-center gap-[5px] rounded-full border border-zinc-200 text-zinc-900 transition hover:border-brand-500 hover:text-brand-600 dark:border-slate-700 dark:text-zinc-200 dark:hover:border-brand-400 dark:hover:text-brand-300 lg:hidden ${
              menuOpen ? 'burger-open' : ''
            }`}
          >
            <span className="burger-line" />
            <span className="burger-line" />
            <span className="burger-line" />
          </button>
        </div>
      </div>
    </header>
  )
}
