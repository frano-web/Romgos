const cfg = window.SITE_CONFIG || {};
const cart = [];

const money = value =>
  Number(value || 0).toLocaleString("pl-PL", { style: "currency", currency: "PLN" });

const escapeHtml = (value = "") =>
  String(value).replace(/[&<>"']/g, ch => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  }[ch]));

function renderProducts() {
  const grid = document.getElementById("productGrid");
  if (!grid) return;

  grid.innerHTML = (cfg.products || []).map(product => `
    <article class="product-card" data-product="${escapeHtml(product.id)}">
      <div class="product-image">
        ${
          product.image
            ? `<img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.name)}">`
            : `<div class="product-placeholder">
                 <span>MIEJSCE NA ZDJĘCIE / WIZUALIZACJĘ</span>
                 <strong>${escapeHtml(product.name)}</strong>
               </div>`
        }
      </div>
      <div class="product-copy">
        <div class="product-topline">
          <h3>${escapeHtml(product.name)}</h3>
          <div class="product-price">${product.price ? money(product.price) : "Cena do uzupełnienia"}</div>
        </div>
        <p>${escapeHtml(product.description)}</p>

        <div class="product-controls">
          <select class="product-size" aria-label="Rozmiar ${escapeHtml(product.name)}">
            ${(product.sizes || []).map(size => `<option value="${escapeHtml(size)}">${escapeHtml(size)}</option>`).join("")}
          </select>
          <select class="product-qty" aria-label="Liczba sztuk ${escapeHtml(product.name)}">
            ${[1,2,3,4,5].map(q => `<option value="${q}">${q} szt.</option>`).join("")}
          </select>
        </div>

        <button class="add-product" type="button" data-add="${escapeHtml(product.id)}">
          Dodaj do zamówienia
        </button>
      </div>
    </article>
  `).join("");

  grid.querySelectorAll("[data-add]").forEach(button => {
    button.addEventListener("click", () => {
      const product = (cfg.products || []).find(p => p.id === button.dataset.add);
      const card = button.closest(".product-card");
      const size = card.querySelector(".product-size").value;
      const qty = Number(card.querySelector(".product-qty").value);

      cart.push({
        key: `${product.id}-${Date.now()}-${Math.random()}`,
        id: product.id,
        name: product.name,
        size,
        qty,
        price: Number(product.price || 0)
      });

      renderCart();
      showToast(`${product.name} dodano do zamówienia.`);
    });
  });
}

function renderCart() {
  const items = document.getElementById("cartItems");
  const empty = document.getElementById("cartEmpty");
  const count = document.getElementById("cartCount");
  const total = document.getElementById("cartTotal");

  if (!items || !empty || !count || !total) return;

  count.textContent = cart.reduce((sum, item) => sum + item.qty, 0);
  total.textContent = money(cart.reduce((sum, item) => sum + item.price * item.qty, 0));

  empty.style.display = cart.length ? "none" : "block";

  items.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div>
        <strong>${escapeHtml(item.name)}</strong>
        <small>Rozmiar: ${escapeHtml(item.size)} • ${item.qty} szt. ${item.price ? `• ${money(item.price * item.qty)}` : ""}</small>
      </div>
      <button type="button" data-remove="${escapeHtml(item.key)}">Usuń</button>
    </div>
  `).join("");

  items.querySelectorAll("[data-remove]").forEach(button => {
    button.addEventListener("click", () => {
      const index = cart.findIndex(item => item.key === button.dataset.remove);
      if (index >= 0) cart.splice(index, 1);
      renderCart();
    });
  });
}

function buildOrderText(formData) {
  const orderLines = cart.map((item, i) =>
    `${i + 1}. ${item.name} | rozmiar: ${item.size} | ilość: ${item.qty}${item.price ? ` | ${money(item.price * item.qty)}` : ""}`
  );

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return [
    "NOWE ZAMÓWIENIE — AKADEMIA UNIHOKEJA ROMGOS",
    "",
    `Rodzic/opiekun: ${formData.get("parentName")}`,
    `Zawodnik: ${formData.get("playerName")}`,
    `E-mail: ${formData.get("email")}`,
    `Telefon: ${formData.get("phone")}`,
    `Grupa / rocznik: ${formData.get("group") || "nie podano"}`,
    `Odbiór: ${formData.get("pickup") || "nie podano"}`,
    "",
    "ZAMÓWIENIE:",
    ...orderLines,
    "",
    total ? `Łączna wartość: ${money(total)}` : "Cena: do potwierdzenia przez Akademię",
    "",
    `Uwagi: ${formData.get("notes") || "brak"}`,
    "",
    "Płatność: przy odbiorze."
  ].join("\n");
}

async function handleOrderSubmit(event) {
  event.preventDefault();

  const status = document.getElementById("formStatus");

  if (!cart.length) {
    status.textContent = "Najpierw dodaj co najmniej jeden produkt do zamówienia.";
    status.style.color = "#9b3d3d";
    document.getElementById("zamowienia").scrollIntoView({ behavior: "smooth" });
    return;
  }

  const form = event.currentTarget;
  const formData = new FormData(form);
  const orderText = buildOrderText(formData);

  // Docelowo można podpiąć Formspree/EmailJS/własny endpoint.
  if (cfg.formEndpoint) {
    try {
      const response = await fetch(cfg.formEndpoint, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          parentName: formData.get("parentName"),
          playerName: formData.get("playerName"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          group: formData.get("group"),
          pickup: formData.get("pickup"),
          notes: formData.get("notes"),
          order: cart,
          orderText
        })
      });

      if (!response.ok) throw new Error("Błąd wysyłki");

      status.textContent = "Zamówienie zostało wysłane.";
      status.style.color = "#426719";
      form.reset();
      cart.splice(0, cart.length);
      renderCart();
      return;
    } catch (error) {
      status.textContent = "Nie udało się wysłać formularza. Spróbuj ponownie lub skontaktuj się z Akademią.";
      status.style.color = "#9b3d3d";
      return;
    }
  }

  // Tryb szkieletu: przygotowanie e-maila w aplikacji pocztowej.
  if (!cfg.orderEmail) {
    status.textContent = "Formularz działa, ale trzeba jeszcze wpisać adres e-mail do zamówień w pliku config.js.";
    status.style.color = "#9b3d3d";
    return;
  }

  const subject = encodeURIComponent(`Zamówienie stroju — ${formData.get("playerName")}`);
  const body = encodeURIComponent(orderText);
  window.location.href = `mailto:${cfg.orderEmail}?subject=${subject}&body=${body}`;

  status.textContent = "Otwieram program pocztowy z gotowym zamówieniem.";
  status.style.color = "#426719";
}

function initSiteData() {
  document.getElementById("year").textContent = new Date().getFullYear();

  const leagueLink = document.getElementById("leagueLink");
  if (leagueLink) leagueLink.href = cfg.leagueUrl || "#";

  const email = document.getElementById("contactEmail");
  if (email) {
    email.textContent = cfg.contactEmail || "e-mail do uzupełnienia";
    email.href = cfg.contactEmail ? `mailto:${cfg.contactEmail}` : "#";
  }

  const phone = document.getElementById("contactPhone");
  if (phone) {
    phone.textContent = cfg.phone || "telefon do uzupełnienia";
    phone.href = cfg.phone ? `tel:${String(cfg.phone).replace(/\s+/g, "")}` : "#";
  }

  const fb = document.getElementById("facebookLink");
  if (fb) fb.href = cfg.facebook || "#";

  const ig = document.getElementById("instagramLink");
  if (ig) ig.href = cfg.instagram || "#";

  const footerEmail = document.getElementById("footerEmail");
  if (footerEmail) {
    footerEmail.textContent = cfg.contactEmail || "e-mail do uzupełnienia";
    footerEmail.href = cfg.contactEmail ? `mailto:${cfg.contactEmail}` : "#";
  }

  const footerPhone = document.getElementById("footerPhone");
  if (footerPhone) {
    footerPhone.textContent = cfg.phone || "telefon do uzupełnienia";
    footerPhone.href = cfg.phone ? `tel:${String(cfg.phone).replace(/\s+/g, "")}` : "#";
  }

  const footerFacebook = document.getElementById("footerFacebook");
  if (footerFacebook) footerFacebook.href = cfg.facebook || "#";

  const footerInstagram = document.getElementById("footerInstagram");
  if (footerInstagram) footerInstagram.href = cfg.instagram || "#";
}

function initMenu() {
  const toggle = document.getElementById("menuToggle");
  const nav = document.getElementById("mainNav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    document.body.classList.toggle("menu-open", open);
  });

  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("menu-open");
    });
  });
}

function initSizeTabs() {
  document.querySelectorAll("[data-size-table]").forEach(button => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-size-table]").forEach(btn => btn.classList.remove("active"));
      document.querySelectorAll("[data-table]").forEach(table => table.classList.remove("active"));

      button.classList.add("active");
      const table = document.querySelector(`[data-table="${button.dataset.sizeTable}"]`);
      if (table) table.classList.add("active");
    });
  });
}

function initRevealAnimations() {
  const nodes = document.querySelectorAll(".reveal");
  if (!nodes.length) return;

  if (!("IntersectionObserver" in window)) {
    nodes.forEach(node => node.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  nodes.forEach(node => observer.observe(node));
}

let toastTimer;
function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2400);
}

document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  renderCart();
  initSiteData();
  initMenu();
  initSizeTabs();
  initRevealAnimations();

  const form = document.getElementById("orderForm");
  if (form) form.addEventListener("submit", handleOrderSubmit);
});
