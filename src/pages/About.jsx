import './About.css';

function About() {
  return (
    <div className="about-page">
      <div className="container">
        {/* Page Header */}
        <div className="page-header">
          <h1>About BudgetBasics</h1>
          <p className="subtitle">
            Helping students build better money habits through simple education and interactive tools.
          </p>
        </div>

        {/* Mission Section */}
        <section className="about-section">
          <div className="about-card">
            <h2>Our Purpose</h2>
            <p>
              Managing personal finances is an important life skill. Many students start handling 
              allowances, scholarships, internship income, or part-time earnings without a simple 
              way to plan and track their money.
            </p>
            <p>
              <strong>BudgetBasics</strong> was created to make financial concepts easier to understand 
              through clear explanations, relatable examples, visual guides, and simple interactive tools.
            </p>
          </div>
        </section>

        {/* What We Offer */}
        <section className="about-section">
          <h2 className="section-title">What You’ll Find Here</h2>
          <div className="features-grid">
            <div className="feature-item">
              <span className="feature-icon">📚</span>
              <h3>Beginner-Friendly Guides</h3>
              <p>Clear explanations of income, expenses, needs, wants, and savings.</p>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🧮</span>
              <h3>Interactive Tools</h3>
              <p>50-30-20 calculator, savings goal planner, and expense tracker for practice.</p>
            </div>
            <div className="feature-item">
              <span className="feature-icon">📊</span>
              <h3>Visual Learning</h3>
              <p>Infographics and simple visuals that make budgeting concepts easy to remember.</p>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🤖</span>
              <h3>AI Chatbot Assistant</h3>
              <p>Quick answers to common student money questions (educational only).</p>
            </div>
          </div>
        </section>

        {/* Important Note */}
        <section className="about-section">
          <div className="important-box">
            <h2>Important Note</h2>
            <p>
              BudgetBasics is an <strong>educational website</strong> only. 
              It does <strong>not</strong> provide banking services, real financial transactions, 
              investment advice, or permanently store personal financial records.
            </p>
            <p>
              All calculators and tools are for learning purposes. Please use them to understand 
              concepts, not as professional financial guidance.
            </p>
          </div>
        </section>

        {/* Project Info */}
        <section className="about-section">
          <div className="project-info">
            <h2>About This Project</h2>
            <p>
              This website was developed as part of a student project under the theme 
              <strong> “NextGen BudgetBee”</strong> in the category 
              <strong> Web Innovation Unleashed</strong>.
            </p>
            <p>
              It is built using modern web technologies (React, HTML, CSS, JavaScript) 
              with a focus on responsiveness, accessibility, and clean educational design.
            </p>
          </div>
        </section>

        {/* Bottom Message */}
        <div className="bottom-message">
          Thank you for visiting BudgetBasics.  
          We hope this platform helps you take small but meaningful steps toward better money habits.
        </div>
      </div>
    </div>
  );
}

export default About;