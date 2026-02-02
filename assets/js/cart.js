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
  const totalItem = cart.reduce((sum, item) => sum + item.quantity, 0);
  if (cart.length === 0) {
    cartItems.innerHTML = `
      <div style="text-align:center;padding:50px 20px;">
        <i class="fa-solid fa-cookie-bite" style="font-size:4rem;color:#ddd;margin-bottom:15px;"></i>
        <p style="color:#888;">Your cart Is empty!</p>
        <button onclick="toggleCart()" style="margin-top:15px;background:#ff69b4;color:white;border:none;padding:10px 20px;border-radius:20px;cursor:pointer;">
          Start shopping
        </button>
      </div>
    `;
    if (cartTotal) cartTotal.innerText = "0.00";
    return;
  }
  if (cartCount) {
    cartCount.innerText = totalItem;
    cartCount.style.display = totalItem > 0 ? "inline" : "none";
  }
  cartItems.innerHTML = cart
    .map(
      (item) => `
    <li class="cartUI">
      <img src="${item.image}" alt="${item.name}"/>
      <div class="item">
        <div class="item-into">
          <h1 >${item.name}</h1> 
          <p>$${item.price}</p>
        </div>
        <div class="item-controls">
          <button onclick="handleDecrease(${item.id})">-</button>
          <span>${item.quantity}</span>
          <button onclick="handleIncrease(${item.id})">+</button>
        </div>
      </div>
      <div class="item-remove-price">
        <button class="remove-btn" onclick="handleRemove(${item.id})">
          <i class="fa-regular fa-trash-can"></i>
        </button>
        <p class="subtotal">$${(item.price * item.quantity).toFixed(2)}</p>
      </div>
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

export function increaseQty(id) {
  const item = cart.find((p) => p.id === id);
  if (item) item.quantity += 1;
  updateCartUI();
}

export function decreaseQty(id) {
  const itemIndex = cart.findIndex((p) => p.id === id);
  if (itemIndex > -1) {
    cart[itemIndex].quantity -= 1;
    if (cart[itemIndex].quantity < 1) cart.splice(itemIndex, 1);
  }
  updateCartUI();
}
