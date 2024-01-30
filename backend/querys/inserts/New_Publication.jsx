// PUB INSERT
import { supabase } from "../../../lib/supabase";

const New_Publication = async (id, nombre, sangre, apellidos, descripcion, estado) => {
  try {
        const { data, error } = await supabase
          .from('publicaciones')
          .insert([
            {
              UID: id,
              first_name: nombre,
              blood_type: sangre,
              last_name: apellidos,
              description: descripcion,
              state: estado,
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

export default New_Publication;