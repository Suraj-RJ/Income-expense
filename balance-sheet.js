document.addEventListener("DOMContentLoaded", function () {
    // Get income data from localStorage
    let incomeData = JSON.parse(localStorage.getItem("incomeData")) || [];
  
    // Function to display income in the table
    function displayIncome() {
      const incomeTable = document.getElementById("incomeTabledocument").querySelector("tbody");
      let totalIncome = 0;
  
      // Clear any previous rows in the table
      incomeTable.innerHTML = '';
  
      incomeData.forEach((income) => {
        // Create new table row
        const row = document.createElement("tr");
  
        // Create and append income name cell
        const nameCell = document.createElement("td");
        nameCell.textContent = income.name;
        row.appendChild(nameCell);
  
        // Create and append income category cell
        const categoryCell = document.createElement("td");
        categoryCell.textContent = income.category;
        row.appendChild(categoryCell);
  
        // Create and append income amount cell
        const amountCell = document.createElement("td");
        amountCell.textContent = income.amount;
        row.appendChild(amountCell);
  
        // Append row to table body
        incomeTable.appendChild(row);
  
        // Calculate total income
        totalIncome += parseFloat(income.amount);
      });
  
      // Display total income
      document.getElementById("totalIncome").textContent = totalIncome.toFixed(2);
    }
  
    // Call the function to display income when the page loads
    displayIncome();
  });
  