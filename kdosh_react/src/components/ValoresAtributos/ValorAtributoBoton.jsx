import { useNavigate, useLocation } from "react-router-dom";

export function ValorAtributoBoton() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigateToValoresAtributos = () => {
    if (location.pathname !== "/valores_atributos") {
      navigate("/valores_atributos");
    }
  };

  const textColorClass =
    location.pathname === "/valores_atributos"
      ? "text-black"
      : "cursor-pointer text-black hover:text-gray-700";

  return (
    <div>
      <div className="flex items-center mt-1 ml-2 mr-2">
        <button
          className="px-4 py-2 font-bold text-white bg-black rounded"
          onClick={() => navigate("/valores_atributos-create")}
        >
          Nuevo
        </button>
        <p
          className={`ml-2 font-semibold ${textColorClass}`}
          onClick={handleNavigateToValoresAtributos}
        >
          Valores de Atributos
        </p>
      </div>
    </div>
  );
}
