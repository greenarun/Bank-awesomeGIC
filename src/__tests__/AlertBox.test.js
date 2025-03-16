import React from "react";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import AlertBox from "../Components/AlertBox/AlertBox";  
import { Alert } from "@mui/material";

describe("AlertBox Component", () => {
  it("renders without crashing", () => {
    render(<AlertBox error={false} message="Success message" />);
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("displays a success alert when error is false", () => {
    render(<AlertBox error={false} message="Success message" />);
    const alert = screen.getByRole("alert");
    expect(alert).toHaveClass("MuiAlert-standardSuccess");  
    expect(alert).toHaveTextContent("Success message");
  });

  it("displays an error alert when error is true", () => {
    render(<AlertBox error={true} message="Error message" />);
    const alert = screen.getByRole("alert");
    expect(alert).toHaveClass("MuiAlert-standardError");  
    expect(alert).toHaveTextContent("Error message");
  });

  it("displays the correct message", () => {
    const testMessage = "This is a test message";
    render(<AlertBox error={false} message={testMessage} />);
    expect(screen.getByText(testMessage)).toBeInTheDocument();
  });

   
});