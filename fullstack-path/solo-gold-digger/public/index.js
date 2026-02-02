const form = document.querySelector("#investNow");
const event = new EventSource("/api/gold-price");
const connectionStatus = document.querySelector("#connection-status");
const priceDisplay = document.querySelector("#price-display");
const dialog = document.querySelector("dialog");
const dialogOkBtn = document.querySelector("dialog button");
const investmentSummary = document.querySelector("#investment-summary");

async function sendData() {
  const formData = new FormData(form);
  try {
    const res = await fetch("/api/invest", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: formData.get("investment-amount") }),
    });

    const { data } = await res.json();
    console.log(data);
    investmentSummary.textContent = `You just bought ${data.purchasedOunces.toFixed(2)} ounces (ozt) for $${data.currentGoldPrice.toFixed(2)}. \n You will receive documentation shortly.`;
    dialog.showModal();

    form.reset();
  } catch (err) {
    console.log(err);
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  sendData();
});

dialogOkBtn.addEventListener("click", () => {
  dialog.close();
  investmentSummary.textContent = "";
});

event.onopen = () => {
  connectionStatus.textContent = "Live Price 🟢";
};

event.onerror = () => {
  connectionStatus.textContent = "Disconnected 🔴";
};

event.onmessage = (e) => {
  const data = JSON.parse(e.data);
  priceDisplay.textContent = data.price.toFixed(2);
};
