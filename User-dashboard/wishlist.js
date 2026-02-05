// Render wishlist items and allow removal or add-to-cart
const container = document.getElementById('wishlistContainer');

function loadWishlist() {
  return JSON.parse(localStorage.getItem('wishlist')) || [];
}

function saveWishlist(list) {
  localStorage.setItem('wishlist', JSON.stringify(list));
}

function renderWishlist() {
  const list = loadWishlist();
  if (!container) return;
  if (list.length === 0) {
    container.innerHTML = '<div class="empty"><h3>No items in wishlist</h3><p>Save items you love and add them to cart later.</p></div>';
    return;
  }

  let html = '<div class="wishlist-grid">';
  list.forEach(p => {
    html += `
      <div class="product-card">
        <img src="${p.img}">
        <h4>${p.name}</h4>
        <div class="delivery-time">⏱ ${p.time}</div>
        <div style="margin-top:8px">₹${p.price}</div>
        <div class="wish-actions">
          <button class="small-btn primary" onclick="addWishlistToCart(${p.id})">Add to Cart</button>
          <button class="small-btn ghost" onclick="removeFromWishlist(${p.id})">Remove</button>
        </div>
      </div>
    `;
  });
  html += '</div>';
  container.innerHTML = html;
}

function removeFromWishlist(id) {
  let list = loadWishlist();
  list = list.filter(i => i.id !== id);
  saveWishlist(list);
  renderWishlist();
  try { window.parent && window.parent.showToast && window.parent.showToast('Removed from wishlist', 'info'); } catch(e){}
}

function addWishlistToCart(id) {
  // get wishlist item
  const list = loadWishlist();
  const p = list.find(i => i.id === id);
  if (!p) return;
  // add to cart localStorage
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const existing = cart.find(i => i.id === p.id);
  if (existing) existing.qty++;
  else cart.push({ ...p, qty: 1 });
  localStorage.setItem('cart', JSON.stringify(cart));
  // remove from wishlist
  removeFromWishlist(id);
  try { window.parent && window.parent.showToast && window.parent.showToast('Added to cart', 'success'); } catch(e){}
}

// expose functions to global scope for inline onclicks
window.removeFromWishlist = removeFromWishlist;
window.addWishlistToCart = addWishlistToCart;

renderWishlist();
