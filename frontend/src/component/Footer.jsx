import Logo from './Logo'
import scrollToSection from './scrollToSection'

function Footer({ onDemo }) {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <div className="brand">
            <Logo />
            <span className="brand-name">samvaad</span>
          </div>
          <p>Affordable, welcoming mental wellness support through short check-ins and peer community.</p>
        </div>

        <nav className="footer-links" aria-label="Footer">
          <button onClick={() => scrollToSection('how-it-works')}>How it works</button>
          <button onClick={() => scrollToSection('community')}>Community</button>
          <button onClick={() => scrollToSection('resources')}>Resources</button>
          <button onClick={() => onDemo('About')}>About</button>
          <button onClick={() => onDemo('Privacy')}>Privacy</button>
          <button onClick={() => onDemo('Terms')}>Terms</button>
          <button onClick={() => onDemo('Contact')}>Contact</button>
        </nav>
      </div>

      <div className="container footer-notes">
        <p>Samvaad is an early-stage prototype. Features and availability shown here may be illustrative.</p>
        <p>
          Samvaad is not an emergency service and does not replace professional mental healthcare.
          If you are in immediate danger, please contact your local emergency services.
        </p>
      </div>
    </footer>
  )
}

export default Footer
