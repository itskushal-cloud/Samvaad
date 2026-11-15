import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Logo from './Logo'
import scrollToSection from './scrollToSection'

const NAV_LINKS = [
  { label: 'How it works', target: 'how-it-works' },
  { label: 'Our approach', target: 'approach' },
  { label: 'Community', target: 'community' },
  { label: 'Resources', target: 'resources' },
]

function Navbar() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const go = (id) => {
    setOpen(false)
    scrollToSection(id)
  }

  const goLogin = () => {
    setOpen(false)
    navigate('/login')
  }

  const goSignup = () => {
    setOpen(false)
    navigate('/signup')
  }

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <a href="#top" className="brand" onClick={(e) => { e.preventDefault(); go('top') }}>
          <Logo />
          <span className="brand-name">samvaad</span>
        </a>

        <nav className={`nav-links ${open ? 'is-open' : ''}`} aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <button key={link.target} className="nav-link" onClick={() => go(link.target)}>
              {link.label}
            </button>
          ))}
          <div className="nav-actions-mobile">
            <button className="nav-link" onClick={goLogin}>Log in</button>
            <button className="btn btn-primary" onClick={goSignup}>Get started</button>
          </div>
        </nav>

        <div className="nav-actions">
          <button className="nav-link" onClick={goLogin}>Log in</button>
          <button className="btn btn-primary btn-sm" onClick={goSignup}>Get started</button>
        </div>

        <button
          className="menu-toggle"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <span />
          <span />
        </button>
      </div>
    </header>
  )
}

export default Navbar