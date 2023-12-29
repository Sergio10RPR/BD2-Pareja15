import "./buy.css";
import { useRecordBuyClient } from "../../hooks/recordUserBuyClient";
import { GrUpdate } from "react-icons/gr";
import { NavBar } from "../navbar";

export function UserBuy() {
  const { records, reset } = useRecordBuyClient();
  const updatePage = () => {
    reset();
  }
  let i = 0;
  return (
    <>
    <NavBar></NavBar>
    <div>
      <div className="sidenav hide-top">
        <div className="login-main-text">
          <h1>
            Compras
            <br />
          </h1>
          <p>
            Compras realizadas por los usuarios.
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
                    <td>Total</td>
                    <td>Asientos</td>
                    <td>Compra</td>
                    <td>Fecha</td>
                </tr>
            </thead>
            <tbody>
            {records?.map((h) => {
                  i = i + 1;
                  return (
                  <tr key={i}>
                      <td>{h.Nombre}</td>
                      <td>{h.Total}</td>
                      <td>{h.Asientos}</td>
                      <td>{h.Compra}</td>
                      <td>{h.Fecha}</td>
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
