import Tutorial from "@/components/Tutorial";
import { supabase } from "./supabase";
import bcrypt from "bcryptjs";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getDates(email: string) {
    try {
        const { data, error } = await supabase.from("users").select("*").eq("Email", email).single(); // Para obtener un solo usuario

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

export async function getUser(email: string) {
    const { data, error } = await supabase.from("users").select("*").eq("Email", email);
    if (error) {
        console.log("was an error", error);
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

export function hashPassword(password: string) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}

export const New_User = async (Email, FirstName, LastName, Date, Type, TypeRol, Gen, Password, State, City, Phone, Url) => {
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
                    Status: null,
                    State: State,
                    Password: hashedPassword,
                    Role: TypeRol,
                    Tutorial: false,
                    Url: Url,
                    Token: null,
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
        const { error } = await supabase.storage.from("prueba").upload(filePath, formData);
        if (error) throw error;
    } catch (error) {
        console.log(error);
    }
};

export async function getUrl(fileName) {
    const { data } = await supabase.storage.from("prueba").getPublicUrl(fileName);
    console.log(data);
    return data;
}

export async function isExistingEmail(email: string) {
    try {
        // Consultar la tabla usuarios para verificar si el correo ya existe
        const { data, error } = await supabase.from("users").select("Email").eq("Email", email);

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
    } catch (err: any) {
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

export async function getTutorialValue(email: any) {
    if (!email) {
        console.error("Se requiere un email válido");
        return false;
    }

    console.log("el usuario es+", email);

    const { data, error } = await supabase.from("users").select("Tutorial").eq("Email", email).single();

    if (error) {
        console.error("Error al consultar estadoTutorial:", error.message);
        return false;
    }
    if (data.Tutorial === "false") {
        console.log("el tuto es", data.Tutorial);
        return false;
    } else {
        return true;
    }
}

export async function verificateUser(email: string) {
    const { data, error } = await supabase.from("users").select("Email").eq("Email", email);
    if (error) {
        console.log("was an error", error);
        return false;
    }
    if (data.length > 0) {
        console.log("sicces", data[0].Email);
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
        const { data, error } = await supabase.from("users").update({ Tutorial: true }).eq("Email", email).select();

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

export async function getProfileImage(email: string) {
    if (!email) {
        console.error("email no es valido");
        return null;
    }
    try {
        const { data, error } = await supabase.from("users").select("Url").eq("Email", email).single();
        if (error) {
            console.log("Error al consultar la imagen de perfil:", error);
            return null;
        }
        return data?.Url || null;
    } catch (e) {
        console.log("Error en getProfileImage: ", e);
        return null;
    }
}

export async function updateStatus(email: string, newStatus: string) {
    if (!email || !newStatus) {
        console.error("Email y status son requeridos");
        return null;
    }
    try {
        const { data, error } = await supabase.from("users").update({ Status: newStatus }).eq("Email", email).select();

        if (error) {
            console.error("Error al actualizar el status:", error);
            return null;
        }
        console.log("Status actualizado con éxito:", data);
        return data;
    } catch (e) {
        console.error("Error inesperado en updateStatus:", e);
        return null;
    }
}

export async function updateRole(email, newRole) {
    if (!email || !newRole) {
        console.error("Email y Role son requeridos");
        return null;
    }
    try {
        const { data, error } = await supabase.from("users").update({ Role: newRole }).eq("Email", email).select();

        if (error) {
            console.error("Error al actualizar el Role:", error);
            return null;
        }
        console.log("Role actualizado con éxito:", data);
        return data;
    } catch (e) {
        console.error("Error inesperado en updateRole:", e);
        return null;
    }
}

export async function updateLocation(email: string, state: string, municipality: string) {
    if (!email || !state || !municipality) {
        console.error("Email, Estado y Municipio son requeridos");
        return null;
    }
    try {
        const { data, error } = await supabase.from("users").update({ State: state, City: municipality }).eq("Email", email).select();

        if (error) {
            console.error("Error al actualizar la ubicación:", error);
            return null;
        }
        console.log("Ubicación actualizada con éxito:", data);
        return data;
    } catch (e) {
        console.error("Error inesperado en updateLocation:", e);
        return null;
    }
}

export async function updatePhone(email: string, newPhone: string) {
    if (!email || !newPhone) {
        console.error("Email y teléfono son requeridos");
        return null;
    }
    try {
        const { data, error } = await supabase.from("users").update({ Phone: newPhone }).eq("Email", email).select();

        if (error) {
            console.error("Error al actualizar el número de teléfono:", error);
            return null;
        }
        console.log("Teléfono actualizado con éxito:", data);
        return data;
    } catch (e) {
        console.error("Error inesperado en updatePhone:", e);
        return null;
    }
}

export async function rejectUser(userId: number): Promise<void> {
    try {
        const rejectedUsers: number[] = JSON.parse((await AsyncStorage.getItem("rejectedUsers")) || "[]");

        rejectedUsers.push(userId);
        await AsyncStorage.setItem("rejectedUsers", JSON.stringify(rejectedUsers));
    } catch (error) {
        console.error("Error guardando el usuario rechazado:", error);
    }
}

export async function setExpoTokenNotification(email: string, token: string) {
    try {
        const { data, error } = await supabase.from("users").update({ Token: token }).eq("Email", email).select();

        if (error) {
            console.error("Error al actualizar el token: ", error);
            return null;
        }
        console.log("Token actualizado: ", data);
        return data;
    } catch (e) {
        console.error("Error inesperado en setExpoTokenNotification:", e);
        return null;
    }
}

export async function addReport(user: string, reason: string, reportedBy: string) {
    try {
        const { error } = await supabase.from("reports").insert([{ user, reason, reportedBy }]);

        if (error) {
            console.error("Error al agregar reporte:", error.message);
            return { success: false, error: error.message };
        }

        return { success: true };
    } catch (err: any) {
        console.error("Error inesperado:", err);
        return { success: false, error: err.message || "Unexpected error" };
    }
}

export async function deleteUserByEmail(email: string) {
    if (!email) {
        console.error("Email is required to delete a user");
        return;
    }

    const { data, error } = await supabase.from("users").delete().eq("Email", email);

    if (error) {
        console.error("Error deleting user:", error.message);
        return { success: false, error };
    }

    return { success: true, data };
}

export async function addToSupport(type: string, subject: string, message: string, user: string) {
    try {
        const { error } = await supabase.from("support").insert([{ type, subject, message, user }]);

        if (error) {
            console.error("Error al agregar registro al soporte:", error.message);
            return { success: false, error: error.message };
        }

        return { success: true };
    } catch (err: any) {
        console.error("Error inesperado:", err);
        return { success: false, error: err.message || "Unexpected error" };
    }
}

export async function updatePassword(email: string, newPassword: string) {
    if (!email || !newPassword) {
        console.error("Email y password son requeridos");
        return null;
    }
    try {
        const hashedPassword = await hashPassword(newPassword);
        const { data, error } = await supabase.from("users").update({ Password: hashedPassword }).eq("Email", email).select();

        if (error) {
            console.error("Error al actualizar la contraseña:", error);
            return null;
        }
        console.log("Password actualizado con éxito:", data);
        return data;
    } catch (e) {
        console.error("Error inesperado en updatePassword:", e);
        return null;
    }
}
