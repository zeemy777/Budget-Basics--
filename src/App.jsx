import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthProvider from './context/AuthProvider';
import RequireAuth from './Components/RequireAuth';
import Layout from './Components/Layout';
import Home from './pages/Home';
import BudgetingBasics from './pages/BudgetingBasics';
import NeedsVsWants from './pages/NeedsVsWants';
import Rule503020 from './pages/Rule503020';
import SavingsGoals from './pages/SavingsGoals.jsx';
import ExpensePlanner from './pages/ExpensePlanner';
import MoneyMistakes from './pages/MoneyMistakes';
import Infographics from './pages/Infographics';
import Chatbot from './pages/Chatbot';
import About from './pages/About';
import Feedback from './pages/Feedback';
import Contact from './pages/Contact';
import Sitemap from './pages/Sitemap';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path="budgeting-basics" element={<BudgetingBasics />} />
                        <Route path="needs-vs-wants" element={<NeedsVsWants />} />
                        <Route path="50-30-20" element={<Rule503020 />} />
                        <Route path="savings-goals" element={<SavingsGoals />} />
                        <Route path="expense-planner" element={<ExpensePlanner />} />
                        <Route path="money-mistakes" element={<MoneyMistakes />} />
                        <Route path="infographics" element={<Infographics />} />
                        <Route path="chatbot" element={<Chatbot />} />
                        <Route path="about" element={<About />} />
                        <Route path="feedback" element={<Feedback />} />
                        <Route path="contact" element={<Contact />} />
                        <Route path="sitemap" element={<Sitemap />} />
                        <Route path="login" element={<Auth key="login" mode="login" />} />
                        <Route path="signup" element={<Auth key="signup" mode="signup" />} />
                        <Route
                            path="dashboard"
                            element={
                                <RequireAuth>
                                    <Dashboard />
                                </RequireAuth>
                            }
                        />
                        <Route path="*" element={<NotFound />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App
