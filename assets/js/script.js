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
      <p class="product-price">$ ${p.price}</p>
      <button class="add-cart" onclick="handleAddToCart(${p.id})"><i class="fa-solid fa-cart-shopping"></i> Add TO Cart</button>
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
window.toggleCart = () => {
  const sidebar = document.getElementById("cart-sidebar");
  const overlay = document.getElementById("cart-overlay");
  sidebar.classList.toggle("active");
  overlay.classList.toggle("active");

  if (sidebar.classList.contains("active")) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
};
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
    !document
      .querySelector(".checkout-placeholder")
      .classList.contains("active")
  ) {
    showToast("🛒 Please add items to cart first!");
    return;
  }
  const check = document.querySelector(".checkout-placeholder");
  check.classList.toggle("active");
};

function showPopup() {
  const popup = document.getElementById("popup");
  popup.classList.add("show");
  setTimeout(() => popup.classList.remove("show"), 3000);
}
function showToast(message) {
  const container = document.getElementById("toast-container");
  const toast = document.createElement("div");
  toast.className = "toast success";
  toast.innerHTML = `<span>${message}</span>
  <button >✕</button>`;

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

async function initApp() {
  await Promise.all([
    loadComponent("header-placeholder", "components/header.html"),
    loadComponent("footer-placeholder", "components/footer.html"),
    loadComponent("hero-placeholder", "components/hero.html"),
    loadComponent("checkout-placeholder", "components/checkout.html"),
  ]);

  renderProduct();
  updateCartUI();
  AOS.init({ duration: 800 });
}

function loadComponent(id, path) {
  return fetch(path)
    .then((Response) => Response.text())
    .then((data) => {
      const el = document.getElementById(id);
      if (el) el.innerHTML = data;
    })
    .catch((err) => console.error(`Failed to load ${path}:`, err));
}

initApp();

window.handleSubmitOrder = (event) => {
  event.preventDefault();

  if (cart.length === 0) {
    showToast("Your cart is empty.");
    return;
  }

  const name = document.getElementById("name")?.value.trim();
  const address = document.getElementById("address")?.value.trim();
  const phone = document.getElementById("phone")?.value.trim();
  const paymentElemnt = document.querySelector('input[name="payment"]:checked');
  const paymentMethod = paymentElemnt ? paymentElemnt.value : "Not Selected";

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
  event.target.reset();

  setTimeout(() => {
    window.checkout();
  }, 500);
};
