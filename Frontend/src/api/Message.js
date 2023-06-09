const API_MESSAGE = "http://localhost:8000/api/message";

export async function getMessages() {
  const response = await fetch(`${API_MESSAGE}/all`);
  return await response.json();
}

export async function getMessageByIdChannel(idChannel){
  const response = await fetch(`${API_MESSAGE}/getMessagesByIdChannel/${idChannel}`);
  return await response.json();
}
