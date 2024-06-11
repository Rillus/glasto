import { render, screen } from '@testing-library/react';
import App from './App';
import {BrowserRouter} from "react-router-dom";

test('renders the main menu', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const myLineupLink = screen.getByRole('link', {name: /My Lineup/i});
  expect(myLineupLink).toBeInTheDocument();

  const stagesLink = screen.getByRole('link', {name: /Stages/i});
  expect(stagesLink).toBeInTheDocument();

  const actsLink = screen.getByRole('link', {name: /Acts/i});
  expect(actsLink).toBeInTheDocument();

  const mapsLink = screen.getByRole('link', {name: /Maps/i});
  expect(mapsLink).toBeInTheDocument();

});
