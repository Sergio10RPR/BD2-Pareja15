import { useState, useEffect } from "react";
import { fetchRecord } from "../services/recordUserBuyClient";
export const useRecordBuyClient = () => {
  const [records, setRecords] = useState([]);

  const reset = () => {
    fetchRecord({ token: localStorage.getItem("token") })
      .then((record) => {
        setRecords(record);
      })
      .catch((e) => {
        console.error(e);
      });
  }

  useEffect(() => {
    reset();
  }, []);

  return { records, reset };
};