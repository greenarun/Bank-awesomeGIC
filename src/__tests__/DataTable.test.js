import React from "react";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import DataTable from "../Components/DataTable/DataTable";  
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

describe("DataTable Component", () => {
  const mockRows = [
    { date: "2023-10-01", amount: 100, balance: 1000, type: "credit" },
    { date: "2023-10-02", amount: 50, balance: 950, type: "debit" },
  ];

  it("renders without crashing", () => {
    render(<DataTable rows={mockRows} />);
    expect(screen.getByRole("table")).toBeInTheDocument();
  });

  it("displays the correct table headers", () => {
    render(<DataTable rows={mockRows} />);
    expect(screen.getByText("Date")).toBeInTheDocument();
    expect(screen.getByText("Amount")).toBeInTheDocument();
    expect(screen.getByText("Balance")).toBeInTheDocument();
  });

  it("renders the correct number of rows", () => {
    render(<DataTable rows={mockRows} />);
    const rows = screen.getAllByRole("row"); 
    expect(rows.length).toBe(mockRows.length + 1);
  });

  it("displays the correct data in the table rows", () => {
    render(<DataTable rows={mockRows} />);

    // Check first row
    expect(screen.getByText("2023-10-01")).toBeInTheDocument();
    expect(screen.getByText("100")).toBeInTheDocument();
    expect(screen.getByText("1000")).toBeInTheDocument();

    // Check second row
    expect(screen.getByText("2023-10-02")).toBeInTheDocument();
    expect(screen.getByText("-50")).toBeInTheDocument();
    expect(screen.getByText("950")).toBeInTheDocument();
  });

  it("applies correct styling for credit and debit amounts", () => {
    render(<DataTable rows={mockRows} />);

    // Check credit amount styling (green)
    const creditAmount = screen.getByText("100");
    expect(creditAmount).toHaveStyle("color: green");

    // Check debit amount styling (red)
    const debitAmount = screen.getByText("-50");
    expect(debitAmount).toHaveStyle("color: red");
  });

  it("renders nothing when rows are not provided", () => {
    const { container } = render(<DataTable rows={[]} />); 
    const rows = screen.getAllByRole("row");
    expect(rows.length).toBe(1);  
  });
});