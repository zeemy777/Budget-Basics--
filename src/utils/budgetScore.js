export const DEFAULT_PLAN = {
  income: 120000,
  needs: 50,
  wants: 30,
};

export const PLAN_PRESETS = [
  { label: '50 · 30 · 20', needs: 50, wants: 30 },
  { label: '60 · 20 · 20', needs: 60, wants: 20 },
  { label: '70 · 20 · 10', needs: 70, wants: 20 },
];

export function getSavingsPercent(plan) {
  return Math.max(0, 100 - plan.needs - plan.wants);
}

export function getScoreBreakdown({ needs, wants, savings }) {
  return {
    needs: Math.round(needs <= 50 ? 30 : Math.max(0, 30 - (needs - 50))),
    wants: Math.round(wants <= 30 ? 30 : Math.max(0, 30 - (wants - 30))),
    savings: Math.round(Math.min(40, (Math.max(0, savings) / 20) * 40)),
  };
}

export function calculateHealthScore(split) {
  const points = getScoreBreakdown(split);
  return Math.min(100, Math.max(0, points.needs + points.wants + points.savings));
}

export function getScoreBand(score) {
  if (score >= 85) {
    return {
      label: 'Excellent',
      tone: 'excellent',
      message: 'Balanced and savings-led. This is a plan you can sustain.',
    };
  }
  if (score >= 70) {
    return {
      label: 'Strong',
      tone: 'strong',
      message: 'A solid structure with a little room to optimise.',
    };
  }
  if (score >= 55) {
    return {
      label: 'Improving',
      tone: 'improving',
      message: 'You are close. Small shifts will lift this score quickly.',
    };
  }
  if (score >= 40) {
    return {
      label: 'At risk',
      tone: 'risk',
      message: 'Too much is leaving before savings. Rebalance this month.',
    };
  }
  return {
    label: 'Needs work',
    tone: 'low',
    message: 'Start with a small automatic savings transfer, then trim wants.',
  };
}

export function getNextAction({ needs, wants, savings }) {
  if (savings < 20) {
    return `Move ${20 - savings}% of income into savings — it is the fastest way to raise your score.`;
  }
  if (needs > 50) {
    return `Trim needs by ${needs - 50}% of income. Look for one fixed cost you can renegotiate or share.`;
  }
  if (wants > 30) {
    return `Cut wants by ${wants - 30}% of income. Pick one subscription or habit to pause this month.`;
  }
  return 'Your split is balanced. Automate the savings amount on payday so it leaves before spending.';
}
