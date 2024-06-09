import React from "react";
import { render, screen } from "@testing-library/react";
import Stages from "./Stages";
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
  ],
  acts: [
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
      stage: 1,
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
      stage: 1,
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
      stage: 1,
    },
  ],
};

describe("Stages", () => {
  it("renders Stages component", () => {
    render(
      <BrowserRouter>
        <Stages data={data} />
      </BrowserRouter>
    );
    const stagesHeader = screen.getByText(/Stages/i);
    expect(stagesHeader).toBeInTheDocument();
  });

  it("renders the number of stages", () => {
    render(
      <BrowserRouter>
        <Stages data={data} />
      </BrowserRouter>
    );
    // get stages by Stage Chip class
    const stages = screen.getAllByTestId("StageChip");
    expect(stages).toHaveLength(data.locations.length);
  });
});
