import React,{useState} from 'react'
import Modal from 'react-modal'

Modal.setAppElement('#root')

export function ModalWindowLocation({isOpen,onRequestClose,onSubmit,onAgregarLocalidad}){
  

    const [localidad,setLocalidad] = useState({
        Nombre:"",
        Precio:0,
        Filas:0,
        Columnas:0
    })

    const handleLocalidadChange = (e) =>{
        const { name, value } = e.target;
    setLocalidad((prevLocalidad) => ({
      ...prevLocalidad,
      [name]: value,
    }));
  
    };

    const handleAgregarLocalidad = ()=>{
        try {
            onAgregarLocalidad(localidad);
            setLocalidad({
            Nombre: "",
            Precio: 0,
            Filas: 0,
            Columnas:0
        });
        alert("Localidad agregada al evento")
        onRequestClose();
        } catch (error) {
            
        }
       
       
        
    }

    return(
        <Modal isOpen={isOpen} onAfterClose={onRequestClose}>
            
            <div>
                <div className="col-md-6 col-sm-12">
                    <div>
                        <h2>Registro de Localidad para Evento</h2>
                        <form>
                        <div className="form-group">
                  <label>Nombre:</label>
                  <input type='text' name='Nombre' className="form-control" placeholder='Nombre localidad' value={localidad.Nombre} onChange={handleLocalidadChange}></input>
                  </div>
                  <div className="form-group">
                  <label>Precio:</label>
                  <input type='text' name='Precio'  className="form-control" placeholder='Precio localidad' value={localidad.Precio} onChange={handleLocalidadChange}></input>
                  </div>
                  <div className="form-group">
                  <label>Filas:</label>
                  <input type='text' name='Filas'  className="form-control" placeholder='Número de filas' value={localidad.Filas} onChange={handleLocalidadChange}></input>
                  </div>
                  <div className="form-group">
                  <label>Columnas</label>
                  <input type='text' name='Columnas'  className="form-control" placeholder='Número de columnas' value={localidad.Columnas} onChange={handleLocalidadChange}></input>
                  </div>
                 
               
                  <br></br>
                 
                 <button type="submit" className="btn btn-secondary" onClick={handleAgregarLocalidad}>Guardar</button>
                  
                 <button type="submit" className="btn btn-danger" onClick={onRequestClose}>Cerrar</button>
                        </form>
                    </div>
                </div>
            </div>
           
        </Modal>
    );
}