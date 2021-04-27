import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  appPages = [
    { title: 'Inicio', url: '/home', icon: 'home' },
    { title: 'Mis reservas', url: '/reserves', icon: 'list' },
    { title: 'Salir', url: '/salir', icon: 'log-out-outline' },
  ];

  constructor() { }
}
