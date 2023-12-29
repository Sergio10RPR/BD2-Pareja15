import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { NavBar } from "../navbar";
import { ModalWindowEE } from "../modalWindow/modalEE";

require("moment/locale/es.js");

export function CalendarUser() {
  const tipo = localStorage.getItem("TipoUsuario");
  const token = localStorage.getItem('token');
  const localizer = momentLocalizer(moment);
  const [eventos,setEventos] = useState([]);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [eventoSeleccionado, setEventoSeleccionado] = useState(null);
  //const idUsuario = localStorage.getItem('idUser')

   
 console.log("tipo",tipo)
 
  useEffect(()=>{

    //Obtener los eventos

    const getData = async ()=>{ 
      try {
        
        let apiConsulta = '';
        let methodCon = ''

        if (tipo === 'Cliente') {
          apiConsulta = 'http://clienteback.proyecto/Cliente/Calendario';
          methodCon = 'POST'
        } else if (tipo === 'Organizador') {
          apiConsulta = 'http://organizadorback.proyecto/Organizador/Calendario';
          methodCon = 'GET'
        }

        const jsonData = {
          json: 'json'
        };

       if(methodCon=='GET'){
        const dataAPI = await fetch(apiConsulta,{
          method:'GET',
          headers:{
              'Authorization':`${token}`,
              'Content-Type':'application/json'
          },
         
         // body: JSON.stringify(jsonData)

        });
        const datos = await dataAPI.json();
        console.log("Datos recibidos",datos);

        const formatData = datos.data.map(e =>({
          title: e.idEvento+'-'+e.nombre,
          start: new Date(e.inicio),
          end: new Date(e.fin),
          description:e.descripcion
        }));
        setEventos(formatData);
       }

       if(methodCon==='POST'){
        const dataAPI = await fetch(apiConsulta,{
          method:'POST',
          headers:{
              'Authorization':`${token}`,
              'Content-Type':'application/json'
          },
         
          body: JSON.stringify(jsonData)

        });
        const datos = await dataAPI.json();
        console.log("Datos recibidos",datos);

        const formatData = datos.data.map(e =>({
          title: e.idEvento+'-'+e.nombre,
          start: new Date(e.inicio),
          end: new Date(e.fin),
          description:e.descripcion
        }));
        setEventos(formatData);
       }

        
        
        
      } catch (error) {
        console.log(error)
      }
    }
    getData();
  },[])

  const handleEventoDoubleClick = (e) =>{
    setEventoSeleccionado(e);
    setModalIsOpen(true);
  }


  return(
<div>
        <NavBar></NavBar>
    <div style={{ height: `${400}px` ,opacity: (modalIsOpen) ? 0.2 : 1 } } className="bigCalendar-container">
        <h1>Calendario</h1>
      <Calendar
        localizer={localizer}
        events={eventos}
        startAccessor="start"
        endAccessor="end"
        onDoubleClickEvent={handleEventoDoubleClick}
      />
    </div>

    <ModalWindowEE isOpen={modalIsOpen} onClose={()=>setModalIsOpen(false)} evento={eventoSeleccionado}></ModalWindowEE>
    
    <br></br><br></br><br></br><br></br>
  
    </div>
   
  );
     
}
