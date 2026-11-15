import { useState } from 'react'
import scrollToSection from './scrollToSection'

function Hero() {
  const [imgFailed, setImgFailed] = useState(false)

  return (
    <section className="hero" id="top">
      <div className="container hero-grid">
        <div className="hero-copy">
          <h1>Support that meets you where you are.</h1>
          <p className="hero-sub">Small conversations. Meaningful steps forward.</p>
          <p className="lead">
            Explore affordable mental wellness support through short therapist check-ins,
            welcoming peer communities, and resources designed to help you navigate life
            at your own pace.
          </p>
          <div className="hero-actions">
            <button className="btn btn-primary" onClick={() => scrollToSection('support')}>
              Find your support
            </button>
            <button className="btn btn-ghost" onClick={() => scrollToSection('how-it-works')}>
              Explore how it works
            </button>
          </div>
          <p className="reassure">A little support can make a difference.</p>
        </div>

        <div className="hero-visual">
          <div className="hero-frame">
            {/* Soft illustration sits behind the photo as a fallback */}
            <svg className="hero-fallback" viewBox="0 0 400 480" aria-hidden="true">
              <circle cx="270" cy="150" r="52" fill="#F1E4D8" />
              <path d="M0 360 Q120 290 220 340 T400 320 V480 H0Z" fill="#C9D8C8" />
              <path d="M0 420 Q140 370 260 410 T400 395 V480 H0Z" fill="#B3C7B2" />
              <path d="M90 400 C90 330 110 290 140 260 C150 310 145 360 130 400Z" fill="#1F3A32" opacity=".85" />
              <path d="M130 400 C140 340 175 310 205 300 C200 350 175 385 150 400Z" fill="#2D4F44" opacity=".85" />
            </svg>
            {!imgFailed && (
              <img
                src="https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=900&q=80"
                alt="A person resting calmly in soft daylight"
                onError={() => setImgFailed(true)}
              />
            )}
          </div>
          <div className="hero-note">
            <strong>15-minute check-ins</strong>
            <span>Support, at your own pace.</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero