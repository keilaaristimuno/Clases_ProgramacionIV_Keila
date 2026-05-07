//se crea una clase con metodos utils para formatear datos de usuarios
//importo la interfaz User para usarla en los metodos de esta clase
import {User} from "./user.models";

//mismo nombre que el archivo, para que sea mas facil de encontrar y usar en otros archivos
export class UserUtil {
    //metodo estatico para obtener el nombre completo de un usuario
    //user: User tipo de dato usuario, el resultado es un string con el nombre completo del usuario
    static getFullName(user: User): string {
        return `${user.nombre} ${user.apellido}`;
    }

    static getInitials(user: User): string {
        //agarra la primera letra del nombre y la primera letra del apellido, las concatena y las convierte a mayuscula
        return `${user.nombre.charAt(0)}${user.apellido.charAt(0)}`.toUpperCase();
    }

    static formatDate(date: Date): string{
        //formatea la fecha a un formato legible para el usuario, en este caso se muestra el dia, mes abreviado y año, usando el locale es-AR para que se muestre en español de Argentina
        return date.toLocaleDateString('es-AR', {
            day: 'numeric',
            month: 'short', //abreviatura del mes: ene,feb, mar
            year: 'numeric'
        });
    }

}