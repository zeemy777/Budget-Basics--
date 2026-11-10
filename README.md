# BudgetBasics

A Naira-first, student-friendly web app for learning budgeting, saving, and smart money habits through clear guides, calculators, a personal dashboard, and interactive tools. Free, private, and educational.

## Pages

- Home — overview, interactive previews, and a dashboard teaser
- Budgeting Basics — core concepts and a sample student budget
- Needs vs Wants — comparison, classifier quiz, and buying decision guide
- 50-30-20 Rule — explanation cards and an income split calculator
- Savings Goals — goal planner with progress and timeline estimates
- Expense Planner — expense tracking with a running balance
- Money Mistakes — expandable common mistakes and fixes
- Infographics — visual summaries with category filters
- AI Chatbot — rule-based answers to common money questions
- Dashboard (signed in) — monthly plan editor, Budget Health Score, and saved activity
- Login / Create account — optional local demo accounts
- About, Feedback, Contact, Sitemap, and a custom 404 page

## Tech stack

React 19, Vite 8, React Router 7, and plain CSS with a shared design-token system and light/dark themes.

## Accounts and data

Accounts are a browser-only demo: no backend or server is involved. When you create an account, a salted SHA-256 hash of your password is stored in `localStorage` (never the plaintext), along with your name, email, and per-account budgeting data.

- Your plan, expenses, and savings goal are saved per account in this browser.
- The dashboard calculates a Budget Health Score from your needs, wants, and savings split.
- Clearing site data or using another browser/device removes the account and its data.

## Getting started

```bash
npm install
npm run dev
```

Open the URL printed by Vite (usually http://localhost:5173).

## Scripts

```bash
npm run dev      # start the development server
npm run build    # production build to dist/
npm run preview  # preview the production build
npm run lint     # run ESLint
```

## Notes

All tools run entirely in the browser. Forms use client-side validation only, and nothing is sent to a server. Amounts are formatted in Nigerian Naira (NGN).

