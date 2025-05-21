import { InputHTMLAttributes } from 'react';

export type Media = {
  url: string;
  alt: string;
};

export type APIMeta = {
  currentPage: number;
  isFirstPage: boolean;
  isLastPage: boolean;
  nextPage: number;
  pageCount: number;
  previousPage: number;
  totalCount: number;
};

export type APIVenueData = {
  data: Venue[];
  meta: APIMeta;
};

export type APIBookingData = {
  data: Booking[];
  meta: APIMeta;
};

export type Profile = {
  name: string;
  email: string;
  bio: string;
  avatar: Media;
  banner: Media;
  venueManager: boolean;
  venues: Venue[];
  bookings: Booking[];
};

export type BookingData = {
  id: string;
  dateFrom: string;
  dateTo: string;
  guests: number;
  created: string;
  updated: string;
  venue: Venue;
  customer: User;
};

export type Venue = {
  id?: string;
  name: string;
  description: string;
  media: Media[];
  location: Location;
  owner?: User;
  _count?: {
    bookings: number;
  };
  price: number;
  rating: number;
  maxGuests: number;
  meta: Meta;
  bookings?: BookingData[];
};

export type Booking = {
  id: string;
  dateFrom: string;
  dateTo: string;
  guests: number;
  venue: Venue;
};

export type Location = {
  address: string;
  city: string;
  zip: string;
  country: string;
  continent?: string;
  lat?: number;
  lng?: number;
};

export type User = {
  name: string;
  email: string;
  bio: string;
  avatar: Media;
  banner: Media;
};

export type Meta = {
  breakfast: boolean;
  parking: boolean;
  pets: boolean;
  wifi: boolean;
};

export type InputType = {
  id?: string;
  labelText?: string;
  labelClass?: string;
  textarea?: boolean;
  icon?: React.ReactNode;
  name?: string;
  onButtonClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
} & InputHTMLAttributes<HTMLInputElement>;
