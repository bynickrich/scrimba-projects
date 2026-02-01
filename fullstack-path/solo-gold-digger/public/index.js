const form = document.querySelector("#investNow");

async function sendData() {
  const formData = new FormData(form);

  console.log(formData.get("investment-amount"));
  try {
    const res = await fetch("/api/invest", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: formData.get("investment-amount") }),
    });
    console.log(await res.json());
  } catch (err) {
    console.log(err);
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  sendData();
});

try {
  const res = await fetch("/api/gold-price");
  const data = await res.json();
  console.log(data);
} catch (error) {
  console.log(error);
}
