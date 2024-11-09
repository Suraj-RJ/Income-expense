document.addEventListener("DOMContentLoaded", function () {
    const expenseForm = document.getElementById("expenseForm");
    const expenseCategoryInput = document.getElementById("expenseCategory");
    const expenseAmountInput = document.getElementById("expenseAmount");
    const expenseDateInput = document.getElementById("expenseDate");
    const expenseList = document.getElementById("expenseList");
  
    // Load expenses from localStorage
    function loadExpenses() {
      let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
      expenseList.innerHTML = ''; // Clear the list first
      expenses.forEach(expense => {
        let listItem = document.createElement("li");
        listItem.className = "list-group-item d-flex justify-content-between align-items-center";
        listItem.innerHTML = `
          <span><strong>${expense.category}</strong><br>Amount: $${expense.amount}<br>Date: ${expense.date}</span>
          <button class="btn btn-danger btn-sm" onclick="deleteExpense('${expense.category}', ${expense.amount}, '${expense.date}')">Delete</button>
        `;
        expenseList.appendChild(listItem);
      });
    }
  
    // Add expense
    expenseForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const expenseCategory = expenseCategoryInput.value.trim();
      const expenseAmount = parseFloat(expenseAmountInput.value.trim());
      const expenseDate = expenseDateInput.value.trim();
      
      if (expenseCategory && !isNaN(expenseAmount) && expenseDate) {
        let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
        expenses.push({ category: expenseCategory, amount: expenseAmount, date: expenseDate });
        localStorage.setItem("expenses", JSON.stringify(expenses));
        expenseCategoryInput.value = "";
        expenseAmountInput.value = "";
        expenseDateInput.value = "";
        loadExpenses(); // Reload expenses
      }
    });
  
    // Delete expense
    window.deleteExpense = function(category, amount, date) {
      let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
      expenses = expenses.filter(expense => expense.category !== category || expense.amount !== amount || expense.date !== date);
      localStorage.setItem("expenses", JSON.stringify(expenses));
      loadExpenses(); // Reload expenses
    };
  
    loadExpenses(); // Initial load of expenses
  });
  