import { useState } from 'react';
import './NeedsVsWants.css';

const sampleItems = [
  { id: 1, name: 'Monthly bus/train pass to college', correct: 'need', explanation: 'Essential for attending classes regularly.' },
  { id: 2, name: 'New wireless headphones', correct: 'want', explanation: 'Nice to have, but not required for studying or living.' },
  { id: 3, name: 'Hostel mess / basic food', correct: 'need', explanation: 'Food is a basic requirement for health and energy.' },
  { id: 4, name: 'Streaming subscription (Netflix, Spotify, etc.)', correct: 'want', explanation: 'Entertainment is optional — you can live without it.' },
  { id: 5, name: 'Textbooks / study materials', correct: 'need', explanation: 'Required for your course and exams.' },
  { id: 6, name: 'Latest smartphone upgrade', correct: 'want', explanation: 'Your current phone likely still works. This is a luxury upgrade.' },
  { id: 7, name: 'Electricity / water bill share', correct: 'need', explanation: 'Basic utility needed for daily living.' },
  { id: 8, name: 'Eating out with friends every weekend', correct: 'want', explanation: 'Fun, but not essential. Can be reduced or replaced.' },
];

function NeedsVsWants() {
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const handleSelect = (id, choice) => {
    if (showResults) return;
    setAnswers((prev) => ({ ...prev, [id]: choice }));
  };

  const checkAnswers = () => {
    setShowResults(true);
  };

  const resetQuiz = () => {
    setAnswers({});
    setShowResults(false);
  };

  const correctCount = sampleItems.filter(
    (item) => answers[item.id] === item.correct
  ).length;

  return (
    <div className="needs-vs-wants">
      <div className="container">
        {/* Page Header */}
        <div className="page-header">
          <h1>Needs vs Wants</h1>
          <p className="subtitle">
            Learn to tell the difference between what you truly need and what you simply want.
            This skill is the foundation of smart budgeting.
          </p>
        </div>

        {/* Comparison Section */}
        <section className="comparison-section">
          <div className="comparison-grid">
            <div className="comparison-card needs-card">
              <div className="card-header">
                <span className="icon">✅</span>
                <h2>Needs</h2>
              </div>
              <p className="card-desc">Essential for living, studying, and basic well-being.</p>
              <ul>
                <li>Food & basic meals</li>
                <li>Rent / Hostel fees</li>
                <li>Transport to college</li>
                <li>Study materials & books</li>
                <li>Electricity, water, internet</li>
                <li>Basic healthcare</li>
              </ul>
            </div>

            <div className="vs-badge">VS</div>

            <div className="comparison-card wants-card">
              <div className="card-header">
                <span className="icon">🎯</span>
                <h2>Wants</h2>
              </div>
              <p className="card-desc">Things that make life more enjoyable but are optional.</p>
              <ul>
                <li>New gadgets & headphones</li>
                <li>Streaming subscriptions</li>
                <li>Fashion & branded clothes</li>
                <li>Eating out frequently</li>
                <li>Latest phone upgrade</li>
                <li>Games & entertainment</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Interactive Classifier */}
        <section className="classifier-section">
          <h2>Practice: Classify These Items</h2>
          <p className="section-desc">
            Click <strong>Need</strong> or <strong>Want</strong> for each item. Then check your answers.
          </p>

          <div className="items-list">
            {sampleItems.map((item) => {
              const userAnswer = answers[item.id];
              const isCorrect = userAnswer === item.correct;
              const isAnswered = userAnswer !== undefined;

              return (
                <div
                  key={item.id}
                  className={`item-card ${showResults ? (isCorrect ? 'correct' : 'wrong') : ''}`}
                >
                  <div className="item-name">{item.name}</div>

                  <div className="item-actions">
                    <button
                      className={`choice-btn need-btn ${userAnswer === 'need' ? 'active' : ''}`}
                      onClick={() => handleSelect(item.id, 'need')}
                      disabled={showResults}
                    >
                      Need
                    </button>
                    <button
                      className={`choice-btn want-btn ${userAnswer === 'want' ? 'active' : ''}`}
                      onClick={() => handleSelect(item.id, 'want')}
                      disabled={showResults}
                    >
                      Want
                    </button>
                  </div>

                  {showResults && (
                    <div className={`feedback ${isCorrect ? 'correct-feedback' : 'wrong-feedback'}`}>
                      {isCorrect ? (
                        <>✅ Correct! {item.explanation}</>
                      ) : (
                        <>
                          ❌ This is actually a <strong>{item.correct}</strong>. {item.explanation}
                        </>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="quiz-controls">
            {!showResults ? (
              <button
                className="primary-btn"
                onClick={checkAnswers}
                disabled={Object.keys(answers).length < sampleItems.length}
              >
                Check My Answers
              </button>
            ) : (
              <div className="results-summary">
                <p>
                  You got <strong>{correctCount}</strong> out of <strong>{sampleItems.length}</strong> correct!
                </p>
                <button className="primary-btn" onClick={resetQuiz}>
                  Try Again
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Decision Guide */}
        <section className="decision-guide">
          <h2>Decision Guide: Should I Buy It?</h2>
          <p className="section-desc">
            Use this simple flowchart before spending money on something that is not essential.
          </p>

          <div className="flowchart">
            <div className="flow-step start">
              <strong>Is this item essential right now?</strong>
              <div className="flow-question">(Do I need it to live, study, or stay healthy?)</div>
            </div>

            <div className="flow-branches">
              <div className="branch yes-branch">
                <div className="branch-label yes">YES</div>
                <div className="flow-step result-need">
                  <strong>→ It is a Need</strong>
                  <p>Prioritize it in your budget.</p>
                </div>
              </div>

              <div className="branch no-branch">
                <div className="branch-label no">NO</div>
                <div className="flow-step">
                  <strong>Can it wait 7–14 days?</strong>
                </div>

                <div className="sub-branches">
                  <div className="sub-branch">
                    <div className="branch-label yes">YES, it can wait</div>
                    <div className="flow-step result-wait">
                      <strong>→ Delay the purchase</strong>
                      <p>Put the money in savings instead. Re-evaluate later.</p>
                    </div>
                  </div>

                  <div className="sub-branch">
                    <div className="branch-label no">NO, I want it now</div>
                    <div className="flow-step result-want">
                      <strong>→ It is a Want</strong>
                      <p>Only buy if you have money left after needs + savings.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom Tip */}
        <div className="bottom-tip">
          <strong>Pro Tip:</strong> Before buying anything non-essential, wait at least 24–48 hours.
          Many impulse wants disappear after a short delay.
        </div>
      </div>
    </div>
  );
}

export default NeedsVsWants;