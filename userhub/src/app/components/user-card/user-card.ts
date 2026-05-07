import { Component, input, output } from '@angular/core';
import { User } from '../../models/user.models';

@Component({
  selector: 'app-user-card',
  imports: [],
  templateUrl: './user-card.html',
  styleUrl: './user-card.css',
})
export class UserCard {
  //le mando como instruccion a mi otro componente que el user es un dato de entrada, y que es obligatorio, es decir, que no puede ser undefined, y que tiene la estructura de la interfaz User
  //lo que envio:
  user = input.required<User>();
  //sabe que este es un output, lo que recibo:
  onToggleStatus = output<number>();
  onDelete = output<number>();

  //emito/retortono al componenete padre, esos output como status, como user:
  //emit es la emicion seria como un retorno, lo que hace es que cuando se llama a este metodo, se emite un evento que puede ser escuchado por el componente padre, y ese evento no tiene un valor asociado, es decir, es un evento de tipo void, lo que hace es que cuando se llama a este metodo, se notifica al componente padre que se ha producido un cambio en el estado del usuario, y el componente padre puede reaccionar a ese cambio actualizando la lista de usuarios o haciendo cualquier otra cosa que necesite hacer en respuesta a ese cambio
  toggleStatus(): void {
    this.onToggleStatus.emit(this.user().id);
  }

  deleteUser(): void {
    this.onDelete.emit(this.user().id);
  }
  
}
