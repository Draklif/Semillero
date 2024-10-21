import { useState, useEffect } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Project } from "@/types";
import { getDataById, postData, updateData } from "@/lib/api";

export const Route = createFileRoute("/crud/$proyectoId")({
  component: CRUDProjectId,
});

const FORMATS = [".fbx", ".blend", ".png", ".jpeg", ".obj", ".gif", "Otro(s)"];

const formatDateToDDMMYYYY = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses comienzan en 0
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

function CRUDProjectId() {
  const { proyectoId } = Route.useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isResource, setIsResource] = useState(false);

  useEffect(() => {
    const loadProject = async () => {
      if (proyectoId === "0") {
        setProject({
          id: 0,
          name: "",
          desc_short: "",
          date: formatDateToDDMMYYYY(new Date()),
          authors: [{ name: "" }],
          tags: [],
          format: [],
          images: [],
          links: [],
          desc_long: "",
        });
      } else {
        const projectData = await getDataById(Number(proyectoId));
        setProject(projectData);
        setIsResource(projectData.format.length > 0); // Si tiene formatos, es un recurso
      }
      setLoading(false);
    };

    loadProject();
  }, [proyectoId]);

  const handleInputChange = <K extends keyof Project>(field: K, value: Project[K]) => {
    if (project) {
      setProject((prevProject) => ({
        ...prevProject as Project,
        [field]: value,
      }));
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (validateForm()) {
      if (project) {
        if (proyectoId && proyectoId !== "0") {
          await updateData(Number(proyectoId), project);
        } else {
          await postData(project);
        }
        navigate({ to: "/proyectos" });
      }
    } else {
      setError("Por favor, complete todos los campos obligatorios.");
    }
  };

  const validateForm = () => {
    if (!project) return false;
    
    const { name, desc_short, authors, tags, images, links, desc_long, format } = project;
    
    const hasRequiredFields = authors.length > 0 && tags.length > 0 && images.length > 0 && links.length > 0;
    
    const uniqueImages = new Set(images.map(image => image.trim()));
    const areImagesUnique = uniqueImages.size === images.length;
    
    const uniqueLinks = new Set(links.map(link => link.trim()));
    const areLinksUnique = uniqueLinks.size === links.length;
  
    const hasFormat = !isResource || (isResource && format.length > 0);
  
    return (
      name.trim() !== "" &&
      desc_short.trim() !== "" &&
      desc_long.trim() !== "" &&
      authors.every((author) => author.name.trim() !== "") &&
      tags.every((tag) => tag.trim() !== "") &&
      images.every((image) => image.trim() !== "") &&
      links.every((link) => link.trim() !== "") &&
      hasRequiredFields &&
      areImagesUnique &&
      areLinksUnique &&
      hasFormat
    );
  };
  

  const handleRemoveItem = <K extends keyof Project>(field: K, index: number) => {
    if (project) {
      setProject((prevProject) => {
          if (prevProject) {
              let updatedList: string[] | { name: string }[];
              if (Array.isArray(prevProject[field])) {
                  if (field === "authors") {
                      updatedList = [...prevProject.authors];
                  } else if (field === "tags" || field === "images" || field === "links" || field === "format") {
                      updatedList = [...(prevProject[field] as string[])]; // Asegúrate de que 'format' es manejado aquí
                  } else {
                      return prevProject;
                  }
                  updatedList.splice(index, 1);
                  return {
                      ...prevProject,
                      [field]: updatedList,
                  };
              }
          }
          return prevProject;
      });
    }
  };


  if (loading || !project) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="bg-gray-900 min-h-screen text-white p-6">
      <h1 className="text-2xl font-bold mb-2">
        {proyectoId === "0" ? "Crear Nuevo Proyecto" : "Editar Proyecto"}
      </h1>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <form onSubmit={handleSubmit}>
        {/* Toggle entre Proyecto y Recurso */}
        <div className="mb-4 flex items-center">
          <label className="block mb-2 mr-4">Tipo:</label>
          <button
            type="button"
            className={`p-2 rounded ${isResource ? "bg-blue-500" : "bg-gray-500"}`}
            onClick={() => setIsResource(false)}
          >
            Proyecto
          </button>
          <button
            type="button"
            className={`p-2 ml-4 rounded ${isResource ? "bg-gray-500" : "bg-blue-500"}`}
            onClick={() => setIsResource(true)}
          >
            Recurso
          </button>
        </div>

        {/* Nombre del Proyecto */}
        <div className="mb-4">
          <label htmlFor="name" className="block mb-2">Nombre del Proyecto:</label>
          <input
            type="text"
            id="name"
            value={project.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            className="w-full p-2 rounded bg-gray-800 text-white"
          />
        </div>

        {/* Descripción Corta */}
        <div className="mb-4">
          <label htmlFor="desc_short" className="block mb-2">Descripción Corta:</label>
          <textarea
            id="desc_short"
            value={project.desc_short}
            onChange={(e) => handleInputChange("desc_short", e.target.value)}
            className="w-full p-2 rounded bg-gray-800 text-white"
          />
        </div>

        {/* Descripción Larga */}
        <div className="mb-4">
          <label htmlFor="desc_long" className="block mb-2">Descripción Larga:</label>
          <textarea
            id="desc_long"
            value={project.desc_long}
            onChange={(e) => handleInputChange("desc_long", e.target.value)}
            className="w-full p-2 rounded bg-gray-800 text-white"
          />
        </div>

        {/* Autores */}
        <div className="mb-4">
          <label htmlFor="authors" className="block mb-2">Autores:</label>
          {project.authors.map((author, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="text"
                value={author.name}
                onChange={(e) => {
                  const newAuthors = [...project.authors];
                  newAuthors[index].name = e.target.value;
                  handleInputChange("authors", newAuthors);
                }}
                className="w-full p-2 rounded bg-gray-800 text-white"
                placeholder={`Autor ${index + 1}`}
              />
              <button
                type="button"
                onClick={() => handleRemoveItem("authors", index)}
                className="ml-2 text-red-500"
              >
                X
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => handleInputChange("authors", [...project.authors, { name: "" }])}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded"
          >
            Añadir Autor
          </button>
        </div>

        {/* Tags */}
        <div className="mb-4">
          <label htmlFor="tags" className="block mb-2">Etiquetas:</label>
          {project.tags.map((tag, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="text"
                value={tag}
                onChange={(e) => {
                  const newTags = [...project.tags];
                  newTags[index] = e.target.value;
                  handleInputChange("tags", newTags);
                }}
                className="w-full p-2 rounded bg-gray-800 text-white"
                placeholder={`Tag ${index + 1}`}
              />
              <button
                type="button"
                onClick={() => handleRemoveItem("tags", index)}
                className="ml-2 text-red-500"
              >
                X
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => handleInputChange("tags", [...project.tags, ""])}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded"
          >
            Añadir Etiqueta
          </button>
        </div>

        {/* Campos adicionales si es un Recurso */}
        {isResource && (
          <div className="mb-4">
            <label htmlFor="format" className="block mb-2">Formato del Recurso:</label>
            {project.format.map((fmt, index) => (
              <div key={index} className="flex items-center mb-2">
                <select
                  value={fmt}
                  onChange={(e) => {
                    const newFormats = [...project.format];
                    newFormats[index] = e.target.value;
                    handleInputChange("format", newFormats);
                  }}
                  className="w-full p-2 rounded bg-gray-800 text-white"
                >
                  {FORMATS.map((format) => (
                    <option key={format} value={format}>
                      {format}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => handleRemoveItem("format", index)}
                  className="ml-2 text-red-500"
                >
                  X
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => handleInputChange("format", [...project.format, ""])}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded"
            >
              Añadir Formato
            </button>
          </div>
        )}

        {/* Imágenes */}
        <div className="mb-4">
          <label htmlFor="images" className="block mb-2">Imágenes (URLs):</label>
          {project.images.map((image, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="text"
                value={image}
                onChange={(e) => {
                  const newImages = [...project.images];
                  newImages[index] = e.target.value;
                  handleInputChange("images", newImages);
                }}
                className="w-full p-2 rounded bg-gray-800 text-white"
                placeholder={`Imagen ${index + 1}`}
              />
              <button
                type="button"
                onClick={() => handleRemoveItem("images", index)}
                className="ml-2 text-red-500"
              >
                X
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => handleInputChange("images", [...project.images, ""])}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded"
          >
            Añadir Imagen
          </button>
        </div>

        {/* Enlaces */}
        <div className="mb-4">
          <label htmlFor="links" className="block mb-2">Enlaces (URLs):</label>
          {project.links.map((link, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="text"
                value={link}
                onChange={(e) => {
                  const newLinks = [...project.links];
                  newLinks[index] = e.target.value;
                  handleInputChange("links", newLinks);
                }}
                className="w-full p-2 rounded bg-gray-800 text-white"
                placeholder={`Enlace ${index + 1}`}
              />
              <button
                type="button"
                onClick={() => handleRemoveItem("links", index)}
                className="ml-2 text-red-500"
              >
                X
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => handleInputChange("links", [...project.links, ""])}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded"
          >
            Añadir Enlace
          </button>
        </div>

        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {proyectoId === "0" ? "Crear Proyecto" : "Actualizar Proyecto"}
          </button>
        </div>
      </form>
    </div>
  );
}