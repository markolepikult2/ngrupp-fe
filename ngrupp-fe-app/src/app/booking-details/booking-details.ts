import {Component, Input} from '@angular/core';
import { BookingDTO, Customer } from '../models';
import { BookingService } from '../booking.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.html',
  imports: [
    FormsModule,
    CommonModule
  ],
  styleUrls: ['./booking-details.scss']
})
export class BookingDetailsComponent {
  @Input() eventId: number | null = null;
  booking: BookingDTO | null = null;
  error: string | null = null;

  constructor(private bookingService: BookingService) {}

  ngOnChanges() {
    //fetchBooking() {
    if (!this.eventId) return;
    this.bookingService.getBookingDTO(this.eventId).subscribe({
      next: (data) => {
        this.booking = data;
        this.error = null;
      },
      error: (err) => {
        this.error = 'Failed to fetch booking.';
        this.booking = null;
      }
    });
  }
  bookSeat(customer: Customer) {
    if (!this.booking || !this.eventId) return;

    // Here you would typically call a booking service to handle the booking logic
    console.log(`Booking seat for customer: ${customer.firstName} ${customer.lastName} for event ID: ${this.eventId}`);

    // Reset the form or handle post-booking logic as needed
    this.booking.customers.push(customer);
  }
}

