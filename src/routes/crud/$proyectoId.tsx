import { useState, useEffect } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Project } from "@/types";
import { getDataById, postData, updateData } from "@/lib/api";

export const Route = createFileRoute("/crud/$proyectoId")({
  component: CRUDProjectId,
});

function CRUDProjectId() {
  const { proyectoId } = Route.useParams(); // Obtener el id de la URL
  const navigate = useNavigate(); // Para redirigir después de guardar
  const [project, setProject] = useState<Project | null>(null); // Estado del proyecto
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState<string | null>(null); // Estado de error

  // Cargar proyecto si el id está presente
  useEffect(() => {
    const loadProject = async () => {
      if (proyectoId === "0") {
        // Si el id es 0, estamos creando un proyecto nuevo
        setProject({
          id: 0,
          name: "",
          desc_short: "",
          date: new Date().toISOString(),
          authors: [{ name: "" }],
          tags: [],
          format: [],
          images: [],
          links: [],
          desc_long: "",
        });
      } else {
        // Si no es 0, estamos editando un proyecto existente
        const projectData = await getDataById(Number(proyectoId));
        setProject(projectData);
      }
      setLoading(false); // Terminamos de cargar
    };

    loadProject();
  }, [proyectoId]);

  // Función para manejar cambios en los campos
  const handleInputChange = (field: string, value: any) => {
    if (project) {
      setProject((prevProject) => ({
        ...prevProject,
        [field]: value,
      }));
    }
  };

  // Función para manejar el envío del formulario con validaciones
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Evitar recarga
    if (validateForm()) {
      if (project) {
        if (proyectoId && proyectoId !== "0") {
          await updateData(Number(proyectoId), project); // Actualizar si ya existe
        } else {
          await postData(project); // Crear si es nuevo
        }
        navigate({ to: "/proyectos" }); // Redirigir a la lista de proyectos después de guardar
      }
    } else {
      setError("Por favor, complete todos los campos obligatorios.");
    }
  };

  // Validar que todos los campos estén llenos, excepto 'format'
  const validateForm = () => {
    if (!project) return false;
    const { name, desc_short, authors, tags, images, links, desc_long } = project;


    const hasRequiredFields = authors.length > 0 && tags.length > 0 && images.length > 0 && links.length > 0;

    // Comprobar si hay URLs de imágenes duplicadas
    const uniqueImages = new Set(images.map(image => image.trim()));
    const areImagesUnique = uniqueImages.size === images.length;

    // Comprobar si hay enlaces duplicados
    const uniqueLinks = new Set(links.map(link => link.trim()));
    const areLinksUnique = uniqueLinks.size === links.length;

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
      areLinksUnique
    );
  };

  // Función para eliminar un elemento de una lista
  const handleRemoveItem = (field: string, index: number) => {
    if (project) {
      setProject((prevProject) => {
        const updatedList = [...(prevProject as any)[field]];
        updatedList.splice(index, 1);
        return { ...prevProject, [field]: updatedList };
      });
    }
  };

  if (loading || !project) {
    return <div>Cargando...</div>; // Mostrar un mensaje de carga mientras obtenemos los datos
  }

  return (
    <div className="bg-gray-900 min-h-screen text-white p-6">
      <h1 className="text-2xl font-bold mb-2">
        {proyectoId === "0" ? "Crear Nuevo Proyecto" : "Editar Proyecto"}
      </h1>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <form onSubmit={handleSubmit}>
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
            Añadir Tag
          </button>
        </div>

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

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {proyectoId === "0" ? "Crear Proyecto" : "Actualizar Proyecto"}
        </button>
      </form>
    </div>
  );
}