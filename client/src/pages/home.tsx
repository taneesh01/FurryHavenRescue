import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Heart, BadgeCent, Info, ChevronRight, PawPrint } from "lucide-react";
import type { Animal } from "@shared/schema";

export default function Home() {
  const { data: animals, isLoading } = useQuery<Animal[]>({
    queryKey: ["/api/animals"],
  });

  // Get only the first 3 animals for the featured section
  const featuredAnimals = animals?.slice(0, 3) || [];

  return (
    <main>
      {/* Hero Section */}
      <section id="home" className="bg-gradient-to-b from-primary/10 to-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-gray-800 mb-6">
                Every Stray Deserves a <span className="text-primary">Home</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8">
                Join us in our mission to rescue, rehabilitate, and find loving homes for India's stray animals through collaboration and compassion.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/adopt">
                  <Button className="bg-[#F0945A] hover:bg-[#F0945A]/90 text-white font-bold py-3 px-8 rounded-full">
                    <Heart className="mr-2 h-4 w-4" /> Adopt Now
                  </Button>
                </Link>
                <Link href="/donate">
                  <Button className="bg-primary hover:bg-primary/90 text-white font-bold py-3 px-8 rounded-full">
                    <BadgeCent className="mr-2 h-4 w-4" /> BadgeCent
                  </Button>
                </Link>
                <Link href="/about">
                  <Button variant="outline" className="bg-white hover:bg-gray-100 text-gray-800 font-bold py-3 px-8 rounded-full border border-gray-300">
                    <Info className="mr-2 h-4 w-4" /> Learn More
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1529429617124-95b109e86bb8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Happy rescued dog with volunteer" 
                className="rounded-lg shadow-xl w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Rescues Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-gray-800 mb-4">Recently Rescued</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Meet some of our recent rescues who are on their journey to finding forever homes. Each has a unique story of resilience and hope.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading ? (
              Array(3).fill(0).map((_, index) => (
                <Card key={index} className="bg-white rounded-lg overflow-hidden shadow-md">
                  <Skeleton className="h-64 w-full" />
                  <CardContent className="p-5">
                    <div className="flex justify-between mb-3">
                      <Skeleton className="h-6 w-24" />
                      <Skeleton className="h-6 w-24" />
                    </div>
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-3/4 mb-4" />
                    <Skeleton className="h-10 w-32" />
                  </CardContent>
                </Card>
              ))
            ) : (
              featuredAnimals.map((animal) => (
                <Card key={animal.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                  <div className="relative h-64">
                    <img 
                      src={animal.image}
                      alt={`Rescued ${animal.type} named ${animal.name}`} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 bg-primary text-white px-3 py-1 rounded-tr-lg font-bold">
                      {animal.name}
                    </div>
                  </div>
                  <CardContent className="p-5">
                    <div className="flex justify-between mb-3">
                      <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">{animal.age}</span>
                      <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">{animal.breed}</span>
                    </div>
                    <p className="text-gray-600 mb-4">{animal.description}</p>
                    <Link href="/adopt">
                      <Button className="bg-primary hover:bg-primary/90 text-white font-medium py-2 px-5 rounded-full">
                        Read Full Story
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
          
          <div className="text-center mt-10">
            <Link href="/adopt">
              <Button className="bg-[#F0945A] hover:bg-[#F0945A]/90 text-white font-bold py-3 px-8 rounded-full">
                <PawPrint className="mr-2 h-4 w-4" /> View All Animals
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
