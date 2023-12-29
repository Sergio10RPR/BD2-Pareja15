import { useState, useEffect } from "react";
import { fetchSearchEvent } from "../services/searchEventsService";
export const useEvents = () => {
  const [events, setEvents] = useState([]);
  const reset = () => {
    fetchSearchEvent({ token: localStorage.getItem("token") })
      .then((events) => {
        setEvents(events);
      })
      .catch((e) => {
        console.error(e);
      });
  };
  const filterEvents = ({tipo, clasificacion, fechaInicio, fechaFin, descripcion}) => {
    if(tipo == "default" && clasificacion == "default" && fechaInicio == "" && fechaFin == "" || descripcion == "") {reset(); return;}
    const filtro = events.filter((event)=>{
      let flag = event.tipo == tipo || event.clasificacion == clasificacion || event.inicio >= fechaInicio || event.fin <= fechaFin;
      if(descripcion != ""){
        flag = (event.descripcion.includes(descripcion) || event.nombre.includes(descripcion))
      }
      return flag;
    });

    setEvents(filtro);
  }
  useEffect(() => {
    reset();
  }, []);

  return { events, filterEvents };
};
