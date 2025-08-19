import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppEvent } from './models';
import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })
export class EventService {
  private apiUrl = `${environment.apiUrl}/api/events`;

  constructor(private http: HttpClient) {}

  getEvents(): Observable<AppEvent[]> {
    return this.http.get<AppEvent[]>(this.apiUrl);
  }

  addEvent(event: AppEvent): Observable<AppEvent> {
    return this.http.post<AppEvent>(this.apiUrl, event);
  }
}
