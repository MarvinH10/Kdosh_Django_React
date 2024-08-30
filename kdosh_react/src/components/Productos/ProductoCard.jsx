import { useNavigate } from "react-router-dom";

export function ProductoCard({ producto }) {
  const navigate = useNavigate();
  
  return (
    <div
      className=" bg-white p-5 hover:cursor-pointer mt-2 ml-2 mr-2 border border-gray-300 rounded-md"
      onClick={() => {
        navigate(`/productos/${producto.id}`);
      }}
    >
      <div className="flex justify-between items-center">
        {producto.esFavorito && <span>⭐</span>}
        <h1 className="text-black font-semibold uppercase flex-grow">
          {producto.nombre}
        </h1>
      </div>
      <p className="text-sm text-black">Código: {producto.codigo}</p>
      <p className="text-sm text-black">Precio: S/{producto.precio}</p>
    </div>
  );
}
