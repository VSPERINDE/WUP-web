import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8000",
});

export const createSession = (email, senha) =>
  api.post("/workplace/login", { email, senha });

export const registerSession = (nome, email, senha) =>
  api.post("/workplace/register", { nome, email, senha });

export const getInfoWorkplace = (id) => api.get(`/workplace/homepage/${id}`);

export default api;
