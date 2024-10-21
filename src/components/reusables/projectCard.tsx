import { Link } from "@tanstack/react-router";
import { Project } from "@/types";
import { deleteData } from "@/lib/api";

interface ProjectCardProps {
  project: Project;
}

function ProjectCard({ project }: ProjectCardProps) {
  const handleDelete = async () => {
    try {
      await deleteData(project.id);
      alert('Proyecto eliminado');
      window.location.reload();
    } catch (error) {
      console.error('Error al eliminar proyecto:', error);
    }
  };

  return (
    <div className="flex bg-gray-800 text-white p-4 rounded-lg shadow-lg w-full items-stretch">
      {/* Imagen */}
      <div className="hidden sm:flex flex-none w-1/4">
        <div className="relative w-full" style={{ aspectRatio: '16 / 9' }}>
          <img
            src={project.images[0]}
            alt={project.name}
            className="absolute top-0 left-0 w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>

      {/* Información del proyecto */}
      <div className="flex-grow px-4 py-2">
        <h3 className="text-lg font-semibold">{project.name}</h3>
        <div className="flex flex-wrap gap-1 my-2 mb-4">
          {project.tags.map(tag => (
            <span key={tag} className="bg-gray-700 text-sm rounded-full px-2 py-1">
              {tag}
            </span>
          ))}
        </div>
        <p className="text-sm">{project.date}</p>
        <div className="mt-auto">
          <p className="text-xs">
            {project.authors.map(author => author.name).join(", ")}
          </p>
        </div>
      </div>

      {/* Botones de acción: Ver, Modificar, Eliminar */}
      <div className="flex flex-col justify-end w-1/5 p-2">
        <Link to={`/proyectos/${project.id}`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded self-end mt-auto" onClick={() => {console.log(project.id);}}>
          Ver ahora
        </Link>

        {/* Botón Modificar (solo visible si está autenticado) */}
        {localStorage.getItem("CR") && (
          <Link to={`/crud/${project.id}`} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded self-end mt-2">
            Modificar
          </Link>
        )}

        {/* Botón Eliminar (solo visible si está autenticado) */}
        {localStorage.getItem("CR") && (
          <button
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded self-end mt-2"
          >
            Eliminar
          </button>
        )}
      </div>
    </div>
  );
}

export default ProjectCard;
