import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/crud/")({
  component: CRUDIndexPage,
});

function CRUDIndexPage() {
  const [projectId, setProjectId] = useState<string>("0"); // Estado para almacenar el id del proyecto

  const navigate = useNavigate()
  useEffect(() => {
    if (!localStorage.getItem("CR")) {
      navigate({ to: "/" })
    }
  }, [navigate]);

  return (
    <div className="bg-gray-900 min-h-screen text-white p-6 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Buscar Proyecto para Editar</h1>
      
      {/* Campo de texto para escribir el ID del proyecto */}
      <input
        type="text"
        value={projectId}
        onChange={(e) => setProjectId(e.target.value)} // Actualizamos el estado con el valor del input
        placeholder="Introduce el ID del proyecto"
        className="mb-4 p-2 w-1/2 rounded bg-gray-800 text-white"
      />

      {/* Botón para navegar hacia el editor de ese proyecto */}
      <Link
        to={`/crud/${projectId}`}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Ver ahora
      </Link>

      {/* Botón para crear un nuevo proyecto con id 0 */}
      <Link
        to={`/crud/${projectId}`}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Crear nuevo proyecto
      </Link>
    </div>
  );
}