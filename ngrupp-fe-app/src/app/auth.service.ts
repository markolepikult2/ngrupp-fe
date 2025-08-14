import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type Role = 'ADMIN' | 'CUSTOMER' | 'GUEST';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentRoleSubject = new BehaviorSubject<Role>('GUEST');
  currentRole$ = this.currentRoleSubject.asObservable();

  login(role: Role) {
    this.currentRoleSubject.next(role);
  }

  logout() {
    this.currentRoleSubject.next('GUEST');
  }

  getRole(): Role {
    return this.currentRoleSubject.value;
  }
}

