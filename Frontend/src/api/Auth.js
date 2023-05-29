const API_AUTH = "/api/auth";

export async function login(credentials) {
  const response = await fetch(`${API_AUTH}`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  const backResponse = await response.json();
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

export async function getCurrentUser() {
  const response = await fetch(`${API_AUTH}/current`, {
    method: "GET",
    credentials: "include",
  });
  return response.json();
}

export async function logout() {
  await fetch(`${API_AUTH}`, {
    method: "DELETE",
    credentials: "include",
  });
}
