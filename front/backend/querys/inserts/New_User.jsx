// USER INSERT
import { supabase } from "../../../lib/supabase";

const New_User = async ( Email,firstName,lastName,date,type,gen,password,state,city,phone,user,url) => {
  try {
        console.log("el email es",Email)
        
        const { data, error } = await supabase
          .from('users')
          .insert([
            {
              Email: Email,
              FirstName: firstName, 
              LastName: lastName, 
              Birthdate: date, 
              Blood_Type: type, 
              Sexo: gen, 
              Password:password, 
              State: state, 
              City: city, 
              Phone: phone,
              Url:url
             

            },
          ])
          .select();

        if (error) {
          console.error('Error al insertar datos:', error);
        } else {
          console.log('Datos insertados con éxito:', data);
        }
      } catch (error) {
        console.error('Error al insertar datos 1:', error.message);
      }
    };

export default New_User;