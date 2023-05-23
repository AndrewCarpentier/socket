const API_AUTH = "http://localhost:8000/api/auth";

export async function login(credentials) {
  const response = await fetch(`${API_AUTH}`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  const backResponse = await response.json();
  console.log({backResponse})
  if (response.ok) {
    return backResponse;
  } else {
    if (backResponse) {
      throw backResponse;
    } else {
      throw new Error("Error api create user");
    }
  }
}
