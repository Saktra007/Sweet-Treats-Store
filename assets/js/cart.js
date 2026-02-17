import { products } from "./products.js";

export let cart = JSON.parse(localStorage.getItem("cart")) || [];

export function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  const existing = cart.find((item) => item.id === productId);

  existing ? (existing.quantity += 1) : cart.push({ ...product, quantity: 1 });

  saveCart();
  updateCartUI();
}

export function removeCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  saveCart();
  updateCartUI();
}

export function updateCartUI() {
  const cartCount = document.getElementById("cart-count");
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");

  if (!cartItems) return;

  const totalItem = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (cartCount) {
    cartCount.innerText = totalItem;
    cartCount.style.display = totalItem > 0 ? "flex" : "none";
  }

  if (cart.length === 0) {
    cartItems.innerHTML = `
      <div class="empty-cart-container">
        <i class="fa-solid fa-cookie-bite"></i>
        <p>Your cart Is empty!</p>
        <button class="btn-start-shopping" onclick="toggleCart()">
          Start shopping
        </button>
      </div>
    `;
    if (cartTotal) cartTotal.innerText = "0.00";
    return;
  }

  cartItems.innerHTML = cart
    .map(
      (item) => `
    <li class="cart-UI">
      <img src="${item.image}" alt="${item.name}"/>
      <div class="item">
        <div class="item-info">
          <h1 >${item.name}</h1> 
          <p>$${item.price.toFixed(2)}</p>
        </div>
        <div class="item-controls">
          <button onclick="handleDecrease(${item.id})"><i class="fa-solid fa-minus"></i></button>
          <span>${item.quantity}</span>
          <button onclick="handleIncrease(${item.id})"><i class="fa-solid fa-plus"></i></button>
        </div>
      </div>
      <div class="item-remove-price">
        <button class="remove-btn" onclick="handleRemove(${item.id})">
          <i class="fa-regular fa-trash-can"></i>
        </button>
        <p class="subtotal">$ ${(item.price * item.quantity).toFixed(2)}</p>
      </div>
    </li>
    `,
    )
    .join("");
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  if (cartTotal) cartTotal.innerText = total.toFixed(2);
}

export function clearCart() {
  cart = [];
  saveCart();
  updateCartUI();
}

export function increaseQty(id) {
  const item = cart.find((p) => p.id === id);
  if (item) item.quantity += 1;
  saveCart();
  updateCartUI();
}

export function decreaseQty(id) {
  const itemIndex = cart.findIndex((p) => p.id === id);
  if (itemIndex > -1) {
    cart[itemIndex].quantity -= 1;
    if (cart[itemIndex].quantity < 1) cart.splice(itemIndex, 1);
  }
  saveCart();
  updateCartUI();
}
