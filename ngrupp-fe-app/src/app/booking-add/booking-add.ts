import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BookingService } from '../booking.service';
import { Customer, BookingDTO } from '../models';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-booking-add',
  templateUrl: './booking-add.html',
  imports: [FormsModule, CommonModule],
  styleUrls: ['./booking-add.scss']
})
export class BookingAddComponent implements OnInit {
  eventId: number | '' = '';
  firstName = '';
  lastName = '';
  personalCode = '';
  success = false;
  error: string | null = null;

  @Output() bookingAdded = new EventEmitter<void>();

  constructor(private bookingService: BookingService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('eventId');
      if (id) {
        this.eventId = Number(id);
      }
    });
  }


  submitBooking() {
    if (this.eventId === '' || !this.firstName || !this.lastName || !this.personalCode) {
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
      event: { id: Number(this.eventId), name: '', startTime: '', seats: 0 },
      customers: [customer]
    };
    this.bookingService.addBooking(bookingDTO).subscribe({
      next: () => {
        this.success = true;
        this.error = null;
        this.bookingAdded.emit(); // Notify parent to reload booking list
      },
      error: () => {
        this.success = false;
        this.error = 'Failed to add booking.';
      }
    });
  }
}
