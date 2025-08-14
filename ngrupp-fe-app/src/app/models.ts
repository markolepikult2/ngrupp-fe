export interface Event {
  id: string;
  name: string;
  startTime: string;
  seats: number;
}

export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface Booking {
  id: string;
  eventId: string;
  customerId: string;
  bookingTime: string;
}

