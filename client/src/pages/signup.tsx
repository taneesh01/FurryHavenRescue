import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { UserPlus } from "lucide-react";
import type { InsertUser } from "@shared/schema";

const signupSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
  confirmPassword: z.string(),
  terms: z.boolean().refine(val => val === true, { message: "You must accept the terms and conditions" }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type SignupFormValues = z.infer<typeof signupSchema>;

export default function Signup() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  const registerMutation = useMutation({
    mutationFn: (data: InsertUser) => 
      apiRequest("POST", "/api/users/register", data),
    onSuccess: () => {
      toast({
        title: "Account created!",
        description: "You have successfully signed up for FurryHaven.",
      });
      form.reset();
      setIsSubmitting(false);
    },
    onError: (error) => {
      toast({
        title: "Registration Failed",
        description: error.message || "There was an error creating your account. Please try again.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    },
  });

  function onSubmit(values: SignupFormValues) {
    setIsSubmitting(true);
    const { confirmPassword, terms, ...userData } = values;
    registerMutation.mutate(userData);
  }

  return (
    <section id="signup" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <Card className="max-w-lg mx-auto bg-white rounded-xl p-8 shadow-lg">
          <CardContent className="p-0">
            <div className="text-center mb-8">
              <h2 className="font-heading font-bold text-3xl text-gray-800 mb-4">Join Our Community</h2>
              <p className="text-gray-600">Create an account to save favorite animals, receive personalized updates, and manage your donations.</p>
            </div>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-medium">Full Name</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter your full name" 
                          {...field} 
                          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
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
                          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-medium">Password</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Create a password" 
                          type="password"
                          {...field} 
                          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </FormControl>
                      <FormDescription className="text-sm text-gray-500">
                        Password must be at least 8 characters long
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-medium">Confirm Password</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Confirm your password" 
                          type="password"
                          {...field} 
                          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="terms"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm text-gray-700">
                          I agree to the <a href="#" className="text-primary hover:underline">Terms of Service</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 px-6 rounded-lg"
                  disabled={isSubmitting}
                >
                  <UserPlus className="mr-2 h-4 w-4" /> {isSubmitting ? "Creating Account..." : "Create Account"}
                </Button>
              </form>
            </Form>
            
            <div className="mt-6 text-center">
              <p className="text-gray-600">Already have an account? <a href="#" className="text-primary font-medium hover:underline">Sign In</a></p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
