import { successToast, errorToast } from "./utils/toast";
import { useEffect, useState } from "react";
import axios from "axios";  // Importar Axios

import AddPost from "./components/AddPost";
import CardPost from "./components/CardPost";

const URL = "http://localhost:3000";

export default function App() {
  const [posts, setPosts] = useState([]);

  // Obtener los posts al cargar la página
  useEffect(() => {
    getPosts()
      .then((data) => {
        setPosts(data);
      })
      .catch((err) => {
        errorToast("Error al obtener los posts");
      });
  }, []);

  // Función para obtener los posts usando Axios
  const getPosts = async () => {
    try {
      const response = await axios.get(`${URL}/post`);  // Usando Axios
      return response.data;
    } catch (error) {
      console.error("Error getting posts:", error);
      throw error;
    }
  };

  // Función para crear un post
  const createPost = async (post) => {
    try {
      const response = await axios.post(`${URL}/post`, post);  // Usando Axios
      setPosts([...posts, response.data]);  // Agregar el nuevo post al estado
      successToast("Post creado correctamente");
    } catch (err) {
      errorToast("Error al crear el post");
    }
  };

  // Función para eliminar un post por ID
  const deletePostById = async (id) => {
    try {
      await axios.delete(`${URL}/post/${id}`);  // Usando Axios
      const newPosts = posts.filter((post) => post.id !== id);  // Filtrando el post eliminado
      setPosts(newPosts);
      successToast("Post eliminado correctamente");
    } catch (err) {
      errorToast("Error al eliminar el post");
    }
  };

  // Función para agregar un like a un post por ID
  const likePostById = async (id) => {
    try {
      const response = await axios.put(`${URL}/post/${id}/like`);  // Usando Axios
      const newPosts = posts.map((post) => {
        if (post.id === id) {
          return {
            ...post,
            likes: post.likes + 1,  // Incrementando los likes
          };
        }
        return post;
      });
      setPosts(newPosts);
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">📷 Like Me 📷</h1>
      <main className="row">
        <section className="col-12 col-md-4 mt-5">
          <div className="card bg-primary text-white">
            <div className="card-body">
              <h2>Add Post</h2>
              <AddPost createPost={createPost} />
            </div>
          </div>
        </section>
        <section className="col-12 col-md-4 mt-5">
          {posts.map((post) => {
            return (
              <CardPost
                key={post.id}
                post={post}
                deletePostById={deletePostById}
                likePostById={likePostById}
              />
            );
          })}

          {posts.length === 0 && (
            <div className="card">
              <div className="card-body">
                <h2>No hay posts</h2>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
