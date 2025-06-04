import express from "express";
import "dotenv/config";


const app = express();

// Obtener el puerto desde las variables de entorno o usar 3000 como valor por defecto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.get('/', (req, res) => {
    res.send('holi mundo')
})