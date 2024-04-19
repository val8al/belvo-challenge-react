import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders the login page', () => {
  render(<App />);
  const userPicker = screen.getByRole('combobox', {name: 'Selecciona un usuario'})
  const pwdField = screen.getAllByText(/Contraseña/)[0]
  const logInButton = screen.getByRole('button', {name: 'Ingresar'})
  expect(userPicker).toBeInTheDocument();
  expect(pwdField).toBeInTheDocument();
  expect(logInButton).toBeInTheDocument();
});