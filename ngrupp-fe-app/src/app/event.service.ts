import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from './models';

@Injectable({ providedIn: 'root' })
export class EventService {
  private apiUrl = '/api/events';

  constructor(private http: HttpClient) {}

  getEvents(): Observable<Event[]> {
    //const mockEvents : Event[] = '[{"id":"1","name":"Concert","startTime":"2023-10-01T20:00:00Z","seats":100},{"id":"2","name":"Theater Play","startTime":"2023-10-02T19:30:00Z","seats":50}]';
  //mockEvents.subscribe
    return this.http.get<Event[]>(this.apiUrl);
    //return new Observable(mockEvents);
  }
}

