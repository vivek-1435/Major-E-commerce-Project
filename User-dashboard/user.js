/* ================= DROPDOWNS ================= */
const accountBtn = document.getElementById("accountBtn");
const accountMenu = document.getElementById("accountMenu");

const imageBtn = document.getElementById("imageSearchBtn");
const imageDropdown = document.getElementById("imageDropdown");

if (accountBtn && accountMenu) {
  accountBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    accountMenu.style.display =
      accountMenu.style.display === "block" ? "none" : "block";
  });
}

if (imageBtn && imageDropdown) {
  imageBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    imageDropdown.style.display =
      imageDropdown.style.display === "flex" ? "none" : "flex";
  });
}

/* ================= IMAGE UPLOAD ================= */
const uploadBtn = document.getElementById("uploadBtn");
const uploadInput = document.getElementById("uploadInput");

if (uploadBtn && uploadInput) {
  uploadBtn.addEventListener("click", () => uploadInput.click());

  uploadInput.addEventListener("change", () => {
    const file = uploadInput.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      localStorage.setItem("searchedImage", reader.result);
      window.location.href = "image-search.html";
    };
    reader.readAsDataURL(file);
  });
}

/* ================= CAMERA ================= */
const cameraBtn = document.getElementById("cameraBtn");
const cameraModal = document.getElementById("cameraModal");
const video = document.getElementById("cameraStream");
const canvas = document.getElementById("cameraCanvas");
const captureBtn = document.getElementById("captureBtn");
const closeCamera = document.getElementById("closeCamera");
const cameraInput = document.getElementById("cameraInput");

let stream = null;

if (cameraBtn && cameraModal && video && canvas && captureBtn && closeCamera) {
  cameraBtn.addEventListener("click", async () => {
    if (imageDropdown) imageDropdown.style.display = "none";
    try {
      stream = await navigator.mediaDevices.getUserMedia({ video: true });
      video.srcObject = stream;
      cameraModal.style.display = "flex";
    } catch {
      if (cameraInput) cameraInput.click();
    }
  });

  captureBtn.addEventListener("click", () => {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0);

    localStorage.setItem("searchedImage", canvas.toDataURL("image/png"));
    stopCamera();
    window.location.href = "image-search.html";
  });

  closeCamera.addEventListener("click", stopCamera);
}

function stopCamera() {
  if (stream) {
    stream.getTracks().forEach(t => t.stop());
    stream = null;
  }
  if (cameraModal) cameraModal.style.display = "none";
}

/* ================= LOCATION ================= */
const locationText = document.getElementById("locationText");
const locationDropdown = document.getElementById("locationDropdown");
const currentLocationBtn = document.getElementById("currentLocationBtn");
const manualAddressBtn = document.getElementById("manualAddressBtn");

if (locationText && locationDropdown) {
  locationText.addEventListener("click", (e) => {
    e.stopPropagation();
    locationDropdown.style.display =
      locationDropdown.style.display === "flex" ? "none" : "flex";
  });
}

if (currentLocationBtn && locationText && locationDropdown) {
  currentLocationBtn.addEventListener("click", () => {
    locationDropdown.style.display = "none";
    locationText.innerText = "Detecting location...";

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${coords.latitude}&lon=${coords.longitude}`)
          .then(res => res.json())
          .then(data => {
            const area =
              data.address.suburb ||
              data.address.city ||
              "Your location";
            locationText.innerText = area + " ▼";
          })
          .catch(() => { locationText.innerText = "Select location ▼"; });
      },
      () => (locationText.innerText = "Select location ▼")
    );
  });
}

if (manualAddressBtn && locationDropdown && locationText) {
  manualAddressBtn.addEventListener("click", () => {
    const address = prompt("Enter your address");
    if (address) locationText.innerText = address + " ▼";
  });
}

/* ================= GLOBAL CLOSE ================= */
// (moved below SEARCH section so `suggestionsBox` is defined)

/* ================= PRODUCTS ================= */

const products = [
  { name: "Tomato", price: 30, category: "veg", time: "10-15 min",img: "https://images.unsplash.com/photo-1518977822534-7049a61ee0c2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { name: "Chips", price: 50, category: "snacks", time: "10-15 min",img: "https://m.media-amazon.com/images/I/711vAJ8fWlL._AC_UF894,1000_QL80_.jpg" },
  { name: "Juice", price: 80, category: "drinks", time: "10-15 min",img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPreAcEslLsa7XkZ4sil6DG5rFFUqJBJkmpg&s" },
  { name: "Banana", price: 40, category: "fruits", time: "10-15 min",img: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YmFuYW5hfGVufDB8fDB8fHww" },

  { name: "Biscuits", price: 30, category: "snacks", time: "10-15 min",img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-qlZXt0Dyu02sgPM467EO89jD_SGId7h_cQ&s" },
  { name: "Namkeen", price: 45, category: "snacks", time: "10-15 min",img: "https://mir-s3-cdn-cf.behance.net/projects/404/e624c1195846165.Y3JvcCw5MjYsNzI1LDM0MSwyNzU.jpg" },
  { name: "Popcorn", price: 60, category: "snacks",time: "10-15 min", img: "https://media.istockphoto.com/id/500507982/fr/photo/pop-corn-dans-un-emballage-en-plastique-isol%C3%A9-sur-fond-blanc.jpg?s=612x612&w=0&k=20&c=lTAEdx4cmShLsciOOLqyPZE_dcq1XLPDV_AFn10xEAk=" },
  { name: "Chocolate", price: 70, category: "snacks", time: "10-15 min",img: "https://5.imimg.com/data5/SELLER/Default/2023/7/329646728/CR/KN/TS/48534106/51odvwzqoql-sl1000-500x500.jpg" },

  { name: "Apple Juice", price: 80, category: "drinks", time: "10-15 min",img: "https://img.freepik.com/premium-vector/fresh-organic-apple-juice-social-media-post-web-banner-template-design_685384-69.jpg" },
  { name: "Orange Juice", price: 75, category: "drinks", time: "10-15 min",img: "https://assets.bonappetit.com/photos/657239313d9030feedbe0150/master/w_1600%2Cc_limit/20231206-WEB-6784.jpg" },
  { name: "Cold Coffee", price: 90, category: "drinks", time: "10-15 min",img: "https://img.freepik.com/premium-photo/iced-coffee-roasted-coffee-wood-table_36078-57.jpg?w=360" },
  { name: "Milk Shake", price: 100, category: "drinks", time: "10-15 min",img: "https://s3-media0.fl.yelpcdn.com/bphoto/FC79DlEA-ba_t6bB1EGu7g/l.jpg" },
  { name: "Soda", price: 40, category: "drinks", time: "10-15 min",img: "https://t3.ftcdn.net/jpg/05/96/39/36/360_F_596393621_w9sbu5dV7wWntw1eloAOwj39H2rEo6CD.jpg" },

  { name: "Apple", price: 120, category: "fruits", time: "10-15 min",img: "https://img.pikbest.com/png-images/20240716/png-red-fresh-bucket-apple-isolated-con-a-transparent-background_10665652.png!sw800" },
  { name: "Banana", price: 40, category: "fruits", time: "10-15 min",img: "https://img.freepik.com/premium-psd/bunch-bananas-wicker-basket-isolated-transparent-background_1195761-61665.jpg?semt=ais_hybrid&w=740&q=80" },
  { name: "Mango", price: 150, category: "fruits", time: "10-15 min",img: "https://www.shutterstock.com/image-photo/mango-collection-bucket-260nw-2312895407.jpg" },
  { name: "Orange", price: 60, category: "fruits", time: "10-15 min",img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhqXg4RLrBJ4cOF9EQzrLh6Ctx1od8_OCZKg&s" },
  { name: "Grapes", price: 90, category: "fruits", time: "10-15 min",img: "https://img.pikbest.com/origin/10/07/27/pIkbEsT1MpIkbEsTIFW.jpg!w700wp" }
];

// ensure each product has a stable id for cart operations
products.forEach((p, i) => (p.id = i));

/* ================= PRODUCT GRID ================= */
const grid = document.querySelector(".product-grid");

function render(list = products) {
  if (!grid) return;
  grid.innerHTML = "";
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  list.forEach(p => {
    const cartItem = cart.find(i => i.id === p.id);
    const qty = cartItem ? cartItem.qty : 0;
    
    const buttonHTML = qty > 0 
      ? `<div class="qty-control"><button class="qty-btn" onclick='removeFromProduct(${p.id})'>−</button><span class="qty-display">${qty}</span><button class="qty-btn" onclick='addToCart(${JSON.stringify(p)})'>+</button></div>`
      : `<button class="add-btn" onclick='addToCart(${JSON.stringify(p)})'>ADD</button>`;

    grid.innerHTML += `
      <div class="product-card">
        <img src="${p.img}">
        <h4>${p.name}</h4>
        <div class="delivery-time">⏱ ${p.time}</div>
        <div class="card-footer">
          <p class="price">₹${p.price}</p>
          ${buttonHTML}
        </div>
      </div>
    `;
  });
  
  updateCartDisplay();
}

/* ================= CART ================= */
function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existing = cart.find(i => i.id === product.id);

  if (existing) existing.qty++;
  else cart.push({ ...product, qty: 1 });

  localStorage.setItem("cart", JSON.stringify(cart));
  render();
}

function removeFromProduct(productId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const item = cart.find(i => i.id === productId);
  
  if (item) {
    if (item.qty > 1) {
      item.qty--;
    } else {
      cart = cart.filter(i => i.id !== productId);
    }
  }
  
  localStorage.setItem("cart", JSON.stringify(cart));
  render();
}

function updateCartDisplay() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalItems = cart.reduce((sum, i) => sum + i.qty, 0);
  const totalPrice = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  
  const cartLink = document.querySelector('a[href="cart.html"]');
  if (cartLink) {
    if (totalItems > 0) {
      cartLink.innerHTML = `<span class="cart-text">${totalItems} items</span><span class="cart-price">₹${totalPrice}</span>`;
      cartLink.style.backgroundColor = '#2a7f62';
      cartLink.style.color = '#fff';
      cartLink.style.padding = '10px 14px';
      cartLink.style.borderRadius = '6px';
      cartLink.style.fontWeight = '600';
      cartLink.style.fontSize = '13px';
    } else {
      cartLink.innerHTML = '🛒 My Cart';
      cartLink.style.backgroundColor = '';
      cartLink.style.color = '';
      cartLink.style.padding = '';
      cartLink.style.borderRadius = '';
      cartLink.style.fontWeight = '';
      cartLink.style.fontSize = '';
    }
  }
}

/* ================= CATEGORY FILTER ================= */
document.querySelectorAll(".category").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelector(".category.active")?.classList.remove("active");
    btn.classList.add("active");

    const cat = btn.dataset.category;
    render(cat === "all" ? products : products.filter(p => p.category === cat));
  });
});

/* ================= SEARCH ================= */
const searchInput = document.getElementById("searchInput");
const suggestionsBox = document.getElementById("suggestions");

if (searchInput && suggestionsBox) {
  searchInput.addEventListener("input", () => {
    const q = searchInput.value.toLowerCase().trim();
    suggestionsBox.innerHTML = "";

    if (!q) {
      suggestionsBox.style.display = "none";
      render();
      return;
    }

    const matches = products.filter(p => p.name.toLowerCase().includes(q));
    suggestionsBox.style.display = "block";

    matches.forEach(p => {
      const div = document.createElement("div");
      div.className = "suggestion";
      div.innerText = p.name;
      div.onclick = () => {
        searchInput.value = p.name;
        suggestionsBox.style.display = "none";
        render([p]);
      };
      suggestionsBox.appendChild(div);
    });
  });
}

/* ================= GLOBAL CLOSE ================= */
document.addEventListener("click", () => {
  [accountMenu, imageDropdown, locationDropdown, suggestionsBox].forEach(el => {
    if (el) el.style.display = "none";
  });
});

/* ================= INIT ================= */
render();

