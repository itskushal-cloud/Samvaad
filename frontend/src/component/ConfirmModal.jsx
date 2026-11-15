import { useEffect, useRef } from 'react'

// A calm confirmation dialog (Escape or clicking outside closes it)
function ConfirmModal({ title, children, confirmLabel, cancelLabel = 'Not now', onConfirm, onCancel }) {
  const confirmRef = useRef(null)

  useEffect(() => {
    confirmRef.current?.focus()
    const onKey = (e) => e.key === 'Escape' && onCancel()
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onCancel])

  return (
    <div className="modal-backdrop" onClick={onCancel}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="confirm-title">{title}</h2>
        {children}
        <div className="inline-actions">
          <button ref={confirmRef} className="btn btn-primary" onClick={onConfirm}>{confirmLabel}</button>
          <button className="text-link" onClick={onCancel}>{cancelLabel}</button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmModal
