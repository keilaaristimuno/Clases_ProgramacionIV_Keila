import { Component } from '@angular/core';
import { log } from 'console';

@Component({
  selector: 'app-header', //es el nombre del componente que se va a usar en cualquier parte de la aplicacion
  imports: [], //aqui se pueden importar otros componentes, directivas o pipes que se necesiten en el template de este componente, para trabajar dentro de los html, css o ts de este componente
  templateUrl: './header.html',
  styleUrl: './header.css',
})
//la doble llave es una forma de interpolacion en angular, se usa para mostrar el valor de una variable o una expresion dentro del template html
export class Header {
  title = 'UserHub';
  subtitle = 'Gestión de Usuarios';
  userCount = 0;

  
}


