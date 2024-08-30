import axios from "axios";

const valores_atributosApi = axios.create({
  baseURL: "http://localhost:8000/kdosh/api/valores_atributos/",
});

export const getAllValoresAtributos = () => valores_atributosApi.get("/");

export const getValorAtributo = (id) => valores_atributosApi.get(`/${id}/`);

export const createValoresAtributos = (valor_atributo) => valores_atributosApi.post("/", valor_atributo);

export const deleteValoresAtributos = (id) => valores_atributosApi.delete(`/${id}`);

export const updateValoresAtributos = (id, valor_atributo) => valores_atributosApi.put(`/${id}/`, valor_atributo);
