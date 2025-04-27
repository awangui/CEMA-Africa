import { useState, useEffect } from "react";
import { fetchPrograms, deleteProgram } from "../services/programService";

export default function ProgramList() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [programs, setPrograms] = useState([]);
    const [selectedProgram, setSelectedProgram] = useState(null);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    useEffect(() => {
        const loadPrograms = async () => {
            try {
                setIsLoading(true);
                const response = await fetchPrograms();
                const fetchedPrograms = response.data;
                if (Array.isArray(fetchedPrograms)) {
                    const options = fetchedPrograms.map((program) => ({
                        value: program.id,
                        label: program.name,
                        description: program.description,
                    }));
                    setPrograms(options);
                } else {
                    console.error("Fetched programs is not an array:", fetchedPrograms);
                }
            } catch (error) {
                console.error("Failed to fetch programs:", error);
                setError("Failed to load programs.");
            } finally {
                setIsLoading(false);
            }
        };

        loadPrograms();
    }, []);

    const handleView = (program) => {
        setSelectedProgram(program);
        setIsViewModalOpen(true);
    };

    const handleDelete = (program) => {
        setSelectedProgram(program);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        try {
            await deleteProgram(selectedProgram.value);
            setPrograms((prev) => prev.filter((p) => p.value !== selectedProgram.value));
            setIsDeleteModalOpen(false);
            setSelectedProgram(null);
        } catch (error) {
            console.error("Failed to delete program:", error);
            setError("Failed to delete program.");
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Programs</h1>

            {isLoading ? (
                <div className="text-center">Loading...</div>
            ) : error ? (
                <div className="text-center error">{error}</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {programs.map((program) => (
                        <div
                            key={program.value}
                            className="bg-white p-4 rounded-lg shadow-md flex flex-col justify-between"
                        >
                            <div>
                                <h2 className="text-lg font-bold mb-2">{program.label}</h2>
                                <p className="text-gray-600">{program.description}</p>
                            </div>
                            <div className="mt-4 flex gap-2">
                                <button
                                    onClick={() => handleView(program)}
                                    className="bg-primary text-white px-3 py-1 rounded hover:bg-hover"
                                >
                                    View
                                </button>
                                <button
                                    onClick={() => handleDelete(program)}
                                    className="bg-secondary text-white px-3 py-1 rounded hover:bg-hover"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* View Modal */}
            {isViewModalOpen && selectedProgram && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded shadow-lg relative max-w-md w-full">
                        <button
                            onClick={() => setIsViewModalOpen(false)}
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                        >
                            ✕
                        </button>
                        <h2 className="text-xl font-bold mb-4">Program Details</h2>
                        <p><strong>Name:</strong> {selectedProgram.label}</p>
                        <p className="mt-2"><strong>Description:</strong> {selectedProgram.description}</p>
                    </div>
                </div>
            )}

            {/* Delete Modal */}
            {isDeleteModalOpen && selectedProgram && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded shadow-lg relative max-w-md w-full">
                        <button
                            onClick={() => setIsDeleteModalOpen(false)}
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                        >
                            ✕
                        </button>
                        <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
                        <p className="mb-4">
                            Are you sure you want to delete <strong>{selectedProgram.label} Program</strong>?
                        </p>
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={confirmDelete}
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                            >
                                Yes, Delete
                            </button>
                            <button
                                onClick={() => setIsDeleteModalOpen(false)}
                                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
