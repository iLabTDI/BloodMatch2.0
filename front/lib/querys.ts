import Tutorial from "@/components/Tutorial";
import { supabase } from "./supabase";
import bcrypt from "bcryptjs";

// export async function getDates(email, password) {
//     try {
//         const { data, error } = await supabase
//             .from("usuarios")
//             .select("*")
//             .eq("Email", email)
//             .eq("password", password);
//         if (error) {
//             console.log(error);
//         } else {
//             console.log(data);
//             return data;
//         }
//     } catch (e) {
//         console.log(e);
//     }
// }

export async function getDates(email) {
  try {
      const { data, error } = await supabase
          .from("users")
          .select("*")
          .eq("Email", email)
          .single(); // Para obtener un solo usuario

      if (error) {
          console.log("Error al obtener datos:", error);
          return null;
      }
      return data;
  } catch (e) {
      console.log("Error en getDates:", e);
      return null;
  }
}


export async function getUser(email:string){
  const {data,error }= await supabase.from("users").select("*").eq("Email",email)
  if(error){
    console.log("was an error",error)
    return false;
  }
  return data;
}

export async function generaldates() {
    const { data, error } = await supabase.from("users").select("*");

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

function hashPassword(password) {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}

export const New_User = async (
    Email,
    FirstName,
    LastName,
    Date,
    Type,
    TypeRol,
    Gen,
    Password,
    State,
    City,
    Phone,
    Url
) => {
    try {
      const hashedPassword = await hashPassword(Password);
        const { data, error } = await supabase
            .from("users")
            .insert([
                {
                    Birthdate: Date,
                    Blood_Type: Type,
                    City: City,
                    Email: Email,
                    FirstName: FirstName,
                    Gender: Gen,
                    LastName: LastName,
                    Phone: Phone,
                    Situation: null,
                    State: State,
                    Password: hashedPassword,
                    Role: TypeRol,
                    Tutorial: false,
                    Url: Url,
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

export async function getUrl(fileName) {
    const { data } = await supabase.storage
        .from("prueba")
        .getPublicUrl(fileName);
    console.log(data);
    return data;
}

export async function isExistingEmail(email) {
    try {
        // Consultar la tabla usuarios para verificar si el correo ya existe
        const { data, error } = await supabase
        .from("users")
        .select("Email")
        .eq("Email", email); 
        
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

export async function getTutorialValue(email:any) {
  if (!email) {
    console.error("Se requiere un email válido");
    return false;
  }

  console.log("el usuario es+",email)

  const { data, error } = await supabase
    .from("users")
    .select("Tutorial")
    .eq("Email", email)
    .single();

  if (error) {
    console.error("Error al consultar estadoTutorial:", error.message);
    return false;
  }
  if(data.Tutorial==="false"){
    console.log("el tuto es",data.Tutorial)
    return false
  }else{
    return true
  }
}


export async function verificateUser(email:string){
    const {data,error }= await supabase.from("users").select("Email").eq("Email",email)
    if(error){
      console.log("was an error",error)
      return false;
    }
    if(data.length>0){
      console.log ("sicces",data[0].Email)
      return true;
    }
  if (data) {
    return data.Tutorial === null ? false : data.Tutorial;
  }
}

export async function updateTutorialValue(email) {
  if (!email) {
    console.error("email no es valido");
    return null;
  }
  try {
    const { data, error } = await supabase
      .from("users")
      .update({ Tutorial: true })
      .eq("Email", email)
      .select();

    if (error) {
      console.error("hubo un error", error);
      return null;
    }
    console.log("Checando el cambio", data);
    return data;
  } catch (e) {
    console.error(e);
    return null;
  }
}