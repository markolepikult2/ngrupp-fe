import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Header} from './header/header';
import { EventList } from './event-list/event-list';
import { AddEventComponent } from './add-event/add-event';
import { HttpClientModule } from '@angular/common/http';
import { AppEvent } from './models';
import { BookingDetailsComponent } from './booking-details/booking-details';
import { BookingAddComponent } from './booking-add/booking-add';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, EventList, HttpClientModule, AddEventComponent, BookingDetailsComponent, CommonModule, BookingAddComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected selectedEvent: AppEvent | null = null;

  receiveSelectedEvent($selectedEvent: AppEvent) {
    console.log("Received selected event in App component:", $selectedEvent);
    this.selectedEvent = $selectedEvent;
  }

}
