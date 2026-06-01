# Farmly - Modern E-Commerce Platform

Farmly is a highly responsive, modern client-side E-Commerce platform tailored for organic products, groceries, and fresh produce. Built entirely using vanilla **HTML**, **CSS**, and **JavaScript**, it delivers a seamless, premium user experience complete with curated color palettes, elegant transitions, and rich micro-interactions.

---

## 🚀 Features

### 👤 Customer Dashboard (`User-dashboard/`)
* **Multi-Role Portal:** A unified custom login portal supporting customers, shopkeepers, delivery partners, admins, and support agents.
* **Product Catalog:** Interactive category filtering (All, Veg, Snacks, Drinks, Fruits) with a visual, responsive product layout.
* **Smart Search:** Real-time text-based search with interactive dropdown auto-suggestions.
* **Location Auto-Detection:** Integrates the browser's Geolocation API with OpenStreetMap Nominatim reverse geocoding to automatically resolve the customer's delivery area.
* **Shopping Cart & Checkout:** Real-time cumulative calculations, dynamic checkout payment forms (supporting Credit/Debit Card, UPI, PayPal, and Cash on Delivery), and styled order-placement modals.
* **Simulated Order Tracking:** A step-by-step vertical progress tracker mapping status from *Order Placement* to final *Delivery*.
* **Profile Management:** Fully customizable profile settings including profile photo uploads, notification preferences, saved addresses, and payment methods.
* **Wishlist:** Dedicated page to bookmark favorite items for future shopping.

---

## 📂 Project Structure

```text
.
├── index.html                    # Root entrypoint (auto-redirects to Login page)
├── README.md                     # Documentation
├── .nojekyll                     # Config for GitHub Pages / static deployments
└── User-dashboard/
    ├── login.html / .css / .js   # Portal with multi-role support
    ├── user.html / .css / .js    # Customer storefront and product catalog
    ├── cart.html / .css / .js    # Shopping cart list, checkout, and receipt success screen
    ├── wishlist.html / .js       # Bookmarked items interface
    ├── profile.html / .css / .js # User profile settings, saved addresses, and payment methods
    ├── track-order.html          # Order tracking progress timeline
    └── order-success.html        # Basic success overlay page
```


## 🛠️ Technology Stack & Architecture

* **Frontend:** Vanilla HTML5, CSS3, and ES6+ JavaScript.
* **State Management:** Fully client-side using browser `localStorage` to synchronize states (e.g. active carts, wishlists, simulated delivery progress, active user profiles) across different views.
* **API Integrations:** Reverse geocoding powered by [OpenStreetMap Nominatim API](https://nominatim.org/).
* **Design Philosophy:** Premium aesthetic utilizing variables-driven styling, sleek typography, dynamic borders, and custom micro-animations (e.g. checkmark success overlays, custom listbox behaviors).

---

## 💻 Getting Started

Farmly is built entirely as a static client-side application. No database or server installation is required.

### Option 1: Direct Open
Simply double-click or drag-and-drop the root `index.html` file into any modern web browser to run the application immediately.

### Option 2: Local Server (Recommended)
To enable full geolocation and secure API features, serve the project using a simple static web server.

Using Python (built-in):
```bash
python -m http.server 8000
