const STEPS = [
  { title: 'Choose what feels right', text: 'Explore therapist check-ins, peer spaces, or self-help resources.' },
  { title: 'Start with a small conversation', text: 'Choose a suitable support option without feeling pressured to commit to a lengthy session.' },
  { title: 'Take things at your pace', text: 'Return to helpful resources and supportive conversations whenever appropriate.' },
]

function HowItWorks() {
  return (
    <section className="section section-sage" id="how-it-works">
      <div className="container">
        <h2 className="section-title">How it works</h2>

        <ol className="steps">
          {STEPS.map((step, index) => (
            <li className="step" key={step.title}>
              <span className="step-num">{index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>

        <p className="fine-print">
          This is an early prototype. Therapist availability and check-in scheduling shown here are illustrative.
        </p>
      </div>
    </section>
  )
}

export default HowItWorks