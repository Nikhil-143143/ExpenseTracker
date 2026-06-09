# 🪙 Expense Tracker

A premium, lightweight, and fully responsive **Expense Tracker** application built with semantic HTML5, modern vanilla CSS, and JavaScript (ES6+). It helps users manage their daily financial activities, visualize income vs. expenses, and maintain full control over their data.

---

## 🚀 Key Features

* **Instant Summary Dashboard**:
  * **Total Balance**: Real-time display formatted for Indian Rupees (`Rs.`).
  * **Income & Expense Cards**: Color-coded breakdown of earnings and spending.
  * **Transaction Counter**: Keeps track of your total logged transactions.
* **Persistent Data Store**: Uses browser `localStorage` to save your data automatically. Your entries persist even after refreshing the page or closing the tab.
* **Import & Export Data**:
  * **Download JSON**: Export your complete transaction history to a backup JSON file (`expenses.json`).
  * **Import JSON**: Load previously exported JSON backups directly into the application.
* **Modern & Clean UI**: Features a clean responsive layout with a side-by-side control panel, elegant typography, hover states, and smooth transition animations.

---

## 🛠️ Built With

* **HTML5**: Semantic tags (`<main>`, `<section>`, `<article>`, `<form>`) for better accessibility and structure.
* **CSS3**: Custom variables, CSS Grid, Flexbox layouts, and polished visual styles.
* **JavaScript**: Modern ES6+ syntax, LocalStorage API, Blob API for file exports, and FileReader API for file imports.

---

## 📂 Project Structure

```text
expense-tracker/
├── index.html       # Application structure & markup
├── style.css        # Responsive layouts and component styling
├── script.js        # Transaction state, localStorage, and import/export logic
├── expenses.json    # Initial sample database file
├── .gitignore       # Git file exclusion rules
└── README.md        # Documentation
```

---

## ⚙️ How to Run Locally

### Option 1: Direct Execution
Simply open [index.html](file:///c:/Users/HP/OneDrive/Desktop/New%20expense%20tracker/expense-tracker/index.html) in any modern web browser.

### Option 2: Using Local Server (Recommended)
Running via a local development server ensures proper module handling and prevents browser sandboxing security issues:

* **Using Python**:
  ```bash
  python -m http.server 8000
  ```
  Open `http://localhost:8000` in your browser.

* **Using Node.js**:
  ```bash
  npx serve
  ```

---

## 📊 Exported JSON Format

When exporting data, the application downloads a JSON file structured as an array of transaction objects:

```json
[
  {
    "id": 1,
    "title": "Monthly salary",
    "amount": 25000,
    "type": "income",
    "category": "Salary",
    "date": "08/06/2026"
  },
  {
    "id": 2,
    "title": "Groceries",
    "amount": 1200,
    "type": "expense",
    "category": "Food",
    "date": "08/06/2026"
  }
]
```
