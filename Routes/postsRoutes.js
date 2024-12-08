import express from "express";
import {
  ObtenerPost,
  AddPostDB,
  ModifyPost,
  EliminarPost,
  SumarLikes,
} from "../Controllers/consultas.js";
const router = express.Router();

//ruta para obtener los posts
router.get("/post", ObtenerPost);

//Ruta para agregar un post
router.post("/post", async (req, res) => {
  try {
    const post = req.body;
    await AddPostDB(post);
    res.status(201).send("Post agregado con éxito");
  } catch (error) {
    res.status(500).send("Error al agregar el post");
  }
});

//Ruta para modificar
router.put("/post/:id", ModifyPost);

//Ruta para añadir Likes
router.put("/post/:id/like", SumarLikes);

//Ruta para borrar
router.delete("/post/:id", EliminarPost);

export default router;
