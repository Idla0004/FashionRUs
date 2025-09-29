const categoryList = document.querySelector(".product-grid");

fetch("https://kea-alt-del.dk/t7/api/categories")
  .then((response) => response.json())
  .then((categories) => showCategories(categories));

function showCategories(categories) {
  categories.forEach((category) => {
    categoryList.innerHTML += `<a href="productlist.html?category=${category.category}" class="listlink">${category.category}</a>`;
  });
}
