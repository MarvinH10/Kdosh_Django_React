import { useEffect, useState } from "react";
import { getAllCategorias } from "../../api/Categorias/categorias.api";
import { CategoriaCard } from "./CategoriaCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThLarge, faList } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export function CategoriaList() {
  const navigate = useNavigate();
  const [categorias, setCategorias] = useState([]);
  const [viewType, setViewType] = useState(
    localStorage.getItem("viewType") || "card"
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9);

  useEffect(() => {
    async function loadCategorias() {
      const res = await getAllCategorias();
      const sortedCategorias = res.data.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
      setCategorias(sortedCategorias);
    }
    loadCategorias();
  }, []);

  const changeViewType = (type) => {
    setViewType(type);
    localStorage.setItem("viewType", type);
  };

  const indexOfLastCategoria = currentPage * itemsPerPage;
  const indexOfFirstCategoria = indexOfLastCategoria - itemsPerPage;
  const currentCategorias = categorias.slice(
    indexOfFirstCategoria,
    indexOfLastCategoria
  );

  const totalPages = Math.ceil(categorias.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const renderPaginationItems = () => {
    const paginationItems = [];
    const delta = 2;
    const rangeStart = Math.max(1, currentPage - delta);
    const rangeEnd = Math.min(totalPages, currentPage + delta);

    if (rangeStart > 1) {
      paginationItems.push(
        <li
          key={1}
          className={`px-3 py-1 mx-1 border rounded cursor-pointer ${
            currentPage === 1
              ? "bg-black text-white"
              : "bg-gray-300 text-black"
          }`}
          onClick={() => paginate(1)}
        >
          1
        </li>
      );
      if (rangeStart > 2) {
        paginationItems.push(
          <li
            key="dots1"
            className="px-3 py-1 mx-1 border rounded cursor-default"
          >
            ...
          </li>
        );
      }
    }

    for (let i = rangeStart; i <= rangeEnd; i++) {
      paginationItems.push(
        <li
          key={i}
          className={`px-3 py-1 mx-1 border rounded cursor-pointer ${
            currentPage === i
              ? "bg-black text-white"
              : "bg-gray-300 text-black"
          }`}
          onClick={() => paginate(i)}
        >
          {i}
        </li>
      );
    }

    if (rangeEnd < totalPages) {
      if (rangeEnd < totalPages - 1) {
        paginationItems.push(
          <li
            key="dots2"
            className="px-3 py-1 mx-1 border rounded cursor-default"
          >
            ...
          </li>
        );
      }
      paginationItems.push(
        <li
          key={totalPages}
          className={`px-3 py-1 mx-1 border rounded cursor-pointer ${
            currentPage === totalPages
              ? "bg-black text-white"
              : "bg-gray-300 text-black"
          }`}
          onClick={() => paginate(totalPages)}
        >
          {totalPages}
        </li>
      );
    }

    return paginationItems;
  };

  return (
    <div>
      <div className="flex justify-end mr-2 mb-1">
        <button
          onClick={() => changeViewType("card")}
          className={`px-2 py-1 mr-1 text-sm ${
            viewType === "card" ? "bg-black text-white" : "bg-gray-300"
          }`}
          title="Card"
        >
          <FontAwesomeIcon icon={faThLarge} />
        </button>
        <button
          onClick={() => changeViewType("list")}
          className={`px-2 py-1 text-sm ${
            viewType === "list" ? "bg-black text-white" : "bg-gray-300"
          }`}
          title="Lista"
        >
          <FontAwesomeIcon icon={faList} />
        </button>
      </div>

      {viewType === "card" ? (
        <div>
          <div className="grid grid-cols-3 gap-3">
            {currentCategorias.map((categoria) => (
              <CategoriaCard key={categoria.id} categoria={categoria} />
            ))}
          </div>
          <div className="mt-4 flex justify-center">
            <ul className="flex list-none">{renderPaginationItems()}</ul>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-black">
              <tr>
                <th className="text-white py-2 px-4 border-b text-left font-semibold">
                  N°
                </th>
                <th className="text-white py-2 px-4 border-b text-left font-semibold">
                  Categoría
                </th>
                <th className="text-white py-2 px-4 border-b text-left font-semibold">
                  Compuesto
                </th>
                <th className="text-white py-2 px-4 border-b text-left font-semibold">
                  Categoría Principal
                </th>
              </tr>
            </thead>
            <tbody>
              {currentCategorias.map((categoria, index) => (
                <tr
                  onClick={() => {
                    navigate(`/categorias/${categoria.id}`);
                  }}
                  key={categoria.id}
                  className="hover:bg-gray-100 cursor-pointer"
                >
                  <td className="py-2 px-4 border-b font-semibold">
                    {categorias.length - (indexOfFirstCategoria + index)}
                  </td>
                  <td className="py-2 px-4 border-b">{categoria.nombre}</td>
                  <td className="py-2 px-4 border-b">
                    {categoria.combinacion}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {categoria.parent_nombre ? categoria.parent_nombre : " "}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4 flex justify-center">
            <ul className="flex list-none">{renderPaginationItems()}</ul>
          </div>
        </div>
      )}
    </div>
  );
}
