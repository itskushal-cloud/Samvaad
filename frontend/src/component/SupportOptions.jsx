import Icon from './Icon'
import scrollToSection from './scrollToSection'

const OPTIONS = [
  {
    icon: 'chat',
    tone: 'sage',
    title: 'Therapist check-ins',
    text: "Make space for what's on your mind through focused 60-minute messaging or voice-note check-ins.",
    cta: 'Explore check-ins',
  },
  {
    icon: 'people',
    tone: 'peach',
    title: 'Peer community',
    text: 'Connect with people who understand similar experiences, share perspectives, and feel a little less alone.',
    cta: 'Explore community',
    target: 'community',
  },
  {
    icon: 'leaf',
    tone: 'cream',
    title: 'Mental wellness resources',
    text: 'Discover thoughtful guides, practical exercises, and small steps to support your everyday well-being.',
    cta: 'Browse resources',
    target: 'resources',
  },
]

function SupportOptions({ onDemo }) {
  return (
    <section className="section" id="support">
      <div className="container">
        <h2 className="section-title">Support can look different for everyone</h2>
        <p className="section-intro">
          Begin wherever feels comfortable. Check-ins are offered by trainee therapists, and their
          qualifications and supervision status are shared openly.
        </p>

        <div className="support-grid">
          {OPTIONS.map((option) => (
            <article className={`support-card tone-${option.tone}`} key={option.title}>
              <Icon name={option.icon} />
              <h3>{option.title}</h3>
              <p>{option.text}</p>
              <button
                className="text-link"
                onClick={() => (option.target ? scrollToSection(option.target) : onDemo(option.title))}
              >
                {option.cta}
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SupportOptions