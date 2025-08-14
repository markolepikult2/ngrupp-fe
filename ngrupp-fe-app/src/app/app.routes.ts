import { Routes } from '@angular/router';
import { EventList } from './event-list/event-list';
import { RoleGuard } from './role.guard';

export const routes: Routes = [
  {
    path: 'events',
    component: EventList,
    canActivate: [RoleGuard],
    data: {allowedRoles : ['ADMIN', 'CUSTOMER', 'GUEST']}
  }
];
