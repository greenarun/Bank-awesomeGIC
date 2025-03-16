import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import Logout from '../Pages/Logout/Logout';
import { useNavigate } from 'react-router-dom';

// Mock useNavigate
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('Logout Component', () => {
  const mockSetUser = jest.fn();
  const mockNavigate = jest.fn();

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
    // Mock useNavigate to return the mockNavigate function
    useNavigate.mockImplementation(() => mockNavigate);
  });

  test('renders Logout component without crashing', () => {
    render(
      <BrowserRouter>
        <Logout />
      </BrowserRouter>
    ); 
    expect(screen.getByText('AwesomeGIC')).toBeInTheDocument();
  });

  test('navigates to login page after 2 seconds', async () => {
  
    jest.useFakeTimers();

    render(
      <BrowserRouter>
        <Logout setUser={mockSetUser} />
      </BrowserRouter>
    );

   
    jest.runAllTimers();

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });

    
    jest.useRealTimers();
  });

  test('navigates to login page when Login button is clicked', () => {
    render(
      <BrowserRouter>
        <Logout setUser={mockSetUser} />
      </BrowserRouter>
    );

    const loginButton = screen.getByText('Login');
    fireEvent.click(loginButton);

    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});