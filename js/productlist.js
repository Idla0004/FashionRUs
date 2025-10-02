const params = new URLSearchParams(window.location.search);
const category = params.get(`category`);
const header = (document.querySelector("h2").textContent = category);

const productListContainer = document.querySelector(".products");

let allData;

function showSorted(event) {
  const direction = event.target.dataset.direction;
  if (direction == "lohi") {
    allData.sort((a, b) => a.price - b.price);
  } else {
    allData.sort((a, b) => b.price - a.price);
  }
  showProduct(allData);
}

document
  .querySelectorAll("#filters button")
  .forEach((knap) => knap.addEventListener("click", showFiltered));
document.querySelector("#sorting").addEventListener("click", showSorted);

function showFiltered(event) {
  const gender = this.dataset.gender;
  if (gender == "All") {
    showProduct(allData);
  } else {
    const fraction = allData.filter((product) => product.gender == gender);
    showProduct(fraction);
  }
}

fetch(`https://kea-alt-del.dk/t7/api/products?limit=20&category=${category}`)
  .then((res) => res.json())
  .then((data) => {
    allData = data;
    showProduct(allData);
  });

function showProduct(products) {
  productListContainer.innerHTML = "";
  products.forEach((element) => {
    productListContainer.innerHTML += `
  <div class="product-card ${element.soldout ? "soldout" : ""} ${
      element.discount ? "sale" : ""
    }">
    <img
      src="https://kea-alt-del.dk/t7/images/webp/640/${element.id}.webp"
      alt="Reebok sneakers"
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
      ${element.discount ? `<p class="percent">${element.discount}%</p>` : ""}
    </div>
    ${
      !element.soldout
        ? `<button class="read"><a href="product.html?id=${element.id}">Læs mere</a></button>`
        : ""
    }
  </div>
`;
  });
}
