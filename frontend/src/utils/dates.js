// Adds whole months to a date (Jan 31 + 1 month -> Feb 28/29, not March 3)
export function addMonths(date, months) {
  const d = new Date(date)
  const day = d.getDate()
  d.setMonth(d.getMonth() + months)
  if (d.getDate() !== day) d.setDate(0)
  return d
}

export function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
}
