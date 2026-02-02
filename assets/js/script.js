import {
  addToCart,
  cart,
  clearCart,
  decreaseQty,
  increaseQty,
  removeCart,
  updateCartUI,
} from "./cart.js";
import { products } from "./products.js";

function renderProduct() {
  const productList = document.getElementById("product-list");
  productList.innerHTML = products
    .map(
      (p) =>
        `
    <div class="product" data-aos="zoom-in-up">
      <img src="${p.image}" alt="${p.name}">
      <h3 class="product-name">${p.name}</h3>
      <p class="product-price">$${p.price}</p>
      <button class="add-cart" onclick="handleAddToCart(${p.id})"><i class="fa-solid fa-cart-shopping"></i> Add TO Cart</button>
    </div>
    `,
    )
    .join("");
}

window.handleAddToCart = (id) => {
  addToCart(id);
  const cartBtn = document.querySelector(".cart");
  cartBtn.classList.add("cart-animate");
  setTimeout(() => cartBtn.classList.remove("cart-animate"), 400);
  const addedProduct = products.find((p) => p.id === id);
  if (addedProduct) showToast(`🍰 ${addedProduct.name} added!`);
};

window.handleRemove = (id) => removeCart(id);
window.clearCart = () => clearCart();
window.toggleCart = () =>
  document.getElementById("cart-sidebar").classList.toggle("open");
window.handleIncrease = (id) => increaseQty(id);
window.handleDecrease = (id) => decreaseQty(id);
window.toggleDarkMode = () => {
  const body = document.body;
  const icon = document.getElementById("theme-icon");

  body.classList.toggle("dark");

  const isDark = body.classList.contains("dark");
  icon.className = isDark ? "fa-solid fa-sun" : "fa-solid fa-moon";
};
window.checkout = () => {
  if (
    cart.length === 0 &&
    !document.querySelector(".checkout-form").classList.contains("active")
  ) {
    showToast("🛒 Please add items to cart first!");
  }
  const check = document.querySelector(".checkout-form");
  check.classList.toggle("active");
};

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
loadComponent("checkout-placeholder", "components/checkout.html");
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

window.handleSubmitOrder = (event) => {
  event.preventDefault();

  if (cart.length === 0) {
    alert("Your cart is empty.");
    return;
  }

  const name = document.getElementById("name").value.trim();
  const address = document.getElementById("address").value.trim();
  const phone = document.getElementById("phone").value;
  const paymentMethod = document.querySelector(
    'input[name="payment"]:checked',
  ).value;

  const orderDetails = {
    customerName: name,
    shippingAddress: address,
    phoneNumber: phone,
    payment: paymentMethod,
    items: cart,
    totalPrice: document.getElementById("cart-total").innerText,
  };

  console.log("Order Received:", orderDetails);

  showPopup();
  clearCart();
  document.getElementById("checkoutForm").reset();
  window.checkout();
};
