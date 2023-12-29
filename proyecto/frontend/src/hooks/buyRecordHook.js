import { useState, useEffect } from "react";
import { fetchBuyRecordClient } from "../services/buyServices";
export const useRecordBuyClient = () => {
  const [buys, setBuys] = useState([]);

  const reset = () => {
    
  }

  useEffect(() => {
    fetchBuyRecordClient({ token: localStorage.getItem("token") })
      .then((buy) => {
        setBuys(buy);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  return { buys, reset };
};