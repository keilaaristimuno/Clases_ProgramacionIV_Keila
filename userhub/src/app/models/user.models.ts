//empieza con mayuscula porque es una clase, es un componente de angular
//tiene que tomar si o si el nombre del archivo
export interface User {
    id: number;
    nombre: string;
    apellido: string;
    email: string;
    avatar?: string;
    isActive: boolean;
    createdAt: Date;
}

//tiene en cuanta la esctructura de la interfaz de arriba
//filtra por todos, activos e inactivos
export type UserFilter = 'all' | 'active' | 'inactive';

//datos de prueba MOCK, es un array de usuarios, cada usuario tiene los datos que se definen en la interfaz de arriba, el id es un numero, el nombre y apellido son string, el email es string, el avatar es opcional y es un string, isActive es un booleano y createdAt es una fecha
export const MOCK_USERS: User[] = [
    {
        id: 1,
        nombre: 'juan',
        apellido: 'Perez',
        email: 'juan.perez@example.com',
        avatar: 'https://via.placeholder.com/150',
        isActive: true,
        createdAt: new Date ('2023-01-01'),
    },
    {
        id: 2,
        nombre: 'Sofía',
        apellido: 'Rodríguez',
        email: 'sofia.rod@example.com',
        isActive: false,
        createdAt: new Date('2025-01-20T14:20:00')
    },
    {
        id: 3,
        nombre: 'Mateo',
        apellido: 'García',
        email: 'm.garcia@tech.io',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mateo',
        isActive: false,
        createdAt: new Date('2024-11-05T09:15:00')
    },
    {
        id: 4,
        nombre: 'Valentina',
        apellido: 'López',
        email: 'valen.l@services.com',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Valentina',
        isActive: true,
        createdAt: new Date('2025-02-12T16:45:00')
    },
    {
        id: 5,
        nombre: 'Gaston',
        apellido: 'Vera',
        email: 'gaston.vera@tech.io',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Gaston',
        isActive: true,
        createdAt: new Date('2025-03-12T16:45:00')
    },
]
