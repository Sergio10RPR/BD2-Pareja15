import { useState } from 'react';
import './form.css'
import {Link} from 'react-router-dom' 
import {useNavigate} from 'react-router-dom'
import sha256 from 'js-sha256';

export function Form(){
   const navigate = useNavigate();
   const options = [
      {value:'default', label:'Elegir tipo usuario.......'},
      {value:'1', label:'Cliente'},
      {value:'2',label:'Organizador'}
   ]
   //Datos que voy a enviar al servidor
   //nombre,foto,correo,edad,especialidad,password
   const userData ={
      Nombre: '',
      Foto: '',
      Correo: '',
      Edad: '',
      Especialidad: '',
      Contrasena: ''
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

  //Encriptar contraseña con sha-256
  const encriptarContasena = (password) =>{
   return sha256(password);
  }


  const handleSubmit = async (event) =>{
   event.preventDefault();
   try{
      const passSha256 = encriptarContasena(formData.Contrasena);
      const datosSend = {
         ...formData,
         Contrasena: passSha256
      }
      console.log(datosSend)
      //alert(datosSend)
      //http://usersback.proyecto/User/CrearUsuario
       const response = await fetch('http://localhost:3001/registro-doctor',{ 
           method:'POST',
           headers:{
               'Content-Type':'application/json'
           },
           body: JSON.stringify(datosSend)
       });
       if(response.ok){
           alert("Usuario Registrado Exitosamente")
           event.target.reset();
           navigate('/login')
          
       }else{
           console.log('Hubo un problema al enviar los datos')
       }

       setFormData("");

   }catch(error){
       console.error('Error:',error)
   }
}
 


    return(
         
 <div>
        <div className="sidenav">
         <div className="login-main-text">
            <h1>Clínica Médica<br/></h1>
            <p>Login or register from here to access.</p>
         </div>
         <div className='imagen'>
            <img src='https://cdn.icon-icons.com/icons2/2270/PNG/512/hospital_health_clinic_building_medical_health_icon_140666.png' alt=""></img>
         </div>
      </div>
      <div className="main">
    
         <div className="col-md-6 col-sm-12">
            <div>
                <h2>Formulario de Registro</h2>
               <form onSubmit={handleSubmit}>
                  <div className="form-group">
                  <label>Nombre</label>
                  <input type='text' name='Nombre' className="form-control" placeholder='' value={formData.name} onChange={handleInputChange} data-testid="nombre-input"></input>
                  </div>
                  <div className="form-group">
                  <label>Foto</label>
                  <input type='text' name='Foto'  className="form-control" placeholder='' value={formData.name} onChange={handleInputChange} data-testid="apellido-input"></input>
                  </div>
                  <div className="form-group">
                  <label>Correo</label>
                  <input type='text' name='Correo'  className="form-control" placeholder='' value={formData.name} onChange={handleInputChange} data-testid="correo-input"></input>
                  </div>
                  <div className="form-group">
                  <label>Edad</label>
                  <input type='text' name='Edad'  className="form-control" placeholder='' value={formData.name} onChange={handleInputChange} data-testid="edad-input"></input>
                  </div>
                  <div className="form-group">
                  <label>Especialidad</label>
                  <input type='text' name='Especialidad'  className="form-control" placeholder='' value={formData.name} onChange={handleInputChange} data-testid="fecha-input" ></input>
                  </div>
                  <div className="form-group">
                  <label>Contraseña</label>
                  <input type='password' name='Contrasena'  className="form-control" placeholder='' value={formData.name} onChange={handleInputChange} data-testid="password-input"></input>
                  </div>
                
                  <br></br>
                 
                  <button type="submit" className="btn btn-secondary" data-testid="submit-button">Registrar</button>
                  <Link to='/login' >Login......</Link>
                 
               </form>
            </div>
         </div>
      </div>
       </div>     
       
    );
}