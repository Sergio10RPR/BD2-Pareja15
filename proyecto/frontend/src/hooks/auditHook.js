import { useState, useEffect } from "react";
import { fetchAudit } from "../services/auditService";
export const useAudithRecord = () => {
  const [history, setHistory] = useState([]);

  const reset = () => {
    fetchAudit({ token: localStorage.getItem("token") })
      .then((auditre) => {
        setHistory(auditre);
      })
      .catch((e) => {
        console.error(e);
      });
  }

  useEffect(() => {
    reset();
  }, []);

  return { history, reset };
};
