import {isExistingEmail} from "../lib/querys"

const validations = {
    firstName: (val) => {
        return (val && val.trim() !== "") ? true : {message: "El nombre es obligatorio"};
    },

    lastName: (val) => {
        return (val && val.trim() !== "") ? true : {message: "El Apellido es obligatorio"};
    },

    birthDate: (val) => {
        if (!val) {
            return {message: "La fecha de nacimiento es obligatoria"};
        }

        const date = new Date(val);
        if (isNaN(date)) {
          return {message: "La fecha de nacimiento no es válida"};
        }
        
        const today = new Date(); 
        if (date > today) {
          return {message: "La fecha de nacimiento no puede ser en el futuro"};
        }
        
        const age = today.getFullYear() - date.getFullYear();
        const monthDiff = today.getMonth() - date.getMonth();
        const dayDiff = today.getDate() - date.getDate();
        const isUnderage = age < 18 || (age === 18 && (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)));
        if (isUnderage) {
          return {message: "Debes tener al menos 18 años"};
        }
    
        if (age > 100) {
          return {message: "La fecha de nacimiento no puede ser mayor a 100 años"};
        }
    
        return true;
    },

    // No validations thanks to the graphical interface
    // gender: (val) => {
    // },

    state: (val) => {
        return (val && val !== "Estado") ? true : {message: "Estado invalido"};
    },

    municipality: (val) => {
        return (val && val !== "Municipio") ? true : {message: "Municipio invalido"};
    },

    phoneNumber: (val) => {
        if (!val || val.trim() === "") return {message: "El número de teléfono es obligatorio"};
    
        const phoneRegex = /^\+?[0-9\s\-\(\)]{7,15}$/;
        if (!phoneRegex.test(val)) {
            return {message: "El número de teléfono no es válido"};
        }
    
        const digitCount = val.replace(/\D/g, "").length;
        if (digitCount < 7 || digitCount > 15) {
            return {messsage: "El número de teléfono debe tener entre 7 y 15 dígitos"};
        }
    
        return true;
    },

    email: async (val) => {
        if (!val || val.trim() === "") return {message: "El correo electrónico es obligatorio"};
    
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!emailRegex.test(val)) return {message: "El correo electrónico no es válido"};
    
        let vEmail = await isExistingEmail(val);
        if(vEmail) return {message: "El correo proporcionado ya se encuentra en uso, por favor use otro"};
        console.log("EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE");

        return true;
    },

    password: (val) => {
        if (!val || val.trim() === "") return {message: "La contraseña es obligatoria"};
    
        if (val.length < 8) return {message: "La contraseña debe tener al menos 8 caracteres"};
    
        if (!/[A-Z]/.test(val)) return {message: "La contraseña debe incluir al menos una letra mayúscula"};
    
        if (!/[a-z]/.test(val)) return {message: "La contraseña debe incluir al menos una letra minúscula"};
    
        if (!/[0-9]/.test(val)) return {message: "La contraseña debe incluir al menos un número"};
    
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(val)) return {message: "La contraseña debe incluir al menos un carácter especial"};
    
        if (/\s/.test(val)) return {message: "La contraseña no puede contener espacios"};
    
        return true;
    },

    passwordConfirm: (val, val2) => {
        if (!val || val.trim() === "") return { message: "La confirmación de contraseña es obligatoria" };

        if (!val2 || val2.trim() === "") return { message: "La confirmación de contraseña es obligatoria" };

        if (val !== val2) return { message: "Las contraseñas no coinciden" };

        return true;
    },

    // No validations thanks to the graphical interface
    // bloodTypeRol: (val) => {
    // },

    bloodType: (val) => {
        return (val && val !== "Grupo sanguíneo") ? true : {message: "Tipo de sangre invalido"};
    },

    image: (val) => {
        return (val.length > 0) ? true : {message: "Error al seleccionar la imagen"};
    },

    termsAgree: (val) => {
        return val ? true : {message: "Acepte los terminos y condiciones"};
    },
}

export default validations;