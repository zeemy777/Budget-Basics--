const nairaFormatter = new Intl.NumberFormat('en-NG', {
  style: 'currency',
  currency: 'NGN',
  maximumFractionDigits: 0,
});

export function formatNaira(amount) {
  const value = Number(amount);
  return nairaFormatter.format(Number.isFinite(value) ? value : 0);
}
