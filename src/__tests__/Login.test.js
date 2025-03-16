import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import Login from '../Pages/Login/Login';
import { useNavigate } from 'react-router-dom';

// Mock the useNavigate hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

// Mock the fetch API
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([{ username: 'testuser', password: 'testpass' }]),
  })
);

describe('Login Component', () => {
  const mockSetUser = jest.fn();

  beforeEach(() => {
    
    jest.clearAllMocks();
    global.fetch.mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([{ username: 'testuser', password: 'testpass' }]),
      })
    );
  });

  test('renders Login component without crashing', () => {
    render(
      <BrowserRouter>
        <Login setUser={mockSetUser} />
      </BrowserRouter>
    );
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  test('updates username and password fields', () => {
    render(
      <BrowserRouter>
        <Login setUser={mockSetUser} />
      </BrowserRouter>
    );

    const usernameInput = screen.getByLabelText('Username');
    const passwordInput = screen.getByLabelText('Password');

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpass' } });

    expect(usernameInput.value).toBe('testuser');
    expect(passwordInput.value).toBe('testpass');
  });

  test('displays error message on invalid login', async () => {
    
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([]),
      })
    );

    render(
      <BrowserRouter>
        <Login setUser={mockSetUser} />
      </BrowserRouter>
    );

    const usernameInput = screen.getByLabelText('Username');
    const passwordInput = screen.getByLabelText('Password');
    const loginButton = screen.getByText('Login');

    fireEvent.change(usernameInput, { target: { value: 'wronguser' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongpass' } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(screen.getByText('Invalid username or password')).toBeInTheDocument();
    });
  });

  test('navigates to dashboard on successful login', async () => {
    const mockNavigate = jest.fn(); 
    jest.spyOn(require('react-router-dom'), 'useNavigate').mockImplementation(() => mockNavigate);
    useNavigate.mockImplementation(() => mockNavigate);

    render(
      <BrowserRouter>
        <Login setUser={mockSetUser} />
      </BrowserRouter>
    );

    const usernameInput = screen.getByLabelText('Username');
    const passwordInput = screen.getByLabelText('Password');
    const loginButton = screen.getByText('Login');

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpass' } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(mockSetUser).toHaveBeenCalledWith({ username: 'testuser', password: 'testpass' });
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
    });
  });

  test('navigates to signup page when signup button is clicked', () => {
    const mockNavigate = jest.fn();
    useNavigate.mockImplementation(() => mockNavigate);

    render(
      <BrowserRouter>
        <Login setUser={mockSetUser} />
      </BrowserRouter>
    );

    const signupButton = screen.getByText('SignUp ! Open Your Savings Account Now !');
    fireEvent.click(signupButton);

    expect(mockNavigate).toHaveBeenCalledWith('/signup');
  });
});