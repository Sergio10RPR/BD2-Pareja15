import React,{useState} from "react";
import Modal from 'react-modal';
import {ModalWindowContrasena} from '../modalWindow/confirmarContra';
import sha256 from 'js-sha256';
Modal.setAppElement('#root')

//Este modal se abre cuando el usuario quiere editar su información
export function ModalWindow({isOpen,onRequestClose,onSubmit}){
  
  
 
      
    
   
     const Nombres = localStorage.getItem("Nombres");
     const Apellidos = localStorage.getItem("Apellidos")
     const Correo = localStorage.getItem("Correo")
     const Edad = localStorage.getItem("Edad")
     const Nacimiento = localStorage.getItem("Nacimiento")
     const User = localStorage.getItem("User")
     const Tipo = localStorage.getItem("Tipo")

     


     const userData ={
        Nombres: Nombres,
        Apellidos: Apellidos,
        Correo: Correo,
        Edad: Edad,
        Nacimiento: Nacimiento,
        User: User,
        Tipo:Tipo,
        Contrasena:''
     }
     
     //Encriptar contraseña con sha-256
  const encriptarContasena = (password) =>{
    return sha256(password);
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
  

    const token = localStorage.getItem('token');

    const confirmarContrasena = async () =>{
      
        try{
          const passSha256 = encriptarContasena(formData.Contrasena);
          const response = await fetch('http://usersback.proyecto/User/ConfirmarContra',{
            method:'POST',
                    headers:{
                      'Authorization':`${token}`,
                      'Content-Type':'application/json'
                    },
                    body:JSON.stringify({
                      "Contrasena":passSha256
                    })
    
          })
          if(response.ok){
            //Mandar a llamar a la api que da de baja al usuario
           
            editarUser()
          }else{
            alert("Contraseña Incorrecta")
          }
        }catch(error){
          console.error(error)
          return
        }
      }
      
      const editarUser = async () =>{
        
       
         try{
            
               formData.Contrasena = encriptarContasena(formData.Contrasena)
               console.log(localStorage.getItem("Nombres"))
               console.log("Datos a enviar: ",formData)
           
             const response = await fetch('http://usersback.proyecto/User/Mod',{
                 method:'POST',
                 headers:{
                     'Authorization':`${token}`,
                     'Content-Type':'application/json'
                 },
                 body: JSON.stringify(formData)
             });
             if(response.ok){
                 alert("Usuario editado exitosamente")
                 
                
             }else{
                 console.log('Hubo un problema al enviar los datos')
             }
      
         }catch(error){
             console.error('Error:',error)
         }
    
      
    }



    const handleSubmit = async (event) =>{
        event.preventDefault();
        
           if(formData.Contrasena === '' || formData.Contrasena === undefined){
            alert("Falta ingresar contraseña")
            return
           }
            confirmarContrasena();
        
     }

    return(
        <Modal isOpen={isOpen} onAfterClose={onRequestClose}>
            
            <div>
                <div className="col-md-6 col-sm-12">
                    <div>
                        <h2>Formulario de Registro</h2>
                        <form onSubmit={handleSubmit}>
                        <div className="form-group">
                  <label >Nombre</label>
                  <input type='text' name='Nombres' className="form-control" defaultValue={Nombres} onChange={handleInputChange}></input>
                  </div>
                  <div className="form-group">
                  <label>Apellido</label>
                  <input type='text' name='Apellidos'  className="form-control" defaultValue={Apellidos} onChange={handleInputChange}></input>
                  </div>
                  <div className="form-group">
                  <label>Correo Electrónico</label>
                  <input type='text' name='Correo'  className="form-control" defaultValue={Correo} onChange={handleInputChange}></input>
                  </div>
                  <div className="form-group">
                  <label>Edad</label>
                  <input type='text' name='Edad'  className="form-control" defaultValue={Edad} onChange={handleInputChange}></input>
                  </div>
                  <div className="form-group">
                  <label><strong>Fecha de Nacimiento:</strong> yyyy-mm-dd</label>

                  <input type='text' name='Nacimiento'  className="form-control" defaultValue={Nacimiento} onChange={handleInputChange}></input>
                  </div>
                  <div className="form-group">
                  <label>Nombre Usuario</label>
                  <input type='text' name='User'  className="form-control" defaultValue={User} onChange={handleInputChange}></input>
                  </div>
                  <div className="form-group">
                  <label>Tipo Usuario</label>
                  <input type='text' name='Tipo'  className="form-control" defaultValue={Tipo} onChange={handleInputChange}></input>

                  </div>
                  <br></br>
                  <label style={{ color: 'red', fontStyle: 'italic', fontSize: 'smaller' }}>Confirmar contrasena antes de realizar el proceso</label>
                  <div className="form-group">
                  
                  <input type='password' name='Contrasena'  className="form-control"  onChange={handleInputChange}></input>
                  </div>
                  <br></br>

                 
                 <button type="submit" className="btn btn-secondary">Guardar</button>
               
                 
                 <button type="submit" className="btn btn-danger" onClick={onRequestClose}>Cerrar</button>
               
                
                        </form>
                    </div>
                </div>
            </div>
           
        </Modal>
    )
}