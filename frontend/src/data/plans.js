// The three subscription plans. Demo only: no payment is ever taken.

export const PLANS = [
  {
    id: 'community',
    name: 'Community',
    price: 0,
    sessionsPerMonth: 0,
    cadence: 'Community forum access',
    tagline: 'Begin with a gentle, welcoming community.',
    features: [
      'Full access to the community forum',
      'Read, share and reply anonymously',
      'Moderated, respectful spaces',
    ],
  },
  {
    id: 'support',
    name: 'Support',
    price: 500,
    sessionsPerMonth: 2,
    cadence: '2 check-ins a month',
    tagline: 'A little guidance, every month.',
    features: [
      '2 therapist check-ins a month',
      '15 minutes each, with a trainee therapist',
      'Everything in Community',
    ],
  },
  {
    id: 'steady',
    name: 'Steady',
    price: 1000,
    sessionsPerMonth: 4,
    cadence: '1 check-in every week',
    tagline: 'A regular rhythm of support.',
    features: [
      'A therapist check-in every week',
      '15 minutes each, with a trainee therapist',
      'Everything in Community',
    ],
  },
]

export const getPlan = (id) => PLANS.find((p) => p.id === id)

export const formatPrice = (plan) =>
  plan.price === 0 ? 'Free' : `₹${plan.price.toLocaleString('en-IN')}`
