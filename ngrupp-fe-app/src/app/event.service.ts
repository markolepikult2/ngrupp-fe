import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from './models';

@Injectable({ providedIn: 'root' })
export class EventService {
  private apiUrl = 'http://localhost:8080/api/events';

  constructor(private http: HttpClient) {}

  getEvents(): Observable<Event[]> {
    console.log("Starting GET");
    // Log the API URL for debugging purposes
    console.log(`Fetching events from: ${this.apiUrl}`);
    // Make the HTTP GET request to fetch events
    return this.http.get<Event[]>(this.apiUrl);
  }
}

