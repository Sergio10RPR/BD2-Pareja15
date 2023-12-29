import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { ModalWindowEE } from "./modalEE"; 
import Modal from 'react-modal';
beforeAll(() => {
    Modal.setAppElement(document.createElement('div'));
  });
test("Prueba unitaria editar evento, validar que existan los campos necesarios", () => {
  const onCloseMock = jest.fn();
  const evento = {
    title: "Mi evento",
    start: new Date(),
    end: new Date(),
    description: "Descripción del evento",
  };

  const { getByTestId } = render(
    <ModalWindowEE isOpen={true} onClose={onCloseMock} evento={evento} />
  );

  expect(getByTestId("nombre-input")).toBeInTheDocument();
  expect(getByTestId("inicio-input")).toBeInTheDocument();
  expect(getByTestId("fin-input")).toBeInTheDocument();
  expect(getByTestId("descripcion-input")).toBeInTheDocument();
  expect(getByTestId("guardar-button")).toBeInTheDocument();
  expect(getByTestId("cerrar-button")).toBeInTheDocument();
  expect(getByTestId("eliminar-button")).toBeInTheDocument();
});

test("Test de evento click del botón cerrar", () => {
  const onCloseMock = jest.fn();
  const evento = {
    title: "Mi evento",
    start: new Date(),
    end: new Date(),
    description: "Descripción del evento",
  };

  const { getByTestId } = render(
    <ModalWindowEE isOpen={true} onClose={onCloseMock} evento={evento} />
  );

  const cerrarButton = getByTestId("cerrar-button");
  fireEvent.click(cerrarButton);

  expect(onCloseMock).toHaveBeenCalled();
});
