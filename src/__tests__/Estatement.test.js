import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom';
import Estatement from "../Pages/Estatement/Estatement";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";

// Mock axios
jest.mock("axios");
 
jest.mock("../Components/Header/Header", () => () => <div>Mock Header</div>);
jest.mock("../Components/LeftMenu/LeftMenu", () => () => <div>Mock LeftMenu</div>);
jest.mock("../Components/Loader", () => () => <div>Mock Loader</div>);
jest.mock("../Components/DataTable/DataTable", () => ({ rows }) => (
  <div>
    Mock DataTable
    {rows.map((row) => (
      <div key={row.id}>{row.amount}</div>
    ))}
  </div>
));

describe("Estatement Component", () => {
  const mockUser = {
    id: 1,
    creditHistory: 1000,
    statement: [
      { id: 1, date: "2023-10-01", amount: 200, type: "credit", balance: 1200 },
      { id: 2, date: "2023-10-02", amount: 100, type: "debit", balance: 1100 },
    ],
  };

  const mockLogout = jest.fn();

  beforeEach(() => {
    
    jest.clearAllMocks();
  });

  test("renders Estatement component without crashing", async () => {
     
    axios.get.mockResolvedValue({ data: mockUser });

    render(
      <BrowserRouter>
        <Estatement user={mockUser} logout={mockLogout} />
      </BrowserRouter>
    );

    
    await waitFor(() => {
      expect(screen.getByText("Mock Header")).toBeInTheDocument();
      expect(screen.getByText("Mock LeftMenu")).toBeInTheDocument();
      expect(screen.getByText("E-Statement")).toBeInTheDocument();
      expect(screen.getByText("Print")).toBeInTheDocument();
    });
  });

  test("displays Loader while fetching data", async () => {
   
    axios.get.mockImplementation(() => new Promise(() => {}));

    render(
      <BrowserRouter>
        <Estatement user={mockUser} logout={mockLogout} />
      </BrowserRouter>
    );

  
    expect(screen.getByText("Mock Loader")).toBeInTheDocument();
  });

  test("displays DataTable with fetched data", async () => {
   
    axios.get.mockResolvedValue({ data: mockUser });

    render(
      <BrowserRouter>
        <Estatement user={mockUser} logout={mockLogout} />
      </BrowserRouter>
    );

    
    await waitFor(() => {
      expect(screen.getByText("Mock DataTable")).toBeInTheDocument();
      expect(screen.getByText("200")).toBeInTheDocument();  
      expect(screen.getByText("100")).toBeInTheDocument();  
    });
  });

  test("handles API error during data fetching", async () => {
     
    axios.get.mockRejectedValue(new Error("API Error"));

    render(
      <BrowserRouter>
        <Estatement user={mockUser} logout={mockLogout} />
      </BrowserRouter>
    );

     
    await waitFor(() => {
      expect(screen.queryByText("Mock DataTable")).not.toBeInTheDocument();
    });
  });
 
});