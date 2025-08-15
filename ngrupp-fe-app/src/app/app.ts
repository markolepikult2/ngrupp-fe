import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header} from './header/header';
import {EventList} from './event-list/event-list';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, EventList, HttpClientModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('ngrupp-fe-app');
}
