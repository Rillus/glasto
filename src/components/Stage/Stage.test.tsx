import React from "react";
import {fireEvent, screen, waitFor} from "@testing-library/react";
import {render} from "@testing-library/react";
import Stage from "./Stage";
import {Data} from "../../../types/act";
import {MemoryRouter, Route, Routes} from "react-router-dom";

describe("Stage", () => {
  const actsData: Data = {
    locations: [
      {
        id: 1,
        name: "Main Stage",
        events: [
          {
            id: 1,
            name: "The Sky at Day",
            description: "The Sky at Day is a band from the UK",
            image: "https://images.unsplash.com/photo-1631149170000-7b3b3b3b3b3b",
            spotify: "",
            youtube: "",
            instagram: "",
            facebook: "",
            twitter: "",
            soundcloud: "",
            website: "",
            start: "2024-06-26T12:00:00Z",
            end: "2024-06-26T12:30:00Z",
          },
          {
            id: 2,
            name: "Yoga like water",
            description: "Yoga like water is a band from the UK",
            image: "https://images.unsplash.com/photo-1631149170000-7b3b3b3b3b3b",
            spotify: "",
            youtube: "",
            instagram: "",
            facebook: "",
            twitter: "",
            soundcloud: "",
            website: "",
            start: "2024-06-26T12:30:00Z",
            end: "2024-06-26T13:00:00Z",
          },
          {
            id: 3,
            name: "The Sky at Night",
            description: "The Sky at Night is a band from the UK",
            image: "https://images.unsplash.com/photo-1631149170000-7b3b3b3b3b3b",
            spotify: "",
            youtube: "",
            instagram: "",
            facebook: "",
            twitter: "",
            soundcloud: "",
            website: "",
            start: "2024-06-26T13:00:00Z",
            end: "2024-06-26T13:30:00Z",
          },
        ],
      },
    ],
    acts: [],
  };

  it("should render the stage", async () => {
    render(
      <MemoryRouter initialEntries={['/stage/main-stage']}>
        <Routes>
          <Route path="/stage/:name" element={<Stage data={actsData} />} />
        </Routes>
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByText("Main Stage")).toBeInTheDocument();
    });
  });

  it("should render the events", () => {
    render(
      <MemoryRouter initialEntries={['/stage/main-stage']}>
        <Routes>
          <Route path="/stage/:name" element={<Stage data={actsData}/>} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText("The Sky at Day")).toBeInTheDocument();
    expect(screen.getByText("Yoga like water")).toBeInTheDocument();
    expect(screen.getByText("The Sky at Night")).toBeInTheDocument();
  });

  it('should return null if no stages matching the url are found', () => {
    render(
      <MemoryRouter initialEntries={['/stage/unknown-stage']}>
        <Routes>
          <Route path="/stage/:name" element={<Stage data={actsData}/>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.queryByText("Main Stage")).not.toBeInTheDocument();
  });
});
