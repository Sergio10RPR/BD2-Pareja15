//const EVENT_ENDPOINT_CLIENT = "http://34.125.226.188:5002/Cliente/Historial";
const EVENT_ENDPOINT_ADMIN = "http://34.174.59.222:5003/Admin/Usuarios";

export const fetchEvents = async ({ token }) => {

  const dataAPI = await fetch(EVENT_ENDPOINT_ADMIN, {
    method: "GET",
    headers: {
      Authorization: `${token}`,
      "Content-Type": "application/json",
    },
  });

  const datos = await dataAPI.json();

  return datos;
};