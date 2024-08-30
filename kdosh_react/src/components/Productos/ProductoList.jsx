import { useEffect, useState } from "react";
import { getAllProductos } from "../../api/Productos/productos.api";
import { ProductoCard } from "./ProductoCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThLarge, faList } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export function ProductoList() {
  const navigate = useNavigate();
  const [categorias, setCategorias] = useState([]);
  const [productos, setProductos] = useState([]);
  const [viewType, setViewType] = useState(
    localStorage.getItem("viewType") || "card"
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/kdosh/api/categorias/");
        const data = await res.json();
        setCategorias(data);
      } catch (error) {
        console.error("Error al cargar categorías:", error);
      }
    };
    fetchCategorias();

    async function loadProductos() {
      const res = await getAllProductos();
      const sortedProductos = res.data.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
      setProductos(sortedProductos);
    }
    loadProductos();
  }, []);

  const changeViewType = (type) => {
    setViewType(type);
    localStorage.setItem("viewType", type);
  };

  const indexOfLastProducto = currentPage * itemsPerPage;
  const indexOfFirstProducto = indexOfLastProducto - itemsPerPage;
  const currentProductos = productos.slice(
    indexOfFirstProducto,
    indexOfLastProducto
  );

  const totalPages = Math.ceil(productos.length / itemsPerPage);

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
            {currentProductos.map((producto) => (
              <ProductoCard key={producto.id} producto={producto} />
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
                  Nombre
                </th>
                <th className="text-white py-2 px-4 border-b text-left font-semibold">
                  Código
                </th>
                <th className="text-white py-2 px-4 border-b text-left font-semibold">
                  Categoría
                </th>
                <th className="text-white py-2 px-4 border-b text-left font-semibold">
                  Detalle
                </th>
                <th className="text-white py-2 px-4 border-b text-left font-semibold">
                  Precio
                </th>
              </tr>
            </thead>
            <tbody>
              {currentProductos.map((producto, index) => (
                <tr
                  onClick={() => {
                    navigate(`/productos/${producto.id}`);
                  }}
                  key={producto.id}
                  className="hover:bg-gray-100 cursor-pointer"
                >
                  <td className="py-2 px-4 border-b hover:cursor-pointer font-semibold">
                    {productos.length - (indexOfFirstProducto + index)}
                  </td>
                  <td className="py-2 px-4 border-b hover:cursor-pointer">
                    {producto.nombre}
                  </td>
                  <td className="py-2 px-4 border-b hover:cursor-pointer">
                    {producto.codigo}
                  </td>
                  <td className="py-2 px-4 border-b hover:cursor-pointer">
                    {categorias.find(
                      (categoria) => categoria.id === producto.categoria
                    )?.combinacion || ""}
                  </td>
                  <td className="py-2 px-4 border-b hover:cursor-pointer">
                    {producto.detalle}
                  </td>
                  <td className="py-2 px-4 border-b hover:cursor-pointer">
                    S/{producto.precio}
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