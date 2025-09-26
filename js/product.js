const mainContent = document.querySelector("#mainContent");

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

fetch(`https://kea-alt-del.dk/t7/api/products/${id}`)
  .then((res) => res.json())
  .then(showProduct);

function showProduct(product) {
  mainContent.innerHTML = ` <nav class="listproduct">
        <li><a href="index.html">Home</a></li>
        <li><a href="productlist.html">Brands</a></li>
        <li><a href="#">Puma</a></li>
        <p class="description">${product.brandname}</p>
      </nav>

      <section class="product-section">
        <img
          src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp"
          alt="Puma
        backpack"
          class="product-image"
        />
        <div class="product-content">
          <h1 class="product-title">${product.brandname}</h1>
          <div class="product-info">
            <p class="product-description">
            ${product.brandbio}
            </p>
            <dl class="info-list">
              <dt>Type</dt>
              <dd>${product.articletype}</dd>
              <dt>Color</dt>
              <dd>${product.basecolour}</dd>
              <dt>Inventory number</dt>
              <dd>${product.relid}</dd>
            </dl>
          </div>
        </div>
        <section class="buy-card">
          <h1>Puma backpack</h1>
          <p class="title">${product.variantname}</p>
          <p class="product-price">DKK ${product.price}</p>
          <div class="buy-button">
            <a href="#">Add to basket</a>
          </div>
        </section>
      </section> `;
}
