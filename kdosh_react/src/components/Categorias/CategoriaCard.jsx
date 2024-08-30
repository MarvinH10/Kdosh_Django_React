import { useNavigate } from "react-router-dom";

export function CategoriaCard({ categoria }) {
  const navigate = useNavigate();

  return (
    <div
      className="bg-white p-5 hover:cursor-pointer mt-2 ml-2 mr-2 border border-gray-300 rounded-md"
      onClick={() => {
        navigate(`/categorias/${categoria.id}`);
      }}
    >
      <div className="flex justify-between items-center">
        <h1 className="text-black font-semibold uppercase flex-grow">
          {categoria.nombre}
        </h1>
      </div>
      <p className="text-sm text-black">
        Compuesto:{" "}
        {categoria.combinacion
          ? categoria.combinacion
          : " "}
      </p>
      <p className="text-sm text-black">
        Categoría Principal:{" "}
        {categoria.parent_nombre
          ? categoria.parent_nombre
          : " "}
      </p>
    </div>
  );
}
