import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  getAllCategorias,
  createCategorias,
  deleteCategorias,
  updateCategorias,
  getCategoria,
} from "../../api/Categorias/categorias.api";
import { CategoriaBoton } from "../../components/Categorias/CategoriaBoton";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudUploadAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
import { ModalEliminarCategoria } from "../../components/Categorias/ModalEliminarCategoria";

export function CategoriasFormPage() {
  const [categorias, setCategorias] = useState([]);
  const [currentNombre, setCurrentNombre] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function loadCategorias() {
      const res = await getAllCategorias();
      setCategorias(res.data);
    }
    loadCategorias();
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    if (params.id) {
      await updateCategorias(params.id, data);
      toast.success("Categoría actualizada", {
        position: "bottom-right",
        style: {
          background: "white",
          color: "black",
        },
      });
    } else {
      await createCategorias(data);
      toast.success("Categoría creada", {
        position: "bottom-right",
        style: {
          background: "white",
          color: "black",
        },
      });
    }
    navigate("/categorias");
  });

  useEffect(() => {
    async function loadCategoria() {
      if (params.id) {
        const res = await getCategoria(params.id);
        if (res.data) {
          const { nombre, parent } = res.data;
          setCurrentNombre(nombre);
          reset({
            nombre: nombre,
            parent: parent,
          });
        }
      } else {
        reset({
          nombre: "",
          parent: "",
        });
      }
    }
    loadCategoria();
  }, [params.id, reset]);

  const validateCategoriaCombinacion = (categoria) => {
    const combinacionPartes = categoria.combinacion.split(" / ");
    const ultimaParte = combinacionPartes[combinacionPartes.length - 1];
    return ultimaParte !== currentNombre;
  };

  const handleDeleteClick = (categoria) => {
    setCategoriaSeleccionada(categoria);
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    await deleteCategorias(`${params.id}/`);
    toast.success("Categoría eliminada", {
      position: "bottom-right",
      style: {
        background: "white",
        color: "black",
      },
    });
    setShowModal(false);
    navigate("/categorias");
  };

  return (
    <div>
      <ModalEliminarCategoria
        showModal={showModal}
        handleClose={() => setShowModal(false)}
        handleConfirm={async () => {
          await deleteCategorias(`${params.id}/`);
          toast.success("Categoría eliminada", {
            position: "bottom-right",
            style: {
              background: "white",
              color: "black",
            },
          });
          setShowModal(false);
          navigate("/categorias");
        }}
        categoria={categoriaSeleccionada}
      />
      <div className="flex items-center">
        <CategoriaBoton />
        <div className="ml-4 flex">
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
              onClick={() => handleDeleteClick({ nombre: currentNombre })}
              className="px-2 py-1 text-sm text-red-500 rounded-lg ml-2"
              title="Eliminar"
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          )}
        </div>
      </div>
      <div className="p-2 bg-white rounded-lg shadow-md max-w-1xl border border-gray-300 mr-2 ml-2 mt-2">
        <form className="mr-2 ml-2 " onSubmit={onSubmit}>
          <p className="text-gray-800 text-sm font-semibold flex-grow ml-1">
            Categoría
          </p>
          <input
            type="text"
            {...register("nombre", { required: true })}
            className="text-2xl pt-3 block w-full mb-3 border-b-2 border-transparent focus:border-indigo-500 hover:border-gray-800 focus:outline-none"
            style={{
              transition: "border-color 0.3s",
              backgroundColor: "transparent",
              paddingTop: "0.39rem",
              paddingBottom: "0.39rem",
            }}
          />
          <div className="flex flex-wrap mb-6">
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <p className="text-gray-800 text-sm font-semibold">
                Categoría Principal
              </p>
              <select
                {...register("parent")}
                className="block w-full border-b-2 border-transparent focus:border-indigo-500 hover:border-gray-800 focus:outline-none appearance-none"
                style={{
                  backgroundColor: "transparent",
                  paddingTop: "0.39rem",
                  paddingBottom: "0.39rem",
                }}
              >
                <option value="">Seleccione una categoría principal</option>
                {categorias
                  .filter(validateCategoriaCombinacion)
                  .map((categoria) => (
                    <option key={categoria.id} value={categoria.id}>
                      {categoria.combinacion}
                    </option>
                  ))}
              </select>
            </div>
          </div>
        </form>
      </div>
      <ModalEliminarCategoria
        showModal={showModal}
        handleClose={() => setShowModal(false)}
        handleConfirm={handleConfirmDelete}
        categoria={categoriaSeleccionada}
      />
    </div>
  );
}
