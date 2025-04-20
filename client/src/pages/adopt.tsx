import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import type { Animal } from "@shared/schema";

export default function Adopt() {
  const { toast } = useToast();
  const [animalType, setAnimalType] = useState<string | null>(null);
  
  const { data: animals, isLoading } = useQuery<Animal[]>({
    queryKey: animalType ? [`/api/animals/type/${animalType}`] : ["/api/animals"],
  });

  const handleAdoptClick = () => {
    toast({
      title: "Adoption Request Sent",
      description: "We'll contact you soon with further details.",
    });
  };

  return (
    <section id="adopt" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-gray-800 mb-4">Find Your Perfect Companion</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">These loving animals are waiting for their forever homes. Each has been rescued, rehabilitated, and is now ready to become part of your family.</p>
        </div>
        
        <div className="mb-8 flex flex-wrap justify-center gap-4">
          <Button 
            variant={animalType === null ? "default" : "outline"} 
            className={animalType === null ? "bg-primary text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-700"} 
            onClick={() => setAnimalType(null)}
          >
            All Pets
          </Button>
          <Button 
            variant={animalType === "dog" ? "default" : "outline"} 
            className={animalType === "dog" ? "bg-primary text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-700"} 
            onClick={() => setAnimalType("dog")}
          >
            Dogs
          </Button>
          <Button 
            variant={animalType === "cat" ? "default" : "outline"} 
            className={animalType === "cat" ? "bg-primary text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-700"} 
            onClick={() => setAnimalType("cat")}
          >
            Cats
          </Button>
          <Button 
            variant={animalType === "other" ? "default" : "outline"} 
            className={animalType === "other" ? "bg-primary text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-700"} 
            onClick={() => setAnimalType("other")}
          >
            Other Pets
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            Array(6).fill(0).map((_, index) => (
              <Card key={index} className="bg-white rounded-lg overflow-hidden shadow-md">
                <Skeleton className="h-72 w-full" />
                <CardContent className="p-5">
                  <div className="flex justify-between items-center mb-3">
                    <Skeleton className="h-6 w-24" />
                    <Skeleton className="h-6 w-24" />
                  </div>
                  <div className="flex justify-between mb-4">
                    <Skeleton className="h-6 w-24" />
                    <Skeleton className="h-6 w-24" />
                  </div>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4 mb-4" />
                  <Skeleton className="h-10 w-full" />
                </CardContent>
              </Card>
            ))
          ) : (
            animals?.map((animal) => (
              <Card key={animal.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <div className="relative h-72">
                  <img 
                    src={animal.image} 
                    alt={`Adoptable ${animal.type} named ${animal.name}`} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-0 right-0 bg-[#F0945A] text-white m-4 px-3 py-1 rounded-full text-sm font-bold">
                    Ready for Adoption
                  </div>
                </div>
                <CardContent className="p-5">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-heading font-bold text-xl">{animal.name}</h3>
                    <div className="flex items-center">
                      {animal.gender === "male" ? (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" className="text-blue-500 mr-1" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="7"></circle>
                            <path d="M12 5V3"></path>
                            <path d="M17 10l3-3"></path>
                            <path d="M14 17l1.5 1.5"></path>
                            <path d="M7 10l-3-3"></path>
                            <path d="M10 17l-1.5 1.5"></path>
                          </svg>
                          <span className="text-gray-600">Male</span>
                        </>
                      ) : (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" className="text-pink-500 mr-1" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="7"></circle>
                            <path d="M12 19v3"></path>
                            <path d="M9 22h6"></path>
                          </svg>
                          <span className="text-gray-600">Female</span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-between mb-4">
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">{animal.age}</span>
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">{animal.breed}</span>
                  </div>
                  <p className="text-gray-600 mb-4">{animal.description}</p>
                  <Button 
                    className="w-full bg-[#F0945A] hover:bg-[#F0945A]/90 text-white font-medium py-2 px-5 rounded-full"
                    onClick={handleAdoptClick}
                  >
                    <Heart className="mr-2 h-4 w-4" /> Adopt Me
                  </Button>
                </CardContent>
              </Card>
            ))
          )}
        </div>
        
        <div className="text-center mt-10">
          <Button variant="outline" className="bg-white border border-gray-300 hover:bg-gray-100 text-gray-800 font-bold py-3 px-8 rounded-full">
            Load More <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
          </Button>
        </div>
      </div>
    </section>
  );
}
