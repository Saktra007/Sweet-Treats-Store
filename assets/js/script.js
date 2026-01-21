const products = [
  {
    id: 1,
    name: "Strawberry Donut",
    price: 1.99,
    image:
      "https://tse4.mm.bing.net/th?id=OIP.6MqYsaZt8JgVVXw3uysxUQHaHa&pid=Api&P=0&h=220",
  },
  {
    id: 2,
    name: "Chocolate Cake",
    price: 3.49,
    image:
      "https://tse2.mm.bing.net/th?id=OIP.UsTdcdwI9KQNitBaLD8rSgHaFx&pid=Api&P=0&h=220",
  },
  {
    id: 3,
    name: "Macaron Pack",
    price: 4.99,
    image:
      "https://tse4.mm.bing.net/th?id=OIP.uJAHgRy1g8aEgm_-9TXTnQHaE-&pid=Api&P=0&h=220",
  },
];

let cart = [];

function renderProducts() {
  const productList = document.getElementById("product-list");
  productList.innerHTML = "";

  products.forEach((product) => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
        <img src="${product.image}" alt="${product.name}" />
        <h3>${product.name}</h3>
        <p>$${product.price.toFixed(2)}</p>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
      `;
    productList.appendChild(div);
  });
}

function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  cart.push(product);
  updateCart();
}

function updateCart() {
  document.getElementById("cart-count").innerText = cart.length;
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");

  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
    cartItems.appendChild(li);
    total += item.price;
  });

  cartTotal.innerText = total.toFixed(2);
}

function clearCart() {
  cart = [];
  updateCart();
}

renderProducts();
function submitOrder(event) {
  event.preventDefault();

  if (cart.length === 0) {
    alert("Your cart is empty.");
    return;
  }

  const name = document.getElementById("name").value.trim();
  const address = document.getElementById("address").value.trim();
  const payment = document.getElementById("payment").value;

  if (name && address && payment) {
    alert(
      `Thank you ${name}! Your order has been placed.\nPayment Method: ${payment}`,
    );
    clearCart();
    document.getElementById("checkoutForm").reset();
  }
}
function toggleCart() {
  const cartSidebar = document.getElementById("cart-sidebar");
  cartSidebar.classList.toggle("open");
}
function submitOrder(event) {
  event.preventDefault();

  if (cart.length === 0) {
    alert("Your cart is empty.");
    return;
  }

  const name = document.getElementById("name").value.trim();
  const address = document.getElementById("address").value.trim();
  const payment = document.getElementById("payment").value;

  if (name && address && payment) {
    showPopup();
    clearCart();
    document.getElementById("checkoutForm").reset();
  }
}

function showPopup() {
  const popup = document.getElementById("popup");
  popup.classList.add("show");
  setTimeout(() => popup.classList.remove("show"), 3000);
}
function toggleDarkMode() {
  document.body.classList.toggle("dark");
}

function loadComponent(id, path) {
  fetch(path)
    .then((Response) => Response.text())
    .then((data) => {
      document.getElementById(id).innerHTML = data;
      // if (id === "header-placeholder") updateCart();
    });
}
loadComponent("header-placeholder", "components/header.html");
loadComponent("footer-placeholder", "components/footer.html");