import { useNavigate } from "react-router-dom";

export function ValorAtributoCard({ valor_atributo }) {
  const navigate = useNavigate();

  return (
    <div
      className="p-5 mt-2 ml-2 mr-2 bg-white border border-gray-300 rounded-md hover:cursor-pointer"
      onClick={() => {
        navigate(`/valores_atributos/${valor_atributo.id}`);
      }}
    >
      <div className="flex items-center justify-between">
        <h1 className="flex-grow font-semibold text-black uppercase">
          {valor_atributo.valor}
        </h1>
      </div>
      <p className="text-sm text-black">
        Atributo: {valor_atributo.atributoNombre}
      </p>
    </div>
  );
}
