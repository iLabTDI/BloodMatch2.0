import express from "express";
import homeRoute from "./routes";
import { createServer } from "http"; // Necesario para vincular socket.io con express
import { setupSocket } from "./config/socket";
import { Server } from "socket.io";
import { env } from "./config/env";
import { requestLogger } from "./middleware/logger";
import "dotenv/config";

const app = express();
const httpServer = createServer(app);

// Primero: Middlewares globales
app.use(express.json()); // ✅ Ahora está antes

//Middleware para el monitoreo 
app.use(requestLogger);

// Segundo: Rutas
app.use(homeRoute); // ✅ Ahora sí funciona req.body en tus rutas

// Tercero: Socket y otras cosas
const io = new Server(httpServer, {
    cors: {
        origin: "*",
    },
});
setupSocket(io);

// Otros endpoints de prueba
app.get("/", (req, res) => {
    res.send("holi mundo");
});

// Servidor
httpServer.listen(env.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${env.PORT}`);
});

