export async function logout() {
  try {
    const res = await fetch("/api/auth/logout", { method: "POST" });
    if (res.ok) {
      window.location.href = "/";
    }
  } catch (err) {
    console.log("failed to log out", err);
  }
}
