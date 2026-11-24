export function dateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function currentStreak(dates) {
  const set = new Set(Array.isArray(dates) ? dates : []);
  const cursor = new Date();
  if (!set.has(dateKey(cursor))) {
    cursor.setDate(cursor.getDate() - 1);
  }

  let count = 0;
  while (set.has(dateKey(cursor))) {
    count += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return count;
}

export function buildWeek(dates) {
  const set = new Set(Array.isArray(dates) ? dates : []);
  const days = [];

  for (let offset = 6; offset >= 0; offset -= 1) {
    const date = new Date();
    date.setDate(date.getDate() - offset);
    const key = dateKey(date);
    days.push({
      key,
      label: date.toLocaleDateString('en-NG', { weekday: 'narrow' }),
      day: date.getDate(),
      checked: set.has(key),
      today: offset === 0,
    });
  }

  return days;
}
