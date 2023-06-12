const API_CHANNEL = "http://localhost:8000/api/channel";

export async function getChannelsByIdUser(idUser) {
  const response = await fetch(`${API_CHANNEL}/getChannelsByIdUser/${idUser}`);
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

export async function getPrivateChannel(idUser, idUserSend){
  const response = await fetch(`${API_CHANNEL}/getPrivateChannel/${idUser}/${idUserSend}`);
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
