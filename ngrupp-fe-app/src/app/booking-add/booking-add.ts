import { Component } from '@angular/core';
import { BookingService } from '../booking.service';
import { AppEvent, Customer, BookingDTO } from '../models';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-booking-add',
  templateUrl: './booking-add.html',
  imports: [FormsModule, CommonModule],
  styleUrls: ['./booking-add.scss']
})
export class BookingAddComponent {
  eventId: number | null = null;
  firstName = '';
  lastName = '';
  personalCode = '';
  success = false;
  error: string | null = null;

  constructor(private bookingService: BookingService) {}

  submitBooking() {
    if (!this.eventId || !this.firstName || !this.lastName || !this.personalCode) {
      this.error = 'All fields are required.';
      this.success = false;
      return;
    }
    const customer: Customer = {
      id: null,
      firstName: this.firstName,
      lastName: this.lastName,
      personalCode: this.personalCode
    };
    const bookingDTO: BookingDTO = {
      event: { id: this.eventId, name: '', startTime: '', seats: 0 },
      customers: [customer]
    };
    this.bookingService.addBooking(bookingDTO).subscribe({
      next: () => {
        this.success = true;
        this.error = null;
      },
      error: () => {
        this.success = false;
        this.error = 'Failed to add booking.';
      }
    });
  }
}

