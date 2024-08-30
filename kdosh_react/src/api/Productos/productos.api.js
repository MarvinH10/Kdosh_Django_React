import axios from "axios";

const productosApi = axios.create({
  baseURL: "http://localhost:8000/kdosh/api/productos/",
});

export const getAllProductos = () => productosApi.get("/");

export const getProducto = (id) => productosApi.get(`/${id}/`);

export const createProductos = (producto) => productosApi.post("/", producto);

export const deleteProductos = (id) => productosApi.delete(`/${id}`);

export const updateProductos = (id, producto) => productosApi.put(`/${id}/`, producto);
