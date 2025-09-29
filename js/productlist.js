const productListContainer = document.querySelector(".products");

const params = new URLSearchParams(window.location.search);
const category = params.get("category");
const header = (document.querySelector("h2").textContent = category);

fetch(`https://kea-alt-del.dk/t7/api/products?limit=20&category=${category}`)
  .then((res) => res.json())
  .then(showProduct);

function showProduct(products) {
  console.log("products");
  products.forEach((element) => {
    console.log(element);
    productListContainer.innerHTML += `  <div class="product-card ${
      element.soldout && "soldout"
    } ${element.discount && "sale"}">
          <img
            src="https://kea-alt-del.dk/t7/images/webp/640/${element.id}.webp"
            alt="Reebok sneakers" class="img-card"
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
          <button class="read"><a href="product.html?id=${
            element.id
          }">Læs mere</a></button>
        </div>`;
  });
}
