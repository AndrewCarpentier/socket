const API_CHANNEL = "http://localhost:8000/api/channel";

export async function getChannels(){
  const response = await fetch(`${API_CHANNEL}/all`);
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

export async function joinChannel(idUser, idChannel){
  const response = await fetch(`${API_CHANNEL}/joinChannel`, {
    method : "POST",
    headers : { "Content-Type" : "application/json"},
    body : JSON.stringify({idUser, idChannel})
  });
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

export async function getPrivateChannel(idUser, idUserSend) {
  const response = await fetch(
    `${API_CHANNEL}/getPrivateChannel/${idUser}/${idUserSend}`
  );
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

export async function createChannel(name, img,idUser) {
  const response = await fetch(`${API_CHANNEL}/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, img, idUser }),
  });
  const responseBack = await response.json();
  if (response.ok) {
    console.log('ok')
    return responseBack;
  } else {
    if (responseBack) {
      throw responseBack;
    } else {
      throw new Error("API error");
    }
  }
}
