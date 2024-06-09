// tests for act.js
import React from 'react';
import {fireEvent, screen, waitFor} from '@testing-library/react';
import {render} from '@testing-library/react';
import Acts from './Acts';
import {BrowserRouter} from 'react-router-dom';
import {Data} from "../../../types/act";

const actsData: Data = {
  locations: [
    {
      id: 1,
      name: 'Main Stage',
      events: [
        {
          id: 1,
          name: 'The Sky at Day',
          description: 'The Sky at Day is a band from the UK',
          image: 'https://images.unsplash.com/photo-1631149170000-7b3b3b3b3b3b',
          spotify: '',
          youtube: '',
          instagram: '',
          facebook: '',
          twitter: '',
          soundcloud: '',
          website: '',
          start: '2024-06-26T12:00:00Z',
          end: '2024-06-26T12:30:00Z',
        },
        {
          id: 2,
          name: 'Yoga like water',
          description: 'Yoga like water is a band from the UK',
          image: 'https://images.unsplash.com/photo-1631149170000-7b3b3b3b3b3b',
          spotify: '',
          youtube: '',
          instagram: '',
          facebook: '',
          twitter: '',
          soundcloud: '',
          website: '',
          start: '2024-06-26T12:30:00Z',
          end: '2024-06-26T13:00:00Z',
        },
        {
          id: 3,
          name: 'The Sky at Night',
          description: 'The Sky at Night is a band from the UK',
          image: 'https://images.unsplash.com/photo-1631149170000-7b3b3b3b3b3b',
          spotify: '',
          youtube: '',
          instagram: '',
          facebook: '',
          twitter: '',
          soundcloud: '',
          website: '',
          start: '2024-06-26T13:00:00Z',
          end: '2024-06-26T13:30:00Z',
        },
      ],
    },
    {
      id: 2,
      name: 'Second Stage',
      events: [

      ],
    },
  ],
  acts: [
    {
      id: 1,
      name: 'The Sky at Day',
      description: 'The Sky at Day is a band from the UK',
      image: 'https://images.unsplash.com/photo-1631149170000-7b3b3b3b3b3b',
      spotify: '',
      youtube: '',
      instagram: '',
      facebook: '',
      twitter: '',
      soundcloud: '',
      website: '',
      stage: 1,
    },
    {
      id: 2,
      name: 'Yoga like water',
      description: 'Yoga like water is a band from the UK',
      image: 'https://images.unsplash.com/photo-1631149170000-7b3b3b3b3b3b',
      spotify: '',
      youtube: '',
      instagram: '',
      facebook: '',
      twitter: '',
      soundcloud: '',
      website: '',
      stage: 1,
    },
    {
      id: 3,
      name: 'The Sky at Night',
      description: 'The Sky at Night is a band from the UK',
      image: 'https://images.unsplash.com/photo-1631149170000-7b3b3b3b3b3b',
      spotify: '',
      youtube: '',
      instagram: '',
      facebook: '',
      twitter: '',
      soundcloud: '',
      website: '',
      stage: 1,
    },
  ],
};

describe('Acts component', () => {
  it('should render Acts component', () => {
    render(
    <BrowserRouter>
        <Acts data={actsData} />
      </BrowserRouter>, {}
    );
    const actsElement = screen.queryAllByLabelText('Add to lineup');
    expect(actsElement).not.toBeNull();
  });

  it('should show search bar', () => {
    render(
      <BrowserRouter>
        <Acts data={actsData} />
      </BrowserRouter>
    );
    const searchBar = screen.queryAllByLabelText('Search');
    expect(searchBar).not.toBeNull();
  });

  it('should show acts', () => {
    render(
      <BrowserRouter>
        <Acts data={actsData} />
      </BrowserRouter>
    );
    screen.debug();
    const acts = screen.getAllByText('The Sky at Day');
    expect(acts).not.toBeNull();
  });

  it('should search for results based on search input', async () => {
    render(
      <BrowserRouter>
        <Acts data={actsData} />
      </BrowserRouter>
    );
    const searchBar: HTMLInputElement = screen.getByLabelText('Search for an act');
    fireEvent.change(searchBar, { target: { value: 'Yoga like water' } });

    expect(searchBar.value).toBe('Yoga like water');
    await waitFor(() => {
      const acts = screen.queryAllByText('Yoga like water');
      expect(acts).not.toHaveLength(0);
    });
  });
});
