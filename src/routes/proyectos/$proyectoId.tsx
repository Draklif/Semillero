import DOMPurify from "dompurify";
import { createFileRoute } from "@tanstack/react-router";
import data from "../../data/data.json";
import { useState } from "react";
import { Project } from "@/types";

export const Route = createFileRoute("/proyectos/$proyectoId")({
  component: ProyectoComponent,
});

function ProyectoComponent() {
  const projects: Project[] = data.projects;
  const { proyectoId } = Route.useParams();
  const [project] = useState(
    projects.find((item) => Number(proyectoId) === item.id)
  );

  if (!project) {
    return <div>Proyecto no encontrado</div>;
  }

  const cleanHTML = DOMPurify.sanitize(project.desc_long);

  return (
    <div className="bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-4">{project.name}</h1>
      <div className="flex gap-10">
        <div className="flex-1">
          <img
            src={project.images[1]}
            alt="Imagen principal"
            className="w-full"
          />
          <div className="mt-4 grid grid-cols-3 gap-2">
            {project.images.slice(1).map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Imagen ${index + 2}`}
                className="w-full h-32 object-cover"
              />
            ))}
          </div>
        </div>
        <div className="w-1/3 bg-gray-800 p-4 rounded-lg">
          <img
            src={project.images[0]}
            alt="Imagen principal"
            className="w-full h-48 object-cover"
          />
          <div className="mt-2">
            <div className="flex justify-between text-gray-400">
              <p>Fecha de publicación:</p>
              <p className="text-white">{project.date}</p>
            </div>
            <div className="flex justify-between text-gray-400 mt-2">
              <p>Autores:</p>
              <p className="text-white">
                {project.authors.map((author) => author.name).join(", ")}
              </p>
            </div>
            <div className="mt-2 text-gray-400">
              <p>Etiquetas:</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {project.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-blue-500 px-2 py-1 rounded-full text-xs text-white"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-4 mt-6">
        <div className="flex-1 bg-gray-800 p-4 rounded-lg">
          <h2 className="text-2xl font-semibold">Acerca de</h2>
          <p
            className="mt-2 text-md"
            dangerouslySetInnerHTML={{ __html: cleanHTML }}
          ></p>
        </div>
        <div className="w-1/4 bg-gray-800 p-4 rounded-lg">
          <h2 className="text-2xl font-semibold">Enlaces</h2>
          <div className="mt-2 flex flex-col gap-2">
            {project.links.map((link, index) => (
              <a
                key={index}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded text-center transition duration-300 ease-in-out"
              >
                {new URL(link).hostname}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
