import { Component, inject } from '@angular/core';
import { UserCard } from "../user-card/user-card";
import { UserService } from '../../service/user';
import { User } from '../../models/user.models';

@Component({
  selector: 'app-user-list',
  imports: [UserCard],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css',
})
export class UserList {
  private userService = inject(UserService);
  subtitle = 'Gestion de Usuarios';
  //en vez de usar esta señal que ya la uso en user.ts service:
  //users = signal<User[]>(MOCK_USERS);
  //uso esta:
  //users = this.userService.allUsers;
  //aca llame a la señal del filtro que esta en user.ts service, para poder usarla en el html y mostrar la lista de usuarios filtrada
  filterUsers = this.userService.filterUsers;
  //nosotros no podes definir como constante las señales, necesitamos que se reasigne un nuevo valor usamos readonly para indicar que no se puede reasignar la señal en si
  //aca lo exportamos del user.ts:
  totalCount = this.userService.totalCount;

  //aca en user-list.ts, tenemos la logica de agregar un nuevo usuario, que se lo pasamos al user.ts service, y el servicio se encarga de actualizar la lista de usuarios, y como la lista de usuarios es una señal, automaticamente se actualiza en el html sin necesidad de hacer nada mas
  addUser(nombre: string, apellido: string, email: string, avatar: string, isActive: boolean): void {
    const newUser = {
      nombre: nombre, 
      apellido: apellido,
      email: email,
      avatar: avatar,
      isActive: isActive
    };
      this.userService.addUser( newUser );
  }

  deleteUser(userId: number): void {
    this.userService.deleteUser(userId);
  }

  toggleUserStatus(userId:number): void {
    this.userService.toggleUserStatus(userId);
  }

  setFilter(newFilter : String): void{
    this.userService.setFilter(newFilter);
  }

  /* refreshCount(): void{
    this.totalCount;
  } */
  
}
