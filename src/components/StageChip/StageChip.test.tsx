import React from "react";
import { render, screen } from "@testing-library/react";
import StageChip from "./StageChip";
import {BrowserRouter} from "react-router-dom";

describe("StageChip", () => {
  it("renders StageChip component", () => {
    render(
      <BrowserRouter>
        <StageChip name={undefined} id={undefined} />
      </BrowserRouter>
    );
    const stageChip = screen.getByTestId("StageChip");
    expect(stageChip).toBeInTheDocument();
  });

  it("renders the stage name", () => {
    render(
      <BrowserRouter>
        <StageChip name="Main Stage" id={1} />
      </BrowserRouter>
    );
    const stageName = screen.getByText(/Main Stage/i);
    expect(stageName).toBeInTheDocument();
  });
});
