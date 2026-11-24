import { dateKey } from './streak';

export const DEMO_EXPENSES = [
  { category: 'Food', description: 'Canteen lunch', amount: 2500, offset: 0 },
  { category: 'Transport', description: 'Bus fare', amount: 1800, offset: 1 },
  { category: 'Entertainment', description: 'Cinema night', amount: 4500, offset: 3 },
  { category: 'Food', description: 'Groceries', amount: 3200, offset: 5 },
  { category: 'Education', description: 'Textbooks', amount: 7500, offset: 8 },
  { category: 'Shopping', description: 'New sneakers', amount: 12000, offset: 12 },
  { category: 'Utilities', description: 'Data bundle', amount: 5500, offset: 15 },
  { category: 'Food', description: 'Suya with friends', amount: 2800, offset: 20 },
  { category: 'Transport', description: 'Ride to campus', amount: 2000, offset: 24 },
  { category: 'Entertainment', description: 'Streaming subscription', amount: 3500, offset: 30 },
];

function daysAgo(offset) {
  const date = new Date();
  date.setDate(date.getDate() - offset);
  return dateKey(date);
}

export function buildDemoData() {
  const expenses = DEMO_EXPENSES.map((item, index) => ({
    id: Date.now() + index,
    date: daysAgo(item.offset),
    category: item.category,
    description: item.description,
    amount: item.amount,
  }));

  return {
    plan: { income: 120000, needs: 50, wants: 30 },
    expenses,
    goal: {
      goalName: 'New laptop',
      target: 250000,
      current: 90000,
      monthly: 15000,
      remaining: 160000,
      monthsNeeded: 11,
      progressPercent: 36,
    },
    streak: {
      dates: [0, 1, 2, 3, 4].map(daysAgo),
      best: 5,
    },
    onboarding: { done: true, style: '50 · 30 · 20' },
  };
}
