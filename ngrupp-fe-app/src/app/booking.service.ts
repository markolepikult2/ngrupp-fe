import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BookingDTO } from './models';

@Injectable({ providedIn: 'root' })
export class BookingService {
  constructor(private http: HttpClient) {}

  getBookingDTO(eventId: number): Observable<BookingDTO> {
    return this.http.get<BookingDTO>(`http://localhost:8080/api/booking/${eventId}`);
  }
}

