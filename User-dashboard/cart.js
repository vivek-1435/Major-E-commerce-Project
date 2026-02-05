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

/* ===== Checkout / Payment flow ===== */
const checkoutBtn = document.getElementById('checkoutBtn');
const checkoutModal = document.getElementById('checkoutModal');
const closeCheckout = document.getElementById('closeCheckout');
const paymentFields = document.getElementById('paymentFields');
const paymentForm = document.getElementById('paymentForm');
const confirmPayment = document.getElementById('confirmPayment');
const summarySection = document.getElementById('summarySection');
const paymentSection = document.getElementById('paymentSection');
const orderSummary = document.getElementById('orderSummary');
const deliveryAddress = document.getElementById('deliveryAddress');
const finishBtn = document.getElementById('finishBtn');

function openCheckout() {
  if (!checkoutModal) return;
  // populate payment fields for default selection (card)
  renderPaymentFields('card');
  checkoutModal.setAttribute('aria-hidden', 'false');
  // show payment area
  paymentSection.style.display = 'block';
  summarySection.style.display = 'none';
}

function closeModal() {
  if (!checkoutModal) return;
  checkoutModal.setAttribute('aria-hidden', 'true');
}

function renderPaymentFields(type) {
  if (!paymentFields) return;
  paymentFields.innerHTML = '';
  if (type === 'card') {
    paymentFields.innerHTML = `
      <input id="cardName" placeholder="Name on card" />
      <input id="cardNumber" placeholder="Card number" />
      <div style="display:flex;gap:8px;"><input id="cardExp" placeholder="MM/YY" /><input id="cardCvv" placeholder="CVV" /></div>
    `;
  } else if (type === 'upi') {
    paymentFields.innerHTML = `
      <input id="upiId" placeholder="example@bank" />
    `;
  } else if (type === 'paypal') {
    paymentFields.innerHTML = `
      <input id="paypalEmail" placeholder="PayPal email" />
    `;
  } else if (type === 'cod') {
    paymentFields.innerHTML = `<p>Cash on Delivery selected. No online payment required.</p>`;
  }
}

// listen payment option changes
if (checkoutModal) {
  checkoutModal.addEventListener('change', (e) => {
    if (e.target.name === 'payment') {
      renderPaymentFields(e.target.value);
    }
  });
}

if (checkoutBtn) checkoutBtn.addEventListener('click', openCheckout);
if (closeCheckout) closeCheckout.addEventListener('click', closeModal);

// confirm payment handler
if (confirmPayment) {
  confirmPayment.addEventListener('click', () => {
    // simple validation depending on method
    const method = (checkoutModal.querySelector('input[name="payment"]:checked') || {}).value || 'card';
    let valid = true;
    if (method === 'card') {
      const cn = document.getElementById('cardNumber');
      if (!cn || !cn.value.trim()) valid = false;
    }
    if (!valid) {
      alert('Please fill required payment details');
      return;
    }

    // build summary
    showSummary(method);
  });
}

function showSummary(method) {
  if (!orderSummary) return;
  // hide payment section, show summary
  paymentSection.style.display = 'none';
  summarySection.style.display = 'block';
  orderSummary.innerHTML = '';

  const addrSaved = localStorage.getItem('manualAddress') || localStorage.getItem('area') || '';
  const address = (deliveryAddress && deliveryAddress.value.trim()) ? deliveryAddress.value.trim() : addrSaved || 'No address provided';

  // items
  let html = '<ul>';
  let total = 0;
  cart.forEach(i => { html += `<li>${i.name} × ${i.qty} — ₹${i.price * i.qty}</li>`; total += i.price * i.qty; });
  html += '</ul>';
  html += `<p><strong>Total:</strong> ₹${total}</p>`;
  html += `<p><strong>Payment method:</strong> ${method.toUpperCase()}</p>`;
  html += `<p><strong>Delivery address:</strong><br/>${address.replace(/\n/g, '<br/>')}</p>`;

  orderSummary.innerHTML = html;

  // finalize: clicking finish will clear cart and close
  if (finishBtn) finishBtn.onclick = () => {
    // simulate successful payment
    if (method !== 'cod') {
      // You would integrate with real gateway here
      alert('Payment processed successfully (simulated)');
    } else {
      alert('Order placed. Pay on delivery');
    }
      // assemble order details
      const orderId = 'ORD' + Date.now().toString(36).slice(-8).toUpperCase();
      const now = new Date().toISOString();
      const items = cart.map(i => ({ id: i.id, name: i.name, qty: i.qty, price: i.price }));
      const total = cart.reduce((s, it) => s + it.price * it.qty, 0);
      const lastOrder = { orderId, createdAt: now, items, total, payment: method, address };
      try { localStorage.setItem('lastOrder', JSON.stringify(lastOrder)); } catch (e) { console.warn('could not persist order', e); }

      // clear cart and update UI
      localStorage.setItem('cart', JSON.stringify([]));
      renderCart();
      closeCheckout();

      // show success overlay then navigate to order page
      showSuccessOverlay();
      setTimeout(() => {
        // navigate to a dedicated order success page
        window.location.href = 'order-success.html';
      }, 1200);
  };

    // show success overlay with simple animation then hide
    function showSuccessOverlay() {
      const overlay = document.getElementById('successOverlay');
      if (!overlay) return;
      overlay.setAttribute('aria-hidden', 'false');
      // remove focus from any button
      document.activeElement && document.activeElement.blur();
      // auto hide after 2.4s
      setTimeout(() => {
        overlay.setAttribute('aria-hidden', 'true');
      }, 2400);
    }
}


