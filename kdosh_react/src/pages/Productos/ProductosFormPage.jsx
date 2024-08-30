import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  createProductos,
  deleteProductos,
  updateProductos,
  getProducto,
} from "../../api/Productos/productos.api";
import { ProductoBoton } from "../../components/Productos/ProductoBoton";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudUploadAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
import { ModalEliminarProducto } from "../../components/Productos/ModalEliminarProducto";

export function ProductosFormPage() {
  const [categorias, setCategorias] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/kdosh/api/categorias/");
        const data = await res.json();
        setCategorias(data);
      } catch (error) {
        toast.success(
          "Error al cargar las categorías",
          {
            position: "bottom-right",
            style: {
              background: "white",
              color: "black",
            },
          },
          error
        );
      }
    };

    fetchCategorias();
  }, []);

  useEffect(() => {
    async function loadProducto() {
      if (params.id) {
        const res = await getProducto(params.id);
        if (res.data) {
          const { nombre, codigo, detalle, categoria, precio } = res.data;
          reset({
            nombre,
            codigo,
            detalle,
            categoria,
            precio,
          });
          setProductoSeleccionado(res.data);
        }
      } else {
        reset({
          nombre: "",
          codigo: "",
          detalle: "",
          categoria: "",
          precio: "",
        });
        setProductoSeleccionado(null);
      }
    }
    loadProducto();
  }, [params.id, reset]);

  const onSubmit = handleSubmit(async (data) => {
    if (params.id) {
      await updateProductos(params.id, data);
      toast.success("Producto actualizado", {
        position: "bottom-right",
        style: {
          background: "white",
          color: "black",
        },
      });
    } else {
      await createProductos(data);
      toast.success("Producto creado", {
        position: "bottom-right",
        style: {
          background: "white",
          color: "black",
        },
      });
    }
    navigate("/productos");
  });

  const handleDeleteClick = () => {
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    if (productoSeleccionado) {
      await deleteProductos(`${productoSeleccionado.id}/`);
      toast.success("Producto eliminado", {
        position: "bottom-right",
        style: {
          background: "white",
          color: "black",
        },
      });
      setShowModal(false);
      navigate("/productos");
    }
  };

  return (
    <div>
      <ModalEliminarProducto
        showModal={showModal}
        handleClose={() => setShowModal(false)}
        handleConfirm={handleConfirmDelete}
        producto={productoSeleccionado}
      />
      <div className="flex items-center">
        <ProductoBoton />
        <div className="flex ml-4">
          {!params.id && (
            <button
              onClick={handleSubmit(onSubmit)}
              className="px-2 py-1 text-sm text-indigo-500 rounded-lg"
              title="Crear"
            >
              <FontAwesomeIcon icon={faCloudUploadAlt} />
            </button>
          )}
          {params.id && isDirty && (
            <button
              onClick={handleSubmit(onSubmit)}
              className="px-2 py-1 text-sm text-indigo-500 rounded-lg"
              title="Actualizar"
            >
              <FontAwesomeIcon icon={faCloudUploadAlt} />
            </button>
          )}
          {params.id && (
            <button
              onClick={handleDeleteClick}
              className="px-2 py-1 ml-2 text-sm text-red-500 rounded-lg"
              title="Eliminar"
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          )}
        </div>
      </div>
      <div className="p-2 mt-2 ml-2 mr-2 bg-white border border-gray-300 rounded-lg shadow-md max-w-1xl">
        <form className="ml-2 mr-2 " onSubmit={onSubmit}>
          <p className="flex-grow ml-1 text-sm font-semibold text-gray-800">
            Nombre del Producto
          </p>
          <input
            type="text"
            {...register("nombre", { required: true })}
            className="block w-full mb-3 text-2xl border-b-2 border-transparent focus:border-indigo-500 hover:border-gray-800 focus:outline-none"
            style={{
              transition: "border-color 0.3s",
              backgroundColor: "transparent",
              paddingTop: "0.39rem",
              paddingBottom: "0.39rem",
            }}
          />
          <div className="flex flex-wrap mb-6">
            <div className="w-full px-3 mb-6 md:w-1/3 md:mb-0">
              <p className="text-sm font-semibold text-gray-800">Código</p>
              <input
                {...register("codigo", { required: true })}
                className="block w-full mb-3 border-b-2 border-transparent focus:border-indigo-500 hover:border-gray-800 focus:outline-none"
                style={{
                  transition: "border-color 0.3s",
                  backgroundColor: "transparent",
                  paddingTop: "0.39rem",
                  paddingBottom: "0.39rem",
                }}
              />
            </div>
            <div className="w-full px-3 mb-6 md:w-1/3 md:mb-0">
              <p className="text-sm font-semibold text-gray-800">
                Categoría del Producto
              </p>
              <select
                {...register("categoria", { required: true })}
                className="block w-full border-b-2 border-transparent appearance-none focus:border-indigo-500 hover:border-gray-800 focus:outline-none"
                style={{
                  backgroundColor: "transparent",
                  paddingTop: "0.39rem",
                  paddingBottom: "0.39rem",
                }}
              >
                <option value="">Seleccione una categoría</option>
                {categorias.map((categoria) => (
                  <option key={categoria.id} value={categoria.id}>
                    {categoria.combinacion}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full px-3 mb-6 md:w-1/3 md:mb-0">
              <p className="text-sm font-semibold text-gray-800">Precio</p>
              <input
                {...register("precio", { required: true })}
                className="block w-full pt-3 mb-3 border-b-2 border-transparent focus:border-indigo-500 hover:border-gray-800 focus:outline-none"
                style={{
                  transition: "border-color 0.3s",
                  backgroundColor: "transparent",
                  paddingTop: "0.39rem",
                  paddingBottom: "0.39rem",
                }}
              />
            </div>
          </div>
          <p className="flex-grow ml-1 text-sm font-semibold text-gray-800">
            Detalle
          </p>
          <textarea
            rows="2"
            {...register("detalle")}
            className="block w-full pt-3 mb-3 border-b-2 border-transparent focus:border-indigo-500 hover:border-gray-800 focus:outline-none"
            style={{
              transition: "border-color 0.3s",
              backgroundColor: "transparent",
              paddingTop: "0.39rem",
              paddingBottom: "0.39rem",
            }}
          ></textarea>
        </form>
      </div>
    </div>
  );
}
