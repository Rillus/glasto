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
          short: "test",
          description: "This is a test act",
          image: "test-act.jpg",
          start: "2024-06-26T00:00:00.000Z",
          end: "2024-06-26T01:00:00.000Z",
        },
        {
          id: 2,
          name: "Test2 Act",
          short: "test2",
          description: "This is a test2 act",
          image: "test2-act.jpg",
          start: "2024-06-26T01:00:00.000Z",
          end: "2024-06-26T02:00:00.000Z",
        }
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
    localStorage.setItem('act_test', 'true');
    localStorage.setItem('act_test2', 'true');

    const { container: HTMLElement } = render(
      <BrowserRouter>
        <Intro data={data} />
      </BrowserRouter>
    );
    expect(screen.getByText('Test Act')).toBeInTheDocument();
  });

  it('should create share lineup url when button is clicked', () => {
    localStorage.setItem('act_test', 'true');
    localStorage.setItem('act_test2', 'true');

    const { container: HTMLElement } = render(
      <BrowserRouter>
        <Intro data={data} />
      </BrowserRouter>
    );
    const button = screen.getByText('Share your lineup');
    expect(button).toBeInTheDocument();

    // mock the clipboard API
    const navigator: any = window.navigator;
    navigator.clipboard = {
      writeText: jest.fn()
    };

    // mock window.alert
    window.alert = jest.fn();

    button.click();
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('http://localhost/shared/act_test-act_test2');
  });
});
