import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import data from "@/data/data.json";
import ProjectCard from "@/components/reusables/projectCard";
import { Project } from "@/types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export const Route = createFileRoute("/proyectos/")({
  component: ProjectList,
});

const projects: Project[] = data.projects;
const itemsPerPage = 5;

function ProjectList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [numPages, setNumPages] = useState(0);

  useEffect(() => {
    setNumPages(Math.ceil(projects.length / itemsPerPage));
  }, []);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProjects = projects.slice(startIndex, startIndex + itemsPerPage);

  function nextPage() {
    setCurrentPage(current => Math.min(current + 1, numPages));
  }

  function previousPage() {
    setCurrentPage(current => Math.max(current - 1, 1));
  }

  const getPageButtons = () => {
    const pageButtons = [];
    const visiblePages : number[] = []; // No add first page yet to manage ellipsis correctly
  
    // Determine dynamic range around the current page
    let start = Math.max(2, currentPage - 1);
    let end = Math.min(numPages - 1, currentPage + 1);
  
    if (currentPage < 4) {
      end = Math.min(5, numPages - 1); // Show first five pages dynamically
      visiblePages.push(1); // Include the first page since we are in the initial pages
    }
    if (currentPage > numPages - 4) {
      start = Math.max(numPages - 4, 2); // Show last five pages dynamically
    }
  
    // Fill the range of visible pages, adjust start if needed
    if (start > 2) visiblePages.push(1); // Always show the first page if start is away from first
    for (let i = start; i <= end; i++) {
      if (!visiblePages.includes(i)) {
        visiblePages.push(i);
      }
    }
    if (numPages > 1 && !visiblePages.includes(numPages)) {
      visiblePages.push(numPages); // Always show the last page
    }
  
    // Generate buttons with possible ellipsis
    let previous = 0;
    for (let i = 0; i < visiblePages.length; i++) {
      if (visiblePages[i] !== previous + 1 && previous !== 0) {
        // Add ellipsis only if there is a gap larger than 1 in the sequence
        // and it's not right after the first button if first button is shown
        pageButtons.push(<span key={"ellipsis-" + i} className="px-3 py-1 text-white">...</span>);
      }
      pageButtons.push(
        <button key={visiblePages[i]} onClick={() => setCurrentPage(visiblePages[i])}
                className={`px-3 py-1 rounded ${currentPage === visiblePages[i] ? "bg-blue-500" : "bg-gray-700"} text-white`}>
          {visiblePages[i]}
        </button>
      );
      previous = visiblePages[i];
    }
  
    return pageButtons;
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white p-6">
      <div className="w-full md:w-4/5 mx-auto">
        <h1 className="text-2xl font-bold mb-2 text-left">Proyectos</h1>
        <h2 className="text-xl font-semibold mb-4 text-left">Explorar Categorías</h2>
        <div className="h-40 bg-gray-800 rounded-lg mb-8 flex items-center justify-center">
        <Carousel>
          <CarouselContent>
            <CarouselItem className="basis-1/3">1</CarouselItem>
            <CarouselItem className="basis-1/3">2</CarouselItem>
            <CarouselItem className="basis-1/3">3</CarouselItem>
            <CarouselItem className="basis-1/3">4</CarouselItem>
            <CarouselItem className="basis-1/3">5</CarouselItem>
          </CarouselContent>
          <CarouselPrevious className="text-black" />
          <CarouselNext className="text-black" />
        </Carousel>
        </div>
        <div className="flex flex-col items-center gap-4">
          {currentProjects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
        {numPages > 1 && (
          <div className="flex justify-end items-center gap-3 mt-4">
            <button onClick={previousPage} disabled={currentPage === 1} className="px-3 py-1 rounded bg-gray-700 text-white">Anterior</button>
            {getPageButtons()}
            <button onClick={nextPage} disabled={currentPage === numPages} className="px-3 py-1 rounded bg-gray-700 text-white">Siguiente</button>
          </div>
        )}
      </div>
    </div>
  );
}
