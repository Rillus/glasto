import React from "react";
import { render, screen } from "@testing-library/react";
import Act from "./Act";
import {BrowserRouter} from "react-router-dom";
import {Data} from "../../../types/act";

const data: Data = {
  locations: [
    {
      id: 1,
      name: "Main Stage",
      events: [],
    },
    {
      id: 2,
      name: "Second Stage",
      events: [],
    },
  ]
};

describe("Act", () => {
  it("renders Act component", () => {
    render(
      <BrowserRouter>
        <Act data={data} />
      </BrowserRouter>
    );
    const stagesHeader = screen.getByText(/Act/i);
    expect(stagesHeader).toBeInTheDocument();
  });
});
