import React from "react";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from "react-router-dom";
import LeftMenu from "../Components/LeftMenu/LeftMenu"; // Adjust the import path as needed
import {
  SpaceDashboardIcon,
  AccountBalanceWalletIcon,
  LocalAtmIcon,
  ReceiptIcon,
} from "@mui/icons-material";

describe("LeftMenu Component", () => {
  const renderLeftMenu = (active) => {
    return render(
      <Router>
        <LeftMenu active={active} />
      </Router>
    );
  };

  it("renders without crashing", () => {
    renderLeftMenu("dashboard");
    expect(screen.getByRole("navigation")).toBeInTheDocument();  
  });

  it("displays all menu items with correct icons and text", () => {
    renderLeftMenu("dashboard");

    // Dashboard
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByTestId("SpaceDashboardIcon")).toBeInTheDocument();

    // Deposit
    expect(screen.getByText("Deposit")).toBeInTheDocument();
    expect(screen.getByTestId("AccountBalanceWalletIcon")).toBeInTheDocument();

    // Withdraw
    expect(screen.getByText("Withdraw")).toBeInTheDocument();
    expect(screen.getByTestId("LocalAtmIcon")).toBeInTheDocument();

    // e-Statement
    expect(screen.getByText("e-statement")).toBeInTheDocument();
    expect(screen.getByTestId("ReceiptIcon")).toBeInTheDocument();
  });

  it("applies active styling to the correct menu item", () => {
    renderLeftMenu("deposit");

     
    const depositLink = screen.getByText("Deposit").closest("a");
    expect(depositLink).toHaveClass("active");

    
    const dashboardLink = screen.getByText("Dashboard").closest("a");
    expect(dashboardLink).not.toHaveClass("active");

    const withdrawLink = screen.getByText("Withdraw").closest("a");
    expect(withdrawLink).not.toHaveClass("active");

    const estatementLink = screen.getByText("e-statement").closest("a");
    expect(estatementLink).not.toHaveClass("active");
  });

  it("navigates to the correct routes", () => {
    renderLeftMenu("dashboard");

    // Check Dashboard link
    const dashboardLink = screen.getByText("Dashboard").closest("a");
    expect(dashboardLink).toHaveAttribute("href", "/dashboard");

    // Check Deposit link
    const depositLink = screen.getByText("Deposit").closest("a");
    expect(depositLink).toHaveAttribute("href", "/deposit");

    // Check Withdraw link
    const withdrawLink = screen.getByText("Withdraw").closest("a");
    expect(withdrawLink).toHaveAttribute("href", "/withdraw");

    // Check e-Statement link
    const estatementLink = screen.getByText("e-statement").closest("a");
    expect(estatementLink).toHaveAttribute("href", "/estatement");
  });
});