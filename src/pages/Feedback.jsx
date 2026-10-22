import { useState } from 'react';
import './Feedback.css';

function Feedback() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    rating: '',
    comments: '',
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = 'Name is required.';
    } else if (form.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters.';
    }

    if (!form.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!form.rating) {
      newErrors.rating = 'Please select a rating.';
    }

    if (!form.comments.trim()) {
      newErrors.comments = 'Please share your comments.';
    } else if (form.comments.trim().length < 10) {
      newErrors.comments = 'Comments should be at least 10 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      // Client-side only — no data is sent anywhere
      setSubmitted(true);
    }
  };

  const handleReset = () => {
    setForm({
      name: '',
      email: '',
      rating: '',
      comments: '',
    });
    setErrors({});
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <div className="feedback-page">
        <div className="container">
          <div className="success-card">
            <div className="success-icon">✅</div>
            <h2>Thank You for Your Feedback!</h2>
            <p>
              Your response has been recorded locally for this session.
              <br />
              <strong>No personal data was stored or sent to any server.</strong>
            </p>
            <button className="primary-btn" onClick={handleReset}>
              Submit Another Feedback
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="feedback-page">
      <div className="container">
        {/* Page Header */}
        <div className="page-header">
          <h1>Feedback</h1>
          <p className="subtitle">
            We’d love to hear your thoughts about BudgetBasics. Your feedback helps us improve.
          </p>
        </div>

        {/* Feedback Form */}
        <div className="form-card">
          <form onSubmit={handleSubmit} noValidate>
            {/* Name */}
            <div className="form-group">
              <label htmlFor="name">
                Full Name <span className="required">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                value={form.name}
                onChange={handleChange}
                className={errors.name ? 'error' : ''}
              />
              {errors.name && <span className="error-text">{errors.name}</span>}
            </div>

            {/* Email */}
            <div className="form-group">
              <label htmlFor="email">
                Email Address <span className="required">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>

            {/* Rating */}
            <div className="form-group">
              <label>
                How would you rate this website? <span className="required">*</span>
              </label>
              <div className="rating-options">
                {[1, 2, 3, 4, 5].map((num) => (
                  <label key={num} className="rating-label">
                    <input
                      type="radio"
                      name="rating"
                      value={num}
                      checked={form.rating === String(num)}
                      onChange={handleChange}
                    />
                    <span className="star">{'⭐'.repeat(num)}</span>
                    <span className="rating-num">{num}</span>
                  </label>
                ))}
              </div>
              {errors.rating && <span className="error-text">{errors.rating}</span>}
            </div>

            {/* Comments */}
            <div className="form-group">
              <label htmlFor="comments">
                Comments / Suggestions <span className="required">*</span>
              </label>
              <textarea
                id="comments"
                name="comments"
                rows="5"
                placeholder="Share your experience, suggestions, or any issues you faced..."
                value={form.comments}
                onChange={handleChange}
                className={errors.comments ? 'error' : ''}
              ></textarea>
              {errors.comments && <span className="error-text">{errors.comments}</span>}
            </div>

            {/* Privacy Note */}
            <div className="privacy-note">
              <strong>Privacy Note:</strong> This form only performs client-side validation.
              No data is stored or transmitted to any server.
            </div>

            {/* Buttons */}
            <div className="form-actions">
              <button type="submit" className="primary-btn">
                Submit Feedback
              </button>
              <button type="button" className="secondary-btn" onClick={handleReset}>
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Feedback;