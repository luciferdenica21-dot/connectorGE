import { useLang } from '../i18n.jsx'
import { PXD_URL } from '../config.js'

export default function Footer() {
  const { t } = useLang()

  return (
    <footer className="border-t border-zinc-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
        <p className="text-center text-[10px] font-light uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-500">
          <a
            href={PXD_URL}
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-brand-600 dark:hover:text-brand-400"
          >
            {t('menu.credit')}
          </a>
        </p>
      </div>
    </footer>
  )
}
