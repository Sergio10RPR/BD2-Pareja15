import { useState } from "react";
import { fetchSeats } from "../services/seatService";
import { useEffect } from "react";
export const useSeatHook = () => {
  const [seats, setSeats] = useState([]);

  const reset = (idEvento) => {
    fetchSeats({ token: localStorage.getItem("token"), idEvento: idEvento })
      .then((auditre) => {
        setSeats(auditre);
      })
      .catch((e) => {
        console.error(e);
      });
  }

  return { seats, reset };
};