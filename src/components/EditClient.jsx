import { useState, useEffect } from "react";
import { updateClient, fetchClientDetails } from "../services/clientService";
import {deleteClient} from "../services/clientService";
import DeleteModal from "../components/DeleteModal";
import { fetchPrograms } from "../services/programService";
import Select from "react-select";
import { useNavigate } from "react-router-dom";

export default function EditClient({ clientId, onSuccess }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [programOptions, setProgramOptions] = useState([]);
  const [initialPrograms, setInitialPrograms] = useState([]);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    date_of_birth: "",
    gender: "",
    phone_number: "",
    email: "",
    address: "",
    programs: [], // This will store program IDs
  });

  useEffect(() => {
    const loadClientDetails = async () => {
      try {
        const response = await fetchClientDetails(clientId);
        const clientData = response.data;
        
        // Store initial programs separately
        const initialPrograms = clientData.programs || [];
        setInitialPrograms(initialPrograms);
        
        setFormData({
          first_name: clientData.first_name || "",
          last_name: clientData.last_name || "",
          date_of_birth: clientData.date_of_birth
            ? new Date(clientData.date_of_birth).toISOString().split("T")[0]
            : "",
          gender: clientData.gender || "",
          phone_number: clientData.phone_number || "",
          email: clientData.email || "",
          address: clientData.address || "",
          programs: initialPrograms.map(p => p.id), // Store just the IDs
        });
      } catch (error) {
        console.error("Failed to fetch client details:", error);
        setError("Failed to load client details. Please try again.");
      }
    };

    if (clientId) {
      loadClientDetails();
    }
  }, [clientId]);

  useEffect(() => {
    const loadPrograms = async () => {
      try {
        const response = await fetchPrograms();
        const fetchedPrograms = response.data;
        if (Array.isArray(fetchedPrograms)) {
          const options = fetchedPrograms.map((program) => ({
            value: program.id,
            label: program.name,
          }));
          setProgramOptions(options);
        }
      } catch (error) {
        console.error("Failed to fetch programs:", error);
      }
    };

    loadPrograms();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);
  
    try {
      const updateData = {
        ...formData,
        programs: formData.programs
      };
  
      await updateClient(clientId, updateData);
      setSuccess("Client updated successfully!");
  
      setTimeout(() => {
        navigate("/clients");
      }, 1000);
      
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Update failed:", error);
      setError(error.response?.data?.error || "Failed to update client. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleProgramChange = (selectedOptions) => {
    // Extract just the IDs from the selected options
    const selectedProgramIds = selectedOptions.map(option => option.value);
    setFormData({ 
      ...formData, 
      programs: selectedProgramIds 
    });
  };

  // Get currently selected programs for the Select component
  const selectedProgramOptions = programOptions.filter(option => 
    formData.programs.includes(option.value)
  );

  const handleDelete = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await deleteClient(clientId);
      setSuccess("Client deleted successfully!");
      if (onSuccess) onSuccess();
      setTimeout(() => {
        navigate("/clients");
      }, 1000);
    } catch (error) {
      console.error("Delete failed:", error);
      setError("Failed to delete client. Please try again.");
    } finally {
      setIsLoading(false);
      setShowDeleteModal(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">
          Edit Client {formData.first_name} {formData.last_name}
        </h2>

        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* First Name */}
          <div>
            <label className="block text-sm font-medium mb-1">First Name</label>
            <input
              type="text"
              value={formData.first_name}
              onChange={(e) =>
                setFormData({ ...formData, first_name: e.target.value })
              }
              className="w-full p-2 border rounded"
              required
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Last Name</label>
            <input
              type="text"
              value={formData.last_name}
              onChange={(e) =>
                setFormData({ ...formData, last_name: e.target.value })
              }
              className="w-full p-2 border rounded"
              required
            />
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Date of Birth
            </label>
            <input
              type="date"
              value={formData.date_of_birth}
              onChange={(e) =>
                setFormData({ ...formData, date_of_birth: e.target.value })
              }
              className="w-full p-2 border rounded"
              required
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium mb-1">Gender</label>
            <select
              value={formData.gender}
              onChange={(e) =>
                setFormData({ ...formData, gender: e.target.value })
              }
              className="w-full p-2 border rounded bg-white"
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              value={formData.phone_number}
              onChange={(e) =>
                setFormData({ ...formData, phone_number: e.target.value })
              }
              className="w-full p-2 border rounded"
              placeholder="e.g. +254700000000"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full p-2 border rounded"
              placeholder="e.g. john@example.com"
              required
            />
          </div>

          {/* Address */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Address</label>
            <textarea
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              className="w-full p-2 border rounded"
              placeholder="e.g. Moi Avenue, Nairobi"
              required
            />
          </div>

          {/* Programs */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">
              Enroll in Programs
            </label>
            <Select
              isMulti
              options={programOptions}
              value={selectedProgramOptions}
              onChange={handleProgramChange}
              placeholder="Search and select programs"
              className="w-full"
            />
            <p className="text-sm text-gray-500 mt-1">
              Current programs: {initialPrograms.map(p => p.name).join(", ")}
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center mt-6">
          <button
            type="submit"
            className={`py-2 px-4 rounded text-white ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-primary hover:bg-secondary"
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Updating..." : "Update Client"}
          </button>
          <button
            type="button"
            onClick={() => setShowDeleteModal(true)}
            className="ml-4 py-2 px-4 rounded text-white bg-red-500 hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </form>

      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        message={`Are you sure you want to delete client ${formData.first_name} ${formData.last_name}?`}
      />
    </>
  );
}