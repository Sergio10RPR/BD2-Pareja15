import "./buy.css";
import { useAudithRecord } from "../../hooks/auditHook";
import { NavBar } from "../navbar";
import { GrUpdate } from "react-icons/gr";

export function AuditRecord() {

  const { history, reset } = useAudithRecord();
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
                Historial
                <br />
            </h1>
            <p>
                Tabla donde se muestra el historial general.
            </p>
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
                        <td>Nombre</td>
                        <td>Localidad</td>
                        <td>Asientos</td>
                        <td>Compra</td>
                        <td>Fecha</td>
                        <td>User</td>
                    </tr>
                </thead>
                <tbody>
                {history?.map((h) => {
                    return (
                    <tr key={h.User}>
                        <td>{h.Nombre}</td>
                        <td>{h.Localidad}</td>
                        <td>{h.Asientos}</td>
                        <td>{h.Compra}</td>
                        <td>{h.Fecha}</td>
                        <td>{h.User}</td>
                    </tr>
                    );
                })}
                </tbody>
            </table>

            <div className="row btn-update">
                <button onClick={ () => {updatePage()}}><GrUpdate></GrUpdate></button>
            </div>
        </div>
        </div>
    </>
  );
}
