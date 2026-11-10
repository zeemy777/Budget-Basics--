import { useState, useEffect } from 'react';
import './TipsTicker.css';

const tips = [
  "💡 Track every expense — even the small ones add up!",
  "🎯 Pay yourself first: save before you spend.",
  "🛑 Wait 24 hours before any non-essential purchase.",
  "📊 The 50-30-20 rule is a great starting point for students.",
  "🔄 Cancel unused subscriptions this week.",
  "📚 Needs come before wants — always.",
];

function TipsTicker() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % tips.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="tips-ticker">
      <div className="container tips-ticker-inner">
        <span className="ticker-label">
          <span className="ticker-dot" aria-hidden="true"></span>
          Money tip
        </span>
        <span className="ticker-text" key={index} aria-live="polite">{tips[index]}</span>
      </div>
    </div>
  );
}

export default TipsTicker;
