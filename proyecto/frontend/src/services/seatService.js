const EVENT_ENDPOINT_ADMIN = "http://34.174.59.222:5002/Evento/Ver";

export const fetchSeats = async ({ token, idEvento }) => {

  const dataAPI = await fetch(EVENT_ENDPOINT_ADMIN, {
    method: "POST",
    headers: {
      Authorization: `${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({"idEvento": idEvento})
  });

  const datos = await dataAPI.json();

  return datos.data;
};