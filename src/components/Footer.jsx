import { useLang } from '../i18n.jsx'

export default function Footer() {
  const { t } = useLang()

  return (
    <footer id="contacts" className="border-t border-zinc-200 bg-white">
      <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
        <p className="text-center text-[10px] font-light uppercase tracking-[0.3em] text-zinc-400">
          {t('menu.credit')}
        </p>
      </div>
    </footer>
  )
}
