const PRINCIPLES = [
  { title: 'Accessible', text: 'Short, approachable ways to begin seeking support.' },
  { title: 'Human', text: 'A welcoming environment that values listening, understanding, and connection.' },
  { title: 'Community-led', text: 'Opportunities to learn from shared experiences without judgment.' },
]

function OurApproach() {
  return (
    <section className="section" id="approach">
      <div className="container approach-grid">
        <div>
          <h2 className="section-title">Support doesn't have to start with a big step.</h2>
          <p className="lead">
            Samvaad is built around the idea that reaching out can be gentle. A short conversation,
            a kind community, or a quiet moment with a good resource can each be a place to begin.
          </p>
          <p className="fine-print left">
            Peer spaces and resources are here to complement, not replace, professional care.
          </p>
        </div>

        <dl className="principles">
          {PRINCIPLES.map((item) => (
            <div className="principle" key={item.title}>
              <dt>{item.title}</dt>
              <dd>{item.text}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

export default OurApproach