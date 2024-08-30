import { useEffect, useState } from "react";
import { getAllAtributos } from "../../api/Atributos/atributos.api";
import { AtributoCard } from "./AtributoCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThLarge, faList } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export function AtributoList() {
  const navigate = useNavigate();
  const [atributos, setAtributos] = useState([]);
  const [viewType, setViewType] = useState(
    localStorage.getItem("viewType") || "card"
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [valores_atributos, setValoresAtributos] = await Promise.all([
          getAllAtributos(),
          fetch("http://127.0.0.1:8000/kdosh/api/valores_atributos/").then(
            (res) => res.json()
          ),
        ]);

        const sortedAtributos = valores_atributos.data.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );

        const atributosConValores = sortedAtributos.map((atributo) => {
          const valores = setValoresAtributos.filter(
            (valor) => valor.atributo === atributo.id
          );
          return { ...atributo, valores_atributos: valores };
        });

        setAtributos(atributosConValores);
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      }
    };

    fetchData();
  }, []);

  const changeViewType = (type) => {
    setViewType(type);
    localStorage.setItem("viewType", type);
  };

  const indexOfLastAtributo = currentPage * itemsPerPage;
  const indexOfFirstAtributo = indexOfLastAtributo - itemsPerPage;
  const currentAtributos = atributos.slice(
    indexOfFirstAtributo,
    indexOfLastAtributo
  );

  const totalPages = Math.ceil(atributos.length / itemsPerPage);

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
            currentPage === 1 ? "bg-black text-white" : "bg-gray-300 text-black"
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
            currentPage === i ? "bg-black text-white" : "bg-gray-300 text-black"
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
      <div className="flex justify-end mb-1 mr-2">
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
            {currentAtributos.map((atributo) => (
              <AtributoCard key={atributo.id} atributo={atributo} />
            ))}
          </div>
          <div className="flex justify-center mt-4">
            <ul className="flex list-none">{renderPaginationItems()}</ul>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-black">
              <tr>
                <th className="px-4 py-2 font-semibold text-left text-white border-b">
                  N°
                </th>
                <th className="px-4 py-2 font-semibold text-left text-white border-b">
                  Atributo
                </th>
                <th className="px-4 py-2 font-semibold text-left text-white border-b">
                  Valores de Atributo
                </th>
              </tr>
            </thead>
            <tbody>
              {currentAtributos.map((atributo, index) => (
                <tr
                  onClick={() => {
                    navigate(`/atributos/${atributo.id}`);
                  }}
                  key={atributo.id}
                  className="cursor-pointer hover:bg-gray-100"
                >
                  <td className="px-4 py-2 font-semibold border-b">
                    {atributos.length - (indexOfFirstAtributo + index)}
                  </td>
                  <td className="px-4 py-2 border-b">{atributo.nombre}</td>
                  <td className="px-4 py-2 border-b hover:cursor-pointer">
                    {atributo.valores_atributos
                      .map((valor) => valor.valor)
                      .join(", ")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-center mt-4">
            <ul className="flex list-none">{renderPaginationItems()}</ul>
          </div>
        </div>
      )}
    </div>
  );
}
