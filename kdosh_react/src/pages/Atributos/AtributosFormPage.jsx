import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  getAllAtributos,
  createAtributos,
  deleteAtributos,
  updateAtributos,
  getAtributo,
} from "../../api/Atributos/atributos.api";
import { AtributoBoton } from "../../components/Atributos/AtributoBoton";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudUploadAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
import { ModalEliminarAtributo } from "../../components/Atributos/ModalEliminarAtributo";

export function AtributosFormPage() {
  const [, setAtributos] = useState([]);
  const [currentNombre, setCurrentNombre] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [atributoSeleccionado, setAtributoSeleccionado] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function loadAtributos() {
      const res = await getAllAtributos();
      setAtributos(res.data);
    }
    loadAtributos();
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    if (params.id) {
      await updateAtributos(params.id, data);
      toast.success("Atributo actualizado", {
        position: "bottom-right",
        style: {
          background: "white",
          color: "black",
        },
      });
    } else {
      await createAtributos(data);
      toast.success("Atributo creado", {
        position: "bottom-right",
        style: {
          background: "white",
          color: "black",
        },
      });
    }
    navigate("/atributos");
  });

  useEffect(() => {
    async function loadAtributo() {
      if (params.id) {
        const res = await getAtributo(params.id);
        if (res.data) {
          const { nombre } = res.data;
          setCurrentNombre(nombre);
          reset({
            nombre: nombre,
          });
        }
      } else {
        reset({
          nombre: "",
        });
      }
    }
    loadAtributo();
  }, [params.id, reset]);

  const handleDeleteClick = (atributo) => {
    setAtributoSeleccionado(atributo);
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    await deleteAtributos(`${params.id}/`);
    toast.success("Atributo eliminado", {
      position: "bottom-right",
      style: {
        background: "white",
        color: "black",
      },
    });
    setShowModal(false);
    navigate("/atributos");
  };

  return (
    <div>
      <ModalEliminarAtributo
        showModal={showModal}
        handleClose={() => setShowModal(false)}
        handleConfirm={async () => {
          await deleteAtributos(`${params.id}/`);
          toast.success("Atributo eliminado", {
            position: "bottom-right",
            style: {
              background: "white",
              color: "black",
            },
          });
          setShowModal(false);
          navigate("/atributos");
        }}
        atributo={atributoSeleccionado}
      />
      <div className="flex items-center">
        <AtributoBoton />
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
              onClick={() => handleDeleteClick({ nombre: currentNombre })}
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
            Atributo
          </p>
          <input
            type="text"
            {...register("nombre", { required: true })}
            className="block w-full pt-3 mb-3 text-2xl border-b-2 border-transparent focus:border-indigo-500 hover:border-gray-800 focus:outline-none"
            style={{
              transition: "border-color 0.3s",
              backgroundColor: "transparent",
              paddingTop: "0.39rem",
              paddingBottom: "0.39rem",
            }}
          />
        </form>
      </div>
      <ModalEliminarAtributo
        showModal={showModal}
        handleClose={() => setShowModal(false)}
        handleConfirm={handleConfirmDelete}
        atributo={atributoSeleccionado}
      />
    </div>
  );
}
