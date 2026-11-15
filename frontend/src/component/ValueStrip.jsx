import Icon from './Icon'

const ITEMS = [
  { icon: 'clock', label: 'Short, focused check-ins' },
  { icon: 'heart', label: 'Affordable support' },
  { icon: 'ear', label: 'A community that listens' },
]

function ValueStrip() {
  return (
    <section className="value-strip" aria-label="What we offer">
      <div className="container value-list">
        {ITEMS.map((item) => (
          <div className="value-item" key={item.label}>
            <Icon name={item.icon} />
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

export default ValueStrip