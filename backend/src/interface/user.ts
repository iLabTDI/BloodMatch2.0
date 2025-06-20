//interface de registro de usuarios
export interface User {
    firstName: string;  
    lastName: string;   
    birthDate: Date;    
    bloodType: string;
    gender: "Masculino" | "Femenino";  
    password: string;
    state: string;
    city: string;
    phone: number;      
    email?: string;     //normalmente se requiere en registros
}