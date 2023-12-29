import { useState, useEffect } from "react";
import { fetchSearchEvent } from "../services/searchEventsService";
export const useEventEnable = () => {
  const [events, setEvents] = useState([]);

  const resetEvent = () => {
    fetchSearchEvent({ token: localStorage.getItem("token") })
      .then((auditre) => {
        setEvents(auditre);
      })
      .catch((e) => {
        console.error(e);
      });
  }

  useEffect(() => {
    resetEvent();
  }, []);

  return { events, resetEvent };
};