import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AppEvent, BookingDTO, Customer} from '../models';
import { BookingService } from '../booking.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { BookingAddComponent } from '../booking-add/booking-add';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.html',
  imports: [FormsModule, CommonModule, BookingAddComponent],
  styleUrls: ['./booking-details.scss']
})
export class BookingDetailsComponent {
  @Input() eventId: number | undefined;
  @Input () bookingAdded: BookingDTO | null = null; // Used to trigger re-fetching booking details
  @Output() selectedEvent = new EventEmitter<AppEvent>();
  booking: BookingDTO | null = null;
  error: string | null = null;

  constructor(private bookingService: BookingService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    // Try to get eventId from route params if not set by @Input
    if (!this.eventId) {
      this.route.paramMap.subscribe(params => {
        const id = params.get('eventId');
        if (id) {
          this.eventId = Number(id);
          this.fetchBooking();
        }
      });
    } else {
      this.fetchBooking();
    }
  }

  ngOnChanges() {
    if (this.eventId) {
      this.fetchBooking();
    }
  }

  protected fetchBooking() {
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

  notifyParentToReset()  {
    // Notify the parent component to reset the selected event
    //this.selectedEvent.emit(undefine);
    //console.log("notifyParentToReset: emit selected event in BookingDetailsComponent,", ae);
    this.router.navigate(['/']);
  }

}
