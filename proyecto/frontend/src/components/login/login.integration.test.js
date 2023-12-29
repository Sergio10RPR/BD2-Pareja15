import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { Login } from "./login"; // Asegúrate de importar el componente correcto

test("Realiza la llamada a handleLogin al hacer clic en el botón", async () => {
  render(
    <Router>
      <Login />
    </Router>
  );

  const usuarioInput = screen.getByPlaceholderText("User Name");
  const contraseñaInput = screen.getByPlaceholderText("Password");
  fireEvent.change(usuarioInput, { target: { value: "miUsuario" } });
  fireEvent.change(contraseñaInput, { target: { value: "miContraseña" } });

  const botonIngresar = screen.getByText("Ingresar");
  fireEvent.click(botonIngresar);

  await waitFor(() => {
   
  });
});
