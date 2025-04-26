import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "/src/assets/UoN_CEMA_Logo.jpg";
import { MdLogout } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";

const getNavLinkClass = ({ isActive }) =>
  isActive
    ? "active text-primary font-bold border-b-2 border-primary pb-1"
    : "hover:text-secondary";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-md relative">
      {/* Logo */}
      <div className="flex items-center">
        <Link to="/" className="flex items-center" onClick={closeMenu}>
          <img src={logo} alt="Logo" className="h-10 w-44 mr-2" />
          <span className="text-lg sm:text-xl md:text-2xl font-bold text-primary ml-4 whitespace-nowrap">
            Health Information System
          </span>
        </Link>
      </div>

      {/* Desktop Nav Links */}
      <ul className="hidden md:flex items-center space-x-10 text-lg">
        <li>
          <NavLink to="/" className={getNavLinkClass} onClick={closeMenu}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/clients"
            className={getNavLinkClass}
            onClick={closeMenu}
          >
            Manage Clients
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/programs"
            className={getNavLinkClass}
            onClick={closeMenu}
          >
            Manage Programs
          </NavLink>
        </li>
        <li>
          <NavLink to="/logout" className={getNavLinkClass} onClick={closeMenu}>
            <div className="flex items-center gap-2">
              <MdLogout className="text-secondary" /> Logout
            </div>
          </NavLink>
        </li>
      </ul>

      {/* Hamburger for Mobile */}
      <div className="md:hidden">
        <button
          onClick={toggleMenu}
          className="text-gray-700 focus:outline-none"
        >
          {isOpen ? (
            <IoClose className="text-3xl" />
          ) : (
            <GiHamburgerMenu className="text-3xl" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="absolute top-20 left-0 w-full bg-white shadow-md flex flex-col items-center space-y-6 py-8 text-lg z-20">
          <li>
            <NavLink to="/" className={getNavLinkClass} onClick={closeMenu}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/clients"
              className={getNavLinkClass}
              onClick={closeMenu}
            >
              Manage Clients
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/programs"
              className={getNavLinkClass}
              onClick={closeMenu}
            >
              Manage Programs
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/logout"
              className={getNavLinkClass}
              onClick={closeMenu}
            >
              <div className="flex items-center gap-2">
                <MdLogout className="text-secondary" /> Logout
              </div>
            </NavLink>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
