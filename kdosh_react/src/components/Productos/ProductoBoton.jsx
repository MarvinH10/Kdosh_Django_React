import { useNavigate, useLocation } from "react-router-dom";

export function ProductoBoton() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigateToProductos = () => {
    if (location.pathname !== "/productos") {
      navigate("/productos");
    }
  };

  const hoverStyle =
    location.pathname === "/productos"
      ? "text-black"
      : "cursor-pointer text-black hover:text-gray-700";

  return (
    <div>
      <div className="flex items-center mt-1 ml-2 mr-2">
        <button
          className="bg-black text-white font-bold py-2 px-4 rounded"
          onClick={() => navigate("/productos-create")}
        >
          Nuevo
        </button>
        <p
          className={`ml-2 font-semibold ${hoverStyle}`}
          onClick={handleNavigateToProductos}
        >
          Productos
        </p>
      </div>
    </div>
  );
}