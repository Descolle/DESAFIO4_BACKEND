import express from "express";
import cors from "cors";
import viajesroute from "./Routes/postsRoutes.js";

const app = express();

//Middleware setup
app.use(cors());
app.use(express.json());

//Inicializa el server
app.listen(3000, console.log("Server online"));

//Ruta para los posts
app.use(viajesroute);
