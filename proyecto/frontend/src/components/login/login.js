import sha256 from 'js-sha256';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';
export function Login(){ 
   localStorage.removeItem("token")
   localStorage.removeItem("TipoUsuario")
   //Lo que voy a recibir
 

   const navigate = useNavigate();
   const [formData, setFormData] = useState({
      Correo:'',
      Contrasena:''
   })

   const handleInputChange = (event) =>{
      const {name,value} = event.target;
      setFormData({...formData,[name]:value})
   }

   
  //Encriptar contraseña con sha-256
  const encriptarContasena = (password) =>{
   return sha256(password);
  }
  const handleLogin = async (event) => {
   event.preventDefault();
 
   try {
     const passSha256 = encriptarContasena(formData.Contrasena);
     const dataSend = {
       Correo: formData.User,
       Contrasena: formData.Contrasena,
     };
     console.log(passSha256)
 
     const response = await fetch('http://localhost:3001/login', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify(dataSend),
     });
 
     if (response.ok) {
       // Cuando reciba la información
       const data = await response.json();
 
       if (data.success) {
         console.log(data.doctor.correo)
         localStorage.setItem("Correo", data.doctor.correo);
         navigate('/profile');
       } else {
         alert("Contraseña y/o Usuario incorrectos");
         console.log('Error al iniciar sesión');
       }
     } else {
       alert("Contraseña y/o Usuario incorrectos");
       console.log('Error al iniciar sesión');
     }
   } catch (error) {
     console.error('Error..........', error);
   }
 };
   

    return(
      <div>
        <div className="sidenav">
         <div className="login-main-text">
            <h1>F3<br/></h1>
            <p>Login or register from here to access.</p>
         </div>
         <div className='imagen'>
            <img src='https://static.vecteezy.com/system/resources/thumbnails/002/212/836/small/line-icon-for-tickets-vector.jpg' alt=""></img>
         </div>
      </div>
      
      <div className="main">
         <div className="col-md-6 col-sm-12">
            <div className="login-form">
               <form>
                  <div className="form-group">
                     <label>User Name</label>
                     <input type="text" name='User' className="form-control" placeholder="User Name" onChange={handleInputChange}/>
                  </div>
                  <div className="form-group">
                     <label>Password</label>
                     <input type="password" name='Contrasena' className="form-control" placeholder="Password" onChange={handleInputChange}/>
                  </div>
                  <br></br>
                  <button type="submit" className="btn btn-black" onClick={handleLogin}>Ingresar</button>
                  <Link to='/form' >Registrar......</Link>
               </form>
            </div>
         </div>
      </div>
       </div>
    );
}

