import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Form } from './form';

describe('Prueba de integración, registrar usuarios, valida todos los componente inputs', () => {
  test('should submit the form with valid data', () => {
    
    render(<Router><Form/></Router>);
    
    
    const nombreInput = screen.getByTestId('nombre-input');
    const apellidoInput = screen.getByTestId('apellido-input');
    const correoInput = screen.getByTestId('correo-input');
    const edadInput = screen.getByTestId('edad-input');
    const fechaInput = screen.getByTestId('fecha-input');
    const usuarioInput = screen.getByTestId('usuario-input');
    const passwordInput = screen.getByTestId('password-input');
    const passConfiInput = screen.getByTestId('passConfi-input');

    fireEvent.change(nombreInput, { target: { value: 'John' } });
    fireEvent.change(apellidoInput, { target: { value: 'Doe' } });
    fireEvent.change(correoInput, { target: { value: 'johndoe@example.com' } });
    fireEvent.change(edadInput, { target: { value: '30' } });
    fireEvent.change(fechaInput, { target: { value: '1990-01-01' } });
    fireEvent.change(usuarioInput, { target: { value: 'johndoe' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(passConfiInput, { target: { value: 'password123' } });

    const submitButton = screen.getByTestId('submit-button');
    fireEvent.click(submitButton);

   
  });
});