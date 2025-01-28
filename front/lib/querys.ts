import { supabase } from "./supabase";

export async function getDates(email, password) {
    try {
        const { data, error } = await supabase
            .from("usuarios")
            .select("*")
            .eq("Email", email)
            .eq("password", password);
        if (error) {
            console.log(error);
        } else {
            console.log(data);
            return data;
        }
    } catch (e) {
        console.log(e);
    }
}

export async function generaldates() {
    const { data, error } = await supabase.from("usuarios").select("*");

    console.log("los usuarios que esta agarrando son estos ", data);

    if (error) {
        console.log(error);
    }
    if (!data || data.length === 0) {
        console.log("error datos invalidos");
    } else {
        return data;
    }
}

export const New_User = async (
    Email,
    firstName,
    lastName,
    date,
    type,
    gen,
    password,
    state,
    city,
    phone,
    user,
    url
) => {
    try {
        const { data, error } = await supabase
            .from("usuarios")
            .insert([
                {
                    Email: Email,
                    FirstName: firstName,
                    LastName: lastName,
                    Birthdate: date,
                    Blood_Type: type,
                    Sexo: gen,
                    password: password,
                    State: state,
                    City: city,
                    Phone: phone,
                    UserName: user,
                    url: url,
                },
            ])
            .select();
        if (error) {
            console.error("Error al insertar datos:", error);
            throw new Error("Error al insertar datos:", error);
        } else {
            console.log("Datos insertados con éxito:", data);
        }
    } catch (error) {
        console.error("Error al insertar datos 1:", error.message);
        throw new Error("Error al insertar datos 2:", error);
    }
};

export const updateImages = async (filePath, formData) => {
    try {
        console.log("el file path es ", filePath, "El forma", formData);
        const { error } = await supabase.storage
            .from("prueba")
            .upload(filePath, formData);
        if (error) throw error;
    } catch (error) {
        console.log(error);
    }
};

export async function handleSubmit(image) {
    try {
        let publicUrl = "";
        console.log("se enica", image);
        if (image) {
            const fileExt = image.split(".").pop();
            console.log(fileExt);
            const fileName = image.replace(/^.*[\\\/]/, "");
            console.log(fileName);
            const filePath = `posts/${Date.now()}.${fileExt}`;
            console.log(filePath);
            const formData = new FormData();

            const photo = {
                uri: image,
                name: fileName,
                type: `image/${fileExt}`,
            } as unknown as Blob;

            formData.append("file", photo);

            const images = await updateImages(filePath, formData);

            console.log(images);

            return filePath;
        }
    } catch (error) {
        console.log("error");
    }
}

export async function getUrl(fileName) {
    const { data } = await supabase.storage
        .from("prueba")
        .getPublicUrl(fileName);
    console.log(data);

    return data;
}

// export async function verificateUser(usuario){
//   const {data,error }= await supabase.from("usuarios").select("UserName").eq("UserName",usuario)
//   if(error){
//     console.log("was an error",error)
//     return false;
//   }
//   if(data.length>0){
//     console.log ("sicces",data[0].UserName)
//     return true;
//   }
// }

export async function isExistingEmail(email) {
    try {
        // Consultar la tabla "usuarios" para verificar si el correo ya existe
        const { data, error } = await supabase
            .from("usuarios")
            .select("Email") // Selecciona solo la columna "Email"
            .eq("Email", email); // Asegúrate de comparar en minúsculas si aplica

        if (error) {
            console.error("Hubo un error al consultar Supabase:", error.message);
            return true;
        }

        // Si la consulta devuelve datos, significa que el correo ya existe
        if (data && data.length > 0) {
            console.log("El correo ya está registrado:", data[0].Email);
            return true;
        }

        // Si no hay datos, el correo no está registrado
        console.log("El correo no está registrado. Puede usarse.");
        return false;
    } catch (err) {
        console.error("Error inesperado:", err.message);
        return true;
    }
}
