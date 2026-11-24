export const BADGES = [
  {
    id: 'first-expense',
    icon: '🧾',
    name: 'First log',
    description: 'Track your first expense',
    check: (context) => context.expenseCount >= 1,
  },
  {
    id: 'tracker',
    icon: '📊',
    name: 'Tracker',
    description: 'Log 5 expenses',
    check: (context) => context.expenseCount >= 5,
  },
  {
    id: 'goal-set',
    icon: '🎯',
    name: 'Goal setter',
    description: 'Create a savings goal',
    check: (context) => Boolean(context.goal),
  },
  {
    id: 'halfway',
    icon: '🌗',
    name: 'Halfway hero',
    description: 'Reach 50% of a goal',
    check: (context) => (context.goal?.progressPercent || 0) >= 50,
  },
  {
    id: 'goal-crusher',
    icon: '🏆',
    name: 'Goal crusher',
    description: 'Complete a savings goal',
    check: (context) => (context.goal?.progressPercent || 0) >= 100,
  },
  {
    id: 'healthy-budget',
    icon: '💚',
    name: 'Healthy budget',
    description: 'Score 85+ on Budget Health',
    check: (context) => context.score >= 85,
  },
  {
    id: 'streak-3',
    icon: '🔥',
    name: 'On a roll',
    description: 'Reach a 3-day saving streak',
    check: (context) => context.streak >= 3,
  },
  {
    id: 'streak-7',
    icon: '⚡',
    name: 'Week warrior',
    description: 'Reach a 7-day saving streak',
    check: (context) => context.streak >= 7,
  },
  {
    id: 'money-iq',
    icon: '🧠',
    name: 'Money IQ',
    description: 'Score 5+ on the quiz',
    check: (context) => context.quizBest >= 5,
  },
];

export function evaluateBadges(context, earnedMap = {}) {
  return BADGES.map((badge) => ({
    ...badge,
    earned: Boolean(earnedMap[badge.id]) || badge.check(context),
    earnedAt: earnedMap[badge.id] || null,
  }));
}
