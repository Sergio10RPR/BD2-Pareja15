/**
 * Asientos disponibles
 */

import { NavBar } from "../navbar";
import "./seatpage.css"
import { SeatPicker } from "./seatpicker"
import { useSeatHook } from "../../hooks/useSeatHook"
import { useEventEnable } from "../../hooks/eventEnableHook"
import { useEffect, useState } from "react";

export function SeatPage() {

  const { seats, reset } = useSeatHook();
  const { events, resetEvent } = useEventEnable();
  const [selectedValue, setSelectedValue] = useState('');

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleButtonClick = () => {
    reset(selectedValue);
    
  };
  console.log(seats)
  return (
    <>
      <NavBar></NavBar>
      <div>
        <div className="sidenav hide-top">
          <div className="login-main-text">
            <h1>
              Butacas
              <br />
            </h1>
            <p>
              Bustacas para el evento.
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
          <div className="row">
            <select id="evento" onChange={handleSelectChange} className="form-control" value={selectedValue}>
                {events?.map((option) => (
                    <option key={option.idEvento} value={option.idEvento}>
                        {option.nombre}
                    </option>
                ))}
            </select>
            <button onClick={handleButtonClick}>Ver butacas</button>
          </div>
          <SeatPicker seats={seats} />
        </div>
      </div>
    </>
  );
}