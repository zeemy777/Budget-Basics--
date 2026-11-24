export const CATEGORY_COLORS = {
  Food: '#34d399',
  Transport: '#38bdf8',
  Education: '#a78bfa',
  Entertainment: '#fbbf24',
  Shopping: '#fb7185',
  Utilities: '#2dd4bf',
  Miscellaneous: '#94a3b8',
};

export const CATEGORY_ORDER = [
  'Food',
  'Transport',
  'Education',
  'Entertainment',
  'Shopping',
  'Utilities',
  'Miscellaneous',
];

function normalize(expenses) {
  return Array.isArray(expenses) ? expenses.filter((item) => Number(item?.amount) > 0) : [];
}

export function getCategoryTotals(expenses) {
  const list = normalize(expenses);
  const totals = new Map();
  let sum = 0;

  for (const expense of list) {
    const amount = Number(expense.amount) || 0;
    const category = expense.category || 'Miscellaneous';
    totals.set(category, (totals.get(category) || 0) + amount);
    sum += amount;
  }

  const items = [...totals.entries()]
    .map(([category, total]) => ({
      category,
      total,
      share: sum ? total / sum : 0,
      color: CATEGORY_COLORS[category] || CATEGORY_COLORS.Miscellaneous,
    }))
    .sort((a, b) => b.total - a.total);

  return { items, total: sum };
}

export function getMonthlyTotals(expenses, months = 6) {
  const list = normalize(expenses);
  const now = new Date();
  const buckets = [];

  for (let offset = months - 1; offset >= 0; offset -= 1) {
    const date = new Date(now.getFullYear(), now.getMonth() - offset, 1);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    buckets.push({
      key,
      label: date.toLocaleDateString('en-NG', { month: 'short' }),
      total: 0,
    });
  }

  const index = new Map(buckets.map((bucket) => [bucket.key, bucket]));
  for (const expense of list) {
    const monthKey = typeof expense.date === 'string' ? expense.date.slice(0, 7) : '';
    const bucket = index.get(monthKey);
    if (bucket) bucket.total += Number(expense.amount) || 0;
  }

  return buckets;
}

export function getSpendingInsights(expenses) {
  const list = normalize(expenses);
  const { items, total } = getCategoryTotals(list);
  const activeDays = new Set(list.map((expense) => expense.date).filter(Boolean));
  const biggest = list.reduce(
    (top, expense) => (Number(expense.amount) > Number(top?.amount || 0) ? expense : top),
    null
  );

  return {
    total,
    count: list.length,
    activeDays: activeDays.size,
    biggest,
    categories: items,
    top: items[0] || null,
    averagePerActiveDay: activeDays.size ? total / activeDays.size : 0,
  };
}
