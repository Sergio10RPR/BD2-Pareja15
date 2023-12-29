const EVENT_ENDPOINT_ORGA = "http://34.174.59.222:5000/Organizador/Historial";

export const fetchRecord = async ({ token }) => {

    const dataAPI = await fetch(EVENT_ENDPOINT_ORGA, {
      method: "GET",
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
    });
  
    const datos = await dataAPI.json();
  
    return datos.data;
  };