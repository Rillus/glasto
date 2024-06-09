interface Location {
  events: any;
  id: number;
  name: string;
}

interface Act {
  id: number;
  name: string;
  description: string;
  image: string;
  spotify: string;
  youtube: string;
  instagram: string;
  facebook: string;
  twitter: string;
  soundcloud: string;
  website: string;
  stage: number;
}

interface Data {
  locations: Location[];
  acts: Act[];
}

export {Act, ActsProps, Data, Location};
