import { useEffect, useState } from "react";
import { getAllValoresAtributos } from "../../api/ValoresAtributos/valores_atributos.api";
import { getAtributo } from "../../api/Atributos/atributos.api";
import { ValorAtributoCard } from "./ValorAtributoCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThLarge, faList } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export function ValorAtributoList() {
  const navigate = useNavigate();
  const [valores_atributos, setValoresAtributos] = useState([]);
  const [viewType, setViewType] = useState(
    localStorage.getItem("viewType") || "card"
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9);

  useEffect(() => {
    async function loadValoresAtributos() {
      try {
        const resValoresAtributos = await getAllValoresAtributos();
        const valoresAtributosConNombres = await Promise.all(
          resValoresAtributos.data.map(async (valor_atributo) => {
            const resAtributo = await getAtributo(valor_atributo.atributo);
            return {
              ...valor_atributo,
              atributoNombre: resAtributo.data.nombre,
            };
          })
        );
        valoresAtributosConNombres.sort((a, b) => {
          return new Date(b.created_at) - new Date(a.created_at);
        });

        setValoresAtributos(valoresAtributosConNombres);
      } catch (error) {
        console.error("Error al cargar los valores de atributos:", error);
      }
    }
    loadValoresAtributos();
  }, []);

  const changeViewType = (type) => {
    setViewType(type);
    localStorage.setItem("viewType", type);
  };

  const indexOfLastValorAtributo = currentPage * itemsPerPage;
  const indexOfFirstValorAtributo = indexOfLastValorAtributo - itemsPerPage;
  const currentValoresAtributos = valores_atributos.slice(
    indexOfFirstValorAtributo,
    indexOfLastValorAtributo
  );

  const totalPages = Math.ceil(valores_atributos.length / itemsPerPage);

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
            {currentValoresAtributos.map((valor_atributo) => (
              <ValorAtributoCard
                key={valor_atributo.id}
                valor_atributo={valor_atributo}
              />
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
                  Valores de Atributo
                </th>
                <th className="px-4 py-2 font-semibold text-left text-white border-b">
                  Atributo
                </th>
              </tr>
            </thead>
            <tbody>
              {currentValoresAtributos.map((valor_atributo, index) => (
                <tr
                  onClick={() => {
                    navigate(`/valores_atributos/${valor_atributo.id}`);
                  }}
                  key={valor_atributo.id}
                  className="cursor-pointer hover:bg-gray-100"
                >
                  <td className="px-4 py-2 font-semibold border-b">
                    {valores_atributos.length -
                      (indexOfFirstValorAtributo + index)}
                  </td>
                  <td className="px-4 py-2 border-b">{valor_atributo.valor}</td>
                  <td className="px-4 py-2 border-b">
                    {valor_atributo.atributoNombre}
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
