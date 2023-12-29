import React from "react"
import { fetchReserve } from "../../services/reserveService"
import { fetchConfirmBuy } from "../../services/confirmBuy"
export class SeatPicker extends React.Component {
  
  constructor(props) {
    super(props);
    
    if(this.props.seats[0]?.Localidades !== undefined){
      const seat = this.props.seats[0].Localidades?.map((localidad) => {
        return localidad.Asientos?.map((asiento) => {
          return localidad.Nombre + "|" + asiento.idAsiento + "|" + asiento.nombre
        })
      }).flat();

      const seatReserved = this.props.seats[0].Localidades?.map((localidad) => {
        return localidad.Asientos?.filter((asiento) => asiento.estado !== "1").map((asiento) => {
          return localidad.Nombre + "|" + asiento.idAsiento + "|" + asiento.nombre
        })
      }).flat();

      const seatReservedNotChange = [...seatReserved];

      const seatAvailable = this.props.seats[0].Localidades?.map((localidad) => {
        return localidad.Asientos?.filter((asiento) => asiento.estado === "1").map((asiento) => {
          return localidad.Nombre + "|" + asiento.idAsiento + "|" + asiento.nombre
        })
      }).flat();

      this.state = {
        seat: seat,
        seatAvailable: seatAvailable,
        seatReserved: seatReserved,
        seatReserverNotChange: seatReservedNotChange
      }
    }
    else{
      this.state = {
        seat: [],
        seatAvailable: [],
        seatReserved: [],
        seatReserverNotChange: []
      }
    }
    this.handlerReserve = this.handlerReserve.bind(this);
  }

  componentDidUpdate(prevProps){
    if(prevProps.seats[0]?.idEvento === this.props.seats[0]?.idEvento){
      return;
    }
    if(this.props.seats[0]?.Localidades !== undefined){
      const seat = this.props.seats[0].Localidades?.map((localidad) => {
        return localidad.Asientos?.map((asiento) => {
          return localidad.Nombre + "|" + asiento.idAsiento + "|" + asiento.nombre
        })
      }).flat();

      const seatReserved = this.props.seats[0].Localidades?.map((localidad) => {
        return localidad.Asientos?.filter((asiento) => asiento.estado !== "1").map((asiento) => {
          return localidad.Nombre + "|" + asiento.idAsiento + "|" + asiento.nombre
        })
      }).flat();

      const seatReservedNotChange = [...seatReserved];

      const seatAvailable = this.props.seats[0].Localidades?.map((localidad) => {
        return localidad.Asientos?.filter((asiento) => asiento.estado === "1").map((asiento) => {
          return localidad.Nombre + "|" + asiento.idAsiento + "|" + asiento.nombre
        })
      }).flat();

      this.setState({
        seat: seat,
        seatAvailable: seatAvailable,
        seatReserved: seatReserved,
        seatReserverNotChange: seatReservedNotChange
      })
    }
    else{
      this.setState({
        seat: [],
        seatAvailable: [],
        seatReserved: [],
        seatReserverNotChange: {}
      })
    }
  }
  
  onClickData(seat) {
    const isNotReservedClient = this.state?.seatReserverNotChange.includes(seat);
    if(isNotReservedClient) return;
    if(this.state.seatReserved.indexOf(seat) > -1 ) {
      this.setState({
        ...this.state,
        seatAvailable: this.state.seatAvailable.concat(seat),
        seatReserved: this.state.seatReserved.filter(res => res !== seat)
      })
    } else {
      this.setState({
        ...this.state,
        seatReserved: this.state.seatReserved.concat(seat),
        seatAvailable: this.state.seatAvailable.filter(res => res !== seat)
      })
    }
  }

  handlerReserve () {
    const seatReservedClient = [];
    //console.log(this.state)
   this.state.seatReserved.forEach(element => {
      const isNotReservedClient = this.state?.seatReserverNotChange.includes(element);
      if(!isNotReservedClient){
        const [,idAsiento]  = element.split("|");
        seatReservedClient.push(idAsiento)
      }
    });
    
    fetchReserve({ token: localStorage.getItem("token"), asientos: seatReservedClient })
      .then((auditre) => {

        console.log(auditre)
        
        //setHistory(auditre);
      })
      .catch((e) => {
        console.error(e);
    });
    fetchConfirmBuy({ token: localStorage.getItem("token"), asientos: seatReservedClient })
      .then((auditre) => {
        console.log(auditre)        
        //setHistory(auditre);
      })
      .catch((e) => {
        console.error(e);
    });
  }
  
  render() {
    return (
      <div>
        <h1>Butacas</h1>
        <button onClick={this.handlerReserve}>Reservar</button>
        <DrawGrid 
          seat = { this.state.seat }
          available = { this.state.seatAvailable }
          reserved = { this.state.seatReserved }
          onClickData = { this.onClickData.bind(this) }
          />
      </div>
    )
  }
}

class DrawGrid extends React.Component {
  render() {
    return (
       <div className="container-seat">
        <table className="grid">
          <tbody>
              <tr>
                { this.props.seat?.map( row =>
                  <td 
                    className={this.props.reserved.indexOf(row) > -1? 'reserved': 'available'}
                    key={row} onClick = {e => this.onClickSeat(row)}>{row} </td>) }
              </tr>
          </tbody>
        </table>
        
        <div className="container-reserved">
          <AvailableList available = { this.props.available } />
          <ReservedList reserved = { this.props.reserved } />
        </div>
       </div>
    )
  }
  
  onClickSeat(seat) {
    this.props.onClickData(seat);
  }
}

class AvailableList extends React.Component {
  render() {
    const seatCount = this.props.available.length;
    return(
      <div className="left">
        <h4>Butacas disponibles: ({seatCount == 0 ? 'No seats available' : seatCount})</h4>
        <ul>
          {this.props.available.map( res => <li key={res} >{res}</li> )}
        </ul>
      </div>
    )
  }
}

class ReservedList extends React.Component {
  render() {
    return(
      <div className="right">
        <h4>Butacas reservadas: ({this.props.reserved.length})</h4>
        <ul>
          { this.props.reserved.map(res => <li key={res} >{res}</li>) }
        </ul>
      </div>
    )
  }
}
