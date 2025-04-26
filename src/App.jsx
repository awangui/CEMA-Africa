import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Clients from "./pages/Clients";
import EnrollClients from "./pages/EnrollClients";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ViewClient from "./components/ViewClient";

export default function App() {
  return (
    <Router>
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-100">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/clients/:id" element={<ViewClient />} />
            <Route path="/clients/enroll" element={<EnrollClients />} />
          </Routes>
        </div>
        <Footer />
      </>
    </Router>
  );
}
