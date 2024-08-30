export function ModalEliminarAtributo({
  showModal,
  handleClose,
  handleConfirm,
  atributo,
}) {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div className="flex items-start justify-center mt-5">
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75"></div>
        <div className="overflow-hidden transition-all transform bg-white rounded-lg shadow-xl sm:max-w-lg sm:w-full">
          <div className="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto bg-red-100 rounded-full sm:mx-0 sm:h-10 sm:w-10">
                <span className="flex-shrink-0 inline-flex justify-center items-center size-[55px] sm:w-[55px] sm:h-[55px] rounded-full border-2 border-gray-200 dark:bg-red-600 dark:text-white">
                  <svg
                    className="flex-shrink-0 size-5"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"></path>
                  </svg>
                </span>
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  className="text-lg font-medium leading-6 text-gray-900"
                  id="modal-title"
                >
                  Eliminar Atributo
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    ¿Estás seguro que deseas eliminar el atributo{" "}
                    <span className="font-medium text-gray-900">
                      {atributo.nombre}
                    </span>
                    ? Presione{" "}
                    <span className="font-medium text-gray-900">eliminar</span>{" "}
                    si desea continuar.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="px-4 py-3 bg-gray-100 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-black border border-transparent rounded-md shadow-sm hover:bg-red-700 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={handleConfirm}
            >
              Eliminar
            </button>
            <button
              type="button"
              className="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 sm:mt-0 sm:w-auto sm:text-sm"
              onClick={handleClose}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
