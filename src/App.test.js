import { render, screen } from '@testing-library/react';
import App from './App';
import {BrowserRouter} from "react-router-dom";

test('renders the main menu', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const linkElement = screen.getByText(/Stages/i);
  expect(linkElement).toBeInTheDocument();

  const link2Element = screen.getByText(/Acts/i);
  expect(link2Element).toBeInTheDocument();

  const link3Element = screen.getByText(/Maps/i);
  expect(link3Element).toBeInTheDocument();

});
