import api from "./api";

export const registerClient = (clientData) => 
  api.post("/clients", clientData);

export const getClients = () => 
  api.get("/clients");

export const fetchClientDetails = (clientId) =>
  api.get(`/clients/${clientId}`);

export const enrollClient = (clientId, programId) =>
  api.post(`/clients/${clientId}/programs`, { programId });

export const updateClient = (clientId, clientData) =>
  api.put(`/clients/${clientId}`, clientData);