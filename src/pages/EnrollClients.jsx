import { useState, useEffect } from "react";
import { registerClient } from "../services/clientService";
import { fetchPrograms } from "../services/programService"; 
import Select from "react-select";

export default function EnrollClient({ onSuccess }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    date_of_birth: "",
    gender: "",
    phone_number: "",
    email: "",
    address: "",
    programs: [],
  });

  const [programOptions, setProgramOptions] = useState([]);

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
        } else {
          console.error("Fetched programs is not an array:", fetchedPrograms);
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
      await registerClient(formData);
      setSuccess("Client registered successfully!");
      if (onSuccess) {
        onSuccess(); 
      }
      setFormData({
        first_name: "",
        last_name: "",
        date_of_birth: "",
        gender: "",
        phone_number: "",
        email: "",
        address: "",
        programs: [],
      });
    } catch (error) {
      setError("Failed to register client. Please try again.");
      console.error("Registration failed:", error);
    } finally {
      setIsLoading(false); 
    }
  };
  

  const handleProgramChange = (selectedOptions) => {
    const selectedProgramIds = selectedOptions.map((option) => option.value);
    setFormData({ ...formData, programs: selectedProgramIds });
  };

  return (
    <div className="container mx-auto p-6 w-3/5">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        <h2 className="text-xl font-semibold mb-4">Register New Client</h2>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">First Name</label>
            <input
              type="text"
              value={formData.first_name}
              onChange={(e) =>
                setFormData({ ...formData, first_name: e.target.value })
              }
              className="w-full p-2 border rounded"
              placeholder="e.g. John"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Last Name</label>
            <input
              type="text"
              value={formData.last_name}
              onChange={(e) =>
                setFormData({ ...formData, last_name: e.target.value })
              }
              className="w-full p-2 border rounded"
              placeholder="e.g. Doe"
              required
            />
          </div>
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
              placeholder="e.g. +254767890123"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full p-2 border rounded"
              placeholder="e.g.john.doe@example.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Address</label>
            <textarea
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              className="w-full p-2 border rounded"
              placeholder="e.g. Moi Avenue, Nairobi, Kenya"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Enroll in Programs
            </label>
            <Select
              isMulti
              options={programOptions}
              value={programOptions.filter((option) =>
                formData.programs.includes(option.value)
              )}
              onChange={handleProgramChange}
              placeholder="Search and select programs"
              className="w-full"
            />
          </div>
        </div>
        <button
          type="submit"
          className={`mt-4 py-2 px-4 rounded text-white ${
            isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-primary hover:bg-secondary"
          }`}
          disabled={isLoading}
        >
          {isLoading ? "Registering..." : "Register Client"}
        </button>
      </form>
    </div>
  );
}
