//src/config/socket.ts
import { Server, Socket } from "socket.io";
import { verifyToken } from "../utils/jwt.handle";
import { validateMatchAccess } from "../validator/ValidateMatche";

interface SocketExt extends Socket {
    user?:{
        id: number;
        email:string;
    }
}

//iniciamos el servidor socket
export function setupSocket(io: Server) {
    io.use((socket: SocketExt, next) => {
        try{
            const token = socket.handshake.auth.token;

            if(!token){
                return next(new Error("NO_TOKEN"))
            }

            const decoded = verifyToken(token) as any;

            socket.user = {
                id: decoded.id,
                email: decoded.email
            };
            next();
        }catch (e){
            return next(new Error("INVALID_TOKEN"))
        }
    })
    io.on("connection", (socket: SocketExt) => {
        const userId = socket.user?.id;

        console.log("Cliente conectado:", socket.id, "User:", userId);
        //Unirse a un chat
        socket.on("join_match", async (matchId: string) =>{
            try {
                const validation = await validateMatchAccess(matchId);

                if (!validation.valid) {
                    socket.emit("error", validation.reason);
                    return;
                }

                const room = `match_${matchId}`;

                socket.join(room);
                //Probamos que se haya creado la conexion
                console.log(`Socket ${socket.id} unido a ${room}`);
            } catch (error){
                console.error("❌ Error en join_match:", error);
                socket.emit("error", "JOIN_MATCH_ERROR");
            }
            
        })
        //Enviar mensaje
        socket.on("send_message", async (data) => {
            try {
                const { matchId, message } = data;

                const room = `match_${matchId}`;

                const messagePayload = {
                    ...message,
                    sender: userId,
                    time: new Date()
                }
                console.log("Mensaje recibido:", data);

                // Enviar a TODOS en la sala (incluyendo el emisor)
                io.to(room).emit("receive_message", messagePayload);
            } catch (error){
                console.error("❌ Error en send_message:", error);
                socket.emit("error", "SEND_MESSAGE_ERROR");
            }
        });
        socket.on("disconnect", () => {
            console.log("Cliente desconectado:", socket.id);
        });
    });
}
