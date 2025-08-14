import { Component } from '@angular/core';
import { EventService } from '../event.service';
import { Event } from '../models';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.html',
  styleUrl: './event-list.scss'
})
export class EventList {
  events: Event[] = [];

  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.eventService.getEvents().subscribe((data) => {
      this.events = data;
    });
  }
}
