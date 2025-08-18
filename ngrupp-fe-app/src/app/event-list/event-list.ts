import {Component, EventEmitter, Output} from '@angular/core';
import { EventService } from '../event.service';
import { AppEvent } from '../models';
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
  @Output() selectedEvent = new EventEmitter<AppEvent>();
  events: AppEvent[] = [];
  selectedEventId: number | null = null;

  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.eventService.getEvents().subscribe((data) => {
      this.events = data;
    });
  }

  openBookingDetails(event: AppEvent) {
    console.log("Clicked Book Seat:", event);
    this.selectedEventId = event.id;
    this.selectedEvent.emit(event);
  }
}
