import Tutorial from "@/components/Tutorial";
import { supabase } from "./supabase";
import CryptoJS from 'crypto-js';
export async function getDates(usuario, password) {
    try {
        const { data, error } = await supabase
            .from("usuarios")
            .select("*")
            .eq("UserName", usuario)
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
export const New_User = async (register:any) => {
  try {
    const password = register.password;
    const hashedPassword = CryptoJS.SHA256(password).toString(CryptoJS.enc.Base64);
        const { data, error } = await supabase
          .from('usuarios')
          .insert([
            {
              Email: register.email,
              FirstName: register.firstName, 
              LastName: register.lastName, 
              Birthdate: register.birthDate, 
              Blood_Type: register.bloodType, 
              Gender: register.gender, 
              password:hashedPassword, 
              State: register.state, 
              City: register.municipality, 
              Phone: register.phoneNumber,
              UserName:"t",
              url:register.uriImage,
              tutorial:false,
              role:register.bloodTypeRol
             

            },
          ])
          .select();

        if (error) {
          console.error('Error al insertar datos:', error);
          return false
        } else {
          console.log('Datos insertados con éxito:', data);
          return true
        }
      } catch (error) {
        console.error('Error al insertar datos 1:', error.message);
        return false
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
        .from("usuarios")
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

export async function getTutorialValue(userName:any) {
  if (!userName) {
    console.error("Se requiere un userName válido");
    return false;
  }

  console.log("el usuario es+",userName)

  const { data, error } = await supabase
    .from("usuarios")
    .select("tutorial")
    .eq("UserName", userName)
    .single();

  if (error) {
    console.error("Error al consultar estadoTutorial:", error.message);
    return false;
  }
  if(data.tutorial===false){
    console.log("el tuto es",data.tutorial)
    return false
  }else{
    return true
  }

 
}


export async function verificateUser(usuario:string){
    const {data,error }= await supabase.from("usuarios").select("UserName").eq("UserName",usuario)
    if(error){
      console.log("was an error",error)
      return false;
    }
    if(data.length>0){
      console.log ("sicces",data[0].UserName)
      return true;
    }
  if (data) {
    return data.tutorial === null ? false : data.tutorial;
  }
}

export async function updateTutorialValue(userName) {
  if (!userName) {
    console.error("UserName no es valido");
    return null;
  }
  try {
    const { data, error } = await supabase
      .from("usuarios")
      .update({ tutorial: true })
      .eq("UserName", userName)
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