// Simple profile page interactivity: load/save profile details, addresses, payments, wishlist

function $(id){return document.getElementById(id)}

// load saved profile from localStorage
const savedProfile = JSON.parse(localStorage.getItem('userProfile')||'{}');
$('profilePhoto').src = savedProfile.photo || $('profilePhoto').src;
$('nameInput').value = savedProfile.name || '';
$('emailInput').value = savedProfile.email || '';
$('phoneInput').value = savedProfile.phone || '';
$('notiEmail').checked = savedProfile.notiEmail || false;
$('notiSms').checked = savedProfile.notiSms || false;

// Save button
$('saveProfile').addEventListener('click', ()=>{
  const p = {
    name: $('nameInput').value.trim(),
    email: $('emailInput').value.trim(),
    phone: $('phoneInput').value.trim(),
    notiEmail: $('notiEmail').checked,
    notiSms: $('notiSms').checked,
    photo: $('profilePhoto').src
  };
  localStorage.setItem('userProfile', JSON.stringify(p));
  alert('Profile saved');
});

// Change photo
$('changePhoto').addEventListener('click', ()=>$('photoInput').click());
$('photoInput').addEventListener('change', (e)=>{
  const file = e.target.files[0];
  if(!file) return;
  const r = new FileReader();
  r.onload = ()=>{
    $('profilePhoto').src = r.result;
  };
  r.readAsDataURL(file);
});

// Logout
$('logoutBtn').addEventListener('click', ()=>{
  if(confirm('Are you sure you want to logout?')){
    // simple logout: clear localStorage session-states we know
    localStorage.removeItem('cart');
    localStorage.removeItem('lastOrder');
    // redirect to login
    window.location.href = 'login.html';
  }
});

// Addresses, payments, wishlist are stored as arrays in localStorage
function renderList(key, containerId, emptyText){
  const list = JSON.parse(localStorage.getItem(key) || '[]');
  const el = $(containerId);
  if(!el) return;
  if(list.length===0){ el.innerHTML = '<div class="empty">'+emptyText+'</div>'; return }
  el.innerHTML = list.map(item=>{
    if(typeof item === 'string') return `<div class="item">${item}</div>`;
    return `<div class="item">${item.title||item.name} <span class="muted">${item.subtitle||''}</span></div>`;
  }).join('');
}

renderList('addresses','addresses','No saved addresses yet.');
renderList('payments','payments','No payment methods saved.');
renderList('wishlist','wishlist','Your wishlist is empty.');
renderList('orderHistory','orderHistory','You have no past orders.');

// Add address / payment buttons just create prompt entries for now
// Add address fallback (simple prompt) — address modal removed
$('addAddress').addEventListener('click', ()=>{
  const a = prompt('Enter address (multi-line OK)');
  if(a){
    const list = JSON.parse(localStorage.getItem('addresses')||'[]');
    list.push(a);
    localStorage.setItem('addresses', JSON.stringify(list));
    renderList('addresses','addresses','No saved addresses yet.');
  }
});

// Add payment method fallback (simple prompt) — payment modal removed
$('addPayment').addEventListener('click', ()=>{
  const p = prompt('Enter payment method name (e.g. Visa ****1234)');
  if(p){
    const list = JSON.parse(localStorage.getItem('payments')||'[]');
    list.push(p);
    localStorage.setItem('payments', JSON.stringify(list));
    renderList('payments','payments','No payment methods saved.');
  }
});

$('contactSupport').addEventListener('click', ()=>{
  alert('Open support chat or email: support@farmly.example');
});

$('changePassword').addEventListener('click', ()=>{
  const cur = prompt('Enter current password');
  if(cur===null) return;
  const nw = prompt('Enter new password');
  if(nw) alert('Password changed (demo)');
});

// Load some mock current order from localStorage (if any)
const lastOrder = JSON.parse(localStorage.getItem('lastOrder')||'null');
if(lastOrder){
  $('currentOrders').innerHTML = `
    <div class="order-mini">
      <div><strong>Order ${lastOrder.orderId}</strong></div>
      <div>Amount: ₹${lastOrder.total}</div>
      <div></div>
    </div>
  `;
}

// Make panels clickable etc.

