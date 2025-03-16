import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import { BrowserRouter as Router, useNavigate } from "react-router-dom";
import Header from "../Components/Header/Header"; // Adjust the import path as needed

// Mock useNavigate
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

describe("Header Component", () => {
  const mockLogout = jest.fn();

  const renderHeader = () => {
    return render(
      <Router>
        <Header logout={mockLogout} />
      </Router>
    );
  };

  it("renders without crashing", () => {
    renderHeader();
    expect(screen.getByRole("banner")).toBeInTheDocument();  
  });

  it("displays the logo with a link to the home page", () => {
    renderHeader();
    const logo = screen.getByRole("img", { name: /logo/i });
    expect(logo).toBeInTheDocument();
    expect(logo.closest("a")).toHaveAttribute("href", "/");
  });

  it("displays the title 'AwesomeGIC'", () => {
    renderHeader();
    expect(screen.getByText("AwesomeGIC")).toBeInTheDocument();
  });

  it("displays the logout button", () => {
    renderHeader();
    const logoutButton = screen.getByRole("button", { name: /logout/i });
    expect(logoutButton).toBeInTheDocument();
  });

  it("calls the logout function and navigates to /logout when the logout button is clicked", () => {
    const mockNavigate = jest.fn();
    jest.spyOn(require("react-router-dom"), "useNavigate").mockReturnValue(mockNavigate);

    renderHeader();
    const logoutButton = screen.getByRole("button", { name: /logout/i });

    fireEvent.click(logoutButton);

    expect(mockLogout).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith("/logout");
  });
});