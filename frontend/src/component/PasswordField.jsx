import { useState } from 'react'

// Password input with a Show / Hide toggle
function PasswordField({ id, label, value, onChange, autoComplete, children }) {
  const [show, setShow] = useState(false)

  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <div className="password-wrap">
        <input
          id={id}
          type={show ? 'text' : 'password'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoComplete={autoComplete}
          required
        />
        <button
          type="button"
          className="toggle-pass"
          onClick={() => setShow(!show)}
          aria-pressed={show}
          aria-label={show ? 'Hide password' : 'Show password'}
        >
          {show ? 'Hide' : 'Show'}
        </button>
      </div>
      {children}
    </div>
  )
}

export default PasswordField
