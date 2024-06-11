import React from "react";
import { render, screen } from "@testing-library/react";
import Intro from "./Intro";
import {BrowserRouter} from "react-router-dom";

const data = {
  locations: [
    {
      id: 1,
      name: "Main Stage",
      events: [
        {
          id: 1,
          name: "Test Act",
          short: "test-act",
          description: "This is a test act",
          image: "test-act.jpg",
          start: "2024-06-26T00:00:00.000Z",
          end: "2024-06-26T01:00:00.000Z",
        },
      ],
    },
  ],
};

describe("Intro", () => {
  it("renders correctly", () => {
    const { container } = render(
      <BrowserRouter>
        <Intro data={data} />
      </BrowserRouter>
    );
    expect(screen.getByText(/No saved acts yet/i)).toBeInTheDocument();
  });

  it('should show saved acts based on cookies', () => {
    localStorage.setItem('act_test-act', 'true');

    const { container: HTMLElement } = render(
      <BrowserRouter>
        <Intro data={data} />
      </BrowserRouter>
    );
    expect(screen.getByText('Test Act')).toBeInTheDocument();
  });
});
