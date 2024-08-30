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
    <nav className="flex items-center justify-between w-full px-4 py-3 text-white bg-black">
      <Link to="/" className="flex items-center">
        <img
          src="../../src/assets/images/BLANCO_KDOSH.png"
          alt="KDOSH Logo"
          className="w-20 h-15"
        />
      </Link>
      <div className="relative" ref={dropdownRef}>
        <Link to="/" className="pr-5 font-semibold hover:text-gray-400">
          Dashboard
        </Link>
        <button
          onClick={toggleDropdown}
          className="font-semibold hover:text-gray-400"
        >
          Gestión Productos
          <i className="ml-1 bi bi-chevron-down"></i>
        </button>
        {isDropdownOpen && (
          <div className="absolute right-0 w-48 mt-2 text-black bg-white rounded-md shadow-lg">
            <Link
              to="/productos"
              className="block px-4 py-2 text-sm font-semibold hover:bg-gray-200 rounded-t-md"
              onClick={toggleDropdown}
            >
              Productos
            </Link>
            <Link
              to="/categorias"
              className="block px-4 py-2 text-sm font-semibold hover:bg-gray-200"
              onClick={toggleDropdown}
            >
              Categorías
            </Link>
            <Link
              to="/atributos"
              className="block px-4 py-2 text-sm font-semibold hover:bg-gray-200"
              onClick={toggleDropdown}
            >
              Atributos
            </Link>
            <Link
              to="/valores_atributos"
              className="block px-4 py-2 text-sm font-semibold hover:bg-gray-200 rounded-b-md"
              onClick={toggleDropdown}
            >
              Valores de Atributos
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
