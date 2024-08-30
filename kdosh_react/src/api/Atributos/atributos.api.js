import axios from "axios";

const atributosApi = axios.create({
  baseURL: "http://localhost:8000/kdosh/api/atributos/",
});

export const getAllAtributos = () => atributosApi.get("/");

export const getAtributo = (id) => atributosApi.get(`/${id}/`);

export const createAtributos = (atributo) => atributosApi.post("/", atributo);

export const deleteAtributos = (id) => atributosApi.delete(`/${id}`);

export const updateAtributos = (id, atributo) => atributosApi.put(`/${id}/`, atributo);
