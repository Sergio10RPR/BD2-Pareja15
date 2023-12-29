import { NavBar } from "../navbar";
import {useState} from 'react'
import {ModalWindowLocation} from '../modalWindow/modalLocalidad';
import './event.css'

export function Event(){ 
	const token = localStorage.getItem('token');
   
	const clasificacionEvento = [
		{value:'default', label:'Clasificación evento.......'},
		{value:'+13', label:'+13'},
		{value:'+15', label:'+15'},
		{value:'+18', label:'+18'},
		{value:'todoPúblico', label:'Público'}
		
	 ]

	 const tiposEvento = [
		{value:'default', label:'Tipo evento.......'},
		{value:'Deportivo',label:'Deportivo'},
		{value:'Concierto',label:'Concierto'},
		{value:'Conferencia',label:'Conferencia'},
		{value:'Teatro',label:'Teatro'},
		
		
	 ]

	 const eventData = {
		Nombre:'',
		Fecha:'',
		Inicio:'',
		Fin:'',
		Lugar:'',
		Descripcion:'',
		Clasificacion:'',
		Imagen:'',
		Tipo:'',
		Estado:'1',
		Token:token,
		Localidades:[]
	 }
     
     
	 /**Ventana emergente */
	 const [isModalOpen, setIsModalOpen] = useState(false);
	 const openModel = () =>{
		 setIsModalOpen(true)
	 }

 
	 const closeModal = () => {
		 setIsModalOpen(false);
	 };
 
	/* const handleModalSubmit = inputValue => {
		 console.log('Valor ingresado:', inputValue);
		 closeModal();
	   };*/

	 const [formData, setFormData] = useState(eventData
		);
		
		const handleInputChange = (event) =>{
			const { name, value } = event.target;
			setFormData((prevEvento) => ({
			  ...prevEvento,
			  [name]: value,
			}));
		   
	   };

	   const handleAgregarLocalidad = (localidad) =>{
		setFormData((prevEvento)=>({
			...prevEvento,
			Localidades:[...prevEvento.Localidades,localidad]
		}))
	   }

	   const handleSubmit = async (event) =>{
		console.log("Datos a enviar",formData)
	
		event.preventDefault(); 
		if(formData.Nombre === '' || formData.Inicio === '' || formData.Fin === ''
		|| formData.Lugar === '' || formData.Descripcion === '' || formData.Clasificacion === ''
		|| formData.Imagen === '' || formData.Tipo === ''){
			alert('Faltan llenar campos')
			return
		}
		//Server en python http://localhost:5001/Evento
		//Server en nodeJS http://localhost:3002/guardarEvento
		try{
			const response = await fetch('http://34.125.226.188:5000/Event/Crear',{
				method:'POST',
				headers:{
					'Authorization':`${token}`,
					'Content-Type':'application/json'
				},
				body: JSON.stringify(formData )
			});
			if(response.ok){
				alert("Evento registrado exitosamente")
				setFormData( eventData)
				event.target.reset();
			   
			}else{
				console.log('Hubo un problema al enviar los datos')
			}
	 
		}catch(error){
			console.error('Error:',error)
		}
	 }

    return (
		

        <div>
			<NavBar></NavBar>
			<br></br>
			<form onSubmit={handleSubmit}>
				 
            <div className="container-contact">
	<div className="row">
		<div className="col-md-3">
			<div className="contact-info">
			<img src="https://cdn-icons-png.flaticon.com/512/3483/3483797.png" alt="" width="100" height="100" />
				<h2 style={{color:'white'}}>Registro de eventos</h2>
				<h4>Registrar eventos y localidades....</h4>
			</div>
		</div>
			
		<div className="col-md-9">
        
		<div className="contact-form">
			<div className="form-group">
			  <label className="control-label col-sm-2" htmlFor="Nombre">Nombre:</label>
			  <div className="col-sm-10">          
				<input type="text" className="form-control" id="Nombre" placeholder="Ingresar nombre evento" name="Nombre" value={eventData.name} onChange={handleInputChange} data-testid="nombre-input"/>
			  </div>
			</div>
			<div className="form-group">
			  <label className="control-label col-sm-2" htmlFor="Fecha">Fecha:</label>
			  <div className="col-sm-10">          
				<input type="text" className="form-control" id="Fecha" placeholder="Ingresar fecha" name="Fecha"/>
			  </div>
			</div>
			<div className="form-group">
			  <label className="control-label col-sm-2" htmlFor="Inicio">Hora Inicio:</label>
			  <div className="col-sm-10">
				<input type="datetime-local" className="form-control" id="Inicio" placeholder="Ingresar hora inicio" name="Inicio" value={eventData.name} onChange={handleInputChange} data-testid="inicio-input"/>
			  </div>
			  <div className="form-group">
			  <label className="control-label col-sm-2" htmlFor="Fin">Hora Fin:</label>
			  <div className="col-sm-10">
				<input type="datetime-local" className="form-control" id="Fin" placeholder="Ingresar hora fin" name="Fin" value={eventData.name} onChange={handleInputChange} data-testid="fin-input"/>
			  </div>
			  </div>
			  <div className="form-group">
			  <label className="control-label col-sm-2" htmlFor="Lugar">Lugar:</label>
			  <div className="col-sm-10">
				<input type="text" className="form-control" id="Lugar" placeholder="Ingresar lugar" name="Lugar" value={eventData.name} onChange={handleInputChange} data-testid="lugar-input"/>
			  </div>
			  </div>
			  <div className="form-group">
			  <label className="control-label col-sm-2" htmlFor="Descripcion">Descripcion:</label>
			  <div className="col-sm-10">
				<textarea className="form-control" rows="5" id="Descripcion" name="Descripcion" value={eventData.name} onChange={handleInputChange} data-testid="descripcion-input"></textarea>
			  </div>
			</div>
			  <div className="form-group">
			  <label className="control-label col-sm-2" htmlFor="Clasificacion">Clasificación:</label>
			  <div className="col-sm-10">
			  <select name='Clasificacion' className="form-control" value={eventData.name} onChange={handleInputChange} data-testid="clasificacion-input">
				 {clasificacionEvento.map((option) => (
				 <option key={option.value} value={option.value}>
				 {option.label}
				 </option>
				 ))}
			  </select>
			  </div>
			  </div>
			  <div className="form-group">
			  <label className="control-label col-sm-2" htmlFor="Imagen">Imagen:</label>
			  <div className="col-sm-10">
				<input type="text" className="form-control" id="Imagen" placeholder="Ingresar url imagen" name="Imagen" value={eventData.name} onChange={handleInputChange} data-testid="imagen-input" />
			  </div>
			  </div>
			  <div className="form-group">
			  <label className="control-label col-sm-2" htmlFor="Tipo">Tipo:</label>
			  <div className="col-sm-10">

			  <select name='Tipo' className="form-control" value={eventData.name} onChange={handleInputChange}>
				 {tiposEvento.map((option) => (
				 <option key={option.value} value={option.value}>
				 {option.label}
				 </option>
				 ))}
			  </select>
			  </div>
			  </div>
		   
			</div>
			<br></br>
			<div className="form-group">        
			  <div className="col-sm-offset-2 col-sm-10">
			  <button type="submit" className="btn btn-secondary" data-testid="guardar-button">Guardar</button>
			  <button type="button" className="btn btn-primary" onClick={openModel}>Localidad</button>
			  <ModalWindowLocation isOpen={isModalOpen} onRequestClose={closeModal} onAgregarLocalidad={handleAgregarLocalidad}></ModalWindowLocation> 
			  </div>
			</div>
			
		</div>
	</div>
	
		
	</div>
</div>


			</form>
         

        </div>
    );
}

