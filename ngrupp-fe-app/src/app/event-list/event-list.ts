import { Component } from '@angular/core';
import { EventService } from '../event.service';
import { Event } from '../models';
import { CommonModule } from '@angular/common';
import { HttpClientModule} from '@angular/common/http';
import {BookingDetailsComponent} from '../booking-details/booking-details';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.html',
  imports: [CommonModule, HttpClientModule, BookingDetailsComponent],
  styleUrl: './event-list.scss'
})
export class EventList {
  events: Event[] = [];
  selectedEventId: number | null = null;

  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.eventService.getEvents().subscribe((data) => {
      this.events = data;
    });
  }

  openBookingDetails(event: Event) {
    console.log("Clicked Book Seat:", event);
    this.selectedEventId = event.id;
  }
}
