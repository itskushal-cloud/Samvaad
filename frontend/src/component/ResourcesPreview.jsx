const RESOURCES = [
  { category: 'Mindfulness', title: 'A 5-minute reset for stressful days', text: 'A gentle breathing and grounding practice you can do between classes or tasks.' },
  { category: 'Self-reflection', title: 'Understanding your emotions without judging them', text: 'Simple prompts for noticing what you feel and giving it a name.' },
  { category: 'Everyday well-being', title: 'Building small, sustainable self-care habits', text: 'Start tiny, stay kind to yourself, and let routines grow slowly.' },
]

function ResourcesPreview({ onDemo }) {
  return (
    <section className="section" id="resources">
      <div className="container">
        <h2 className="section-title">Small guides for everyday well-being</h2>
        <p className="section-intro">
          Sample resources for learning and reflection. They are educational examples, not medical advice.
        </p>

        <div className="resource-grid">
          {RESOURCES.map((item) => (
            <article className="resource-card" key={item.title}>
              <span className="resource-category">{item.category}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>

        <button className="btn btn-ghost" onClick={() => onDemo('View all resources')}>
          View all resources
        </button>
      </div>
    </section>
  )
}

export default ResourcesPreview
