import { Routes } from '@angular/router';
import { EventList } from './event-list/event-list';
import { RoleGuard } from './role.guard';
import { AddEventComponent } from './add-event/add-event';

export const routes: Routes = [
  {
    path: 'events',
    component: EventList,
    canActivate: [RoleGuard],
    data: {allowedRoles : ['ADMIN', 'CUSTOMER', 'GUEST']}
  },
  {
    path: 'add-event',
    component: AddEventComponent,
    canActivate: [RoleGuard],
    data: {allowedRoles : ['ADMIN', 'CUSTOMER', 'GUEST']}
  }
];
