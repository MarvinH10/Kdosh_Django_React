import { useNavigate, useLocation } from "react-router-dom";

export function AtributoBoton() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigateToAtributos = () => {
    if (location.pathname !== "/atributos") {
      navigate("/atributos");
    }
  };

  const textColorClass =
    location.pathname === "/atributos"
      ? "text-black"
      : "cursor-pointer text-black hover:text-gray-700";

  return (
    <div>
      <div className="flex items-center mt-1 ml-2 mr-2">
        <button
          className="px-4 py-2 font-bold text-white bg-black rounded"
          onClick={() => navigate("/atributos-create")}
        >
          Nuevo
        </button>
        <p
          className={`ml-2 font-semibold ${textColorClass}`}
          onClick={handleNavigateToAtributos}
        >
          Atributos
        </p>
      </div>
    </div>
  );
}
