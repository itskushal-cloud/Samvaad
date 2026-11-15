import { evaluatePassword } from '../utils/passwordRules'

// Live strength bar + checklist of requirements
function PasswordStrength({ password, name, email }) {
  const result = evaluatePassword(password, { name, email })

  return (
    <div className="strength">
      <div className="strength-bar" aria-hidden="true">
        {[1, 2, 3, 4].map((i) => (
          <span key={i} className={i <= result.score ? `on s${result.score}` : ''} />
        ))}
      </div>

      <p className="strength-label" aria-live="polite">
        {password ? `Strength: ${result.label}` : 'Tip: a few unrelated words make a strong, memorable passphrase.'}
      </p>

      <ul className="rules">
        {result.rules.map((rule) => (
          <li key={rule.id} className={rule.met ? 'met' : ''}>
            <span aria-hidden="true">{rule.met ? '✓' : '○'}</span> {rule.label}
            <span className="sr-only">{rule.met ? ' (met)' : ' (not met yet)'}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PasswordStrength
