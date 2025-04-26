import { useState, useEffect } from "react";
import ClientList from "../components/ClientList";
import { getClients } from "../services/clientService";

export default function Clients() {
  const [clients, setClients] = useState([]);

  const fetchClients = async () => {
    try {
      const response = await getClients();
      setClients(response.data);
    } catch (error) {
      console.error("Failed to fetch clients:", error);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  return (
    <div className="container mx-auto p-8 w-5/6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-secondary text-2xl font-bold mb-6">
          Client Management
        </h1>
        <a href="/clients/enroll" className="btn">
          Add New Client
        </a>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <ClientList clients={clients} onRefresh={fetchClients} />
      </div>
    </div>
  );
}
