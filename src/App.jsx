import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Clients from "./pages/Clients";
import EnrollClients from "./pages/EnrollClients";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
// import Programs from "./pages/Programs";

export default function App() {
  return (
    <Router>
      <>
      <Navbar />
      <div className="min-h-screen bg-gray-100">
        <main className="container mx-auto p-4">
          <h1 className="text-2xl font-bold text-center mb-4">
            Health Information System
          </h1>
        </main>
      </div>
      <Footer />
      </>
    </Router>
  );
}