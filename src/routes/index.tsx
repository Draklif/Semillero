import MainModel from "@/components/models/mainModel";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import CategoryCard from "@/components/reusables/categoryCard";
import FeaturedCard from "@/components/reusables/featuredCard";
import { Project } from "@/types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getData } from "@/lib/api";

export const Route = createFileRoute("/")({
  component: Landing,
});

interface Category {
  tag: string;
  image: string;
}

function getRandomImage(images: string[]): string {
  const randomIndex = Math.floor(Math.random() * images.length);
  return images[randomIndex];
}

function Landing() {
  const router = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [proyectos, setProyectos] = useState<Project[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getData()
      const projects = response.projects
      const initialProjects = projects.filter(
        (p) => p.format.length === 0 || p.format.every((fmt) => fmt === "")
      );
      setProyectos(initialProjects);
  
      const categoryMap = new Map<string, string[]>();

      initialProjects.forEach((project) => {
        project.tags.forEach((tag) => {
          if (!categoryMap.has(tag)) {
            categoryMap.set(tag, []);
          }
          const imagesForTag = categoryMap.get(tag);
          if (imagesForTag && project.images.length > 0) {
            imagesForTag.push(...project.images);
          }
        });
      });

      const categoryArray = Array.from(categoryMap, ([tag, images]) => ({
        tag,
        image: getRandomImage(images),
      }));

      setCategories(categoryArray);
    }
    fetchData();
  }, []);

  const handleCategorySelect = (category: string) => {
    router({ to: `/proyectos?category=${encodeURIComponent(category)}` });
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white p-6">
      <h2 className="text-2xl font-bold mt-8 mb-4">Modelo 3D Universidad de Boyacá</h2>
      <p className="text-white mt-4 mb-8">
        Pulsa el modelo para ir al proyecto. También puedes moverlo arrastrando sobre el modelo.
      </p>
      <MainModel />
      <h2 className="text-2xl font-bold mt-8 mb-4">Proyectos Destacados</h2>
      <div className="rounded-lg bg-gray-800 mb-8 flex items-center justify-center p-4">
        <Carousel className="w-4/5">
          <CarouselContent>
            <CarouselItem>
              {proyectos[0] && <FeaturedCard project={proyectos[0]} />}
            </CarouselItem>
            <CarouselItem>
              {proyectos[1] && <FeaturedCard project={proyectos[1]} />}
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious className="text-black" />
          <CarouselNext className="text-black" />
        </Carousel>
      </div>
      <h1 className="text-3xl font-bold mt-8">Más Información</h1>
      <p className="text-white mt-4 mb-8">
        Este portal web está diseñado para todos aquellos interesados no
        solamente en crear y aportar al catálogo creciente de proyectos
        multimedia de la Universidad de Boyacá, sino también para quienes deseen
        ver y explorar los diferentes productos que en Ingeniería en Multimedia
        queremos ofrecer.
      </p>
      <p className="text-blue-400 italic">
        ¡Únete ahora a la carrera del futuro y sé parte de los mejores!
      </p>
      <h2 className="text-2xl font-bold mt-8 mb-4">Explora Más</h2>
      <div className="rounded-lg bg-gray-800 mb-8 flex items-center justify-center p-4">
        <Carousel opts={{ align: "start", loop: true }} className="w-4/5">
          <CarouselContent className="-ml-1">
            {categories.map((category) => (
              <CarouselItem key={category.tag} className="lg:basis-1/4 sm:basis-1/2 md:basis-1/3">
                <CategoryCard
                  category={category.tag}
                  backgroundImage={category.image}
                  onClick={() => handleCategorySelect(category.tag)}
                  isActive={false}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="text-black" />
          <CarouselNext className="text-black" />
        </Carousel>
      </div>
    </div>
  );
}
