import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom';
import Deposit from "../Pages/Deposit/Deposit";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";

// Mock axios
jest.mock("axios");
 
jest.mock("../Components/Header/Header", () => () => <div>Mock Header</div>);
jest.mock("../Components/LeftMenu/LeftMenu", () => () => <div>Mock LeftMenu</div>);
jest.mock("../Components/AlertBox/AlertBox", () => ({ error, message }) => (
  <div>{error ? "Error: " : "Success: "}{message}</div>
));

describe("Deposit Component", () => {
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

  test("renders Deposit component without crashing", async () => {
    render(
      <BrowserRouter>
        <Deposit user={mockUser} logout={mockLogout} />
      </BrowserRouter>
    );
 
    await waitFor(() => {
      expect(screen.getByText("Mock Header")).toBeInTheDocument();
      expect(screen.getByText("Mock LeftMenu")).toBeInTheDocument();
      expect(screen.getByLabelText("Amount")).toBeInTheDocument();
      expect(screen.getByText("Add Credit")).toBeInTheDocument();
    });
  });

  test("updates amount state when input changes", async () => {
    render(
      <BrowserRouter>
        <Deposit user={mockUser} logout={mockLogout} />
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
        <Deposit user={mockUser} logout={mockLogout} />
      </BrowserRouter>
    );
 
    await waitFor(() => {
      const addCreditButton = screen.getByText("Add Credit");
      fireEvent.click(addCreditButton);

      expect(screen.getByText("Error: Please enter the amount to deposit")).toBeInTheDocument();
    });
  });

  test("handles successful deposit", async () => {
    const mockResponse = {
      data: {
        ...mockUser,
        creditHistory: 1200,  
        statement: [
          {
            id: 1,
            date: "15/03/2025, 21:18:29",  
            amount: 200,  
            type: "credit",
            balance: 1200,  
          },
        ],
      },
    };
  
    axios.put.mockResolvedValue(mockResponse);
  
    render(
      <BrowserRouter>
        <Deposit user={mockUser} logout={mockLogout} />
      </BrowserRouter>
    );
   
    await waitFor(() => { 
      const amountInput = screen.getByRole("textbox", { name: /amount/i });
      fireEvent.change(amountInput, { target: { value: "200" } });
   
      expect(amountInput.value).toBe("200");
    });
  
    const addCreditButton = screen.getByText("Add Credit");
    fireEvent.click(addCreditButton);
  
    await waitFor(() => {
      expect(axios.put).toHaveBeenCalledWith(
        expect.stringContaining("/users/1"),
        expect.objectContaining({
          creditHistory: 1200,  
          statement: expect.arrayContaining([
            expect.objectContaining({
              amount: 200,  
              type: "credit",
            }),
          ]),
        }),
        expect.any(Object)
      );
    });
  
    expect(
      screen.getByText("Success: Thank you! $200 has been deposited to your account.")
    ).toBeInTheDocument();
  });

  test("handles API error during deposit", async () => {
    axios.put.mockRejectedValue(new Error("API Error"));
  
    render(
      <BrowserRouter>
        <Deposit user={mockUser} logout={mockLogout} />
      </BrowserRouter>
    );
   
    await waitFor(() => { 
      const amountInput = screen.getByRole("textbox", { name: /amount/i });
      fireEvent.change(amountInput, { target: { value: "200" } });
   
      expect(amountInput.value).toBe("200");
    });
  
    const addCreditButton = screen.getByText("Add Credit");
    fireEvent.click(addCreditButton);
  
    await waitFor(() => {
      expect(axios.put).toHaveBeenCalledWith(
        expect.stringContaining("/users/1"),
        expect.objectContaining({
          creditHistory: 1200,  
          statement: expect.arrayContaining([
            expect.objectContaining({
              amount: 200,  
              type: "credit",
            }),
          ]),
        }),
        expect.any(Object)
      );
    });
  
    expect(screen.queryByText("Success:")).not.toBeInTheDocument();
  });
});