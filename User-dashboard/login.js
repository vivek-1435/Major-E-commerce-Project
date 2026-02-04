function login() {
  const role = document.getElementById("role").value;
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!role || !username || !password) {
    alert("Please fill all fields");
    return;
  }

  // Demo login (replace with backend later)
  localStorage.setItem("role", role);
  localStorage.setItem("user", username);

  // ROLE-BASED REDIRECT
  switch (role) {
    case "user":
      // redirect to the user dashboard in this folder
      window.location.href = "user.html";
      break;
    case "shop":
      window.location.href = "shop/dashboard.html";
      break;
    case "delivery":
      window.location.href = "delivery/dashboard.html";
      break;
    case "admin":
      window.location.href = "admin/dashboard.html";
      break;
    case "support":
      window.location.href = "support/dashboard.html";
      break;
    default:
      alert("Invalid role");
  }
}

/* ===== Custom role select behavior ===== */
;(function () {
  const custom = document.getElementById('roleSelect');
  if (!custom) return;
  const selected = custom.querySelector('.selected');
  const options = custom.querySelectorAll('.options li');
  const hidden = document.getElementById('role');

  function closeAll() {
    custom.classList.remove('open');
    custom.setAttribute('aria-expanded', 'false');
  }

  selected.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = custom.classList.toggle('open');
    custom.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  options.forEach(li => {
    li.addEventListener('click', (e) => {
      e.stopPropagation();
      const val = li.getAttribute('data-value');
      selected.textContent = li.textContent;
      // set hidden select value so existing login() can read it
      hidden.value = val;
      // mark aria-selected
      options.forEach(o => o.removeAttribute('aria-selected'));
      li.setAttribute('aria-selected', 'true');
      closeAll();
    });
  });

  // keyboard support: Enter/Space to open, Arrow keys to navigate, Enter to choose
  custom.addEventListener('keydown', (e) => {
    const open = custom.classList.contains('open');
    const focusIndex = Array.from(options).findIndex(o => o.getAttribute('aria-selected') === 'true');

    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (!open) { custom.classList.add('open'); custom.setAttribute('aria-expanded','true'); }
      else {
        // if open and an option is focused/selected, choose it
        if (focusIndex >= 0) options[focusIndex].click();
      }
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      custom.classList.add('open'); custom.setAttribute('aria-expanded','true');
      const next = Math.min((focusIndex === -1 ? -1 : focusIndex) + 1, options.length -1);
      if (next >= 0) options[next].focus();
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      custom.classList.add('open'); custom.setAttribute('aria-expanded','true');
      const prev = Math.max((focusIndex === -1 ? options.length : focusIndex) - 1, 0);
      options[prev].focus();
    }

    if (e.key === 'Escape') closeAll();
  });

  // close when clicking outside
  document.addEventListener('click', () => closeAll());

  // ensure hidden select value reflects placeholder initially
  hidden.value = '';
})();
