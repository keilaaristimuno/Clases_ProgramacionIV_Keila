//esto es la raiz de la aplicacion, el componente principal que se renderiza en el index.html, es el punto de entrada de la aplicacion, desde aqui se pueden importar otros componentes y servicios para usarlos en toda la aplicacion

import { Component, signal } from '@angular/core';
import { Header } from './components/header/header';
import { UserList } from './components/user-list/user-list';

@Component({
  selector: 'app-root',
  imports: [Header, UserList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  
  protected readonly title = signal('userhub');
} 
