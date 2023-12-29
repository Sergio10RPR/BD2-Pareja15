import React from "react";
import Modal from "react-modal";
import { useEffect, useState } from "react";
export function ModalWindowEE({ isOpen, onClose, evento , onSubmit}) {


    const token = localStorage.getItem('token');
  
    const [data,setData] = useState([]);
   
    //const idUsuario = localStorage.getItem('idUser')
    const EstilosModal = {
        content: {
            width: "700px",
            height:"650px",
            margin: "auto", 
            backgroundColor: "rgba(224, 242, 241, 0.9)", 
            border: "1px solid #B2DFDB", 
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
          },
    };
     
    function formatDateTo(dateString) {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }
 
    //const title = evento ? evento.title : "";
    const titleParts = evento && evento.title ? evento.title.split("-") : [];
    const eventId = titleParts.length > 0 ? parseInt(titleParts[0], 10) : null;
    

    useEffect(()=>{
      localStorage.removeItem("Nombre")
      localStorage.removeItem("Inicio")
      localStorage.removeItem("Fin")
      localStorage.removeItem("Lugar")
      localStorage.removeItem("Descripcion")
      localStorage.removeItem("Clasificacion")
      localStorage.removeItem("Imagen")
      localStorage.removeItem("Tipo")
      localStorage.removeItem("Estado")
     
        if(eventId !== null) {
          getEvento();
        } 
        
      },[eventId]);
  
      const getEvento = async ()=>{
          try{
              const response = await fetch(`http://eventoback.proyecto/Evento/Ver`,{
              method:'POST',
              headers:{
                'Authorization':`${token}`,
                'Content-Type':'application/json'
          }, body: JSON.stringify( { 
            "idEvento":eventId
          })
        })
              const dataJson = await response.json()
              setData(dataJson.data)
              console.log(data[0].Nombre)
              //console.log(data[0].Descripcion)
  
          }catch(error){
            console.log(error)
          }
      }
      
      let userData = {};

      if (data.length > 0) {
        console.log("Localidades",data[0].Localidades)
      
        userData = {
          Nombre: data[0].nombre || "Valor Predeterminado",
          Inicio: data[0].inicio || "Valor Predeterminado",
          Fin: data[0].fin || "Valor Predeterminado",
          Lugar: data[0].lugar || "Valor Predeterminado",
          Descripcion: data[0].descripcion || "Valor Predeterminado",
          Clasificacion: data[0].clasificacion || "Valor Predeterminado",
          Imagen: data[0].imagen || "Valor Predeterminado",
          Tipo: data[0].tipo || "Valor Predeterminado",
          Estado: data[0].estado || "Valor Predeterminado",
         

        };
        localStorage.setItem("Nombre",data[0].nombre)
        localStorage.setItem("Inicio",data[0].inicio)
        localStorage.setItem("Fin",data[0].fin)
        localStorage.setItem("Lugar",data[0].lugar)
        localStorage.setItem("Descripcion",data[0].descripcion)
        localStorage.setItem("Clasificacion",data[0].clasificacion)
        localStorage.setItem("Imagen",data[0].imagen)
        localStorage.setItem("Tipo",data[0].tipo)
        localStorage.setItem("Estado",data[0].estado)
       

      } else {
       
        userData = {
       
          Nombre: "Valor Predeterminado",
          Inicio: "Valor Predeterminado",
          Fin: "Valor Predeterminado",
          Lugar: "Valor Predeterminado",
          Descripcion: "Valor Predeterminado",
          Clasificacion: "Valor Predeterminado",
          Imagen: "Valor Predeterminado",
          Tipo: "Valor Predeterminado",
          Estado: "Valor Predeterminado",
        
         
        };
      }
    const [formData, setFormData] = useState(userData
        );
        
        const handleInputChange = (event) =>{
           const {name,value} = event.target;
           setFormData({
               ...formData,
               [name]:value
           });
           
       };
    const handleSubmit = async (event) =>{
       
        event.preventDefault();
        const formDataToSend = {
          titulo: formData.Nombre === 'Valor Predeterminado' ? localStorage.getItem('Nombre') : formData.Nombre,
          inicio: formData.Inicio === 'Valor Predeterminado' ? formatDateTo(localStorage.getItem('Inicio')) :  formatDateTo(formData.Inicio),
          fin: formData.Fin === 'Valor Predeterminado' ? formatDateTo(localStorage.getItem('Fin')) : formatDateTo(formData.Fin),
          lugar: formData.Lugar === 'Valor Predeterminado' ? localStorage.getItem('Lugar') : formData.Lugar,
          descripcion: formData.Descripcion === 'Valor Predeterminado' ? localStorage.getItem('Descripcion') : formData.Descripcion,
          clasificacion: formData.Clasificacion === 'Valor Predeterminado' ? localStorage.getItem('Clasificacion') : formData.Clasificacion,
          imagen: formData.Imagen === 'Valor Predeterminado' ? localStorage.getItem('Imagen') : formData.Imagen,
          tipo: formData.Tipo === 'Valor Predeterminado' ? localStorage.getItem('Tipo') : formData.Tipo,
          idEvento: eventId, 
        };
        console.log(formDataToSend)
        console.log(token)
        alert(formDataToSend)
        try{
            const response = await fetch('http://eventoback.proyecto/Event/Mod',{
                method:'POST',
                headers:{
                  'Authorization':`${token}`,
                  'Content-Type':'application/json'
                },
                body: JSON.stringify(formDataToSend)
                
            });
            console.log(formData)
            if(response.ok){
                alert("Evento editado con éxito editado exitosamente")
                setFormData( userData)
               
            }else{
                console.log('Hubo un problema al enviar los datos',)
            }
     
        }catch(error){
            console.error('Error:',error)
        }
     }
    

     const eliminarEvento = async (eventId) => {
        try {
          alert(eventId)
          const response = await fetch('http://eventoback.proyecto/Event/Del', {
            method: "POST",
            headers:{
              'Authorization':`${token}`,
              'Content-Type':'application/json'
            } ,
            body: JSON.stringify( { 
              "idEvento":eventId
            })
          });
          if (response.ok) {
            alert("Evento eliminado exitosamente");
          
          } else {
            console.log("Error al eliminar el evento");
          }
        } catch (error) {
          console.error("Error:", error);
        }
      };
      
     

 const formatDateForInput = (dateString) => {
    const date = new Date(dateString);
    const year = date.getUTCFullYear();
    const month = `0${date.getUTCMonth() + 1}`.slice(-2);
    const day = `0${date.getUTCDate()}`.slice(-2);
    const hours = `0${date.getUTCHours()}`.slice(-2);
    const minutes = `0${date.getUTCMinutes()}`.slice(-2);
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

    
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Detalles del Evento"
      style={EstilosModal}
    >

        

{evento && ( 
    
        <div>
        <form onSubmit={handleSubmit}>
        <h4>{evento.title}</h4>
        <label htmlFor="Nombre">Nombre:</label>
<input type='text'  id="Nombre" name='Nombre' className="form-control" defaultValue={localStorage.getItem("Nombre") || ""} onChange={handleInputChange} data-testid="nombre-input"></input>

<label htmlFor="Inicio">Inicio:</label>
<input type="datetime-local" id="Inicio" name='Inicio' className="form-control" defaultValue={formatDateForInput(localStorage.getItem("Inicio")) || ""} onChange={handleInputChange} data-testid="inicio-input"></input>

<label htmlFor="Fin">Fin:</label>
<input type="datetime-local" id="Fin" name='Fin' className="form-control" defaultValue={formatDateForInput(localStorage.getItem("Fin")) || ""} onChange={handleInputChange} data-testid="fin-input"></input>

<label htmlFor="Lugar">Lugar:</label>
<input type='text' id="Lugar" name='Lugar' className="form-control" defaultValue={localStorage.getItem("Lugar") || ""} onChange={handleInputChange} data-testid="lugar-input"></input>

<label htmlFor="Descripcion">Descripción:</label>
<input type="text" id="Descripcion" name='Descripcion' className="form-control" defaultValue={localStorage.getItem("Descripcion") || ""} onChange={handleInputChange} data-testid="descripcion-input"></input>

<label htmlFor="Clasificacion">Clasificación:</label>
<input type='text' id="Clasificacion" name='Clasificacion' className="form-control" defaultValue={localStorage.getItem("Clasificacion") || ""} onChange={handleInputChange} data-testid="clasificacion-input"></input>

<label htmlFor="Imagen">Imagen:</label>
<input type="text" id="Imagen" name='Imagen' className="form-control" defaultValue={localStorage.getItem("Imagen") || ""} onChange={handleInputChange} data-testid="imagen-input"></input>

<label htmlFor="Tipo">Tipo:</label>
<input type='text' id="Tipo" name='Tipo' className="form-control" defaultValue={localStorage.getItem("Tipo") || ""} onChange={handleInputChange}></input>

          <br></br>
          <br></br>
          <button type="submit"  className="btn btn-light" data-testid="guardar-button">Guardar</button>
          <button onClick={onClose} className="btn btn-warning" data-testid="cerrar-button">Cerrar</button>
          <button className="btn btn-danger" onClick={() => eliminarEvento(eventId)} data-testid="eliminar-button">Eliminar</button>
        </form>
        <br></br>

        <form>
  <div>
    {data && data.length > 0 && data[0].Localidades && data[0].Localidades.length > 0 ? (
      data[0].Localidades.map((localidad, index) => (
        <div key={index}>
          <h2>{localidad.Nombre}</h2>
          <ul>
            {localidad.Asientos.map((asiento, subIndex) => (
              <li key={subIndex}>
                Nombre del Asiento: {asiento.nombre}, Estado: {asiento.estado}
              </li>
            ))}
          </ul>
        </div>
      ))
    ) : (
      <p>No hay datos de localidades disponibles.</p>
    )}
  </div>
</form>




          
         
        </div>
      )}
     
    </Modal>
  );
}

