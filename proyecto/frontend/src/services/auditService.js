//const EVENT_ENDPOINT_CLIENT = "http://127.0.0.1:5002/Cliente/Calendario";
const EVENT_ENDPOINT_ADMIN = "http://34.174.59.222:5000/Organizador/Historial";

export const fetchAudit = async ({ token }) => {

  const dataAPI = await fetch(EVENT_ENDPOINT_ADMIN, {
    method: "GET",
    headers: {
      Authorization: `${token}`,
      "Content-Type": "application/json",
    },
  });

  const datos = await dataAPI.json();

  return datos.data;
};
