import {Component, EventEmitter, Output, inject} from '@angular/core';
import { EventService } from '../event.service';
import { AppEvent } from '../models';
import { CommonModule } from '@angular/common';
import { HttpClientModule} from '@angular/common/http';
import {BookingDetailsComponent} from '../booking-details/booking-details';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { AddEventComponent } from '../add-event/add-event';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.html',
  imports: [CommonModule, HttpClientModule, BookingDetailsComponent, AddEventComponent],
  styleUrl: './event-list.scss'
})
export class EventList {
  @Output() selectedEvent = new EventEmitter<AppEvent>();
  @Output() bookSeat = new EventEmitter<number>();
  events: AppEvent[] = [];
  selectedEventId: number | null = null;
  isLoggedOn = false;
  private authService = inject(AuthService);

  constructor(private eventService: EventService, private router: Router) {
    this.authService.currentRole$.subscribe(role => {
      this.isLoggedOn = role !== 'GUEST';
    });
  }

  ngOnInit() {
    this.eventService.getEvents().subscribe((data) => {
      this.events = data;
    });
  }

  openBookingDetails(event: AppEvent) {
    console.log("Opening booking details for event:", event);
    this.selectedEvent.emit(event);
    this.selectedEventId = event.id;
    this.router.navigate(['/booking-details', event.id]);
  }

  reloadEvents() {
    this.eventService.getEvents().subscribe((data) => {
      this.events = data;
    });
  }
}
