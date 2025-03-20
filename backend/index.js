const express = require("express");
const app = express();
const http = require("http").Server(app);
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");
// const supabase = createClient(
//   "https://abgspujwyujtccknqenr.supabase.co",
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiZ3NwdWp3eXVqdGNja25xZW5yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA0MzU5NzgsImV4cCI6MjAyNjAxMTk3OH0.NOjPxUVPBYztUlLCl6CBYg9vIrl9I58zD6bolUzqYfs"
// );
const supabase = createClient(
  "https://bzkasdpzbcjajoplfxyw.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ6a2FzZHB6YmNqYWpvcGxmeHl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkyODA1OTAsImV4cCI6MjA1NDg1NjU5MH0.42Oxtt82KlvOBKiDJfTHqsMB7BhCGcypp_rp08H63-s"
);

const conexion = async (id, currentFirstName, currentSecondName) => {
  try {
    // Crear las consultas para las dos tablas
    const insertGroup = supabase
      .from("savegroups2")
      .insert([
        {
          id,
          currentGroupName: currentFirstName,
          currentSecondGroup: currentSecondName,
        },
      ]);

    const insertMessage = supabase.from("messages").insert([{ idGroup: id }]);

    // Ejecutar las consultas en paralelo
    const [groupResult, messageResult] = await Promise.all([
      insertGroup,
      insertMessage,
    ]);

    // Manejar los resultados
    if (groupResult.error) {
      console.log("Error al insertar en savegroups2:", groupResult.error);
    } else {
      console.log(
        "Datos insertados correctamente en savegroups2:",
        groupResult.data
      );
    }

    if (messageResult.error) {
      console.log("Error al insertar en messages:", messageResult.error);
    } else {
      console.log(
        "Datos insertados correctamente en messages:",
        messageResult.data
      );
    }
  } catch (error) {
    console.error("Error durante la operación:", error);
  }
};
const verify = (currentGroupName, currentSecondGroup) => {
  console.log("los nombre son", currentGroupName, currentSecondGroup);
  let longitud = chatgroups.length;
  console.log("la longitud es", longitud);

  for (let i = 0; i < chatgroups.length; i++) {
    console.log(
      chatgroups[i].currentGroupName,
      chatgroups[i].currentSecondGroup
    );
    if (
      (currentGroupName === chatgroups[i].currentGroupName ||
        currentGroupName === chatgroups[i].currentSecondGroup) &&
      (currentSecondGroup === chatgroups[i].currentGroupName ||
        currentSecondGroup === chatgroups[i].currentSecondGroup)
    ) {
      console.log("ya se ha crreado un grupo ");
      return 1;
    }
    if (longitud === i) {
      console.log("no se encontro nada");
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
      console.log("Error loading groups:", groupsError);
      return;
    }
    if (messagesError) {
      console.log("Error loading messages:", messagesError);
      return;
    }

    console.log("Groups data:", groupsData);
    console.log("Messages data:", messagesData);

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

      console.log("Grupos actualizados correctamente:", chatgroups);
    } else {
      console.log("No hay grupos");
    }
  } catch (e) {
    console.log("An error occurred:", e);
  }
}

// Cargar los datos cuando el servidor se inicie
loadChatGroups().then(() => {
  console.log("Los grupos del log son", chatgroups);
});

//}

// Save chat groups to the JSON file
async function saveChatGroups() {
  try {
    const { data, error } = await supabase
      .from("saveGroups")
      .update([{ Groups: chatgroups }])
      .eq("id", "5");

    if (error) {
      console.log("there was an error", error);
    } else {
      //console.log("data",data)
    }

    //console.log("los chats salvados son =",chatgroups)
    console.log("Chat groups saved successfully.");
  } catch (error) {
    console.error("Error saving chat groups:", error);
  }
}

// Load the data when the server starts
(async () => {
  await loadChatGroups();
  console.log("Los grupos del log son", chatgroups);
})();

console.log("los grupos del log es", chatgroups);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//in this part the user is connected to the server
socketIO.on("connection", (socket) => {
  console.log(`${socket.id} user is just connected`);

  socket.on("getAllGroups", () => {
    socket.emit("groupList", chatgroups);
    console.log("el socket es", chatgroups);
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
          console.log("no va a hacer nada ejje");
        } else {
          await conexion(id, currentGroupName, currentSecondGroup);

          // i will print the new group
          console.log("Nuevo grupo creado:", newGroup);

          // add new group to my chat list
          chatgroups.unshift(newGroup);

          socketIO.emit("groupList", chatgroups);
          //saveChatGroups();
        }
      } catch (e) {
        console.log("el error es", e);
      }
    }
  );

  socket.on("findGroup", (id) => {
    const numericId = Number(id);
    const filteredGroup = chatgroups.filter((item) => item.id === numericId);

    if (filteredGroup.length > 0 && filteredGroup[0].messages) {
      console.log("El grupo filtrado es:", filteredGroup);
      socket.emit("foundGroup", filteredGroup[0].messages);
    } else {
      console.log("No se encontró el grupo o no tiene mensajes.");
      socket.emit("foundGroup", []);
    }
  });

  socket.on("encontrar", (id) => {
    const numericId = Number(id);
    //console.log("ID recibido en el servidor:", numericId); // Log para verificar el ID
    const filteredGroup2 = chatgroups.filter((item) => item.id === numericId);

    //console.log("Grupo filtrado:", filteredGroup2);
    socket.emit("found", filteredGroup2);
  });

  socket.on("newChatMessage", async (data) => {
    const { currentChatMesage, groupIdentifier, currentUser, timeData } = data;

    // Aquí se reciben los mensajes
    console.log("AQUI SE RECIBEN LOS MENSAJES");
    console.log("Mensaje recibido: ", currentChatMesage);


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
      console.log("elgrupo filtrado esf", filteredGroup);
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
        console.log(error);
      } else {
        console.log(data);
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
      const token = await getUserToken(filteredGroup[0].currentSecondGroup);
      console.log("TOKEN RECUPERADO DEL OTRO USUARIO: ", token);

      if(token !== null){
        const messages = {
          to: token,
          sound: "default",
          title: "Blood Match",
          body: "¡Tienes un nuevo mensaje en blood match!",
          // data: { extraData: "Datos adicionales opcionales" },
        }

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
});

app.get("/api", (req, res) => {
  res.json(chatgroups);
});

http.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});

// Save chat groups to the JSON file when the server is shutting down
process.on("SIGINT", () => {
  console.log("Saving chat groups...");
  //saveChatGroups();

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