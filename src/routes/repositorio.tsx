import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import data from "@/data/data.json";
import ProjectCard from "@/components/reusables/projectCard";
import { Project } from "@/types";

export const Route = createFileRoute("/repositorio")({
  component: RepositoryList,
});

function RepositoryList() {
  const [filtroInput, setFiltroInput] = useState("");
  const [filtrosActivos, setFiltrosActivos] = useState([]);
  const [proyectos] = useState(
    data.projects.filter((p) => p.format.some((fmt) => fmt !== ""))
  );

  const agregarFiltro = (e) => {
    if (e.key === "Enter" && e.target.value) {
      if (!filtrosActivos.includes(e.target.value)) {
        setFiltrosActivos([...filtrosActivos, e.target.value]);
        setFiltroInput("");
      }
    }
  };

  const eliminarFiltro = (filtro) => {
    setFiltrosActivos(filtrosActivos.filter((f) => f !== filtro));
  };

  const proyectosFiltrados = proyectos.filter((p) =>
    filtrosActivos.every(
      (filtro) =>
        p.name.toLowerCase().includes(filtro.toLowerCase()) ||
        p.tags.includes(filtro)
    )
  );

  return (
    <div className="bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold">Repositorio de Proyectos</h1>
      <div className="flex">
        <div className="w-1/4 p-4">
          <input
            type="text"
            placeholder="Buscar por nombre o etiqueta..."
            className="w-full p-2 bg-gray-800 rounded mb-2"
            value={filtroInput}
            onChange={(e) => setFiltroInput(e.target.value)}
            onKeyDown={agregarFiltro}
          />
          {filtrosActivos.map((filtro) => (
            <div
              key={filtro}
              className="bg-gray-800 p-2 rounded flex justify-between items-center mb-1"
            >
              {filtro}
              <button
                onClick={() => eliminarFiltro(filtro)}
                className="text-red-500"
              >
                x
              </button>
            </div>
          ))}
        </div>
        <div className="flex-grow p-4">
          <div className="flex flex-col items-center gap-4">
            {proyectosFiltrados.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                style={{ width: "100%", maxWidth: "600px" }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
