const params = new URLSearchParams(window.location.search);
const category = params.get("category");
document.querySelector("h2").textContent = category;
const productListContainer = document.querySelector(".products");
document.querySelector("#filters").addEventListener("click", showFiltered);
document.querySelector("#sorting").addEventListener("click", showSorted);
let allData, currentDataSet;

function showSorted(event) {
  const direction = event.target.dataset.direction;
  if (direction == "lohi") {
    currentDataSet.sort((a, b) => a.price - b.price);
  } else {
    currentDataSet.sort((a, b) => b.price - a.price);
  }
  showProduct(currentDataSet);
}

function showFiltered(event) {
  const gender = event.target.dataset.gender;
  if (gender == "All") {
    currentDataSet = allData;
  } else {
    currentDataSet = allData.filter((product) => product.gender == gender);
  }
  showProduct(currentDataSet);
}

fetch(`https://kea-alt-del.dk/t7/api/products?limit=20&category=${category}`)
  .then((res) => res.json())
  .then((data) => {
    allData = data;
    currentDataSet = data;
    showProduct(currentDataSet);
  });

function showProduct(products) {
  productListContainer.innerHTML = "";
  let html = "";
  products.forEach((element) => {
    html += `
      <div class="product-card ${element.soldout ? "soldout" : ""} ${
      element.discount ? "sale" : ""
    }">
        <img
          src="https://kea-alt-del.dk/t7/images/webp/640/${element.id}.webp"
          alt="${element.productdisplayname}"
          class="img-card"
        />
        <h2>${element.productdisplayname}</h2>
        <p class="title">${element.category} | ${element.subcategory}</p>
        <div class="price-container">
          <p class="price">
            DKK ${Math.round(element.price)},-
            ${
              element.discount
                ? `<br>Now: DKK ${Math.round(
                    element.price - (element.price * element.discount) / 100
                  )},-`
                : ""
            }
          </p>
          ${
            element.discount
              ? `<p class="percent">${element.discount}%</p>`
              : ""
          }
        </div>
        ${
          !element.soldout
            ? `<button class="read"><a href="product.html?id=${element.id}">Læs mere</a></button>`
            : ""
        }
      </div>
    `;
  });
  productListContainer.innerHTML = html;
}
