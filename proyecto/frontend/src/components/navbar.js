import { Link } from "react-router-dom";

export function NavBar(){
  const tipo = localStorage.getItem("TipoUsuario")

  console.log(tipo)
  
    return(
        <div>
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <a href='#top' className="navbar-brand" >Ticket Zone</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a href='/calendarUser'  className="nav-link active" aria-current="page">Home</a>
        </li>
        {tipo !=="Cliente" &&(
           <li className="nav-item">
           <a href='/events' className="nav-link" >Eventos</a>
         </li>
        )}
       
        <li className="nav-item">
          <a href='/events' className="nav-link" >Eventos</a>
        </li>
        <li className="nav-item">
          <a href='/profile' className="nav-link" >Mi Perfil</a>
        </li>
        
        {
          localStorage.getItem("TipoUsuario") === "Cliente" ? 
          <li className="nav-item">
            <a href='/buy' className="nav-link" >Historial Compras</a>
          </li>
          : console.log("")
        }
        {
          localStorage.getItem("TipoUsuario") === "Organizador" ? 
          <li className="nav-item">
            <a href='/userbuy' className="nav-link" >Historial Compras</a>
          </li>
          : console.log("")
        }
        
        <li className="nav-item">
          <a href='/searchevent' className="nav-link" >Buscar eventos</a>
        </li>
        <li className="nav-item">
          <a href='/seat' className="nav-link" >Comprar Butaca</a>
        </li>        
        {
          localStorage.getItem("TipoUsuario") === "Organizador" ? 
          <li className="nav-item">
            <a href='/usersregisters' className="nav-link" >Usuarios Registrados</a>
          </li>
          : console.log("")
        }

        {
          localStorage.getItem("TipoUsuario") === "Organizador" ? 
          <li className="nav-item">
            <a href='/AuditRecord' className="nav-link" >Ver Historial</a>
          </li> 
          : console.log("")
        }
      
      
      </ul>
      
      <ul className="navbar-nav">
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#top" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Opciones
            </a>
            <ul className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
              <li><a className="dropdown-item" href="/login" >Salir</a></li>
           
            </ul>
          </li>
        </ul>
      
    </div>
  </div>
</nav>
        </div>
      
    );
}