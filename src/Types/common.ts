import { InputHTMLAttributes } from 'react';

export type Media = {
  url: string;
  alt: string;
};

export type Venue = {
  id: string;
  name: string;
  description: string;
  media: Media[];
  location: Location;
  owner: User;
  count: {
    bookings: number;
  };
  price: number;
  rating: number;
};

export type Location = {
  address: string;
  city: string;
  zip: string;
  country: string;
  continent: string;
  lat: number;
  lng: number;
};

export type User = {
  name: string;
  email: string;
  bio: string;
  avatar: Media;
  banner: Media;
};

export type Amenities = {
  wifi: boolean;
  parking: boolean;
  breakfast: boolean;
  pets: boolean;
};

export type InputType = {
  id?: string;
  labelText?: string;
  textarea?: boolean;
  icon?: React.ReactNode;
  name?: string;
  onButtonClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
} & InputHTMLAttributes<HTMLInputElement>;
