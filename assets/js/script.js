import { addToCart, clearCart, removeCart, updateCartUI } from "./cart.js";

export const products = [
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

function renderProduct() {
  const productList = document.getElementById("product-list");
  productList.innerHTML = products
    .map(
      (p) =>
        `
    <div class="product" data-aos="zoom-in-up">
      <img src="${p.image}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>${p.price}</p>
      <button onclick="handleAddToCart(${p.id})">Add TO Cart</button>
    </div>
    `,
    )
    .join("");
}

window.handleAddToCart = (id) => {
  addToCart(id);
  const addedProduct = products.find((p) => p.id === id);
  if (addedProduct) showToast(`🍰 ${addedProduct.name} added!`);
};

window.handleRemove = (id) => removeCart(id);
window.clearCart = () => clearCart();
window.toggleCart = () =>
  document.getElementById("cart-sidebar").classList.toggle("open");
window.toggleDarkMode = () => document.body.classList.toggle("dark");

function showPopup() {
  const popup = document.getElementById("popup");
  popup.classList.add("show");
  setTimeout(() => popup.classList.remove("show"), 3000);
}

function loadComponent(id, path) {
  fetch(path)
    .then((Response) => Response.text())
    .then((data) => {
      document.getElementById(id).innerHTML = data;
      AOS.init();
      AOS.refresh();
      if (id === "header-placeholder") updateCartUI();
    });
}
loadComponent("header-placeholder", "components/header.html");
loadComponent("footer-placeholder", "components/footer.html");
loadComponent("hero-placeholder", "components/hero.html");

function showToast(message) {
  const container = document.getElementById("toast-container");
  const toast = document.createElement("div");
  toast.className = "toast success";
  toast.innerHTML = `<span>${message}</span>
    <button style="background:none; border:none; color:white; cursor:pointer; margin-left:10px;">✕</button>`;

  container.appendChild(toast);

  const removeToast = () => {
    toast.classList.add("fade-out");
    setTimeout(() => toast.remove(), 500);
  };

  const autoClose = setTimeout(removeToast, 3000);

  toast.querySelector("button").onclick = () => {
    clearTimeout(autoClose);
    removeToast();
  };
}

renderProduct();
updateCartUI();

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
