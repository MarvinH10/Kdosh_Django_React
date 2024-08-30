import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  getAllValoresAtributos,
  createValoresAtributos,
  deleteValoresAtributos,
  updateValoresAtributos,
  getValorAtributo,
} from "../../api/ValoresAtributos/valores_atributos.api";
import { getAllAtributos } from "../../api/Atributos/atributos.api";
import { ValorAtributoBoton } from "../../components/ValoresAtributos/ValorAtributoBoton";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudUploadAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
import { ModalEliminarValorAtributo } from "../../components/ValoresAtributos/ModalEliminarValorAtributo";

export function ValoresAtributosFormPage() {
  const [, setValoresAtributos] = useState([]);
  const [atributos, setAtributos] = useState([]);
  const [currentNombre, setCurrentNombre] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [valoratributoSeleccionado, setValorAtributoSeleccionado] =
    useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function loadValoresAtributos() {
      const res = await getAllValoresAtributos();
      setValoresAtributos(res.data);

      const resAtributos = await getAllAtributos();
      setAtributos(resAtributos.data);
    }
    loadValoresAtributos();
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    if (params.id) {
      await updateValoresAtributos(params.id, data);
      toast.success("Valor de Atributo actualizado", {
        position: "bottom-right",
        style: {
          background: "white",
          color: "black",
        },
      });
    } else {
      await createValoresAtributos(data);
      toast.success("Valor de Atributo creado", {
        position: "bottom-right",
        style: {
          background: "white",
          color: "black",
        },
      });
    }
    navigate("/valores_atributos");
  });

  useEffect(() => {
    async function loadValorAtributo() {
      if (params.id) {
        const res = await getValorAtributo(params.id);
        if (res.data) {
          const { valor, atributo } = res.data;
          setCurrentNombre(valor);
          reset({
            valor: valor,
            atributo: atributo,
          });
        }
      } else {
        reset({
          valor: "",
          atributo: "",
        });
      }
    }
    loadValorAtributo();
  }, [params.id, reset]);

  const handleDeleteClick = (valor_atributo) => {
    setValorAtributoSeleccionado(valor_atributo);
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    await deleteValoresAtributos(`${params.id}/`);
    toast.success("Valor de Atributo eliminado", {
      position: "bottom-right",
      style: {
        background: "white",
        color: "black",
      },
    });
    setShowModal(false);
    navigate("/valores_atributos");
  };

  return (
    <div>
      <ModalEliminarValorAtributo
        showModal={showModal}
        handleClose={() => setShowModal(false)}
        handleConfirm={async () => {
          await deleteValoresAtributos(`${params.id}/`);
          toast.success("Valor de Atributo eliminado", {
            position: "bottom-right",
            style: {
              background: "white",
              color: "black",
            },
          });
          setShowModal(false);
          navigate("/valores_atributos");
        }}
        valor_atributo={valoratributoSeleccionado}
      />
      <div className="flex items-center">
        <ValorAtributoBoton />
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
            Valor de Atributo
          </p>
          <input
            type="text"
            {...register("valor", { required: true })}
            className="block w-full pt-3 mb-3 text-2xl border-b-2 border-transparent focus:border-indigo-500 hover:border-gray-800 focus:outline-none"
            style={{
              transition: "border-color 0.3s",
              backgroundColor: "transparent",
              paddingTop: "0.39rem",
              paddingBottom: "0.39rem",
            }}
          />
          <div className="flex flex-wrap mb-6">
            <div className="w-full px-3 mb-6 md:w-1/3 md:mb-0">
              <p className="text-sm font-semibold text-gray-800">Atributos</p>
              <select
                {...register("atributo", { required: true })}
                className="block w-full border-b-2 border-transparent appearance-none focus:border-indigo-500 hover:border-gray-800 focus:outline-none"
                style={{
                  backgroundColor: "transparent",
                  paddingTop: "0.39rem",
                  paddingBottom: "0.39rem",
                }}
              >
                <option value="">Seleccione un atributo</option>
                {atributos.map((atributo) => (
                  <option key={atributo.id} value={atributo.id}>
                    {atributo.nombre}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </form>
      </div>
      <ModalEliminarValorAtributo
        showModal={showModal}
        handleClose={() => setShowModal(false)}
        handleConfirm={handleConfirmDelete}
        valor_atributo={valoratributoSeleccionado}
      />
    </div>
  );
}
