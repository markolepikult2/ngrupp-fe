import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BookingDTO } from './models';
import { environment } from './environment';

@Injectable({ providedIn: 'root' })
export class BookingService {
  constructor(private http: HttpClient) {}

  getBookingDTO(eventId: number): Observable<BookingDTO> {
    return this.http.get<BookingDTO>(`${environment.apiUrl}/api/booking/${eventId}`);
  }

  addBooking(booking: BookingDTO): Observable<BookingDTO> {
    return this.http.post<BookingDTO>(`${environment.apiUrl}/api/booking`, booking);
  }
}
