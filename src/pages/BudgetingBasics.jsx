import { useState } from 'react';
import './BudgetingBasics.css';

function BudgetingBasics() {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const correctAnswer = 'b';

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    setShowResult(true);
  };

  const resetQuiz = () => {
    setSelectedAnswer(null);
    setShowResult(false);
  };

  return (
    <div className="budgeting-basics">
      <div className="container">
        {/* Page Header */}
        <div className="page-header">
          <h1>Budgeting Basics</h1>
          <p className="subtitle">
            Learn the fundamental concepts of personal budgeting — explained simply for students.
          </p>
        </div>

        {/* Concept Cards */}
        <section className="concepts-section">
          <h2>Key Concepts</h2>
          <div className="concepts-grid">
            <div className="concept-card">
              <div className="card-icon">💰</div>
              <h3>Income</h3>
              <p>
                Money you receive regularly. For students this can be allowance,
                part-time job salary, scholarship, internship stipend, or gifts.
              </p>
            </div>

            <div className="concept-card">
              <div className="card-icon">📌</div>
              <h3>Fixed Expenses</h3>
              <p>
                Costs that stay the same every month. Examples: rent, hostel fees,
                mobile plan, transport pass, or loan repayments.
              </p>
            </div>

            <div className="concept-card">
              <div className="card-icon">🔄</div>
              <h3>Variable Expenses</h3>
              <p>
                Costs that change from month to month. Examples: food, entertainment,
                shopping, snacks, and outings with friends.
              </p>
            </div>

            <div className="concept-card">
              <div className="card-icon">✅</div>
              <h3>Needs (Requirements)</h3>
              <p>
                Essential things you must have to live and study. Food, rent,
                transport to college, books, and basic utilities.
              </p>
            </div>

            <div className="concept-card">
              <div className="card-icon">🎯</div>
              <h3>Wants</h3>
              <p>
                Things that make life more enjoyable but are not essential.
                Streaming subscriptions, new gadgets, eating out, or fashion items.
              </p>
            </div>

            <div className="concept-card">
              <div className="card-icon">🏦</div>
              <h3>Savings</h3>
              <p>
                Money you set aside for future goals or emergencies.
                Even small amounts every month build good money habits.
              </p>
            </div>
          </div>
        </section>

        {/* Sample Budget Table */}
        <section className="sample-budget-section">
          <h2>Sample Student Monthly Budget</h2>
          <p className="section-desc">
            Here’s a realistic example for a student with a monthly income of ₹12,000.
          </p>

          <div className="table-wrapper">
            <table className="budget-table">
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Type</th>
                  <th>Amount (₹)</th>
                  <th>% of Income</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Hostel / Rent</td>
                  <td><span className="badge fixed">Fixed</span></td>
                  <td>4,000</td>
                  <td>33%</td>
                </tr>
                <tr>
                  <td>Food & Mess</td>
                  <td><span className="badge need">Need</span></td>
                  <td>3,000</td>
                  <td>25%</td>
                </tr>
                <tr>
                  <td>Transport</td>
                  <td><span className="badge need">Need</span></td>
                  <td>800</td>
                  <td>7%</td>
                </tr>
                <tr>
                  <td>Mobile & Internet</td>
                  <td><span className="badge fixed">Fixed</span></td>
                  <td>500</td>
                  <td>4%</td>
                </tr>
                <tr>
                  <td>Study Materials</td>
                  <td><span className="badge need">Need</span></td>
                  <td>700</td>
                  <td>6%</td>
                </tr>
                <tr>
                  <td>Entertainment</td>
                  <td><span className="badge want">Want</span></td>
                  <td>1,000</td>
                  <td>8%</td>
                </tr>
                <tr>
                  <td>Shopping / Personal</td>
                  <td><span className="badge want">Want</span></td>
                  <td>800</td>
                  <td>7%</td>
                </tr>
                <tr className="savings-row">
                  <td><strong>Savings</strong></td>
                  <td><span className="badge savings">Savings</span></td>
                  <td><strong>1,200</strong></td>
                  <td><strong>10%</strong></td>
                </tr>
                <tr className="total-row">
                  <td colSpan="2"><strong>Total</strong></td>
                  <td><strong>12,000</strong></td>
                  <td><strong>100%</strong></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="budget-note">
            <strong>Note:</strong> This is only an educational example. Your actual numbers will be different.
            The important part is to track where your money goes.
          </div>
        </section>

        {/* Knowledge Check */}
        <section className="quiz-section">
          <h2>Quick Knowledge Check</h2>
          <div className="quiz-card">
            <p className="question">
              Which of the following is the best example of a <strong>Need</strong> for a student?
            </p>

            <div className="options">
              <button
                className={`option-btn ${selectedAnswer === 'a' ? 'selected' : ''}`}
                onClick={() => handleAnswer('a')}
                disabled={showResult}
              >
                A. New headphones for music
              </button>

              <button
                className={`option-btn ${selectedAnswer === 'b' ? 'selected' : ''}`}
                onClick={() => handleAnswer('b')}
                disabled={showResult}
              >
                B. Monthly bus pass to college
              </button>

              <button
                className={`option-btn ${selectedAnswer === 'c' ? 'selected' : ''}`}
                onClick={() => handleAnswer('c')}
                disabled={showResult}
              >
                C. Subscription to a streaming service
              </button>

              <button
                className={`option-btn ${selectedAnswer === 'd' ? 'selected' : ''}`}
                onClick={() => handleAnswer('d')}
                disabled={showResult}
              >
                D. Latest smartphone
              </button>
            </div>

            {showResult && (
              <div className={`result ${selectedAnswer === correctAnswer ? 'correct' : 'wrong'}`}>
                {selectedAnswer === correctAnswer ? (
                  <>
                    <strong>Correct!</strong> A monthly bus pass is essential for attending college — it is a Need.
                  </>
                ) : (
                  <>
                    <strong>Not quite.</strong> The correct answer is <strong>B</strong>. 
                    A bus pass is required for daily travel to college, making it a Need.
                  </>
                )}
                <button className="reset-btn" onClick={resetQuiz}>
                  Try Again
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Bottom Tip */}
        <div className="bottom-tip">
          <strong>Pro Tip:</strong> Start by writing down everything you spend for one week. 
          You’ll be surprised how much goes to small, unnoticed expenses.
        </div>
      </div>
    </div>
  );
}

export default BudgetingBasics;