const BLOCK = "http://34.174.59.222:5003/Admin/Block";
const UNBLOCK = "http://34.174.59.222:5003/Admin/Unblock";

export const block_unblock = async ({ token, status, Correo, Usuario }) => {

    let endpoint = '';
    if(status === "1") endpoint = BLOCK;
    else endpoint = UNBLOCK;

    console.log({token, status, Correo, Usuario})

  const dataAPI = await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: `${token}`,
      "Content-Type": "application/json",
    },
    body:JSON.stringify({
      "Correo": Correo,
      "Usuario": Usuario
    })
  });

  const datos = await dataAPI.json();

  return datos;
};
