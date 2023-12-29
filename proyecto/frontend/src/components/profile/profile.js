import {NavBar} from '../navbar'
import {useEffect,useState} from 'react';
import {ModalWindow} from '../modalWindow/modal'
import { ModalWindowContrasena } from '../modalWindow/confirmarContra';
import './profile.css'
export function Profile(){
    
    const Correo = localStorage.getItem('Correo');
    
    const [data,setData] = useState([]);
        useEffect(()=>{
          
          getData();
        },[]);

      
        
      
/**Ventana emergente */
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModel = () =>{
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleModalSubmit = inputValue => {
        console.log('Valor ingresado:', inputValue);
        closeModal();
      };
/**Ventana emergente2 */
const [isModalOpen2, setIsModalOpen2] = useState(false);
const openModel2 = () =>{
    setIsModalOpen2(true)
}

const closeModal2 = () => {
    setIsModalOpen2(false);
};

const handleModalSubmit2 = inputValue => {
    console.log('Valor ingresado:', inputValue);
    closeModal2();
  };
/**Obtener Datos */

//Recibo los datos del usuario
    const getData = async ()=>{
     

        try {
            //const Correo = localStorage.getItem("Correo");
            //`http://localhost:3001/obtenerDoctor/${Correo}`
            //'http://localhost:3001/obtenerDoctor/'
            const response = await fetch(`http://localhost:3001/obtenerDoctor/${Correo}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json'
              }
            });
        
            if (response.ok) {
           
              const dataJson = await response.json();
              console.log(dataJson)
              setData(dataJson);

            } else {
              alert("Error al obtener datos del usuario");
            }
          } catch (error) {
            console.log('Error', error);
          }
    }


    
    return(
        <div>
             <NavBar></NavBar>
            <br></br>
             <div className='container-profile'>
                <div className='row'>
                    <div className='col-12'>
                        <div className='card-body'>
                            <div className='card-title-mb-4'>
                            <div className="d-flex justify-content-start">
                                <div className="image-container">
                                    <img src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png" id="imgProfile" style={{width:'150px', height:'150px'}} className="img-thumbnail" alt=''/>
                                 
                                </div>
                              
                                <div className="ml-auto">
                                    <input type="button" className="btn btn-primary d-none" id="btnDiscard" value="Discard Changes" />
                                </div>
                            </div>
                            </div>
                            <br></br>
                        <div className="row">
                    
      
        <div className="col-12" >
        <ul className="nav nav-tabs mb-4" id="myTab" role="tablist">
            <li className="nav-item">
                <a className="nav-link active" id="basicInfo-tab" data-toggle="tab" href="#basicInfo" role="tab" aria-controls="basicInfo" aria-selected="true">Basic Info</a>
            </li>
           
        </ul>
        <div className="tab-content ml-1" id="myTabContent">
            <div className="tab-pane fade show active" id="basicInfo" role="tabpanel" aria-labelledby="basicInfo-tab">
                

                <div className="row">
                    <div className="col-sm-3 col-md-2 col-5">
                        <label >Usuario:</label>
                    </div>
                    <div className="col-md-8 col-6">
                    {data.doctor?.nombre || "Cargando datos..."}
                    </div>
                </div>
                <hr />

                <div className="row">
                    <div className="col-sm-3 col-md-2 col-5">
                        <label>Especialidad:</label>
                    </div>
                    <div className="col-md-8 col-6">
                    {data.doctor?.especialidad || "Cargando datos..."}
                    </div>
                </div>
                <hr />
                
                
                <div className="row">
                    <div className="col-sm-3 col-md-2 col-5">
                        <label>Correo Electrónico:</label>
                    </div>
                    <div className="col-md-8 col-6">
                    {Correo}
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-sm-3 col-md-2 col-5">
                        <label>Edad:</label>
                    </div>
                    <div className="col-md-8 col-6">
                    {data.doctor?.edad || "Cargando datos..."}
                    </div>
                </div>
                <hr />

            </div>
            <button type="button" onClick={openModel} className="btn btn-outline-secondary">Edita perfil</button>
            <ModalWindow isOpen={isModalOpen} onRequestClose={closeModal} onSubmit={handleModalSubmit}></ModalWindow> 
            <button type="button" className="btn btn-outline-danger" onClick={openModel2}>Darse de baja</button>
            <ModalWindowContrasena isOpen={isModalOpen2} onRequestClose={closeModal2} onSubmit={handleModalSubmit2}></ModalWindowContrasena> 
        </div>
    </div>
      
                            
                        </div>
                        </div>
                    </div>

                </div>
             </div>
        </div>
       

        
    );
}