
const { createClient } = require("@supabase/supabase-js");
const supabase = createClient(
  "https://abgspujwyujtccknqenr.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiZ3NwdWp3eXVqdGNja25xZW5yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA0MzU5NzgsImV4cCI6MjAyNjAxMTk3OH0.NOjPxUVPBYztUlLCl6CBYg9vIrl9I58zD6bolUzqYfs"
);

const conexion = async (id, currentFirstName, currentSecondName,currentIdSecondName,currentIdGroupName) => {
  try {
    // Crear las consultas para las dos tablas

    console.log(id,currentFirstName,currentSecondName)
    const insertGroup = await supabase
      .from("matches")
      .insert([
        {
          id_matches:id,
          user1_id: currentFirstName,
          user2_id: currentSecondName,
          user1_name:currentIdGroupName,
          user2_name:currentIdSecondName,

        },
      ]);

    // const insertMessage = supabase.from("messages").insert([{ idGroup: id }]);

    // // Ejecutar las consultas en paralelo
    const [groupResult] = await Promise.all([
      insertGroup,
      //insertMessage,
    ]);

    // Manejar los resultados
    if (groupResult.error) {
      console.log("Error al insertar en savegroups2:", groupResult.error);
    } else {
      console.log("Datos insertados correctamente en savegroups2:", groupResult.data);
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


const express = require("express");
const app = express();
const http = require("http").Server(app);
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const PORT = 8002;
//allow all connections 
const socketIO = require("socket.io")(http, {
  cors: {
    origin: "*", 
  },
});
function createUniqueId() {
  return Math.random().toString(20).substring(2, 10);
}

let chatgroups = [];
let current_id=0;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
socketIO.on("connection", (socket) => {
  console.log(`${socket.id} user is just connected`);
  //console.log(" lo que hay en el grupo es ",chatgroups)
  socket.on("getAllGroups", () => {
    socket.emit("groupList", chatgroups);
   // console.log("el socket es", chatgroups);
  });
  socket.on("createNewGroup",async ({ currentGroupName, currentSecondGroup ,currentIdSecondName,currentIdGroupName}) => {
      try {
       current_id++
        const newGroup = {
          id:current_id,
          currentIdGroupName,
          currentGroupName,
          currentIdSecondName,
          currentSecondGroup,
          messages: [],
        };

        if (verify(currentGroupName, currentSecondGroup) > 0) {
          console.log("no va a hacer nada ejje");
        } else {
          await conexion(current_id, currentGroupName, currentSecondGroup,currentIdGroupName,currentIdSecondName);

          // i will print the new group
          console.log("Nuevo grupo creado:", newGroup);

          // add new group to my chat list
          chatgroups.unshift(newGroup);
          //console.log(chatgroups)
          socketIO.emit("groupList", chatgroups);

           
          //saveChatGroups();
       }
      } catch (e) {
        //console.log("el error es", e);
      }
    }
  );      
  

  socket.on("findGroup", (id) => {
    const numericId = Number(id);
    console.log("el id del gruop que llega es",numericId)
    const filteredGroup = chatgroups.filter((item) => item.id === numericId);

    if (filteredGroup.length > 0 && filteredGroup[0].messages) {
      // console.log("El grupo filtrado es:", filteredGroup);
     
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
    const filteredGroup = chatgroups.filter(
      (item) => item.id === groupIdentifier
    );

    console.log("el mesaje",groupIdentifier)

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

      const { data, error } = await supabase
        .from("matches")
        .update([{ messages: filteredGroup[0].messages }])
        .eq("id_matches", groupIdentifier);
      if (error) {
        console.log(error);
      } else {
        console.log(data);
      }

      // Emit the new message to all clients in the group room
      socket
        .to(filteredGroup[0].currentGroupName)
        .emit("groupMessage", newMessage);

        console.log("filteredGroup[0].messages",filteredGroup[0].messages)

      // Emit the updated list of groups and the messages of the found group to the client that sent the message
      socket.emit("groupList", chatgroups);
      socket.emit("foundGroup", filteredGroup[0].messages);

      // Save the updated chat groups
      //saveChatGroups();
    }
  });
});


// Cargar grupos de chat desde el archivo JSON cuando se inicia el servidor
async function loadChatGroups() {
  try {
    const { data: groupsData, error: groupsError } = await supabase
      .from("matches")
      .select("*");
   
    if (groupsError) {
      console.log("Error loading groups:", groupsError);
      return;
    }
   
    if (groupsData.length > 0) {   
      //console.log("Groups data:", groupsData);
      current_id = Math.max(...groupsData.map(group => group.id_matches), 0);
      //console.log("Starting ID:", current_id);

      chatgroups = groupsData.map((group) => {
        const groupMessages = groupsData.find(
          (message) => message.id_matches === group.id_matches
        );

        
         let messages = [];
        if (groupMessages && Array.isArray(groupMessages.messages)) {
          messages =
            groupMessages.messages.length === 1
              ? groupMessages.messages[0]
              : groupMessages.messages;
        }
        //console.log("mesages 2",messages)

        return {
          id: group.id_matches,
          currentGroupName: group.user1_id,
          currentSecondGroup: group.user2_id,
          currentIdGroupName:group.user2_name,
          currentIdSecondName:group.user1_name,
          messages: group.messages,
        };
      });

      //console.log("Grupos actualizados correctamente:", chatgroups);
    } else {
      console.log("No hay grupos");
      current_id = 0;
    }
  } catch (e) {
    console.log("An error occurred:", e);
  }
}


loadChatGroups().then(() => {
  //console.log("Los grupos del log son", chatgroups);
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

})();




//in this part the user is connected to the server

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
