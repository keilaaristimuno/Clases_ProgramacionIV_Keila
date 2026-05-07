import { computed, Injectable, signal, inject } from '@angular/core';
import {User, MOCK_USERS, UserFilter } from '../models/user.models';
import { HttpClient } from '@angular/common/http';

//@ es un decorador que se utiliza para marcar una clase como un servicio que puede ser inyectado en otros componentes o servicios de Angular, lo que permite compartir datos y funcionalidades entre diferentes partes de la aplicación de manera eficiente y modular.
@Injectable({
  providedIn: 'root',
})

export class UserService {
  //aca es como usar un getter:
  //readonly allUsers = this.users.asReadonly();
  //lo comento porque se duplicaba con el filterUsers:
  //readonly filterUsers = this.filter.asReadonly();
  private http = inject(HttpClient);
  private apiUrl = 'https://jsonplaceholder.typicode.com/users';
  //private users = signal<User[]>(MOCK_USERS);
      //aca en principio me va a traer todos los usuarios, pero despues lo vamos a filtrar segun el filtro que le pasemos.
  private filter = signal<UserFilter>('all');
  //user se inicializa como interfaz de tipo user pero el arrat esta vacio, lo llenamos con api
  users = signal<User[]>([]);
  loading = signal(false);
  //capturamos si existe algun error:
  error = signal<string | null>(null);

  //esto en realidad es agarrado con alambres dijo 
  constructor() {
    this.loadUsers();
  }

  //metodo cargar usarios
  loadUsers(): void {
    this.loading.set(true);
    this.error.set(null);

    //la verbalizacion get, va en corchete vacio porque no sabemos que puede devolver la api, pero sabemos que va a ser un array de usuarios, por eso le decimos que es de tipo User[]
    //el any es bastante ambiguo pero como no sabemos que va a devolver ahi si lo usamos
    this.http.get<any[]>(this.apiUrl).subscribe({
      next : (data) => {
        //definimos una constante que hacemos una transformaciones de nuestros datos de la api
        const transformed = data.map(apiUser => ({
          //definimos el json o clave valor que vamos a utilizar, tiene que estar igual al user.model.ts:
          id: apiUser.id,
          nombre: apiUser.username,
          apellido: apiUser.name,
          email: apiUser.email,
          avatar: 'https://via.placeholder.com/150',
          isActive: true,
          createdAt: new Date()
        }));
        //todo el mapeo que hixo lo va seteando:
        this.users.set(transformed);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Error al cargar usuarios');
        this.loading.set(false);
      }
    });
  }

  //aca esta implemetnado como servicio porque aca actualiza nuestra lista user
  addUser(user: Omit<User, 'id' | 'createdAt'>): void {
        const newUser: User = {
          ...user,
          id: Date.now(),
          createdAt: new Date(),
        };
      this.users.update(users => [...users, newUser]);
  }


  //wildcard, omite el id y el createdAt porque esos datos se generan automaticamente, 
  // el resto de los datos son necesarios para crear un nuevo usuario
  //addUser(user: User): void {
    //segunda validacion con los tres puntitos se trae el estado actual de los usuarios, teniendo en cuenta el formato de la interfaz y le agrega el nuevo usuario al final del array
    //this.users.update(users => [...users, user]);
   // }

    //los tres puntos ve como esta el orden de los datos en la interfaz y me trae el resto de los datos que no son id ni createdAt
      //...user,
      //id: Date.now(),
      //createdAt: new Date(),


  //borrado de un usuario, recibe el id del usuario que quiero eliminar, y me devuelve un nuevo array de usuarios sin el usuario que tiene ese id
  deleteUser(userId: number): void {
    //filtro el array de usuarios, y me quedo con todos los usuarios que no tienen el id que le pase, es decir, me borra el usuario que tiene ese id
    this.users.update(users => users.filter(u => u.id !== userId));
  }
  //actualizacion del userStatus
  toggleUserStatus(userId:number): void {
    //usa el mapeo para recorrer el array de usuarios, si encuentra el usuario con el id que le pasamos, le cambia el estado de activo a inactivo o viceversa, y si no es el usuario que estamos buscando, lo deja igual
    this.users.update(users => users.map(u => u.id === userId ? {...u, isActive: !u.isActive} : u)); 
       
  }

  setFilter(newFilter : String): void{
    if(newFilter === 'active' || newFilter === 'inactive' || newFilter === 'all') {
      this.filter.set(newFilter as UserFilter);
    }
  }

  /* computed crea valores derivados que se recalculan automaticamente cuando cambian sus dependencias, esto lo pasamos al servisio, user.ts */
  filterUsers = computed (() => {
    const currentFilter = this.filter();
    const allUsers = this.users();

    //estrictamente igual tipo y valor
    if (currentFilter === 'active') {
      //que me traiga todo lo que es activo
      return allUsers.filter(u => u.isActive);
    }

    if (currentFilter === 'inactive') {
      //que me traiga todo lo que es distinto a activo
      return allUsers.filter(u => !u.isActive);
    }
    return allUsers;

  } );

    //me devuelve el total de usuarios que tengo en el sistema, sin importar el filtro
    //toma del filterUser segun lo que pasamos por parametro, y me devuelve la cantidad de usuarios que hay en ese filtro, por ejemplo, si el filtro es active, me devuelve la cantidad de usuarios activos que tengo en el sistema
  totalCount = computed(() => this.filterUsers().length);

  activeCount = computed(() => this.users().filter(u => u.isActive).length);

}
