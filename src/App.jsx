import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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

function App() {
    return (
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
        </Route>
      </Routes>
    </BrowserRouter>
    );
}

export default App
