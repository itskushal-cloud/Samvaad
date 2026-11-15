// One place that decides what counts as an acceptable password.
// Length matters most, so passphrases (a few unrelated words) are encouraged.

const COMMON_FRAGMENTS = [
  'password', 'passw0rd', 'qwerty', 'letmein', 'welcome', 'iloveyou', 'admin',
  'samvaad', 'therapy', 'abc123', '123456', '111111', '000000', 'monkey', 'dragon',
]

const LABELS = ['Just getting started', 'Weak', 'Fair', 'Good', 'Strong']

function isCommon(password) {
  const lower = password.toLowerCase()
  if (COMMON_FRAGMENTS.some((word) => lower.includes(word))) return true
  return /^(.)\1+$/.test(password) // e.g. "aaaaaaaaaaaa"
}

function includesPersonalInfo(password, name, email) {
  const lower = password.toLowerCase()
  const tokens = [...(name || '').toLowerCase().split(/\s+/), (email || '').toLowerCase().split('@')[0]]
  return tokens.some((t) => t.length >= 3 && lower.includes(t))
}

export function evaluatePassword(password, { name = '', email = '' } = {}) {
  const rules = [
    { id: 'length', label: '12 or more characters', met: password.length >= 12 },
    { id: 'mix', label: 'A mix of letters and numbers, symbols or spaces', met: /[A-Za-z]/.test(password) && /[^A-Za-z]/.test(password) },
    { id: 'common', label: 'Not a commonly used password', met: password.length > 0 && !isCommon(password) },
    { id: 'personal', label: 'Does not include your name or email', met: password.length > 0 && !includesPersonalInfo(password, name, email) },
  ]
  const allRequiredMet = rules.every((r) => r.met)

  const kinds = [/[a-z]/, /[A-Z]/, /\d/, /[^A-Za-z0-9]/].filter((re) => re.test(password)).length
  let score = 0
  if (password.length >= 12) score += 1
  if (password.length >= 16) score += 1
  if (kinds >= 3) score += 1
  if (allRequiredMet) score += 1
  if (!allRequiredMet) score = Math.min(score, 1)
  if (!password) score = 0

  return { rules, allRequiredMet, score, label: LABELS[score] }
}
