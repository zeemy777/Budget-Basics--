import { useState, useRef, useEffect } from 'react';
import './Chatbot.css';

const knowledgeBase = [
  {
    keywords: ['need', 'needs', 'what is a need', 'essential'],
    answer:
      'A Need is something essential for living, studying, or basic well-being. Examples: food, rent/hostel, transport to college, textbooks, electricity, and basic healthcare.',
  },
  {
    keywords: ['want', 'wants', 'what is a want'],
    answer:
      'A Want is something that makes life more enjoyable but is not essential. Examples: streaming subscriptions, new gadgets, eating out, branded clothes, and games.',
  },
  {
    keywords: ['50-30-20', '50 30 20', 'rule', 'budget rule'],
    answer:
      'The 50-30-20 rule suggests splitting your income into: 50% for Needs, 30% for Wants, and 20% for Savings. It is only a guideline — adjust it based on your real situation.',
  },
  {
    keywords: ['save', 'saving', 'how much should i save', 'savings'],
    answer:
      'A good starting point for students is to save at least 10–20% of your income. Even small consistent amounts build strong habits. Use the Savings Goals tool on this website to plan.',
  },
  {
    keywords: ['overspending', 'avoid overspending', 'spend less', 'control spending'],
    answer:
      'To avoid overspending: 1) Track every expense for a week, 2) Use the 24-hour rule before buying wants, 3) Follow a simple budget, and 4) Cancel unused subscriptions.',
  },
  {
    keywords: ['impulse', 'impulse buying', 'impulse purchase'],
    answer:
      'Impulse buying happens when you purchase something without planning. Fight it with the 24-hour rule: wait one full day before buying anything non-essential.',
  },
  {
    keywords: ['subscription', 'subscriptions', 'unused'],
    answer:
      'Unused subscriptions silently drain money every month. Review all your subscriptions once a month and cancel anything you haven’t used in the last 30 days.',
  },
  {
    keywords: ['emergency', 'emergency fund'],
    answer:
      'An emergency fund is money set aside for unexpected situations (medical, travel, device repair). Even ₹5,000–10,000 can protect you from debt.',
  },
  {
    keywords: ['budget', 'how to budget', 'make a budget'],
    answer:
      'A simple student budget: List your income → List essential needs → Decide savings amount → Use remaining for wants. Track weekly and adjust.',
  },
  {
    keywords: ['hello', 'hi', 'hey', 'good morning', 'good evening'],
    answer:
      'Hello! I’m the BudgetBasics assistant. Ask me about needs, wants, saving, budgeting, or common money mistakes.',
  },
];

const suggestedPrompts = [
  'What is a need?',
  'How much should I save?',
  'How do I avoid overspending?',
  'Explain the 50-30-20 rule',
  'What is impulse buying?',
];

const fallback =
  "I'm not sure about that. I can help with topics like needs vs wants, the 50-30-20 rule, saving tips, impulse buying, and basic budgeting. Try one of the suggested questions!";

function Chatbot() {
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: 'Hi! I’m your BudgetBasics assistant. Ask me anything about student budgeting, saving, or money habits.',
    },
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getBotReply = (question) => {
    const lower = question.toLowerCase().trim();

    for (const item of knowledgeBase) {
      if (item.keywords.some((kw) => lower.includes(kw))) {
        return item.answer;
      }
    }
    return fallback;
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { type: 'user', text: input.trim() };
    const botReply = { type: 'bot', text: getBotReply(input) };

    setMessages((prev) => [...prev, userMessage, botReply]);
    setInput('');
  };

  const handleSuggestion = (prompt) => {
    const userMessage = { type: 'user', text: prompt };
    const botReply = { type: 'bot', text: getBotReply(prompt) };
    setMessages((prev) => [...prev, userMessage, botReply]);
  };

  return (
    <div className="chatbot-page">
      <div className="container">
        {/* Header */}
        <div className="page-header">
          <h1>AI Chatbot Assistant</h1>
          <p className="subtitle">
            Ask basic questions about budgeting, saving, and money habits.
          </p>
        </div>

        {/* Chat Window */}
        <div className="chat-container">
          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message ${msg.type === 'user' ? 'user-message' : 'bot-message'}`}
              >
                <div className="message-bubble">{msg.text}</div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Prompts */}
          <div className="suggestions">
            <span className="suggestions-label">Try asking:</span>
            <div className="suggestion-buttons">
              {suggestedPrompts.map((prompt) => (
                <button
                  key={prompt}
                  className="suggestion-btn"
                  onClick={() => handleSuggestion(prompt)}
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <form className="chat-input-area" onSubmit={handleSend}>
            <input
              type="text"
              placeholder="Type your question here..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit" className="send-btn">
              Ask
            </button>
          </form>
        </div>

        {/* Disclaimer */}
        <div className="disclaimer">
          <strong>Disclaimer:</strong> This chatbot provides basic educational information only.
          It is <strong>not</strong> professional financial advice. Always think carefully before
          making real money decisions.
        </div>
      </div>
    </div>
  );
}

export default Chatbot;