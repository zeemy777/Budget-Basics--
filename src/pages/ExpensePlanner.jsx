import { useState } from 'react';
import './ExpensePlanner.css';

const CATEGORIES = [
  'Food',
  'Transport',
  'Education',
  'Entertainment',
  'Shopping',
  'Utilities',
  'Miscellaneous',
];

// Sample starting balance for demonstration
const SAMPLE_BALANCE = 12000;

function ExpensePlanner() {
  const [expenses, setExpenses] = useState([]);
  const [form, setForm] = useState({
    date: '',
    category: 'Food',
    description: '',
    amount: '',
  });
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setForm({
      date: '',
      category: 'Food',
      description: '',
      amount: '',
    });
    setEditId(null);
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!form.date) {
      setError('Please select a date.');
      return;
    }
    if (!form.description.trim()) {
      setError('Please enter a description.');
      return;
    }

    const amount = parseFloat(form.amount);
    if (isNaN(amount) || amount <= 0) {
      setError('Please enter a valid amount greater than zero.');
      return;
    }

    const newExpense = {
      id: editId || Date.now(),
      date: form.date,
      category: form.category,
      description: form.description.trim(),
      amount,
    };

    if (editId) {
      // Update existing
      setExpenses((prev) =>
        prev.map((exp) => (exp.id === editId ? newExpense : exp))
      );
    } else {
      // Add new
      setExpenses((prev) => [...prev, newExpense]);
    }

    resetForm();
  };

  const handleEdit = (expense) => {
    setForm({
      date: expense.date,
      category: expense.category,
      description: expense.description,
      amount: expense.amount.toString(),
    });
    setEditId(expense.id);
    setError('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id) => {
    setExpenses((prev) => prev.filter((exp) => exp.id !== id));
    if (editId === id) resetForm();
  };

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const remaining = SAMPLE_BALANCE - totalExpenses;

  const formatCurrency = (num) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(num);
  };

  return (
    <div className="expense-planner">
      <div className="container">
        {/* Page Header */}
        <div className="page-header">
          <h1>Expense Planner</h1>
          <p className="subtitle">
            Add sample expenses and see how they affect your monthly balance.
            All data is temporary and only stays during this session.
          </p>
        </div>

        {/* Summary Cards */}
        <div className="summary-cards">
          <div className="summary-card balance">
            <div className="summary-label">Sample Starting Balance</div>
            <div className="summary-value">{formatCurrency(SAMPLE_BALANCE)}</div>
          </div>
          <div className="summary-card spent">
            <div className="summary-label">Total Expenses</div>
            <div className="summary-value">{formatCurrency(totalExpenses)}</div>
          </div>
          <div className={`summary-card remaining ${remaining < 0 ? 'negative' : ''}`}>
            <div className="summary-label">Remaining Balance</div>
            <div className="summary-value">{formatCurrency(remaining)}</div>
          </div>
        </div>

        {/* Add / Edit Form */}
        <section className="form-section">
          <div className="form-card">
            <h2>{editId ? 'Edit Expense' : 'Add New Expense'}</h2>

            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="date">Date</label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="category">Category</label>
                  <select
                    id="category"
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  placeholder="e.g. Lunch at canteen, Bus pass, Notebooks"
                  value={form.description}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="amount">Amount (₹)</label>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  placeholder="e.g. 250"
                  value={form.amount}
                  onChange={handleChange}
                  min="0"
                  step="1"
                />
              </div>

              {error && <div className="error-message">{error}</div>}

              <div className="form-actions">
                <button type="submit" className="primary-btn">
                  {editId ? 'Update Expense' : 'Add Expense'}
                </button>
                {editId && (
                  <button type="button" className="secondary-btn" onClick={resetForm}>
                    Cancel Edit
                  </button>
                )}
              </div>
            </form>
          </div>
        </section>

        {/* Expenses Table */}
        <section className="table-section">
          <h2>Your Expenses ({expenses.length})</h2>

          {expenses.length === 0 ? (
            <div className="empty-state">
              <p>No expenses added yet. Start by adding your first expense above.</p>
            </div>
          ) : (
            <div className="table-wrapper">
              <table className="expenses-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Category</th>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {expenses.map((exp) => (
                    <tr key={exp.id}>
                      <td>{exp.date}</td>
                      <td>
                        <span className={`category-badge cat-${exp.category.toLowerCase()}`}>
                          {exp.category}
                        </span>
                      </td>
                      <td>{exp.description}</td>
                      <td className="amount-cell">{formatCurrency(exp.amount)}</td>
                      <td className="actions-cell">
                        <button
                          className="edit-btn"
                          onClick={() => handleEdit(exp)}
                          title="Edit"
                        >
                          Edit
                        </button>
                        <button
                          className="delete-btn"
                          onClick={() => handleDelete(exp.id)}
                          title="Delete"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="3" className="total-label">
                      Total Expenses
                    </td>
                    <td className="total-amount">{formatCurrency(totalExpenses)}</td>
                    <td></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          )}
        </section>

        {/* Educational Note */}
        <div className="educational-note">
          <h3>Educational Note</h3>
          <p>
            This is a <strong>demonstration only</strong>. Expenses are stored temporarily in your browser 
            and will disappear when you refresh the page. No data is sent to any server.
          </p>
        </div>

        {/* Bottom Tip */}
        <div className="bottom-tip">
          <strong>Pro Tip:</strong> Review your expenses weekly. Small daily spends (snacks, rides, subscriptions) 
          often add up to much more than you expect.
        </div>
      </div>
    </div>
  );
}

export default ExpensePlanner;