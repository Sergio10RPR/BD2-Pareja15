//const EVENT_ENDPOINT_CLIENT = "http://127.0.0.1:5002/Cliente/Calendario";
const EVENT_ENDPOINT_CLIENT = "http://34.174.59.222:5002/Cliente/Historial";

export const fetchBuyRecordClient = async ({ token }) => {

  const dataAPI = await fetch(EVENT_ENDPOINT_CLIENT, {
    method: "POST",
    headers: {
      Authorization: `${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({"d":"d"})
  });

  const datos = await dataAPI.json();

  console.log(datos)

  return datos.data;
};
