// Password hashing for the DEMO accounts, using the browser's built-in Web Crypto API.
// PBKDF2 with a random salt means the plain password is never stored.
// (In the real app this happens on the backend, never in the browser.)

export const ITERATIONS = 210000

const encoder = new TextEncoder()
const toBase64 = (buffer) => btoa(String.fromCharCode(...new Uint8Array(buffer)))
const fromBase64 = (text) => Uint8Array.from(atob(text), (c) => c.charCodeAt(0))

export function newSalt() {
  return toBase64(crypto.getRandomValues(new Uint8Array(16)))
}

export async function hashPassword(password, saltBase64, iterations = ITERATIONS) {
  const key = await crypto.subtle.importKey('raw', encoder.encode(password), 'PBKDF2', false, ['deriveBits'])
  const bits = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt: fromBase64(saltBase64), iterations, hash: 'SHA-256' },
    key,
    256,
  )
  return toBase64(bits)
}

// Compares two strings without stopping at the first difference
export function safeEqual(a, b) {
  if (a.length !== b.length) return false
  let diff = 0
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return diff === 0
}
