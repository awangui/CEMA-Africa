import api from "./api";

export const registerClient = (clientData) => 
  api.post("/clients", clientData);

export const getClients = () => 
  api.get("/clients");

export const enrollClient = (clientId, programId) =>
  api.post(`/clients/${clientId}/programs`, { programId });