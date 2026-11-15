import { useEffect, useRef } from 'react'

function DemoModal({ title, onClose }) {
  const closeRef = useRef(null)

  useEffect(() => {
    if (!title) return
    closeRef.current?.focus()
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [title, onClose])

  if (!title) return null

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="modal-title">{title}</h2>
        <p>
          This is a prototype preview. This feature isn't available yet, but it's part of what
          Samvaad is designed to become.
        </p>
        <button ref={closeRef} className="btn btn-primary" onClick={onClose}>Got it</button>
      </div>
    </div>
  )
}

export default DemoModal
