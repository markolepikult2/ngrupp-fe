import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../environments/environment';
import { map, switchMap } from 'rxjs/operators';

export type Role = 'ADMIN' | 'CUSTOMER' | 'GUEST';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentRoleSubject = new BehaviorSubject<Role>('GUEST');
  currentRole$ = this.currentRoleSubject.asObservable();
  private csrfToken: string | null = null;
  private usernameSubject = new BehaviorSubject<string>('');
  username$ = this.usernameSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(role: Role) {
    this.currentRoleSubject.next(role);
  }

  logout() {
    this.currentRoleSubject.next('GUEST');
    this.usernameSubject.next(''); // Reset username on logout
  }

  getRole(): Role {
    return this.currentRoleSubject.value;
  }

   private fetchCsrfTokenFromLogin(): Observable<string> {
    return this.http.get(`${environment.apiUrl}/login`, { responseType: 'text', withCredentials: true }).pipe(
      map(html => {
        // Parse CSRF token from HTML input field
        const match = html.match(/<input[^>]+name=["']_csrf["'][^>]+value=["']([^"']+)["']/);
        if (match && match[1]) {
          this.csrfToken = match[1];
          return this.csrfToken;
        }
        throw new Error('CSRF token not found in login page');
      })
    );
  }

  loginWithCredentials(username: string, password: string): Observable<Role> {
    const doLogin = (token: string | null) => {
      // Prepare form data as application/x-www-form-urlencoded
      const body = new HttpParams()
        .set('username', username)
        .set('password', password)
        .set('_csrf', token || '');
      return this.http.post<any>(`${environment.apiUrl}/login`, body.toString(), {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).pipe(
        map(response => {
          const role: Role = response.role || 'CUSTOMER';
          this.currentRoleSubject.next(role);
          this.usernameSubject.next(username); // Set username on login
          return role;
        })
      );
    };


    if (this.csrfToken) {
      return doLogin(this.csrfToken);
    } else {
      return this.fetchCsrfTokenFromLogin().pipe(
        switchMap(token => doLogin(token))
      );
    }
  }
}
