import axios from "axios";

const categoriasApi = axios.create({
  baseURL: "http://localhost:8000/kdosh/api/categorias/",
});

export const getAllCategorias = () => categoriasApi.get("/");

export const getCategoria = (id) => categoriasApi.get(`/${id}/`);

export const createCategorias = (categoria) => categoriasApi.post("/", categoria);

export const deleteCategorias = (id) => categoriasApi.delete(`/${id}`);

export const updateCategorias = (id, categoria) => categoriasApi.put(`/${id}/`, categoria);
