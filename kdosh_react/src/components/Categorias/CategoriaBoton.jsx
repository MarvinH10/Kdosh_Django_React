import { useNavigate, useLocation } from "react-router-dom";

export function CategoriaBoton() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigateToCategorias = () => {
    if (location.pathname !== "/categorias") {
      navigate("/categorias");
    }
  };

  const textColorClass =
    location.pathname === "/categorias"
      ? "text-black"
      : "cursor-pointer text-black hover:text-gray-700";

  return (
    <div>
      <div className="flex items-center mt-1 ml-2 mr-2">
        <button
          className="bg-black text-white font-bold py-2 px-4 rounded"
          onClick={() => navigate("/categorias-create")}
        >
          Nuevo
        </button>
        <p
          className={`ml-2 font-semibold ${textColorClass}`}
          onClick={handleNavigateToCategorias}
        >
          Categorías
        </p>
      </div>
    </div>
  );
}
