export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
}

export interface Location {
  name: string;
  lat: number;
  lng: number;
  description?: string;
}

export interface DayItinerary {
  day: number;
  activities: {
    time: string;
    title: string;
    description: string;
    location?: Location;
  }[];
}

export interface Recommendation {
  id: string;
  type: 'hotel' | 'food';
  name: string;
  rating: number;
  price: string;
  image: string;
  link: string;
  cuisine?: string;
}

export interface Trip {
  id: string;
  userId: string;
  title: string;
  startLocation: string;
  destination: string;
  duration: number;
  budget: string;
  style: string;
  interests: string[];
  transport: string;
  itinerary: DayItinerary[];
  hotels: Recommendation[];
  restaurants: Recommendation[];
  estimatedCost: number;
  createdAt: string;
}

export interface Package {
  id: string;
  name: string;
  duration: string;
  price: string;
  rating: number;
  highlights: string[];
  image: string;
}
