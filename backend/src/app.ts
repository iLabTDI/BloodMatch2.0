import express from "express";
import homeRoute from "./routes";
import { createServer } from "http"; // Necesario para vincular socket.io con express
import { setupSocket } from "./config/socket";
import { Server } from "socket.io";
import { env } from "./config/env";
import "dotenv/config";

const app = express();
const httpServer = createServer(app); // Creamos el servidor HTTP a partir de Express

const io = new Server(httpServer, {
    cors: {
     origin: "*", // Permitir todas las conexiones, ajústalo según tu entorno
    },
});
//iniciamos el servidor socket
setupSocket(io);

app.use(homeRoute);//Usamos el manejador de rutas

// Endpoints HTTP
app.get("/", (req, res) => {
    res.send("holi mundo");
});

// Iniciar el servidor HTTP (y por ende Express + WebSockets)
httpServer.listen(env.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${env.PORT}`);
});
