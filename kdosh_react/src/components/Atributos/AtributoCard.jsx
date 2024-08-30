import { useNavigate } from "react-router-dom";

export function AtributoCard({ atributo }) {
  const navigate = useNavigate();

  return (
    <div
      className="p-5 mt-2 ml-2 mr-2 bg-white border border-gray-300 rounded-md hover:cursor-pointer"
      onClick={() => {
        navigate(`/atributos/${atributo.id}`);
      }}
    >
      <div className="flex items-center justify-between">
        <h1 className="flex-grow font-semibold text-black uppercase">
          {atributo.nombre}
        </h1>
      </div>
      <p className="text-sm text-black">
        Valores de Atributo:{" "}
        {atributo.valores_atributos.map((valor) => valor.valor).join(", ")}
      </p>
    </div>
  );
}
