import { useState } from 'react'
import { LangProvider } from './i18n.jsx'
import Navbar from './components/Navbar.jsx'
import BurgerMenu from './components/BurgerMenu.jsx'
import Hero from './components/Hero.jsx'
import Services from './components/Services.jsx'
import About from './components/About.jsx'
import Contacts from './components/Contacts.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <LangProvider>
      <div className="min-h-screen bg-white text-zinc-900 antialiased dark:bg-slate-900 dark:text-slate-100">
        <Navbar menuOpen={menuOpen} onToggleMenu={() => setMenuOpen((open) => !open)} />
        <BurgerMenu open={menuOpen} onClose={() => setMenuOpen(false)} />

        <main>
          <Hero />
          <Services />
          <About />
          <Contacts />
        </main>

        <Footer />
      </div>
    </LangProvider>
  )
}
