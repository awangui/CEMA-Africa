import { useEffect, useState } from "react";
import { getClients } from "../services/clientService";
import DeleteModal from "../components/DeleteModal";
import EditClient from "./EditClient";
import ViewClient from "./ViewClient";

export default function ClientList() {
  const [clients, setClients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [clientsPerPage] = useState(10); // 10 clients per page
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    setLoading(true); // Start loading
    try {
      const response = await getClients();
      setClients(response.data);
    } catch (error) {
      console.error("Error fetching clients:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleDelete = () => {
    console.log("Delete client with id:", selectedClientId);
    // Here you would call a deleteClient service, then refresh the client list
    setShowDeleteModal(false);
  };

  const indexOfLastClient = currentPage * clientsPerPage;
  const indexOfFirstClient = indexOfLastClient - clientsPerPage;
  const currentClients = clients.slice(indexOfFirstClient, indexOfLastClient);

  const totalPages = Math.ceil(clients.length / clientsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Clients</h1>

      {loading ? (
        <div className="text-center">Loading...</div> // Loading indicator
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow">
              <thead>
                <tr>
                  <th className="py-2 px-4">#</th>
                  <th className="py-2 px-4">First Name</th>
                  <th className="py-2 px-4">Last Name</th>
                  <th className="py-2 px-4">Email</th>
                  <th className="py-2 px-4">DOB</th>
                  <th className="py-2 px-4">Gender</th>
                  {/* <th className="py-2 px-4">Phone</th> */}
                  {/* <th className="py-2 px-4">Address</th> */}
                  <th className="py-2 px-4">Programs</th>
                  <th className="py-2 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentClients.map((client, index) => (
               <tr
               key={index}
               className={`border-b ${
                 index % 2 === 0 ? "bg-slate-50" : "bg-white"
               }`}
             >
                    <td className="py-2 px-4">{index+1}</td>
                    <td className="py-2 px-4">{client.first_name}</td>
                    <td className="py-2 px-4">{client.last_name}</td>
                    <td className="py-2 px-4">{client.email}</td>
                    <td className="py-2 px-4">
                      {new Date(client.date_of_birth).toLocaleDateString()}
                    </td>

                    <td className="py-2 px-4">{client.gender}</td>
                    {/* <td className="py-2 px-4">{client.phone_number}</td>
                    <td className="py-2 px-4">{client.address}</td> */}
                    <td className="py-2 px-4">
                      {client.programs.length > 0
                        ? client.programs
                            .map((program) => program.name)
                            .join(", ")
                        : "None"}
                    </td>
                    <td className="py-2 px-4 flex gap-2">
                      <button
                        onClick={() => {
                          setSelectedClientId(client.id);
                          setShowViewModal(true); // Show the ViewClient modal
                        }}
                        className="bg-primary text-white px-2 py-1 rounded hover:bg-hover"
                      >
                        View
                      </button>
                      <button
                        onClick={() => {
                          setSelectedClientId(client.id);
                          setShowEditModal(true); // Show the EditClient modal
                        }}
                        className="bg-secondary text-white px-2 py-1 rounded hover:bg-hover"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-6">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => handlePageChange(i + 1)}
                className={`mx-1 px-3 py-1 rounded ${
                  currentPage === i + 1
                    ? "bg-primary text-white"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </>
      )}

      {/* Delete Modal */}
      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        message={`Are you sure you want to delete ${
          clients.find((client) => client.id === selectedClientId)?.first_name
        } ${
          clients.find((client) => client.id === selectedClientId)?.last_name
        }?`}
      />

      {/* Edit Client Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg relative">
            <button
              onClick={() => setShowEditModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            <EditClient
              clientId={selectedClientId}
              onClose={() => setShowEditModal(false)}
              onSuccess={fetchClients}
            />
          </div>
        </div>
      )}

      {/* View Client Modal */}
      {showViewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg relative">
            <button
              onClick={() => setShowViewModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            <ViewClient clientId={selectedClientId} />
          </div>
        </div>
      )}
    </div>
  );
}
