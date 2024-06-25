import React from "react";
import { render, screen } from "@testing-library/react";
import StageChip from "./StageChip";
import {BrowserRouter} from "react-router-dom";

describe("StageChip", () => {
  it("doesn't render StageChip component if name is an empty string", () => {
    render(
      <BrowserRouter>
        <StageChip name={''} id={0} />
      </BrowserRouter>
    );
    const stageChip = screen.queryAllByTestId("StageChip");
    expect(stageChip).toHaveLength(0);
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
