import api from "./api";

export async function registerClient(clientData) {
  try {
    const response = await api.post("/clients", clientData);
    return response.data;
  } catch (error) {
    console.error("Error in registerClient:", error);
    throw error;
  }
}

export const getClients = () => 
  api.get("/clients");

export const fetchClientDetails = (clientId) =>
  api.get(`/clients/${clientId}`);

export const enrollClient = (clientId, programId) =>
  api.post(`/clients/${clientId}/programs`, { programId });

export const updateClient = (clientId, clientData) =>
  api.put(`/clients/${clientId}`, clientData);

export const deleteClient = (clientId) =>
  api.delete(`/clients/${clientId}`);

import axios from 'axios';

export const searchClients = async (query) => {
  try {
    const response = await axios.get(`http://127.0.0.1:5000/clients/search`, {
      params: { q: query }  
    });
    return response.data;
  } catch (error) {
    console.error("Error searching clients:", error);
    throw error; 
  }
};
