import "./style.css";
import { NavBar } from "../navbar";
import { useViewEvent } from "../../hooks/viewEventsHook";
import { FcCancel } from "react-icons/fc";

export function UsersRegisters() {
  const { viewEvent, reset } = useViewEvent();
  const updatePage = () => {
    reset();
  }
  return (
    <>
      <NavBar></NavBar>
      <div>
        <div className="sidenav hide-top">
          <div className="login-main-text">
            <h1>
              Lista Eventos
              <br />
            </h1>
            <p>Lista de eventos registrados.</p>
          </div>
          <div className="imagen">
            <img
              src="https://static.vecteezy.com/system/resources/thumbnails/002/212/836/small/line-icon-for-tickets-vector.jpg"
              alt=""
            ></img>
          </div>
        </div>
        <div className="main">
          <table className="table">
            <thead>
              <tr>
                <td>Titulo</td>
                <td>Fecha de inicio</td>
                <td>Fecha de finalizacion</td>
                <td>Descripci&oacute;n</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {viewEvent?.map((vEvent) => {
                return (
                  <tr key={vEvent.idEvento}>
                    <td>{vEvent.idEvento+'-'+vEvent.nombre}</td>
                    <td>{vEvent.inicio}</td>
                    <td>{vEvent.fin}</td>
                    <td>{vEvent.descripcion}</td>
                    <td><button onClick={ () => {updatePage()}}><FcCancel/></button></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
