import "./style.css";
import { NavBar } from "../navbar";
import { useUsersRegisters } from "../../hooks/user_register_hook";
import { block_unblock } from "../../services/block_unblock";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";

export function UsersRegisters() {
  const { users, reset } = useUsersRegisters();
  const blockUnblock = (status, correo, usuario) => {
    block_unblock({token: localStorage.getItem("token"),status, Correo: correo, Usuario: usuario});
    reset();
  }
  return (
    <>
      <NavBar></NavBar>
      <div>
        <div className="sidenav hide-top">
          <div className="login-main-text">
            <h1>
              Usuarios Registrados
              <br />
            </h1>
            <p>Lista de usuarios registrados.</p>
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
                <td>Correo</td>
                <td>Usuario</td>
                <td>Habilitar/Deshabilitar</td>
              </tr>
            </thead>
            <tbody>
              {users?.map((user) => {
                return (
                  <tr key={user.usuario}>
                    <td>{user.correo}</td>
                    <td>{user.usuario}</td>
                    <td><button onClick={ () => {blockUnblock(user.estado, user.correo, user.usuario)}}>{user.estado === "1" ? <BsFillEyeFill/> : <BsFillEyeSlashFill/>}</button></td>
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
