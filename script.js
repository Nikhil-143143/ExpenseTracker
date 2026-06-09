const form = document.getElementById("transaction-form");
const titleInput = document.getElementById("title");
const amountInput = document.getElementById("amount");
const typeInput = document.getElementById("type");
const categoryInput = document.getElementById("category");
const transactionList = document.getElementById("transaction-list");
const emptyState = document.getElementById("empty-state");
const balanceText = document.getElementById("balance");
const incomeText = document.getElementById("income");
const expenseText = document.getElementById("expense");
const transactionCountText = document.getElementById("transaction-count");
const downloadButton = document.getElementById("download-json");
const uploadInput = document.getElementById("upload-json");

let transactions = JSON.parse(localStorage.getItem("expenseTrackerData")) || [
  {
    id: 1,
    title: "Monthly salary",
    amount: 25000,
    type: "income",
    category: "Salary",
    date: "08/06/2026"
  },
  {
    id: 2,
    title: "Groceries",
    amount: 1200,
    type: "expense",
    category: "Food",
    date: "08/06/2026"
  }
];

function saveTransactions() {
  localStorage.setItem("expenseTrackerData", JSON.stringify(transactions, null, 2));
}

function formatMoney(amount) {
  return "Rs. " + amount.toLocaleString("en-IN");
}

function updateSummary() {
  const income = transactions
    .filter((item) => item.type === "income")
    .reduce((total, item) => total + item.amount, 0);

  const expense = transactions
    .filter((item) => item.type === "expense")
    .reduce((total, item) => total + item.amount, 0);

  balanceText.textContent = formatMoney(income - expense);
  incomeText.textContent = formatMoney(income);
  expenseText.textContent = formatMoney(expense);
  transactionCountText.textContent = transactions.length;
}

function renderTransactions() {
  transactionList.innerHTML = "";
  emptyState.style.display = transactions.length === 0 ? "block" : "none";

  transactions.forEach((transaction) => {
    const listItem = document.createElement("li");
    listItem.className = `transaction-item ${transaction.type}-item`;

    const sign = transaction.type === "income" ? "+" : "-";

    const details = document.createElement("div");
    const title = document.createElement("div");
    const meta = document.createElement("div");
    const amount = document.createElement("div");
    const deleteButton = document.createElement("button");

    title.className = "transaction-title";
    title.textContent = transaction.title;

    meta.className = "transaction-meta";
    meta.textContent = `${transaction.category} - ${transaction.date}`;

    amount.className = "transaction-amount";
    amount.textContent = sign + formatMoney(transaction.amount);

    deleteButton.className = "delete-button";
    deleteButton.textContent = "x";
    deleteButton.addEventListener("click", function () {
      deleteTransaction(transaction.id);
    });

    details.appendChild(title);
    details.appendChild(meta);
    listItem.appendChild(details);
    listItem.appendChild(amount);
    listItem.appendChild(deleteButton);

    transactionList.appendChild(listItem);
  });
}

function refreshApp() {
  saveTransactions();
  updateSummary();
  renderTransactions();
}

function addTransaction(event) {
  event.preventDefault();

  const transaction = {
    id: Date.now(),
    title: titleInput.value.trim(),
    amount: Number(amountInput.value),
    type: typeInput.value,
    category: categoryInput.value,
    date: new Date().toLocaleDateString("en-IN")
  };

  transactions.unshift(transaction);
  form.reset();
  refreshApp();
}

function deleteTransaction(id) {
  transactions = transactions.filter((transaction) => transaction.id !== id);
  refreshApp();
}

function downloadJson() {
  const jsonText = JSON.stringify(transactions, null, 2);
  const blob = new Blob([jsonText], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = "expenses.json";
  link.click();
  URL.revokeObjectURL(url);
}

function importJson(event) {
  const file = event.target.files[0];

  if (!file) {
    return;
  }

  const reader = new FileReader();

  reader.onload = function () {
    try {
      const importedData = JSON.parse(reader.result);

      if (!Array.isArray(importedData)) {
        alert("Please upload a JSON file that contains an array of transactions.");
        return;
      }

      transactions = importedData;
      refreshApp();
    } catch (error) {
      alert("This file is not valid JSON.");
    }
  };

  reader.readAsText(file);
  uploadInput.value = "";
}

form.addEventListener("submit", addTransaction);
downloadButton.addEventListener("click", downloadJson);
uploadInput.addEventListener("change", importJson);

refreshApp();
