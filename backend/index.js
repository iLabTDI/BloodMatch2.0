const express = require("express");
const app = express();
const http = require("http").Server(app);
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");
const bcrypt = require("bcryptjs");
const supabase = createClient(
    "https://bzkasdpzbcjajoplfxyw.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ6a2FzZHB6YmNqYWpvcGxmeHl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkyODA1OTAsImV4cCI6MjA1NDg1NjU5MH0.42Oxtt82KlvOBKiDJfTHqsMB7BhCGcypp_rp08H63-s"
);

// function to hash password
async function hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
}

// function to compare passwords
async function comparePassword(input, hash) {
    return await bcrypt.compare(input, hash);
}

const conexion = async (id, currentFirstName, currentSecondName) => {
    try {
        // Crear las consultas para las dos tablas
        const insertGroup = supabase.from("savegroups2").insert([
            {
                id,
                currentGroupName: currentFirstName,
                currentSecondGroup: currentSecondName,
            },
        ]);

        const insertMessage = supabase
            .from("messages")
            .insert([{ idGroup: id }]);

        // Ejecutar las consultas en paralelo
        const [groupResult, messageResult] = await Promise.all([
            insertGroup,
            insertMessage,
        ]);

        // Manejar los resultados
        if (groupResult.error) {
            console.error("Error al insertar en savegroups2:", groupResult.error);
        }

        if (messageResult.error) {
            console.error("Error al insertar en messages:", messageResult.error);
        }
    } catch (error) {
        console.error("Error durante la operación:", error);
    }
};

const verify = (currentGroupName, currentSecondGroup) => {
    let longitud = chatgroups.length;

    for (let i = 0; i < chatgroups.length; i++) {
        if (
            (currentGroupName === chatgroups[i].currentGroupName ||
                currentGroupName === chatgroups[i].currentSecondGroup) &&
            (currentSecondGroup === chatgroups[i].currentGroupName ||
                currentSecondGroup === chatgroups[i].currentSecondGroup)
        ) {
            return 1;
        }
        if (longitud === i) {
            return 0;
        }
    }
};

const socketIO = require("socket.io")(http, {
    cors: {
        origin: "*", // Permitir todas las conexiones
    },
});

const fs = require("fs");
const path = require("path");
const PORT = 8002;

function createUniqueId() {
    return Math.random().toString(20).substring(2, 10);
}

let chatgroups = [];

// Cargar grupos de chat desde el archivo JSON cuando se inicia el servidor
async function loadChatGroups() {
    try {
        const { data: groupsData, error: groupsError } = await supabase
            .from("savegroups2")
            .select("*");
        const { data: messagesData, error: messagesError } = await supabase
            .from("messages")
            .select("*");

        if (groupsError) {
            console.error("Error loading groups:", groupsError);
            return;
        }
        if (messagesError) {
            console.error("Error loading messages:", messagesError);
            return;
        }

        if (groupsData.length > 0) {
            chatgroups = groupsData.map((group) => {
                const groupMessages = messagesData.find(
                    (message) => message.idGroup === group.id
                );

                let messages = [];
                if (groupMessages && Array.isArray(groupMessages.messages)) {
                    messages =
                        groupMessages.messages.length === 1
                            ? groupMessages.messages[0]
                            : groupMessages.messages;
                }

                return {
                    id: group.id,
                    currentGroupName: group.currentGroupName,
                    currentSecondGroup: group.currentSecondGroup,
                    messages: messages,
                };
            });

        }
    } catch (e) {
        console.error("An error occurred:", e);
    }
}

loadChatGroups();

//}

// Save chat groups to the JSON file
async function saveChatGroups() {
    try {
        const { data, error } = await supabase
            .from("saveGroups")
            .update([{ Groups: chatgroups }])
            .eq("id", "5");

        if (error) {
            console.error("there was an error", error);
        }
    } catch (error) {
        console.error("Error saving chat groups:", error);
    }
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//in this part the user is connected to the server
socketIO.on("connection", (socket) => {
    socket.on("getAllGroups", () => {
        socket.emit("groupList", chatgroups);
    });

    socket.on("deleteGroup", async ({ currentUser, secondUser }) => {
        const result = await deleteChatGroupByUsers(currentUser, secondUser);
        socket.emit("deleteGroupResult", result);
    });

    socket.on(
        "createNewGroup",
        async ({ currentGroupName, currentSecondGroup }) => {
            try {
                const newGroup = {
                    id: chatgroups.length + 1,
                    currentGroupName,
                    currentSecondGroup,
                    messages: [],
                };

                var id = chatgroups.length + 1;

                if (verify(currentGroupName, currentSecondGroup) > 0) {
                    // group already exists
                } else {
                    await conexion(id, currentGroupName, currentSecondGroup);

                    // add new group to my chat list
                    chatgroups.unshift(newGroup);

                    socketIO.emit("groupList", chatgroups);
                    //saveChatGroups();
                }
            } catch (e) {
                console.error("el error es", e);
            }
        }
    );

    socket.on("findGroup", (id) => {
        const numericId = Number(id);
        const filteredGroup = chatgroups.filter(
            (item) => item.id === numericId
        );

        if (filteredGroup.length > 0 && filteredGroup[0].messages) {
            socket.emit("foundGroup", filteredGroup[0].messages);
        } else {
            socket.emit("foundGroup", []);
        }
    });

    socket.on("encontrar", (id) => {
        const numericId = Number(id);
        //console.log("ID recibido en el servidor:", numericId); // Log para verificar el ID
        const filteredGroup2 = chatgroups.filter(
            (item) => item.id === numericId
        );

        //console.log("Grupo filtrado:", filteredGroup2);
        socket.emit("found", filteredGroup2);
    });

    socket.on("newChatMessage", async (data) => {
        const { currentChatMesage, groupIdentifier, currentUser, timeData } =
            data;

        const filteredGroup = chatgroups.filter(
            (item) => item.id === groupIdentifier
        );

        const newMessage = {
            id: createUniqueId(),
            text: currentChatMesage,
            currentUser,
            time: `${timeData.hr}:${timeData.mins}`,
        };

        // Ensure the group exists
        if (filteredGroup.length > 0) {
            if (!Array.isArray(filteredGroup[0].messages)) {
                filteredGroup[0].messages = [];
            }
            filteredGroup[0].messages.push(newMessage);
            // await sendMessages(groupIdentifier,newMessage)

            const { data, error } = await supabase
                .from("messages")
                .update([{ messages: filteredGroup[0].messages }])
                .eq("idGroup", groupIdentifier);
            if (error) {
                console.error(error);
            }

            // Emit the new message to all clients in the group room
            socket
                .to(filteredGroup[0].currentGroupName)
                .emit("groupMessage", newMessage);

            // Emit the updated list of groups and the messages of the found group to the client that sent the message
            socket.emit("groupList", chatgroups);
            socket.emit("foundGroup", filteredGroup[0].messages);

            // Save the updated chat groups
            //saveChatGroups();

            // LAUNCH PUSH NOTIFICATION*************************************************
            const token = await getUserToken(
                filteredGroup[0].currentSecondGroup
            );
            if (token !== null) {
                const messages = {
                    to: token,
                    sound: "default",
                    title: "Blood Match",
                    body: "¡Tienes un nuevo mensaje en blood match!",
                    // data: { extraData: "Datos adicionales opcionales" },
                };

                await fetch("https://exp.host/--/api/v2/push/send", {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(messages),
                });
            }
        }
    });

    socket.on("register_user", async (userData) => {
        try {
            const {
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
                Url,
                Verification_Token,
            } = userData;

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
                        Url: Url,
                        Token: null,
                        Verification_Token: Verification_Token,
                    },
                ])
                .select();

            if (error) {
                console.error("Error al registrar:", error);
                socket.emit("register_user_response", {
                    success: false,
                    error: error.message,
                });
            } else {
                socket.emit("register_user_response", { success: true, data });
            }
        } catch (err) {
            console.error("Error inesperado:", err);
            socket.emit("register_user_response", {
                success: false,
                error: "Error interno del servidor",
            });
        }
    });

    socket.on("update_password", async ({ email, newPassword }) => {
        try {
            const hashedPassword = await hashPassword(newPassword); // bcryptjs
            const { data, error } = await supabase
                .from("users")
                .update({ Password: hashedPassword })
                .eq("Email", email)
                .select();

            if (error) {
                socket.emit("update_password_response", {
                    success: false,
                    error: error.message,
                });
            } else {
                socket.emit("update_password_response", {
                    success: true,
                    data,
                });
            }
        } catch (err) {
            socket.emit("update_password_response", {
                success: false,
                error: err.message,
            });
        }
    });
});

app.get("/api", (req, res) => {
    res.json(chatgroups);
});

http.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
});

// Save chat groups to the JSON file when the server is shutting down
process.on("SIGINT", () => {
    process.exit();
});

async function getUserToken(email) {
    const { data, error } = await supabase
        .from("users")
        .select("Token")
        .eq("Email", email)
        .single();
    if (error) {
        console.error("Error al obtener el token:", error);
        return null;
    }
    return data?.Token;
}

async function deleteChatGroupByUsers(currentUser, secondUser) {
    try {
        // Buscar el grupo que coincide con los dos usuarios (sin importar el orden)
        const { data: groups, error: searchError } = await supabase
            .from("savegroups2")
            .select("*")
            .or(
                `and(currentGroupName.eq.${currentUser},currentSecondGroup.eq.${secondUser}),and(currentGroupName.eq.${secondUser},currentSecondGroup.eq.${currentUser})`
            );

        if (searchError) {
            console.error("Error al buscar el grupo:", searchError);
            return { success: false, message: "Error buscando el grupo" };
        }

        if (!groups || groups.length === 0) {
            return { success: false, message: "Grupo no encontrado" };
        }

        const groupToDelete = groups[0];
        const groupId = groupToDelete.id;

        // Eliminar de la tabla savegroups2
        const { error: deleteGroupError } = await supabase
            .from("savegroups2")
            .delete()
            .eq("id", groupId);

        if (deleteGroupError) {
            console.error("Error al eliminar el grupo:", deleteGroupError);
            return { success: false, message: "Error eliminando el grupo" };
        }

        // Eliminar de la tabla messages
        const { error: deleteMessagesError } = await supabase
            .from("messages")
            .delete()
            .eq("idGroup", groupId);

        if (deleteMessagesError) {
            console.error("Error al eliminar mensajes:", deleteMessagesError);
            return { success: false, message: "Error eliminando mensajes" };
        }

        // Eliminar del array en memoria
        chatgroups = chatgroups.filter((group) => group.id !== groupId);

        // Emitir actualizacion a todos los clientes
        socketIO.emit("groupList", chatgroups);

        return { success: true, message: "Grupo eliminado correctamente" };
    } catch (error) {
        console.error("Error general al eliminar el grupo:", error);
        return { success: false, message: "Error inesperado", error };
    }
}

const New_User = async (
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
    Url,
    Verification_Token
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
                    Status: null,
                    State: State,
                    Password: hashedPassword,
                    Role: TypeRol,
                    Url: Url,
                    Token: null,
                    Verification_Token: Verification_Token,
                },
            ])
            .select();

        if (error) {
            console.error("Error al insertar datos:", error.message);
            throw new Error("Error al insertar datos");
        }

        return data;
    } catch (error) {
        console.error("Error en registro:", error.message);
        throw new Error("Fallo al registrar usuario");
    }
};
