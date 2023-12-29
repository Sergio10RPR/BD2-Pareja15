import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Login } from "./login";

test("Unitaria Login, valida componente principales de la interfaz del login", () => { 
  render(
    <Router>
      <Login />
    </Router>
  );

  expect(screen.getByText("F3")).toBeInTheDocument();
  expect(
    screen.getByText("Login or register from here to access.")
  ).toBeInTheDocument();
  expect(screen.getByPlaceholderText("User Name")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
  expect(screen.getByText("Ingresar")).toBeInTheDocument();
  expect(screen.getByText("Registrar......")).toBeInTheDocument();
});

test("Valida la entrada de usuario y contraseña", async () => {
  render(<Router>
    <Login />
    </Router>);

  const usuarioInput = screen.getByPlaceholderText("User Name");
  const contraseñaInput = screen.getByPlaceholderText("Password");
  fireEvent.change(usuarioInput, { target: { value: "miUsuario" } });
  fireEvent.change(contraseñaInput, { target: { value: "miContraseña" } });

  expect(usuarioInput).toHaveValue("miUsuario");
  expect(contraseñaInput).toHaveValue("miContraseña");
});

test("Realiza la llamada a handleLogin al hacer clic en el botón", async () => {
  render(<Router>
    <Login />
    </Router>);

  const usuarioInput = screen.getByPlaceholderText("User Name");
  const contraseñaInput = screen.getByPlaceholderText("Password");
  fireEvent.change(usuarioInput, { target: { value: "miUsuario" } });
  fireEvent.change(contraseñaInput, { target: { value: "miContraseña" } });

  const botonIngresar = screen.getByText("Ingresar");
  fireEvent.click(botonIngresar);

  await waitFor(() => {
   
  });
});
