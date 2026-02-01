import menuArr from './menuArr.js';

const order = [];

function renderMenu(menu) {
  return menu
    .map((item) => {
      return `
            <div class="item">
                <span class="item-image">${item.emoji}</span>
                <div class="item-details">
                    <div class="item-copy">
                        <h4>${item.name}</h4>
                        <h5>${item.ingredients
                          .map(
                            (ing) => ing.charAt(0).toUpperCase() + ing.slice(1)
                          )
                          .join(', ')}</h5>
                    </div>
                    <h5 class="item-price">$${item.price}</h5>
                </div>
                <button class="item-btn" data-add-btn=${item.id}>+</button>
            </div>
        `;
    })
    .join('');
}

function renderOrderDetails(orderArr) {
  const totalPrice = document.getElementById('total');

  totalPrice.textContent = `$${orderArr.reduce((acc, cur) => {
    return acc + cur.price;
  }, 0)}`;

  return orderArr
    .map((item, index) => {
      return `
            <div class="cart-item">
                <h4>${item.name}</h4>
                <button class="cart-btn" data-remove-btn=${index}>Remove</button>
                <h4 class="cart-item__price">$${item.price}</h4>
            </div>
        `;
    })
    .join('');
}

function formatCardNumber(value) {
  const digits = value.replace(/\D/g, '');
  const formatted = digits.replace(/(\d{4})(?=\d)/g, '$1 ');
  return formatted.substring(0, 19);
}

// Initial menu render
document.getElementById('menu').innerHTML = renderMenu(menuArr);

// Document wide event listener
document.addEventListener('click', (e) => {
  const footer = document.querySelector('footer');

  // Check for menu item add btn
  if (e.target.dataset.addBtn) {
    order.push(menuArr[e.target.dataset.addBtn]);
    document.getElementById('cart').innerHTML = renderOrderDetails(order);
  }

  // Remove item from cart if btn pressed
  if (e.target.dataset.removeBtn) {
    order.splice(e.target.dataset.removeBtn, 1);
    document.getElementById('cart').innerHTML = renderOrderDetails(order);
  }

  // Checkout Btn Pressed
  if (e.target.id === 'checkout-btn') {
    order.splice(0, order.length);
    document.getElementById('paymentDialog').showModal();
  }

  if (e.target.id === 'payment-btn') {
    e.preventDefault();
    document.getElementById('name').value = '';
    document.getElementById('cardNumber').value = '';
    document.getElementById('cvv').value = '';
    document.getElementById('paymentDialog').close();

    const thanks = document.querySelector('.thanks');
    thanks.style.display = 'block';

    setTimeout(() => {
      thanks.style.display = 'none';
    }, 3000);
  }

  // Show or hide cart
  order.length >= 1
    ? (footer.style.display = 'flex')
    : (footer.style.display = 'none');
});

// Add event listener to card number input
document.addEventListener('DOMContentLoaded', function () {
  const cardNumberInput = document.getElementById('cardNumber');

  cardNumberInput.addEventListener('input', function (e) {
    const cursorPosition = e.target.selectionStart;
    const oldValue = e.target.value;
    const newValue = formatCardNumber(e.target.value);

    e.target.value = newValue;

    // Maintain cursor position
    const newCursorPosition =
      cursorPosition + (newValue.length - oldValue.length);
    e.target.setSelectionRange(newCursorPosition, newCursorPosition);
  });

  // Prevent non-numeric input (except spaces and backspace)
  cardNumberInput.addEventListener('keydown', function (e) {
    const allowedKeys = [
      'Backspace',
      'Delete',
      'Tab',
      'Escape',
      'Enter',
      'ArrowLeft',
      'ArrowRight',
    ];
    if (allowedKeys.includes(e.key) || (e.key >= '0' && e.key <= '9')) {
      return;
    }
    e.preventDefault();
  });
});
