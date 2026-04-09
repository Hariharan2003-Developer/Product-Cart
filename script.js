let products = [];
let cart = {};

async function fetchProducts() {
  try {
    const urls = [
      "https://dummyjson.com/products/category/mens-shirts",
      "https://dummyjson.com/products/category/mens-shoes",
      "https://dummyjson.com/products/category/mens-watches"
    ];

    const responses = await Promise.all(
      urls.map(url => fetch(url).then(res => res.json()))
    );

    products = responses.flatMap(data => data.products);
    renderProducts();
  } catch (error) {
    console.log(error);
  }
}

function renderProducts() {
  const grid = document.getElementById("product-grid");

  grid.innerHTML = products.map(product => {
    const count = cart[product.id] || 0;

    return `
      <div class="product-card">
        <img src="${product.thumbnail}" alt="${product.title}">
        <div class="product-info">
          <div class="product-name">${product.title}</div>
          <div class="product-price">₹${product.price}</div>
          <button class="add-btn" onclick="addToCart(${product.id})">
            Add to Cart ${count > 0 ? `(${count})` : ""}
          </button>
        </div>
      </div>
    `;
  }).join("");
}

function addToCart(id) {
  cart[id] = (cart[id] || 0) + 1;
  updateCartCount();
  renderProducts();
}

function updateCartCount() {
  let total = 0;
  for (let id in cart) total += cart[id];
  document.getElementById("cart-count").textContent = total;
}

fetchProducts();