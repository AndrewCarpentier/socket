const API_USER = "http://localhost:8000/api/user";

export async function CreateUser(newUser) {
  const response = await fetch(`${API_USER}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newUser),
  });
  const backResponse = await response.json();
  if (response.ok) {
    return backResponse;
  } else {
    if (backResponse) {
      throw backResponse;
    } else {
      throw new Error("API error");
    }
  }
}

export async function getUserByChannelId(idChannel, privateBool){
  const response = await fetch(`${API_USER}/getUsersByChannelId/${idChannel}?private=${privateBool}`);
  return await response.json();
}

export async function getUserById(idUser){
  const response = await fetch(`${API_USER}/getUserById/${idUser}`);
  const responseBack = await response.json();
  if(response.ok){
    return responseBack;
  }else{
    if(responseBack){
      throw responseBack;
    }else{
      throw new Error('api error')
    }
  }
}
