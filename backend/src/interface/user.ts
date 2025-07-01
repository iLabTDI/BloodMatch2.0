//interface de registro de usuarios
export interface User {
    FirstName: string;  
    LastName: string;   
    Birthdate: string;    
    Blood_Type: string;
    Gender: "Masculino" | "Femenino";  
    Password: string;
    State: string;
    City: string;
    Phone: number;
    Email?: string;           
}