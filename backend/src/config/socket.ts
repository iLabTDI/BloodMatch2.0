import { Server } from "socket.io";

//iniciamos el servidor socket
export function setupSocket(io: Server) {
    io.on("connection", (socket) => {
        console.log("Cliente conectado:", socket.id);
        

    socket.on("disconnect", () => {
        console.log("Cliente desconectado:", socket.id);
        });
    });
}
