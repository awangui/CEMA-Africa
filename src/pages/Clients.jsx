import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ClientList from "../components/ClientList";
import { getClients } from "../services/clientService";

export default function Clients() {
  const [clients, setClients] = useState([]);
  const navigate = useNavigate();

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
        <button
          onClick={() => navigate("/clients/enroll")}
          className="bg-primary hover:bg-secondary text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
        >
          Add New Client
        </button>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <ClientList clients={clients} onRefresh={fetchClients} />
      </div>
    </div>
  );
}
