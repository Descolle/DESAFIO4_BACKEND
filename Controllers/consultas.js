import pool from "../Config/config.js";

//obtener todos los viajes

const ObtenerPost = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM posts");
    res.json(result.rows);
  } catch (error) {
    res.status(500).send("Error al obtener los posts");
  }
};

const AddPostDB = async (post) => {
  try {
    const { titulo, img, descripcion, likes = 0 } = post;
    const agregar =
      "INSERT INTO posts (titulo, img, descripcion, likes) VALUES($1, $2, $3, $4)";
    const values = [titulo, img, descripcion, likes];
    const result = await pool.query(agregar, values);
    return result;
  } catch (error) {
    throw new Error("Error al agregar el post");
  }
};


const ModifyPost = async (req, res) => {
  const { id } = req.params;
  const { titulo, descripcion } = req.query;

  try {
    const query =
      "UPDATE posts SET titulo = $1, descripcion = $2 WHERE id = $3 RETURNING *";
    const values = [titulo, descripcion, id];
    const result = await pool.query(query, values);
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating post:", error.message);
    res.status(500).send("Error al modificar el post");
  }
};

const EliminarPost = async (req, res) => {
  const { id } = req.params;
  try {
    const query = "DELETE FROM posts WHERE id = $1";
    const values = [id];
    const result = await pool.query(query, values);
  } catch (error) {
    console.error("Error deleting post:", error.message);
    throw error;
  }
};

const SumarLikes = async (req, res) => {
  const { id } = req.params;

  try {
    const query =
      "UPDATE posts SET likes = likes + 1 WHERE id = $1 RETURNING *";
    const values = [id];
    const result = await pool.query(query, values);

    if (result.rowCount === 0) {
      return res.status(404).send("Post no encontrado");
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error al sumar likes:", error.message);
    res.status(500).send("Error al sumar likes");
  }
};

export { ObtenerPost, AddPostDB, ModifyPost, EliminarPost, SumarLikes };
