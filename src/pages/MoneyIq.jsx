import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/auth-context';
import { useToast } from '../context/toast-context';
import { useUserState } from '../hooks/useUserState';
import { useCountUp } from '../hooks/useCountUp';
import { celebrate } from '../utils/celebrate';
import './MoneyIq.css';

const QUESTIONS = [
  {
    question: 'Which of these is a need for most students?',
    options: ['A concert ticket', 'Hostel rent', 'A second pair of sneakers', 'A streaming subscription'],
    answer: 1,
    explanation:
      'Shelter is a need — you cannot study or work without a stable place to stay. The other three are wants: nice to have, but skippable this month.',
  },
  {
    question: 'You earn ₦100,000 a month and follow the 50-30-20 rule. How much goes to savings?',
    options: ['₦10,000', '₦20,000', '₦30,000', '₦50,000'],
    answer: 1,
    explanation:
      'The last number is the savings share: 20% of ₦100,000 is ₦20,000. The first 50% covers needs and 30% covers wants.',
  },
  {
    question: 'A healthy emergency fund usually covers how many months of expenses?',
    options: ['About 1 week', '3 to 6 months', 'Exactly 12 months', 'It does not matter'],
    answer: 1,
    explanation:
      'Three to six months gives you a buffer for job loss, medical bills, or a broken laptop without borrowing at high interest.',
  },
  {
    question: 'You save ₦10,000 at 10% interest for one year and leave it untouched. What do you have?',
    options: ['₦10,000', '₦10,100', '₦11,000', '₦12,000'],
    answer: 2,
    explanation:
      '10% of ₦10,000 is ₦1,000, so you end the year with ₦11,000. Interest makes your money work while you sleep — if you leave it alone.',
  },
  {
    question: 'Which statement about wants is healthiest?',
    options: [
      'Wants should be cut out completely',
      'Wants are fine once needs and savings are covered',
      'Wants matter more than savings',
      'Wants and needs are the same thing',
    ],
    answer: 1,
    explanation:
      'A budget you can sustain includes room for joy. Cover needs and savings first, then spend on wants without guilt.',
  },
  {
    question: 'Your stipend goes up by ₦10,000. Best first move?',
    options: [
      'Upgrade your data plan immediately',
      'Send at least part of it to savings before spending starts',
      'Lend all of it to a friend',
      'Wait and see where it disappears',
    ],
    answer: 1,
    explanation:
      'Automating savings the moment money arrives beats trying to save whatever is left. Lifestyle upgrades can come after the transfer.',
  },
];

function getBand(score) {
  if (score >= 5) {
    return { label: 'Money-smart', tone: 'high', message: 'Strong instincts. You know how to protect and grow your naira.' };
  }
  if (score >= 3) {
    return { label: 'Getting there', tone: 'mid', message: 'Solid base. Revisit needs vs wants and the 50-30-20 split to level up.' };
  }
  return { label: 'Room to grow', tone: 'low', message: 'Great start — every expert began here. Try the guides, then retake this quiz.' };
}

function MoneyIq() {
  const { user } = useAuth();
  const { notify } = useToast();
  const [quizState, setQuizState] = useUserState('moneyIq', { best: 0, attempts: 0, last: 0 }, user?.id);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [finished, setFinished] = useState(false);
  const [finalScore, setFinalScore] = useState(0);

  const best = Math.max(0, Number(quizState?.best) || 0);
  const question = QUESTIONS[step];
  const current = answers[step];
  const total = QUESTIONS.length;
  const scorePercent = Math.round((finalScore / total) * 100);
  const animatedPercent = useCountUp(finished ? scorePercent : 0);
  const band = getBand(finalScore);

  const ringRadius = 54;
  const ringLength = 2 * Math.PI * ringRadius;

  const choose = (index) => {
    if (current) return;
    setAnswers((previous) => {
      const next = [...previous];
      next[step] = { choice: index, correct: index === question.answer };
      return next;
    });
  };

  const finish = () => {
    const score = answers.filter((entry) => entry?.correct).length;
    setFinalScore(score);
    setQuizState((previous) => ({
      best: Math.max(Number(previous?.best) || 0, score),
      attempts: (Number(previous?.attempts) || 0) + 1,
      last: score,
    }));
    if (score >= 5) celebrate();
    notify(
      score >= 5 ? `Excellent — ${score}/${total} correct.` : `You scored ${score}/${total}. Every retake teaches you something.`,
      score >= 5 ? 'success' : 'info'
    );
    setFinished(true);
  };

  const next = () => {
    if (step < total - 1) {
      setStep((value) => value + 1);
    } else {
      finish();
    }
  };

  const restart = () => {
    setStep(0);
    setAnswers([]);
    setFinished(false);
    setFinalScore(0);
  };

  const copyResult = async () => {
    const text = `I scored ${finalScore}/${total} on the BudgetBasics Money IQ quiz — naira-first money skills for students.`;
    try {
      await navigator.clipboard.writeText(text);
      notify('Result copied. Share it anywhere.', 'success');
    } catch {
      notify('Your browser blocked clipboard access.', 'warning');
    }
  };

  return (
    <div className="quiz-page">
      <div className="container">
        <header className="quiz-hero">
          <span className="quiz-eyebrow">Money IQ test</span>
          <h1>How money-smart are you?</h1>
          <p>
            Six quick questions on needs, savings, and interest — built around real naira
            decisions students face every week.
          </p>
          <div className="quiz-meta">
            <span>{total} questions</span>
            <span>~2 minutes</span>
            <span>{user ? `Best: ${best}/${total}` : 'Log in to keep your best score'}</span>
          </div>
        </header>

        {finished ? (
          <section className="quiz-card quiz-result">
            <div className="quiz-result-main">
              <div className={`quiz-ring tone-${band.tone}`}>
                <svg viewBox="0 0 140 140" role="img" aria-label={`You scored ${finalScore} out of ${total}`}>
                  <circle className="quiz-ring-track" cx="70" cy="70" r={ringRadius} />
                  <circle
                    className="quiz-ring-value"
                    cx="70"
                    cy="70"
                    r={ringRadius}
                    strokeDasharray={ringLength}
                    strokeDashoffset={ringLength * (1 - animatedPercent / 100)}
                  />
                </svg>
                <div className="quiz-ring-label">
                  <strong>{finalScore}</strong>
                  <span>of {total}</span>
                </div>
              </div>

              <div className="quiz-result-copy">
                <span className={`quiz-band tone-${band.tone}`}>{band.label}</span>
                <h2>{scorePercent}% correct</h2>
                <p>{band.message}</p>
                {!user && (
                  <p className="quiz-save-note">
                    <Link to="/login">Log in</Link> or <Link to="/signup">create a free account</Link>{' '}
                    so your best score is saved on this device.
                  </p>
                )}
              </div>
            </div>

            <div className="quiz-actions">
              <button type="button" className="quiz-btn primary" onClick={restart}>
                Retake the quiz
              </button>
              <button type="button" className="quiz-btn ghost" onClick={copyResult}>
                Copy my result
              </button>
              <Link to={user ? '/dashboard' : '/signup'} className="quiz-btn ghost">
                {user ? 'Back to dashboard' : 'Create free account'}
              </Link>
            </div>

            <div className="quiz-review">
              <h3>Review your answers</h3>
              {QUESTIONS.map((item, index) => {
                const entry = answers[index];
                return (
                  <div
                    key={item.question}
                    className={`quiz-review-item ${entry?.correct ? 'correct' : 'wrong'}`}
                  >
                    <span className="quiz-review-icon" aria-hidden="true">
                      {entry?.correct ? '✓' : '×'}
                    </span>
                    <div>
                      <strong>{item.question}</strong>
                      <p>
                        Correct answer: {item.options[item.answer]}
                        {!entry?.correct && entry && ` · You picked: ${item.options[entry.choice]}`}
                      </p>
                      <small>{item.explanation}</small>
                    </div>
                  </div>
                );
              })}
            </div>

            <p className="quiz-next-links">
              Keep learning: <Link to="/needs-vs-wants">Needs vs Wants</Link> ·{' '}
              <Link to="/50-30-20">50-30-20 Rule</Link> ·{' '}
              <Link to="/money-mistakes">Money Mistakes</Link>
            </p>
          </section>
        ) : (
          <section className="quiz-card">
            <div className="quiz-top">
              <span className="quiz-count">
                Question {step + 1} of {total}
              </span>
              <span className="quiz-score-chip">{answers.filter((entry) => entry?.correct).length} correct so far</span>
            </div>

            <div className="quiz-progress" aria-hidden="true">
              <span style={{ width: `${((step + 1) / total) * 100}%` }}></span>
            </div>

            <h2 className="quiz-question">{question.question}</h2>

            <div className="quiz-options" role="group" aria-label="Answer options">
              {question.options.map((option, index) => {
                const isCorrect = index === question.answer;
                const isChosen = current?.choice === index;
                let stateClass = '';
                if (current) {
                  if (isCorrect) stateClass = 'correct';
                  else if (isChosen) stateClass = 'wrong';
                  else stateClass = 'dim';
                }

                return (
                  <button
                    key={option}
                    type="button"
                    className={`quiz-option ${stateClass}`}
                    onClick={() => choose(index)}
                    disabled={Boolean(current)}
                  >
                    <span className="quiz-option-letter" aria-hidden="true">
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span>{option}</span>
                  </button>
                );
              })}
            </div>

            {current && (
              <div className={`quiz-explanation ${current.correct ? 'correct' : 'wrong'}`}>
                <strong>{current.correct ? 'Correct!' : 'Not quite.'}</strong>
                <p>{question.explanation}</p>
              </div>
            )}

            <div className="quiz-actions">
              <button
                type="button"
                className="quiz-btn primary"
                onClick={next}
                disabled={!current}
              >
                {step < total - 1 ? 'Next question' : 'See my result'}
              </button>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default MoneyIq;
