import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

export function Navigation() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="flex justify-between py-3 items-center px-4 bg-black text-white w-full">
      <Link to="/" className="flex items-center">
        <img
          src="../../src/assets/images/BLANCO_KDOSH.png"
          alt="KDOSH Logo"
          className="h-15 w-20"
        />
      </Link>
      <div className="relative" ref={dropdownRef}>
        <Link to="/" className="hover:text-gray-400 font-semibold pr-5">
          Dashboard
        </Link>
        <button onClick={toggleDropdown} className="hover:text-gray-400 font-semibold">
          Gestión Productos
          <i className="bi bi-chevron-down ml-1"></i>
        </button>
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg">
            <Link
              to="/productos"
              className="block px-4 py-2 text-sm hover:bg-gray-200 font-semibold rounded-t-md"
              onClick={toggleDropdown}
            >
              Productos
            </Link>
            <Link
              to="/categorias"
              className="block px-4 py-2 text-sm hover:bg-gray-200 font-semibold rounded-b-md"
              onClick={toggleDropdown}
            >
              Categorías
            </Link>
            {/* <Link
              to="/atributos"
              className="block px-4 py-2 text-sm hover:bg-gray-200 rounded-b-md"
              onClick={toggleDropdown}
            >
              Atributos
            </Link> */}
          </div>
        )}
      </div>
    </nav>
  );
}
