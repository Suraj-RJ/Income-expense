document.addEventListener("DOMContentLoaded", function () {
    const incomeForm = document.getElementById("incomeForm");
    const incomeSourceInput = document.getElementById("incomeSource");
    const incomeAmountInput = document.getElementById("incomeAmount");
    const incomeDateInput = document.getElementById("incomeDate");
    const incomeList = document.getElementById("incomeList");
  
    // Load income from localStorage
    function loadIncome() {
      let incomes = JSON.parse(localStorage.getItem("income")) || [];
      incomeList.innerHTML = ''; // Clear the list first
      incomes.forEach(income => {
        let listItem = document.createElement("li");
        listItem.className = "list-group-item d-flex justify-content-between align-items-center";
        listItem.innerHTML = `
          <span><strong>${income.source}</strong><br>Amount: $${income.amount}<br>Date: ${income.date}</span>
          <button class="btn btn-danger btn-sm" onclick="deleteIncome('${income.source}', ${income.amount}, '${income.date}')">Delete</button>
        `;
        incomeList.appendChild(listItem);
      });
    }
  
    // Add income
    incomeForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const incomeSource = incomeSourceInput.value.trim();
      const incomeAmount = parseFloat(incomeAmountInput.value.trim());
      const incomeDate = incomeDateInput.value.trim();
      
      if (incomeSource && !isNaN(incomeAmount) && incomeDate) {
        let incomes = JSON.parse(localStorage.getItem("income")) || [];
        incomes.push({ source: incomeSource, amount: incomeAmount, date: incomeDate });
        localStorage.setItem("income", JSON.stringify(incomes));
        incomeSourceInput.value = "";
        incomeAmountInput.value = "";
        incomeDateInput.value = "";
        loadIncome(); // Reload income
      }
    });
  
    // Delete income
    window.deleteIncome = function(source, amount, date) {
      let incomes = JSON.parse(localStorage.getItem("income")) || [];
      incomes = incomes.filter(income => income.source !== source || income.amount !== amount || income.date !== date);
      localStorage.setItem("income", JSON.stringify(incomes));
      loadIncome(); // Reload income
    };
  
    loadIncome(); // Initial load of income
  });
  