import {Component, signal} from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  protected readonly title = signal('ngrupp-fe-app');
}
