import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom';
import Withdraw from "../Pages/Withdraw/Withdraw";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";

// Mock axios
jest.mock("axios");

// Mock child components (optional, to simplify testing)
jest.mock("../Components/Header/Header", () => () => <div>Mock Header</div>);
jest.mock("../Components/LeftMenu/LeftMenu", () => () => <div>Mock LeftMenu</div>);
jest.mock("../Components/AlertBox/AlertBox", () => ({ error, message }) => (
  <div>{error ? "Error: " : "Success: "}{message}</div>
));

describe("Withdraw Component", () => {
  const mockUser = {
    id: 1,
    creditHistory: 1000,
    statement: [],
  };

  const mockLogout = jest.fn();

  beforeEach(() => {
    
    jest.clearAllMocks();

     
    axios.get.mockResolvedValue({
      data: mockUser,
    });
  });

  test("renders Withdraw component without crashing", async () => {
    render(
      <BrowserRouter>
        <Withdraw user={mockUser} logout={mockLogout} />
      </BrowserRouter>
    );

    
    await waitFor(() => {
      expect(screen.getByText("Mock Header")).toBeInTheDocument();
      expect(screen.getByText("Mock LeftMenu")).toBeInTheDocument();
      expect(screen.getByTestId("amount-input")).toBeInTheDocument(); // Use data-testid
      expect(screen.getByText("Withdraw")).toBeInTheDocument();
    });
  });

  test("updates amount state when input changes", async () => {
    render(
      <BrowserRouter>
        <Withdraw user={mockUser} logout={mockLogout} />
      </BrowserRouter>
    );
  
    
    await waitFor(() => {
      
      const amountInput = screen.getByRole("textbox", { name: /amount/i });
      fireEvent.change(amountInput, { target: { value: "200" } });
  
      
      expect(amountInput.value).toBe("200");
    });
  });

  test("displays error message if amount is not provided", async () => {
    render(
      <BrowserRouter>
        <Withdraw user={mockUser} logout={mockLogout} />
      </BrowserRouter>
    );

    
    await waitFor(() => {
      const withdrawButton = screen.getByText("Withdraw");
      fireEvent.click(withdrawButton);

      expect(screen.getByText("Error: Please enter the amount to withdraw")).toBeInTheDocument();
    });
  });

  test("handles successful withdrawal", async () => {
    const mockResponse = {
      data: {
        ...mockUser,
        creditHistory: 800,
        statement: [
          {
            id: 1,
            date: "15/03/2025, 20:21:00", 
            amount: 200, 
            type: "debit",
            balance: 800,
          },
        ],
      },
    };
  
    axios.put.mockResolvedValue(mockResponse);
  
    render(
      <BrowserRouter>
        <Withdraw user={mockUser} logout={mockLogout} />
      </BrowserRouter>
    );
  
    
    await waitFor(() => {
      const amountInput = screen.getByRole("textbox", { name: /amount/i });
      fireEvent.change(amountInput, { target: { value: "200" } });
  
      
      expect(amountInput.value).toBe("200");
    });
  
    const withdrawButton = screen.getByText("Withdraw");
    fireEvent.click(withdrawButton);
  
    await waitFor(() => {
      expect(axios.put).toHaveBeenCalledWith(
        expect.stringContaining("/users/1"),
        expect.objectContaining({
          creditHistory: 800,
          statement: expect.arrayContaining([
            expect.objectContaining({
              amount: 200, 
              type: "debit",
            }),
          ]),
        }),
        expect.any(Object)
      );
    });
  
    expect(
      screen.getByText("Success: Thank you! $200 has been withdrawn.")
    ).toBeInTheDocument();
  });

   
  test("handles API error during withdrawal", async () => {
    axios.put.mockRejectedValue(new Error("API Error"));
  
    render(
      <BrowserRouter>
        <Withdraw user={mockUser} logout={mockLogout} />
      </BrowserRouter>
    );
  
    
    await waitFor(() => {
      
      const amountInput = screen.getByRole("textbox", { name: /amount/i });
      fireEvent.change(amountInput, { target: { value: "200" } });
  
      
      expect(amountInput.value).toBe("200");
    });
  
    const withdrawButton = screen.getByText("Withdraw");
    fireEvent.click(withdrawButton);
  
    await waitFor(() => {
      expect(axios.put).toHaveBeenCalledWith(
        expect.stringContaining("/users/1"),
        expect.objectContaining({
          creditHistory: 800,
          statement: expect.arrayContaining([
            expect.objectContaining({ amount: 200, type: "debit" }),
          ]),
        }),
        expect.any(Object)
      );
    });
  
    expect(screen.queryByText("Success:")).not.toBeInTheDocument();
  });
  
});