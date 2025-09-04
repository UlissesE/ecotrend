const cart = JSON.parse(localStorage.getItem("cart")) || [];

function formatPrice(price) {
  return "R$" + price.toFixed(2).replace(".", ",");
}

const tbody = document.querySelector("table tbody");
const mobileCards = document.querySelector(".d-md-none");

if (tbody) {
    tbody.innerHTML = "";
}

if (mobileCards) {
    mobileCards.innerHTML = "";
}

let subtotal = 0;
let frete

cart.forEach((item) => {
  const total = item.price * item.quantity;
  subtotal += total;

  // Tabela (desktop)
  if (tbody) {
    const tr = document.createElement("tr");
    tr.innerHTML = `
        <td>
          <div class="d-flex align-items-center">
            <img src="${item.image}" class="rounded me-3" width="70" alt="${
      item.name
    }">
            <div>
              <h6 class="mb-1">${item.name}</h6>
              <small class="text-muted">${item.description || ""}</small>
            </div>
          </div>
        </td>
        <td>${formatPrice(item.price)}</td>
        <td>
          <input aria-label="qtd" type="number" class="form-control text-center input-qtd" value="${
            item.quantity
          }" min="1" data-id="${item.id}">
        </td>
        <td>${formatPrice(total)}</td>
      `;
    tbody.appendChild(tr);
  }

  // Cards (mobile)
  if (mobileCards) {
    const card = document.createElement("div");
    card.className = "card mb-3 border";
    card.innerHTML = `
        <div class="card-body d-flex align-items-center">
          <img src="${item.image}" class="rounded me-3" width="70" alt="${
      item.name
    }">
          <div class="w-100 d-flex flex-column gap-1">
            <h6 class="mb-1">${item.name}</h6>
            <small class="text-muted">${item.description || ""}</small>
            <div class="d-flex justify-content-between mt-2">
              <span>Preço:</span>
              <span>${formatPrice(item.price)}</span>
            </div>
            <div class="d-flex justify-content-between mt-2">
              <span>Quantidade:</span>
              <input aria-label="qtd" type="number" class="form-control text-center input-qtd" value="${
                item.quantity
              }" min="1" data-id="${item.id}">
            </div>
            <div class="d-flex justify-content-between mt-2 fw-bold">
              <span>Total:</span>
              <span>${formatPrice(total)}</span>
            </div>
          </div>
        </div>
      `;
    mobileCards.appendChild(card);
  }
});

// Atualiza subtotal e total
document
  .querySelectorAll(
    "#subtotal, #frete, #total"
  )
  .forEach((element, index) => {
    if (index === 0) element.textContent = formatPrice(subtotal);
    if (index === 1) element.textContent = formatPrice(
      subtotal >= 100 ? 0 : 10
    )
    frete = subtotal >= 100 ? 0 : 10
    if (index === 2) element.textContent = formatPrice(subtotal + frete)
  });

document.querySelectorAll(".input-qtd").forEach((input) => {
  input.addEventListener("change", function () {
    const id = this.getAttribute("data-id");
    const newQty = parseInt(this.value);
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const item = cart.find((item) => item.id === id);
    if (item && newQty > 0) {
      item.quantity = newQty;
      localStorage.setItem("cart", JSON.stringify(cart));
      location.reload();
    }
  });
});
