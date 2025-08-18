import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header} from './header/header';
import { EventList } from './event-list/event-list';
import { AddEventComponent } from './add-event/add-event';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, EventList, HttpClientModule, AddEventComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

}
