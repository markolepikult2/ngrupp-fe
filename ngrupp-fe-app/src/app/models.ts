export interface AppEvent {
  id: number;
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

export interface BookingDTO {
  event: AppEvent;
  customers: Customer[];
}
