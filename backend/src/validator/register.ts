//validator/register.ts
import { z } from "zod"

export const bloodTypes = [
    "A+","A-","B+","B-","AB+","AB-","O+","O-"
] as const;

export const genere = [
    "Masculino", "Femenino"
] as const;

export const registerValidat = z.object({
    FirstName: z.string()
        .min(2, "El nombre debe tener al menos 2 caracteres")
        .max(50, "El nombre es demasiado largo"),

    LastName: z.string()
        .min(2,"El apellido debe tener al menos 2 caracteres")
        .max(50, "El apellido es demasiado largo"),
    
    Birthdate: z.string()
        .min(8,"La fecha de nacimento debe tener año/mes/dia")
        .refine(date => !isNaN(Date.parse(date)), {message: "Formato de fecha invalida"})
        .refine(date => new Date(date) <= new Date(), { message:"La fecha de nacimiento no puede ser futura"}),
    
    Blood_Type: z.enum(bloodTypes, {
        message: "Tipo de sangre inválido"
    }),

    Gender: z.enum(genere,{
        message:"Género inválido",
    }),

    Email: z.email()
        .regex(/^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$/,
        "El formato del correo electrónico no es válido"),
    Password: z.string()
        .min(8,"La contraseña debe tener al menos 8 caracteres")
        .regex(/[0-9]/, "La contraseña debe incluir un número")
        .regex(/[A-Z]/i, "La contraseña debe incluir una letra")
        .regex(/[@$!%*?&]/, "La contraseña debe incluir un símbolo"),
    
    State: z.string().min(2, "Estado Inválido"),
    City: z.string().min(2, "Ciudad inválidad"),
    Phone: z.number()
        .refine(n => n.toString().length >= 10,{message: "Teléfono inválido"})
})