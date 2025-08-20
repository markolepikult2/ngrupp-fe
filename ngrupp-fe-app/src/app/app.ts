import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Header} from './header/header';
import { HttpClientModule } from '@angular/common/http';
import { AppEvent } from './models';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, HttpClientModule, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected selectedEvent: AppEvent | null = null;

  constructor(private router: Router) {}

  ngOnInit() {
    // Restore selectedEvent from localStorage on app load
    const storedEvent = localStorage.getItem('selectedEvent');
    if (storedEvent) {
      this.selectedEvent = JSON.parse(storedEvent);
    }
    // Listen for router navigation events
    this.router.events.subscribe(event => {
      console.log("App component: router event:", event);
      console.log("App component: router event:", event.type);
      if (event instanceof NavigationEnd && event.urlAfterRedirects === '/') {
        // Run reset logic when navigating to root
        const storedEvent = localStorage.getItem('selectedEvent');
        if (storedEvent) {
          this.selectedEvent = JSON.parse(storedEvent);
        } else {
          this.selectedEvent = null;
        }
        // Add any additional reset logic here
      }
    });
  }
}
