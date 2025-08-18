import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EventService } from '../event.service';
import { AppEvent } from '../models';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-add-event',
  standalone: true,
  templateUrl: './add-event.html',
  styleUrls: ['./add-event.scss'],
  imports: [FormsModule, NgIf]
})
export class AddEventComponent {
  event: Partial<AppEvent> = {
    name: '',
    startTime: '',
    seats: 1
  };
  success = false;
  error: string | null = null;

  constructor(private eventService: EventService) {}

  addEvent() {
    this.success = false;
    this.error = null;
    this.eventService.addEvent(this.event as AppEvent).subscribe({
      next: () => {
        this.success = true;
        this.event = { name: '', startTime: '', seats: 1 };
      },
      error: err => {
        this.error = err.message || 'Failed to add event.';
      }
    });
  }
}
