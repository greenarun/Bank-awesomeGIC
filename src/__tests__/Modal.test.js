import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from "react-router-dom";
import Modal from "../Components/Modal/Modal";  

describe("Modal Component", () => {
  const mockSetShowDiv = jest.fn();

  const renderModal = () => {
    return render(
      <Router>
        <Modal setShowDiv={mockSetShowDiv} />
      </Router>
    );
  };

  it("renders the dialog when open is true", () => {
    renderModal();
    expect(screen.getByRole("dialog")).toBeInTheDocument();  
  });

  it("displays the correct dialog title", () => {
    renderModal();
    expect(
      screen.getByText("AwesomeGIC")
    ).toBeInTheDocument();
  });

  it("displays the correct dialog content and links", () => {
    renderModal();

     
    expect(
      screen.getByText("What would you like to do?")
    ).toBeInTheDocument();

     
    const depositLink = screen.getByText("Deposit");
    expect(depositLink).toBeInTheDocument();
    expect(depositLink.closest("a")).toHaveAttribute("href", "/deposit");

     
    const withdrawLink = screen.getByText("Withdraw");
    expect(withdrawLink).toBeInTheDocument();
    expect(withdrawLink.closest("a")).toHaveAttribute("href", "/withdraw");

     
    const estatementLink = screen.getByText("Print statement");
    expect(estatementLink).toBeInTheDocument();
    expect(estatementLink.closest("a")).toHaveAttribute("href", "/estatement");

     
    const quitLink = screen.getByText("Quit");
    expect(quitLink).toBeInTheDocument();
    expect(quitLink.closest("a")).toHaveAttribute("href", "/logout");
  });
});