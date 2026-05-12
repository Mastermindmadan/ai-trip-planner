import { User, Trip } from './types';

const USERS_KEY = 'smarttrip_users';
const CURRENT_USER_KEY = 'smarttrip_current_user';
const TRIPS_KEY = 'smarttrip_trips';

export const Storage = {
  getUsers: (): User[] => {
    const data = localStorage.getItem(USERS_KEY);
    return data ? JSON.parse(data) : [];
  },

  saveUser: (user: User) => {
    const users = Storage.getUsers();
    users.push(user);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  },

  getCurrentUser: (): User | null => {
    const data = localStorage.getItem(CURRENT_USER_KEY);
    return data ? JSON.parse(data) : null;
  },

  setCurrentUser: (user: User | null) => {
    if (user) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(CURRENT_USER_KEY);
    }
  },

  getTrips: (): Trip[] => {
    const data = localStorage.getItem(TRIPS_KEY);
    const trips = data ? JSON.parse(data) : [];
    // Only return trips belonging to current user
    const currentUser = Storage.getCurrentUser();
    if (!currentUser) return [];
    return trips.filter((t: Trip) => t.userId === currentUser.id);
  },

  saveTrip: (trip: Trip) => {
    const data = localStorage.getItem(TRIPS_KEY);
    const trips = data ? JSON.parse(data) : [];
    trips.push(trip);
    localStorage.setItem(TRIPS_KEY, JSON.stringify(trips));
  },

  deleteTrip: (tripId: string) => {
    const data = localStorage.getItem(TRIPS_KEY);
    if (!data) return;
    const trips = JSON.parse(data);
    const updatedTrips = trips.filter((t: Trip) => t.id !== tripId);
    localStorage.setItem(TRIPS_KEY, JSON.stringify(updatedTrips));
  }
};
