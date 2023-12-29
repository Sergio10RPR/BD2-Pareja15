/**
 * Busqueda de evento
 * Tipo,Fecha,Precio,Disponibilidad
 */

import { NavBar } from "../navbar";
import "./searchevent.css"
import { useEvents } from "../../hooks/useEvents"
import { useRef } from "react"

export function SearchEvent(){
    const clasificacionEvento = [
		{value:'default', label:'Clasificación evento.......'},
		{value:'+13', label:'+13'},
		{value:'+15', label:'+15'},
		{value:'+18', label:'+18'},
		{value:'todoPúblico', label:'Público'}		
	 ]

	 const tiposEvento = [
		{value:'default', label:'Tipo evento.......'},
		{value:'Deportivo',label:'Deportivo'},
		{value:'Concierto',label:'Concierto'},
		{value:'Conferencia',label:'Conferencia'},
		{value:'Teatro',label:'Teatro'},
	 ]
    const {events, filterEvents} = useEvents();
    const tipoRef = useRef(null);
    const clasificacionRef = useRef(null);
    const fechaInicioRef = useRef(null);
    const fechaFinRef = useRef(null);
    const descripcionRef = useRef(null);
    const handleOnClick = (e) => {
        e.preventDefault();
        const tipo = tipoRef.current.value;
        const clasificacion = clasificacionRef.current.value;
        const fechaInicio = fechaInicioRef.current.value;
        const fechaFin = fechaFinRef.current.value;
        const descripcion = descripcionRef.current.value;

        filterEvents({tipo, clasificacion, fechaInicio, fechaFin, descripcion});
    }
    return (
    <>
        <NavBar></NavBar>
        <form onSubmit={handleOnClick}>
            <div className="row">
                <div className="col-xs-12 col-sm-6">
                    <select id="idtipo" className="form-control" ref={tipoRef}>
                        {tiposEvento.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="col-xs-12 col-sm-3">
                    <input id="datestart" type="date" className="form-control" ref={fechaInicioRef}/>
                </div>
                <div className="col-xs-12 col-sm-3">
                    <input id="dateend" type="date" className="form-control" ref={fechaFinRef}/>
                </div>
            </div>
            <br />
            <div className="row">
                <div className="col-xs-12 col-sm-4">
                    <select id="clasificacion" className="form-control" ref={clasificacionRef}>
                        {
                            clasificacionEvento.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))
                        }
                    </select>
                </div>
                <div className="hidden-xs col-sm-1 text-center font-size">
                    |
                </div>
                <div className="col-xs-12 col-sm-4">
                    <input id="searchall" type="text" className="form-control" placeholder="Busqueda por nombre o descripci&oacute;n" ref={descripcionRef}/>
                </div>
                <div className="col-xs-12 col-sm-3">
                    <button id="btnSearch" className="form-control btn btn-dark">Filtrar</button>
                </div>
            </div>
            <br/>
            <div className="row">
                { localStorage.getItem("TipoUsuario") === "Organizador" ?
                    <table className="table">
                        <thead>
                            <tr>
                                <td>Nombre Evento</td>
                                <td>Fecha Inicio Evento</td>
                                <td>Fecha Fin Evento</td>
                                <td>Lugar</td>
                                <td>Descripci&oacute;n</td>
                                <td>Clasificaci&oacute;n</td>
                            </tr>
                        </thead>
                        <tbody>
                            {events?.map((event) => {
                                return (<tr key={event.idEvento}>
                                    <td>{event.nombre}</td>
                                    <td>{event.inicio}</td>
                                    <td>{event.fin}</td>
                                    <td>{event.lugar}</td>
                                    <td>{event.descripcion}</td>
                                    <td>{event.clasificacion}</td>
                                </tr>);
                            })}
                        </tbody>
                    </table>
                : 
                    <table className="table">
                        <thead>
                            <tr>
                                <td>Nombre Evento</td>
                                <td>Fecha Inicio Evento</td>
                                <td>Fecha Fin Evento</td>
                                <td>Lugar</td>
                                <td>Descripci&oacute;n</td>
                                <td>Clasificaci&oacute;n</td>
                                <td>Asientos</td>
                            </tr>
                        </thead>
                        <tbody>
                            {events?.map((event) => {
                                return event.asientos?.map((a) => {
                                console.log(event.idEvento)
                                return (<tr key={event.idEvento+a.nombre}>
                                    <td>{event.nombre}</td>
                                    <td>{event.inicio}</td>
                                    <td>{event.fin}</td>
                                    <td>{event.lugar}</td>
                                    <td>{event.descripcion}</td>
                                    <td>{event.clasificacion}</td>
                                    <td>{a.asientos}</td>
                                </tr>);
                                });
                            })}
                        </tbody>
                    </table>
                }
            </div>
        </form>
    </>
    )
}