//const EVENT_ENDPOINT_CLIENT = "http://127.0.0.1:5002/Cliente/Calendario";
const EVENT_ENDPOINT_ADMIN = "http://34.174.59.222:5002/Evento/Confirmar";

export const fetchConfirmBuy = async ({ token, asientos }) => {

  const dataAPI = await fetch(EVENT_ENDPOINT_ADMIN, {
    method: "POST",
    headers: {
      Authorization: `${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({asientos})
  });

  const datos = await dataAPI.text();

  return datos;
};
