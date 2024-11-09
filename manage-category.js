document.addEventListener("DOMContentLoaded", function () {
    const categoryForm = document.getElementById("categoryForm");
    const categoryNameInput = document.getElementById("categoryName");
    const categoryList = document.getElementById("categoryList");
  
    // Load categories from localStorage
    function loadCategories() {
      let categories = JSON.parse(localStorage.getItem("categories")) || [];
      categoryList.innerHTML = ''; // Clear the list first
      categories.forEach(category => {
        let listItem = document.createElement("li");
        listItem.className = "list-group-item d-flex justify-content-between align-items-center";
        listItem.textContent = category;
        
        let deleteButton = document.createElement("button");
        deleteButton.className = "btn btn-danger btn-sm";
        deleteButton.textContent = "Delete";
        deleteButton.onclick = function () {
          deleteCategory(category);
        };
        
        listItem.appendChild(deleteButton);
        categoryList.appendChild(listItem);
      });
    }
  
    // Add a category
    categoryForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const categoryName = categoryNameInput.value.trim();
      if (categoryName) {
        let categories = JSON.parse(localStorage.getItem("categories")) || [];
        categories.push(categoryName);
        localStorage.setItem("categories", JSON.stringify(categories));
        categoryNameInput.value = ""; // Clear the input field
        loadCategories(); // Reload categories
      }
    });
  
    // Delete category
    function deleteCategory(category) {
      let categories = JSON.parse(localStorage.getItem("categories")) || [];
      categories = categories.filter(cat => cat !== category);
      localStorage.setItem("categories", JSON.stringify(categories));
      loadCategories(); // Reload categories
    }
  
    loadCategories(); // Initial load of categories
  });
  