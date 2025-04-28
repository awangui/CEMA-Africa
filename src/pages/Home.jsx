import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import hero from '/src/assets/hero.jpg';
import { searchClients } from '../services/clientService'; 

export default function Home() {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const navigate = useNavigate();

    const handleSearchChange = async (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        if (query.trim() === '') {
            setSearchResults([]);
            return;
        }

        try {
            const data = await searchClients(query);
            setSearchResults(data || []); 
        } catch (error) {
            setSearchResults([]); 
        }
    };

    const handleClientClick = (clientId) => {
        navigate(`/clients/${clientId}`);
    };

    return (
        <div
            className="flex flex-col items-center justify-center min-h-screen"
            style={{
                backgroundImage: `url(${hero})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                backgroundBlendMode: 'overlay',
            }}
        >
            <header className="text-center mb-8 text-white p-4 rounded">
                <h1 className="text-4xl font-bold mb-4">Welcome to CEMA's Health Information System</h1>
                <p className="text-lg text-white">
                    Manage clients, programs, and more from one place.
                </p>
            </header>

            <main className="w-full max-w-4xl p-6 rounded">
                <div className="flex flex-col items-center gap-2 mb-8 relative">
                    <input
                        type="text"
                        placeholder="Search for a client by name or email"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="border border-gray-300 rounded-lg py-2 px-4 w-2/4 focus:outline-none focus:ring-2 focus:ring-primary"
                    />

                    {/* Dropdown List */}
                    {searchQuery.trim() !== '' && (
    <ul className="absolute top-16 w-2/4 bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto z-10">
        {searchResults.length > 0 ? (
            searchResults.map((client) => (
                <li
                    key={client.id}
                    onClick={() => handleClientClick(client.id)}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                    {client.first_name} {client.last_name} ({client.email})
                </li>
            ))
        ) : (
            <li className="px-4 py-2 text-gray-500">No results found</li>
        )}
    </ul>
)}

                </div>
            </main>
        </div>
    );
}
