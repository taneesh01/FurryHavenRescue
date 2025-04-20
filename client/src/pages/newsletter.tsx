import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Mail } from "lucide-react";
import type { InsertNewsletter } from "@shared/schema";

const newsletterSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
});

export default function Newsletter() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<InsertNewsletter>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const subscribeMutation = useMutation({
    mutationFn: (data: InsertNewsletter) => 
      apiRequest("POST", "/api/newsletter/subscribe", data),
    onSuccess: () => {
      toast({
        title: "Subscription Successful!",
        description: "Thank you for joining our newsletter. You'll start receiving updates soon.",
      });
      form.reset();
      setIsSubmitting(false);
    },
    onError: (error) => {
      toast({
        title: "Subscription Failed",
        description: error.message || "There was an error subscribing to the newsletter. Please try again.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    },
  });

  function onSubmit(data: InsertNewsletter) {
    setIsSubmitting(true);
    subscribeMutation.mutate(data);
  }

  return (
    <section id="newsletter" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-[#6BBBDB]/10 rounded-xl p-8 md:p-12">
          <div className="md:flex items-center">
            <div className="md:w-3/5 mb-8 md:mb-0 md:pr-10">
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-gray-800 mb-4">Join Our Pack</h2>
              <p className="text-gray-600 mb-6">Subscribe to our newsletter for heart-warming rescue stories, adoption updates, and ways you can help make a difference in the lives of stray animals.</p>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">Your Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Enter your name" 
                            {...field} 
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6BBBDB] focus:border-transparent"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">Email Address</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Enter your email address" 
                            type="email"
                            {...field} 
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6BBBDB] focus:border-transparent"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-[#6BBBDB] hover:bg-[#6BBBDB]/90 text-white font-bold py-3 px-6 rounded-lg"
                    disabled={isSubmitting}
                  >
                    <Mail className="mr-2 h-4 w-4" /> {isSubmitting ? "Subscribing..." : "Subscribe"}
                  </Button>
                </form>
              </Form>
            </div>
            <div className="md:w-2/5">
              <img 
                src="https://images.unsplash.com/photo-1560807707-8cc77767d783?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Happy dog with volunteer" 
                className="rounded-lg shadow-md w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
