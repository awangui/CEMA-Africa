import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import hero from '/src/assets/hero.jpg';

export default function Home() {
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = () => {
        if (searchQuery.trim()) {
            navigate(`/clients/${searchQuery}`);
        }
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
                <div className="flex justify-center gap-4 mb-8">
                    <input
                        type="text"
                        placeholder="Search for a client"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="border border-gray-300 rounded-lg py-2 px-4 w-2/4"
                    />
                    <button
                        onClick={handleSearch}
                        className="bg-secondary hover:bg-primary text-white font-semibold py-2 px-6 rounded-lg transition"
                    >
                        Search
                    </button>
                </div>
            </main>
        </div>
    );
}
