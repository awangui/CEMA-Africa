import api from "./api";

export const fetchPrograms = () =>
    api.get("/programs");

export const registerProgram = (programData) =>
    api.post("/programs", programData);

export const getProgramById = (programId) =>
    api.get(`/programs/${programId}`);

export const updateProgram = (programId, programData) =>
    api.put(`/programs/${programId}`, programData);

export const deleteProgram = (programId) =>
    api.delete(`/programs/${programId}`);

export const enrollClientInProgram = (clientId, programId) =>
    api.post(`/clients/${clientId}/programs`, { programId });

export const getClientPrograms = (clientId) =>
    api.get(`/clients/${clientId}/programs`);

export const unenrollClientFromProgram = (clientId, programId) =>
    api.delete(`/clients/${clientId}/programs/${programId}`);

export const getProgramClients = (programId) =>
    api.get(`/programs/${programId}/clients`);

export const getProgramByClientId = (clientId) =>
    api.get(`/clients/${clientId}/programs`);

