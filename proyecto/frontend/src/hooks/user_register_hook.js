import { useState, useEffect } from "react";
import { fetchEvents } from "../services/user_register_service";
export const useUsersRegisters = () => {
  const [users, setUsers] = useState([]);

  const reset = () => {
    fetchEvents({ token: localStorage.getItem("token") })
      .then((user) => {
        setUsers(user);
      })
      .catch((e) => {
        console.error(e);
      });
  }

  useEffect(() => {
    reset();
  }, []);

  return { users, reset };
};
