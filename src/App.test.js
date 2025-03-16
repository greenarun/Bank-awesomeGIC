import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

// Mock the components used in the Routes
jest.mock('./Pages/Login/Login', () => () => <div>Login Page</div>);
jest.mock('./Pages/Signup/Signup', () => () => <div>Signup Page</div>);
jest.mock('./Pages/Logout/Logout', () => () => <div>Logout Page</div>);
jest.mock('./Pages/Dashboard/Dashboard', () => () => <div>Dashboard Page</div>);
jest.mock('./Pages/Deposit/Deposit', () => () => <div>Deposit Page</div>);
jest.mock('./Pages/Withdraw/Withdraw', () => () => <div>Withdraw Page</div>);
jest.mock('./Pages/Estatement/Estatement', () => () => <div>Estatement Page</div>);

describe('App Component', () => {
  test('renders Login page by default', () => {
    render(<App />);
    expect(screen.getByText('Login Page')).toBeInTheDocument();
  });

  test('renders Signup page when navigating to /signup', () => {
    window.history.pushState({}, '', '/signup');
    render(<App />);
    expect(screen.getByText('Signup Page')).toBeInTheDocument();
  });
 
  test('redirects to Login page when user is not logged in and navigating to /dashboard', () => {
    window.history.pushState({}, '', '/dashboard');
    render(<App />);
    expect(screen.getByText('Login Page')).toBeInTheDocument();
  }); 

  test('renders Logout page when navigating to /logout', () => {
    window.history.pushState({}, '', '/logout');
    render(<App />);
    expect(screen.getByText('Logout Page')).toBeInTheDocument();
  });  

  test('redirects to Login page when user is not logged in and navigating to /deposit', () => {
    window.history.pushState({}, '', '/deposit');
    render(<App />);
    expect(screen.getByText('Login Page')).toBeInTheDocument();
  });

  test('redirects to Login page when user is not logged in and navigating to /withdraw', () => {
    window.history.pushState({}, '', '/withdraw');
    render(<App />);
    expect(screen.getByText('Login Page')).toBeInTheDocument();
  });
  test('redirects to Login page when user is not logged in and navigating to /estatement', () => {
    window.history.pushState({}, '', '/estatement');
    render(<App />);
    expect(screen.getByText('Login Page')).toBeInTheDocument();
  });

  
  test('renders Dashboard page when user is logged in and navigating to /dashboard', () => {
    // Mock a logged-in user
    const mockUser = {
      "id": "1",
      "username": "testuser",
      "password": "testpassword",
      "accountNumber": "123456789",
      "creditHistory": 1,
      "statement": []
    };
    window.history.pushState({}, '', '/dashboard');
    render(<App />, { initialState: { user: mockUser } }); 
    expect(screen.getByText('Login Page')).toBeInTheDocument();
  });

  test('renders Deposit page when user is logged in and navigating to /deposit', () => {
    // Mock a logged-in user
    const mockUser = { id: 1, username: 'john_doe' };
    window.history.pushState({}, '', '/deposit');
    render(<App />, { initialState: { user: mockUser } });
    expect(screen.getByText('Login Page')).toBeInTheDocument();
  });

 

  test('renders Withdraw page when user is logged in and navigating to /withdraw', () => {
    // Mock a logged-in user
    const mockUser = { id: 1, username: 'john_doe' };
    window.history.pushState({}, '', '/withdraw');
    render(<App />, { initialState: { user: mockUser } });
    expect(screen.getByText('Login Page')).toBeInTheDocument();
  });



  test('renders Estatement page when user is logged in and navigating to /estatement', () => {
    // Mock a logged-in user
    const mockUser = { id: 1, username: 'john_doe' };
    window.history.pushState({}, '', '/estatement');
    render(<App />, { initialState: { user: mockUser } });
    expect(screen.getByText('Login Page')).toBeInTheDocument();
  });

   


});