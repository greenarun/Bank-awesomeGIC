import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import Signup from '../Pages/Signup/Signup';

// Define mockNavigate
const mockNavigate = jest.fn();

// Mock axios
jest.mock('axios');

// Mock useNavigate
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

// Mock the url variable
jest.mock('../envconstants', () => ({
  url: 'http://localhost:3000', // Replace with your actual API URL
}));

describe('Signup Component', () => {
  const mockSetUser = jest.fn();

  beforeEach(() => {
     
    jest.clearAllMocks();
  });

  test('renders Signup component without crashing', () => {
    render(
      <BrowserRouter>
        <Signup setUser={mockSetUser} />
      </BrowserRouter>
    );
    expect(screen.getByText('Sign up form')).toBeInTheDocument();
  });

  test('updates username, password, and confirmPassword fields', () => {
    render(
      <BrowserRouter>
        <Signup setUser={mockSetUser} />
      </BrowserRouter>
    );

    const usernameInput = screen.getByLabelText('Username');
    const passwordInput = screen.getByLabelText('Password');
    const confirmPasswordInput = screen.getByLabelText('Confirm Password');

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpass' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'testpass' } });

    expect(usernameInput.value).toBe('testuser');
    expect(passwordInput.value).toBe('testpass');
    expect(confirmPasswordInput.value).toBe('testpass');
  });

  test('displays error message when fields are empty', () => {
    render(
      <BrowserRouter>
        <Signup setUser={mockSetUser} />
      </BrowserRouter>
    );

    const signupButton = screen.getByText('Sign Up');
    fireEvent.click(signupButton);

    expect(screen.getByText('Please fill in all fields')).toBeInTheDocument();
  });

  test('displays error message when passwords do not match', () => {
    render(
      <BrowserRouter>
        <Signup setUser={mockSetUser} />
      </BrowserRouter>
    );

    const usernameInput = screen.getByLabelText('Username');
    const passwordInput = screen.getByLabelText('Password');
    const confirmPasswordInput = screen.getByLabelText('Confirm Password');
    const signupButton = screen.getByText('Sign Up');

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpass' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'wrongpass' } });
    fireEvent.click(signupButton);

    expect(screen.getByText('Passwords do not match')).toBeInTheDocument();
  });

  test('calls axios.post and navigates to login on successful signup', async () => {
     
    axios.post.mockResolvedValueOnce({ data: {} });

 
    jest.useFakeTimers();

    render(
      <BrowserRouter>
        <Signup setUser={mockSetUser} />
      </BrowserRouter>
    );

    const usernameInput = screen.getByLabelText('Username');
    const passwordInput = screen.getByLabelText('Password');
    const confirmPasswordInput = screen.getByLabelText('Confirm Password');
    const signupButton = screen.getByText('Sign Up');

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpass' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'testpass' } });
    fireEvent.click(signupButton);

     
    jest.runAllTimers();

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('http://localhost:3000/users', {
        username: 'testuser',
        password: 'testpass',
        accountNumber: expect.any(String),
        creditHistory: 0,
        statement: [],
      });
      expect(mockSetUser).toHaveBeenCalledWith({
        username: 'testuser',
        password: 'testpass',
        accountNumber: expect.any(String),
        creditHistory: 0,
        statement: [],
      });
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });

   
    jest.useRealTimers();
  });

  test('displays success message on successful signup', async () => {
     
    axios.post.mockResolvedValueOnce({ data: {} });

    
    jest.useFakeTimers();

    render(
      <BrowserRouter>
        <Signup setUser={mockSetUser} />
      </BrowserRouter>
    );

    const usernameInput = screen.getByLabelText('Username');
    const passwordInput = screen.getByLabelText('Password');
    const confirmPasswordInput = screen.getByLabelText('Confirm Password');
    const signupButton = screen.getByText('Sign Up');

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpass' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'testpass' } });
    fireEvent.click(signupButton);

     
    jest.runAllTimers();

    await waitFor(() => {
      expect(screen.getByText('Account created successfully! Redirecting to Login...')).toBeInTheDocument();
    });

    
    jest.useRealTimers();
  });

  
});