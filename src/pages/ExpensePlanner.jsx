import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/auth-context';
import { useUserState } from '../hooks/useUserState';
import { formatNaira } from '../utils/currency';
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
const SAMPLE_BALANCE = 120000;

function ExpensePlanner() {
  const { user } = useAuth();
  const [expenses, setExpenses] = useUserState('expenses', [], user?.id);
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

  return (
    <div className="expense-planner">
      <div className="container">
        {/* Page Header */}
        <div className="page-header">
          <h1>Expense Planner</h1>
          <p className="subtitle">
            Add expenses and see how they affect your monthly balance.{' '}
            {user
              ? 'Everything you add is saved to your dashboard in this browser.'
              : 'Log in to keep your expenses saved between visits.'}
          </p>
        </div>

        {/* Summary Cards */}
        <div className="summary-cards">
          <div className="summary-card balance">
            <div className="summary-label">Sample Starting Balance</div>
            <div className="summary-value">{formatNaira(SAMPLE_BALANCE)}</div>
          </div>
          <div className="summary-card spent">
            <div className="summary-label">Total Expenses</div>
            <div className="summary-value">{formatNaira(totalExpenses)}</div>
          </div>
          <div className={`summary-card remaining ${remaining < 0 ? 'negative' : ''}`}>
            <div className="summary-label">Remaining Balance</div>
            <div className="summary-value">{formatNaira(remaining)}</div>
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
                <label htmlFor="amount">Amount (₦)</label>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  placeholder="e.g. 2500"
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
                      <td className="amount-cell">{formatNaira(exp.amount)}</td>
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
                    <td className="total-amount">{formatNaira(totalExpenses)}</td>
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
            This is a <strong>demonstration only</strong>.{' '}
            {user
              ? 'Your expenses are stored in this browser and stay here until you delete them or clear site data. No data is sent to any server.'
              : 'Expenses last only for this visit. Create a free account to save them in this browser and see them on your dashboard.'}
          </p>
          {!user && (
            <Link to="/signup" className="planner-save-link">
              Create a free account to save your expenses →
            </Link>
          )}
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