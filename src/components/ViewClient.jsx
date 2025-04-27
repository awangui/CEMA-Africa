import React, { useEffect, useState } from "react";
import { fetchClientDetails } from "../services/clientService";

const ViewClient = ({ clientId }) => {
  const [clientDetails, setClientDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const response = await fetchClientDetails(clientId);
        setClientDetails(response.data);
      } catch (error) {
        console.error(error);
        setError("Failed to load client details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (clientId) {
      fetchClient();
    }
  }, [clientId]);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center error">{error}</div>;
  }

  if (!clientDetails) {
    return <div className="text-center">No client found.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-primary text-2xl font-bold mb-6">Client Details</h1>
      <h2 className="text-xl font-semibold mb-4">
        {clientDetails.first_name} {clientDetails.last_name}
      </h2>
      <p>
        <strong>Date of Birth:</strong>{" "}
        {new Date(clientDetails.date_of_birth).toLocaleDateString()}
      </p>
      <p>
        <strong>Email:</strong> {clientDetails.email}
      </p>
      <p>
        <strong>Phone:</strong> {clientDetails.phone_number}
      </p>
      <p>
        <strong>Address:</strong> {clientDetails.address}
      </p>
      <p>
        <strong>Gender:</strong> {clientDetails.gender}
      </p>
      <p>
        <strong>Registered On:</strong>
        {clientDetails.created_at}
      </p>
      <p>
        <strong>Programs:</strong>{" "}
        {clientDetails.programs.length > 0
          ? clientDetails.programs.map((program) => program.name).join(", ")
          : "None"}
      </p>
    </div>
  );
};

export default ViewClient;
