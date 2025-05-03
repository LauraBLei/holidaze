import { Meta, Media, User, Venue } from './common';

export type ProfileData = {
  name: string;
  email: string;
  bio: string;
  avatar: Media;
  banner: Media;
  venueManager: boolean;
  venues: Venue[];
};

export type BookingData = {
  id: string;
  dateFrom: string;
  dateTo: string;
  guest: number;
  created: string;
  updated: string;
  venue: Venue;
  customer: User;
};

export type VenueData = {
  id: string;
  name: string;
  description: string;
  media: Media;
  price: number;
  maxGuests: number;
  rating: number;
  created: string;
  updated: string;
  meta: Meta;
  location: Location;
  owner: User;
  bookings: BookingData[];
};
