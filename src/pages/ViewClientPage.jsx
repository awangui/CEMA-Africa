import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ViewClient from '../components/ViewClient';
import EditClient from '../components/EditClient';

export default function ViewClientPage() {
    const { id } = useParams(); 
    console.log("Client ID from URL:", id);// Get client id from URL
    const navigate = useNavigate();

    const [showEditModal, setShowEditModal] = useState(false);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded shadow-lg relative w-full max-w-2xl">
                <button
                    onClick={() => navigate(-1)} // Go back
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                >
                    ✕
                </button>

                {!showEditModal ? (
                    <div>
                        <ViewClient clientId={id} />
                        <div className="flex justify-end mt-4">
                            <button
                                onClick={() => setShowEditModal(true)}
                                className="bg-secondary text-white px-4 py-2 rounded hover:bg-hover"
                            >
                                Edit
                            </button>
                        </div>
                    </div>
                ) : (
                    <EditClient
                        clientId={id}
                        onClose={() => setShowEditModal(false)}
                        onSuccess={() => {
                            setShowEditModal(false);
                        }}
                    />
                )}
            </div>
        </div>
    );
}
