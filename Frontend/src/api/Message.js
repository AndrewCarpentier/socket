const API_MESSAGE = "/api/message";

export async function getMessages() {
  const response = await fetch(`${API_MESSAGE}/all`);
  const responseBack = await response.json();
  if (response.ok) {
    return responseBack;
  } else {
    if (responseBack) {
      throw responseBack;
    } else {
      throw new Error("API error");
    }
  }
}
