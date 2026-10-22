import { useState } from 'react';
import './Infographics.css';

const galleryItems = [
  {
    id: 1,
    title: 'Needs vs Wants',
    topic: 'Basics',
    description:
      'A clear visual comparison between essential expenses (Needs) and optional expenses (Wants). Helps students make better spending decisions.',
    color: '#0f766e',
    icon: '⚖️',
  },
  {
    id: 2,
    title: '50-30-20 Rule',
    topic: 'Budgeting',
    description:
      'Simple pie-style breakdown showing 50% Needs, 30% Wants, and 20% Savings. A great starting framework for any student budget.',
    color: '#0891b2',
    icon: '📊',
  },
  {
    id: 3,
    title: 'Monthly Budget Cycle',
    topic: 'Budgeting',
    description:
      'Step-by-step flow of a healthy monthly money cycle: Receive income → Allocate → Spend mindfully → Track → Adjust → Save.',
    color: '#7c3aed',
    icon: '🔄',
  },
  {
    id: 4,
    title: 'Saving Challenges',
    topic: 'Savings',
    description:
      'Fun and realistic saving challenges for students — 30-day no-spend, ₹50 daily save, and the 52-week challenge adapted for small budgets.',
    color: '#059669',
    icon: '🎯',
  },
  {
    id: 5,
    title: 'Emergency Fund Basics',
    topic: 'Savings',
    description:
      'Why every student should build a small emergency fund (even ₹5,000–10,000) and how it prevents debt during unexpected situations.',
    color: '#d97706',
    icon: '🛡️',
  },
  {
    id: 6,
    title: 'Smart Spending Pyramid',
    topic: 'Basics',
    description:
      'A priority pyramid: Needs at the base, Savings in the middle, and Wants at the top. Visual reminder of what comes first.',
    color: '#e11d48',
    icon: 'ピラミッド',
  },
  {
    id: 7,
    title: 'Subscription Audit',
    topic: 'Money Mistakes',
    description:
      'A simple checklist-style visual to review and cancel unused subscriptions that silently drain student budgets every month.',
    color: '#4f46e5',
    icon: '📝',
  },
  {
    id: 8,
    title: 'Goal Setting Roadmap',
    topic: 'Savings',
    description:
      'From dream to reality: Define goal → Calculate amount → Set monthly contribution → Track progress → Celebrate milestones.',
    color: '#0d9488',
    icon: '🗺️',
  },
];

const topics = ['All', 'Basics', 'Budgeting', 'Savings', 'Money Mistakes'];

function Infographics() {
  const [activeTopic, setActiveTopic] = useState('All');

  const filteredItems =
    activeTopic === 'All'
      ? galleryItems
      : galleryItems.filter((item) => item.topic === activeTopic);

  return (
    <div className="infographics">
      <div className="container">
        {/* Page Header */}
        <div className="page-header">
          <h1>Infographics & Learning Gallery</h1>
          <p className="subtitle">
            Visual summaries of key budgeting concepts. Click any card to explore the idea.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="filter-bar">
          {topics.map((topic) => (
            <button
              key={topic}
              className={`filter-btn ${activeTopic === topic ? 'active' : ''}`}
              onClick={() => setActiveTopic(topic)}
            >
              {topic}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        {filteredItems.length === 0 ? (
          <div className="no-results">
            <p>No infographics found for this topic.</p>
          </div>
        ) : (
          <div className="gallery-grid">
            {filteredItems.map((item) => (
              <div key={item.id} className="gallery-card">
                <div
                  className="card-visual"
                  style={{ backgroundColor: item.color }}
                >
                  <span className="card-icon">{item.icon}</span>
                  <span className="card-topic">{item.topic}</span>
                </div>

                <div className="card-content">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Note */}
        <div className="gallery-note">
          <strong>Note:</strong> These are educational visual summaries. In a real project you can
          replace the colored blocks with actual designed infographics (Canva, Figma, etc.).
        </div>

        {/* Bottom Tip */}
        <div className="bottom-tip">
          <strong>Pro Tip:</strong> Save or screenshot the visuals that help you most.
          Reviewing them once a week reinforces good money habits.
        </div>
      </div>
    </div>
  );
}

export default Infographics;