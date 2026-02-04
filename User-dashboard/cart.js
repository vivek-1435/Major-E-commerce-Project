const cartDiv = document.querySelector(".cart-items");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderCart() {
  if (!cartDiv) return;
  cartDiv.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartDiv.innerHTML = "<p style='padding:20px'>Your cart is empty 🛒</p>";
    const totalEl = document.getElementById("totalPrice");
    if (totalEl) totalEl.innerText = "₹0";
    // ensure empty cart is persisted so page refresh shows empty state
    localStorage.setItem("cart", JSON.stringify(cart));
    return;
  }

  cart.forEach((item, index) => {
    total += item.price * item.qty;

   cartDiv.innerHTML += `
  <div class="cart-item">
    <img src="${item.img}">

    <div class="cart-info">
      <h4>${item.name}</h4>
      <p>₹${item.price}</p>
    </div>

    <div class="cart-actions">
      <button class="qty-btn" onclick="decreaseQty(${index})">−</button>
      <span class="qty">${item.qty}</span>
      <button class="qty-btn" onclick="increaseQty(${index})">+</button>
      <button class="remove-btn" onclick="removeItem(${index})">🗑️</button>
    </div>
  </div>
`;

  });

  const totalEl = document.getElementById("totalPrice");
  if (totalEl) totalEl.innerText = `₹${total}`;
  localStorage.setItem("cart", JSON.stringify(cart));
}

function increaseQty(index) {
  cart[index].qty += 1;
  renderCart();
}

function decreaseQty(index) {
  if (cart[index].qty > 1) {
    cart[index].qty -= 1;
  } else {
    removeItem(index);
  }
  renderCart();
}

function removeItem(index) {
  cart.splice(index, 1);
  renderCart();
}

renderCart();


