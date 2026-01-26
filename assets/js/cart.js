import { products } from "./script.js";

export let cart = JSON.parse(localStorage.getItem("cart")) || [];

export function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function addToCart(productId) {
  const prouct = products.find((p) => p.id === productId);
  const existing = cart.find((item) => item.id === productId);

  existing ? (existing.quantity += 1) : cart.push({ ...prouct, quantity: 1 });

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
  if (cartCount)
    cartCount.innerText = cart.reduce((sum, item) => sum + item.quantity, 0);

  cartItems.innerHTML = cart
    .map(
      (item) => `
    <li>
      ${item.name} X${item.quantity} -$${(item.price * item.quantity).toFixed(2)}
      <button onclick="handleRemove(${item.id})">X</button>
    </li>
    `,
    )
    .join("");
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  cartTotal.innerText = total.toFixed(2);
}

export function clearCart() {
  cart = [];
  saveCart();
  updateCartUI();
}
