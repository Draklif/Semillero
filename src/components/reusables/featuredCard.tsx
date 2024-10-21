import { useNavigate } from "@tanstack/react-router";
import { Project } from "@/types"; // Asumiendo que tienes un type definido

interface FeaturedCardProps {
  project: Project;
}

function FeaturedCard({ project }: FeaturedCardProps) {
  const router = useNavigate();

  return (
    <div className="bg-gray-900 rounded-lg p-4 flex flex-col lg:flex-row gap-4">
      {/* Imagen principal */}
      <div className="flex-none w-full lg:w-2/3 relative" style={{ paddingTop: "37.5%" }}>
        <img
          src={`${project.images[0]}`}
          alt="Imagen principal"
          className="absolute top-0 left-0 w-full h-full object-cover rounded-lg"
        />
      </div>

      {/* Información del proyecto */}
      <div className="flex-1 flex flex-col justify-between">
        <h3 className="text-xl font-bold text-white">{project.name}</h3>
        <p className="text-gray-300 mb-4">{project.desc_short}</p>

        {/* Imágenes adicionales solo en pantallas grandes */}
        <div className="hidden lg:grid lg:grid-cols-2 lg:grid-rows-2 lg:gap-2 mb-4">
          {project.images.slice(1, 5).map((img, index) => (
            <div
              key={index}
              className="relative w-full"
              style={{ paddingTop: "56.25%" }}
            >
              <img
                src={`${img}`}
                alt={`Imagen ${index + 1}`}
                className="absolute top-0 left-0 w-full h-full object-cover rounded-lg"
              />
            </div>
          ))}
        </div>

        {/* Botón para ver el proyecto */}
        <div className="mt-4 lg:mt-8 flex justify-center lg:justify-center">
          <button
            onClick={() => router({ to: `/proyectos/${project.id}` })}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Ver ahora
          </button>
        </div>
      </div>
    </div>
  );
}

export default FeaturedCard;
