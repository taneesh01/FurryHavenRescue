import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { HelpingHand } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1581888227599-779811939961?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Volunteers caring for rescued animals" 
              className="rounded-lg shadow-lg w-full h-auto"
            />
          </div>
          <div className="lg:w-1/2">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-gray-800 mb-6">Our Story</h2>
            <div className="mb-8">
              <p className="text-gray-600 mb-4 leading-relaxed">
                FurryHaven began with a simple belief: that every stray animal deserves compassion, care, and a chance at a better life.
              </p>
              <p className="text-gray-600 mb-4 leading-relaxed">
                We've just started out with a mission to make stray lives better using data, collaboration, and compassion. Our small team of dedicated animal lovers works tirelessly to create meaningful connections between animals in need and the communities that can help them.
              </p>
              <p className="text-gray-600 leading-relaxed">
                By bringing together NGOs, philanthropists, and local authorities across India, we're building a network of care that can respond quickly to animals in distress and provide sustainable solutions for their well-being.
              </p>
            </div>
            
            <div className="p-6 bg-white rounded-lg shadow-md border-l-4 border-primary mb-8">
              <p className="text-lg italic text-gray-700 font-serif">
                "Every rescue begins with someone who refused to look the other way. We're building a community of those someones."
              </p>
              <p className="mt-2 text-gray-600 font-medium">— Priya Sharma, Founder</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white p-4 rounded-lg shadow text-center">
                <p className="text-3xl font-bold text-primary mb-1">142</p>
                <p className="text-gray-600 text-sm">Animals Rescued</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow text-center">
                <p className="text-3xl font-bold text-primary mb-1">86</p>
                <p className="text-gray-600 text-sm">Adoptions</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow text-center">
                <p className="text-3xl font-bold text-primary mb-1">12</p>
                <p className="text-gray-600 text-sm">NGO Partners</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow text-center">
                <p className="text-3xl font-bold text-primary mb-1">4</p>
                <p className="text-gray-600 text-sm">Cities</p>
              </div>
            </div>
            
            <Link href="/donate">
              <Button className="bg-primary hover:bg-primary/90 text-white font-bold py-3 px-8 rounded-full">
                <HelpingHand className="mr-2 h-4 w-4" /> Support Our Mission
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
