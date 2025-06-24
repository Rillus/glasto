import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Intro from "./Intro";
import { BrowserRouter } from "react-router-dom";
import { Data } from '../../../types/act';

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

// Mock clipboard API
Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn(),
  },
});

// Mock window.alert
window.alert = jest.fn();

// Generate dynamic future date to ensure test always passes
const futureDate = new Date();
futureDate.setFullYear(futureDate.getFullYear() + 2); // 2 years from now
const futureDateString = futureDate.toISOString().slice(0, 16).replace('T', ' ');

const introData: Data = {
  locations: [
    {
      id: 1,
      name: "Test Stage",
      events: [
        {
          id: 1,
          name: "Test Act",
          short: "testact",
          description: "Test description",
          image: "",
          spotify: "",
          youtube: "",
          instagram: "",
          facebook: "",
          twitter: "",
          soundcloud: "",
          website: "",
          start: futureDateString,
          end: futureDateString,
        },
      ],
    },
  ],
};

describe("Intro", () => {
  beforeEach(() => {
    localStorageMock.getItem.mockClear();
    localStorageMock.setItem.mockClear();
    // Mock localStorage to return 'true' for the test act and hide past acts setting
    localStorageMock.getItem.mockImplementation((key) => {
      if (key === 'act_testact') return 'true';
      if (key === 'hidePastActs') return 'false'; // Show all acts for testing
      return null;
    });
  });

  it("renders correctly", () => {
    const { container } = render(
      <BrowserRouter>
        <Intro data={introData} />
      </BrowserRouter>
    );
    expect(container).toBeInTheDocument();
  });

  it('should show saved acts based on cookies', () => {
    render(
      <BrowserRouter>
        <Intro data={introData} />
      </BrowserRouter>
    );
    expect(screen.getByText('Test Act')).toBeInTheDocument();
  });

  it('should create share lineup url when button is clicked', () => {
    render(
      <BrowserRouter>
        <Intro data={introData} />
      </BrowserRouter>
    );
    const button = screen.getByText('Share your lineup');
    expect(button).toBeInTheDocument();

    // mock the clipboard API
    const writeText = jest.fn();
    Object.assign(navigator, {
      clipboard: {
        writeText,
      },
    });

    fireEvent.click(button);

    expect(writeText).toHaveBeenCalledWith(expect.stringContaining('act_testact'));
    expect(window.alert).toHaveBeenCalledWith('Link copied to clipboard');
  });

  it('should show appropriate message when no acts are saved', () => {
    localStorageMock.getItem.mockImplementation((key) => {
      if (key === 'hidePastActs') return 'false';
      return null; // No saved acts
    });

    render(
      <BrowserRouter>
        <Intro data={introData} />
      </BrowserRouter>
    );
    
    expect(screen.getByText(/No saved acts yet/)).toBeInTheDocument();
  });

  it('should show hide past acts toggle', () => {
    render(
      <BrowserRouter>
        <Intro data={introData} />
      </BrowserRouter>
    );
    
    expect(screen.getByTitle(/Currently showing all acts|Currently hiding past acts/)).toBeInTheDocument();
  });
});
