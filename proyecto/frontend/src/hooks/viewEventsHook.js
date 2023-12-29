import { useState, useEffect } from "react";
import { fetchViewEventService } from "../services/viewEventsService";
export const useViewEvent = () => {
  const [viewEvent, setViewEvent] = useState([]);

  const reset = () => {
    fetchViewEventService({ token: localStorage.getItem("token") })
      .then((viewEvents) => {
        setViewEvent(viewEvents);
      })
      .catch((e) => {
        console.error(e);
      });
  }

  useEffect(() => {
    reset();
  }, []);

  return { viewEvent, reset };
};