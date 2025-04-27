import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerProgram } from '../services/programService';

const AddProgram = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name) {
            setError('Program name is required.');
            return;
        }

        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            await registerProgram({ name, description });
            setSuccess(true);
            setTimeout(() => {
                navigate('/programs');
            }, 1000);
        } catch (err) {
            console.error('Error creating program:', err);
            setError('Failed to create program.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md">
            <h2 className="text-2xl font-semibold mb-6 text-center">Add New Program</h2>

            {success && <p className="text-green-600 mb-4 text-center">Program added successfully!</p>}
            {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="flex flex-col">
                    <label htmlFor="name" className="mb-2 font-medium">Program Name</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="description" className="mb-2 font-medium">Description</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="border rounded-lg px-4 py-2 h-28 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary hover:bg-secondary text-white font-semibold py-2 rounded-lg transition duration-200 disabled:opacity-50"
                >
                    {loading ? 'Adding...' : 'Add Program'}
                </button>
            </form>
        </div>
    );
};

export default AddProgram;
