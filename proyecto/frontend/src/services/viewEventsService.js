const EVENT_ENDPOINT_CLIENT = "http://34.174.59.222:5002/Cliente/Calendario";
const EVENT_ENDPOINT_ADMIN = "http://34.174.59.222:5000/Organizador/Calendario";

export const fetchViewEventService = async ({ token }) => {

    let endpoint = '';
    if(localStorage.getItem("TipoUsuario") === "Cliente") endpoint = EVENT_ENDPOINT_CLIENT;
    else if (localStorage.getItem("TipoUsuario") === "Organizador") endpoint = EVENT_ENDPOINT_ADMIN;

  const dataAPI = await fetch(endpoint, {
    method: "GET",
    headers: {
      Authorization: `${token}`,
      "Content-Type": "application/json",
    },
  });

  const datos = await dataAPI.json();

  return datos.data;
};
