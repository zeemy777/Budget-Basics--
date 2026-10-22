import { useState } from 'react';
import './MoneyMistakes.css';

const mistakes = [
  {
    id: 1,
    title: 'Impulse Buying',
    icon: '🛍️',
    scenario:
      'You see a limited-time offer on headphones while scrolling. Even though your current ones work fine, you buy them immediately because of the discount.',
    whyBad:
      'Impulse purchases often lead to regret and leftover money that could have gone to needs or savings.',
    corrective:
      'Use the 24-hour rule. Wait at least one full day before buying anything non-essential. Most urges fade.',
  },
  {
    id: 2,
    title: 'Ignoring Small Expenses',
    icon: '☕',
    scenario:
      'You spend ₹80–150 daily on snacks, tea, or quick rides. At the end of the month you wonder where your money went.',
    whyBad:
      'Small amounts feel harmless, but they can easily add up to ₹3,000–5,000 per month.',
    corrective:
      'Track every expense for one week (even the tiny ones). Seeing the total usually changes behaviour.',
  },
  {
    id: 3,
    title: 'Late Payments & Penalties',
    icon: '⏰',
    scenario:
      'You forget to pay your mobile bill or hostel fees on time and end up paying late fees or facing service cuts.',
    whyBad:
      'Late fees are pure waste. They also hurt your future credit score if the payment is reported.',
    corrective:
      'Set calendar reminders 3 days before due dates. Better yet, enable auto-pay where possible.',
  },
  {
    id: 4,
    title: 'Unused Subscriptions',
    icon: '🔄',
    scenario:
      'You signed up for multiple streaming or learning apps during free trials and forgot to cancel. Money keeps leaving your account every month.',
    whyBad:
      'These “invisible” charges slowly drain your budget without giving real value.',
    corrective:
      'Once a month, review all active subscriptions. Cancel anything you haven’t used in the last 30 days.',
  },
  {
    id: 5,
    title: 'Spending Without a Plan',
    icon: '🎲',
    scenario:
      'You receive your allowance or stipend and start spending freely. By the third week, you’re already short of money.',
    whyBad:
      'Without a simple plan, money disappears on low-priority things and important needs get compromised.',
    corrective:
      'Use the 50-30-20 guideline (or any simple split). Decide in advance how much goes to needs, wants, and savings.',
  },
  {
    id: 6,
    title: 'Lifestyle Inflation',
    icon: '📈',
    scenario:
      'You get a small increase in pocket money or a part-time job. Instead of saving the extra, you immediately upgrade your lifestyle (more eating out, new gadgets).',
    whyBad:
      'When income rises but savings stay the same (or drop), you never build real financial progress.',
    corrective:
      'When income increases, save at least 50% of the extra amount first. Then enjoy the rest guilt-free.',
  },
];

function MoneyMistakes() {
  const [openId, setOpenId] = useState(null);

  const toggle = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="money-mistakes">
      <div className="container">
        {/* Page Header */}
        <div className="page-header">
          <h1>Common Money Mistakes</h1>
          <p className="subtitle">
            Most students make these mistakes. The good news? They’re easy to fix once you notice them.
          </p>
        </div>

        {/* Intro */}
        <div className="intro-box">
          <p>
            Click on any card below to expand it. Each mistake includes a realistic student scenario
            and a simple corrective action you can start using today.
          </p>
        </div>

        {/* Accordion List */}
        <div className="mistakes-list">
          {mistakes.map((item) => {
            const isOpen = openId === item.id;

            return (
              <div
                key={item.id}
                className={`mistake-card ${isOpen ? 'open' : ''}`}
              >
                <button
                  className="mistake-header"
                  onClick={() => toggle(item.id)}
                  aria-expanded={isOpen}
                >
                  <div className="header-left">
                    <span className="mistake-icon">{item.icon}</span>
                    <h3>{item.title}</h3>
                  </div>
                  <span className="toggle-icon">{isOpen ? '−' : '+'}</span>
                </button>

                {isOpen && (
                  <div className="mistake-body">
                    <div className="body-section">
                      <h4>Student Scenario</h4>
                      <p>{item.scenario}</p>
                    </div>

                    <div className="body-section why-bad">
                      <h4>Why It’s a Problem</h4>
                      <p>{item.whyBad}</p>
                    </div>

                    <div className="body-section corrective">
                      <h4>Corrective Action</h4>
                      <p>{item.corrective}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Tip */}
        <div className="bottom-tip">
          <strong>Pro Tip:</strong> Pick just one mistake from the list above and focus on fixing it
          this month. Small improvements compound into strong money habits.
        </div>
      </div>
    </div>
  );
}

export default MoneyMistakes;