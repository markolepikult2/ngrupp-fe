import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EventService } from '../event.service';
import { AppEvent } from '../models';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';

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

  @Output() eventAdded = new EventEmitter<void>();

  constructor(private eventService: EventService, private router: Router) {}

  addEvent() {
    this.success = false;
    this.error = null;
    this.eventService.addEvent(this.event as AppEvent).subscribe({
      next: () => {
        this.success = true;
        this.event = { name: '', startTime: '', seats: 1 };
        this.eventAdded.emit(); // Notify parent to reload event list
        this.router.navigate(['/']); // Route to root after success
      },
      error: err => {
        this.error = err.message || 'Failed to add event.';
      }
    });
  }
}
