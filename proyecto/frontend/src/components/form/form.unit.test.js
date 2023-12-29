import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Form } from './form'; 

jest.mock('js-sha256', () => {
  return {
    __esModule: true,
    default: jest.fn((password) => password), 
  };
});

jest.mock('react-router-dom', () => {
  return {
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => jest.fn(),
  };
});

describe('Form Component', () => {
  test('should render input fields', () => {
    render(<Router><Form/></Router>);
    
    const nombreInput = screen.getByTestId('nombre-input');
    const apellidoInput = screen.getByTestId('apellido-input');
    const correoInput = screen.getByTestId('correo-input');
    const edadInput = screen.getByTestId('edad-input');
    const fechaInput = screen.getByTestId('fecha-input');
    const usuarioInput = screen.getByTestId('usuario-input');
    const passwordInput = screen.getByTestId('password-input');
    const passConfiInput = screen.getByTestId('passConfi-input');

    expect(nombreInput).toBeInTheDocument();
    expect(apellidoInput).toBeInTheDocument();
    expect(correoInput).toBeInTheDocument();
    expect(edadInput).toBeInTheDocument();
    expect(fechaInput).toBeInTheDocument();
    expect(usuarioInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(passConfiInput).toBeInTheDocument();
  });
});
