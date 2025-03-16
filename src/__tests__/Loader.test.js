import React from "react";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import Loader from "../Components/Loader";  
import { CircularProgress } from "@mui/material";

describe("Loader Component", () => {
  it("renders without crashing", () => {
    render(<Loader />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();  
  });
 
  it("displays the CircularProgress component with correct props", () => {
    render(<Loader />);
  
     
    const circularProgress = screen.getByRole("progressbar");
    expect(circularProgress).toBeInTheDocument();
    
  });

  it("applies the correct styles to the CircularProgress component", () => {
    render(<Loader />);

  
    const circularProgress = screen.getByRole("progressbar");
    expect(circularProgress).toHaveStyle({
      color: "#1a90ff",
      animationDuration: "550ms",
      position: "absolute",
      left: "0",
    });

    
    const circle = circularProgress.querySelector(".MuiCircularProgress-circle");
    expect(circle).toHaveStyle({
      strokeLinecap: "round",
    });
  });

  it("renders the CircularProgress inside a Box with correct styles", () => {
    render(<Loader />);

  
    const box = screen.getByRole("progressbar").parentElement;
    expect(box).toHaveStyle({
      position: "relative",
      margin: "30%",
    });
  });
});