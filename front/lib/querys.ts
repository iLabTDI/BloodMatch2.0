import { supabase } from "./supabase";
import CryptoJS from 'crypto-js';
export async function getDates(user:string, password:string){

  try
  {
        const {data, error} = await supabase
        .from('usuarios')
        .select('*')
        .eq('UserName',user)
        //.eq('password',password);
        if (error) {
        console.log(error);
        }else{

        console.log(data)
        return data
        }


  }catch(e){
    console.log(e);

  }

}


export async function generaldates(){
    const {data,error} = await supabase.from('usuarios').select('*');

    console.log("los usuarios que esta agarrando son estos ", data)

    if (error) {
      console.log(error);
    }
    if (!data || data.length === 0) {
      console.log("error datos invalidos");
    }else{

        return data
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
                UserName: register.userName,
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


export const updateImages = async(filePath,formData)=>{

  try{
    console.log("el file path es ",filePath,"El forma",formData)
    const { error } = await supabase.storage
    .from("prueba")
    .upload(filePath, formData);
    if (error) throw error;

  }catch(error)
  {
    console.log(error)
  }
   
   

}


export async function handleSubmit( image:string) {
    try {
      let publicUrl = "";
      console.log("se enica",image) 
      if (image) {
        
        const fileExt = image.split(".").pop();
        console.log(fileExt)
        const fileName = image.replace(/^.*[\\\/]/, "");
        console.log(fileName)
        const filePath = `posts/${Date.now()}.${fileExt}`;
        console.log(filePath)
        const formData = new FormData();
  
        const photo = {
          uri: image,
          name: fileName,
          type: `image/${fileExt}`,
        } as unknown as Blob;
        
        formData.append("file", photo);
  
        const images=await updateImages(filePath,formData)
  
        console.log(images)
       
     return filePath
       
      }
  
  
  
    } catch (error) {
      console.log("error")
    }
  }

  export async function getUrl(fileName:string){

    const {data } = await supabase.storage.from('prueba') .getPublicUrl(fileName);
        console.log(data)

        return data;
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
  }
  