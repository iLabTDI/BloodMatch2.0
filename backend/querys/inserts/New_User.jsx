// USER INSERT
import { supabase } from "../../../lib/supabase";

const New_User = async (UID, correo, user, apellidos, nombre, FechaNacimiento, tipoSangre, estado, muni, telefono) => {
  try {
        const { data, error } = await supabase
          .from('users')
          .insert([
            {
              id: UID,
              email: correo,
              username: user,
              last_name: apellidos,
              first_name: nombre,
              birthdate: FechaNacimiento,
              blood_type: tipoSangre,
              state: estado,
              municipio: muni,
              telephone: telefono,
            },
          ])
          .select();
        if (error) {
          console.error('Error al insertar datos:', error);
        } else {
          console.log('Datos insertados con éxito:', data);
        }
      } catch (error) {
        console.error('Error al insertar datos:', error.message);
      }
    };

export default New_User;