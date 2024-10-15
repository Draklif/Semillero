import DOMPurify from "dompurify";
import { createFileRoute } from "@tanstack/react-router";
import { getDataById } from "@/lib/api";
import { useState, useEffect } from "react";
import { Project } from "@/types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export const Route = createFileRoute("/proyectos/$proyectoId")({
  component: ProyectoComponent,
});

function ProyectoComponent() {
  const { proyectoId } = Route.useParams(); // Obtener el id de la URL
  const [project, setProject] = useState<Project | null>(null); // Estado para el proyecto
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState<string | null>(null); // Estado para manejar errores
  const [selectedImage, setSelectedImage] = useState<string>(""); // Estado para la imagen seleccionada

  // Cargar el proyecto cuando cambia el id
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const projectData = await getDataById(Number(proyectoId));
        setProject(projectData);
        setSelectedImage(projectData.images[0]); // Establecer la primera imagen como la seleccionada
      } catch (err) {
        setError("Proyecto no encontrado");
      } finally {
        setLoading(false); // Termina el estado de carga
      }
    };

    fetchProject();
  }, [proyectoId]);

  if (loading) {
    return <div>Cargando...</div>; // Mostrar mensaje mientras se carga el proyecto
  }

  if (error) {
    return <div>{error}</div>; // Mostrar mensaje de error si no se encuentra el proyecto
  }

  if (!project) {
    return <div>Proyecto no encontrado</div>; // En caso de que no se obtenga el proyecto
  }

  const cleanHTML = DOMPurify.sanitize(project.desc_long);

  const handleImageSelect = (image: string) => {
    setSelectedImage(image);
  };

  return (
    <div className="bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-4">{project.name}</h1>
      <div className="flex gap-10">
        <div className="flex-1">
          <div className="relative pt-[56.25%] w-full overflow-hidden">
            <img
              src={`${selectedImage}`}
              alt="Imagen principal"
              className="absolute top-0 left-0 w-full h-full object-cover"
            />
          </div>
          <div className="mt-4 flex items-center justify-center">
            <Carousel opts={{ align: "start", loop: true }} className="w-4/5">
              <CarouselContent className="-ml-1">
                {project.images.map((img, index) => (
                  <CarouselItem key={index} className="basis-1/3">
                    <img
                      key={index}
                      src={`${img}`}
                      alt={`Imagen ${index + 1}`}
                      className={`w-full h-32 object-cover ${img === selectedImage ? "ring-2 ring-blue-500" : ""}`}
                      onClick={() => handleImageSelect(img)}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="text-black" />
              <CarouselNext className="text-black" />
            </Carousel>
          </div>
        </div>
        <div className="w-1/3 bg-gray-800 p-4 rounded-lg">
          <img
            src={`${project.images[0]}`}
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
                  <span key={index} className="bg-blue-500 px-2 py-1 rounded-full text-xs text-white">
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
          <p className="mt-2 text-md" dangerouslySetInnerHTML={{ __html: cleanHTML }}></p>
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
