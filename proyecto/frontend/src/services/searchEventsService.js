
export const fetchSearchEvent = async ({ token }) => {
  let apiConsulta = '';
  if (localStorage.getItem("TipoUsuario") === 'Cliente') {
    apiConsulta = 'http://34.174.59.222:5002/Cliente/Eventos';
  } else if (localStorage.getItem("TipoUsuario") === 'Organizador') {
    apiConsulta = 'http://34.174.59.222:5000/Organizador/Calendario';
  }

  const dataAPI = await fetch(apiConsulta, {
    method: "GET",
    headers: {
      Authorization: `${token}`,
      "Content-Type": "application/json",
    },
  });

  const datos = await dataAPI.json();

  console.log(datos)

  return datos.data;
};
