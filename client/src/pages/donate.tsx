import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { Utensils, Stethoscope, Home, BadgePercent as DonateIcon } from "lucide-react";
import type { DonationOption } from "@shared/schema";

export default function Donate() {
  const { toast } = useToast();
  const [customAmount, setCustomAmount] = useState<string>("");
  const [selectedAmount, setSelectedAmount] = useState<string | null>(null);
  
  const { data: donationOptions, isLoading: isLoadingDonations } = useQuery<DonationOption[]>({
    queryKey: ["/api/donations"],
  });

  const foodOptions = donationOptions?.filter(option => option.category === "food") || [];
  const medicalOptions = donationOptions?.filter(option => option.category === "medical") || [];
  const shelterOptions = donationOptions?.filter(option => option.category === "shelter") || [];

  const handleDonateClick = () => {
    toast({
      title: "Thank you for your donation!",
      description: "Your contribution will make a real difference in the lives of stray animals.",
    });
  };

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "utensils":
        return <Utensils className="text-2xl" />;
      case "stethoscope":
        return <Stethoscope className="text-2xl" />;
      case "home":
        return <Home className="text-2xl" />;
      default:
        return <DonateIcon className="text-2xl" />;
    }
  };

  return (
    <section id="donate" className="py-16 bg-gradient-to-b from-primary/10 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-gray-800 mb-4">Make a Difference Today</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Your contribution directly impacts the lives of stray animals across India. Choose how you'd like to help and see the immediate effect of your generosity.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* Food Donations */}
          <Card className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow border-t-4 border-[#F0945A]">
            <CardContent className="p-6">
              <div className="text-center mb-4">
                <div className="inline-block bg-[#F0945A]/10 text-[#F0945A] p-3 rounded-full mb-4">
                  <Utensils className="text-2xl" />
                </div>
                <h3 className="font-heading font-bold text-xl text-gray-800">Feed a Stray</h3>
              </div>
              <div className="mb-6">
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div className="bg-[#F0945A] h-2 rounded-full" style={{width: "75%"}}></div>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>₹15,000 raised</span>
                  <span>₹20,000 goal</span>
                </div>
              </div>
              <div className="space-y-3 mb-6">
                {isLoadingDonations ? (
                  Array(3).fill(0).map((_, index) => (
                    <div key={index} className="p-3 border border-gray-200 rounded-lg">
                      <Skeleton className="h-6 w-full" />
                    </div>
                  ))
                ) : (
                  foodOptions.map(option => (
                    <div 
                      key={option.id} 
                      className="flex justify-between items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                      onClick={() => setCustomAmount(option.amount.toString())}
                    >
                      <span className="font-medium">{option.title}</span>
                      <span className="font-bold text-[#F0945A]">₹{option.amount}</span>
                    </div>
                  ))
                )}
              </div>
              <Button 
                className="w-full bg-[#F0945A] hover:bg-[#F0945A]/90 text-white font-medium py-3 rounded-lg"
                onClick={handleDonateClick}
              >
                <DonateIcon className="mr-2 h-4 w-4" /> Feed Now
              </Button>
            </CardContent>
          </Card>
          
          {/* Medical Support */}
          <Card className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow border-t-4 border-primary">
            <CardContent className="p-6">
              <div className="text-center mb-4">
                <div className="inline-block bg-primary/10 text-primary p-3 rounded-full mb-4">
                  <Stethoscope className="text-2xl" />
                </div>
                <h3 className="font-heading font-bold text-xl text-gray-800">Medical Support</h3>
              </div>
              <div className="mb-6">
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div className="bg-primary h-2 rounded-full" style={{width: "60%"}}></div>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>₹30,000 raised</span>
                  <span>₹50,000 goal</span>
                </div>
              </div>
              <div className="space-y-3 mb-6">
                {isLoadingDonations ? (
                  Array(3).fill(0).map((_, index) => (
                    <div key={index} className="p-3 border border-gray-200 rounded-lg">
                      <Skeleton className="h-6 w-full" />
                    </div>
                  ))
                ) : (
                  medicalOptions.map(option => (
                    <div 
                      key={option.id} 
                      className="flex justify-between items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                      onClick={() => setCustomAmount(option.amount.toString())}
                    >
                      <span className="font-medium">{option.title}</span>
                      <span className="font-bold text-primary">₹{option.amount}</span>
                    </div>
                  ))
                )}
              </div>
              <Button 
                className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 rounded-lg"
                onClick={handleDonateClick}
              >
                <DonateIcon className="mr-2 h-4 w-4" /> Support Healthcare
              </Button>
            </CardContent>
          </Card>
          
          {/* Shelter Support */}
          <Card className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow border-t-4 border-[#6BBBDB]">
            <CardContent className="p-6">
              <div className="text-center mb-4">
                <div className="inline-block bg-[#6BBBDB]/10 text-[#6BBBDB] p-3 rounded-full mb-4">
                  <Home className="text-2xl" />
                </div>
                <h3 className="font-heading font-bold text-xl text-gray-800">Shelter Support</h3>
              </div>
              <div className="mb-6">
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div className="bg-[#6BBBDB] h-2 rounded-full" style={{width: "40%"}}></div>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>₹20,000 raised</span>
                  <span>₹50,000 goal</span>
                </div>
              </div>
              <div className="space-y-3 mb-6">
                {isLoadingDonations ? (
                  Array(3).fill(0).map((_, index) => (
                    <div key={index} className="p-3 border border-gray-200 rounded-lg">
                      <Skeleton className="h-6 w-full" />
                    </div>
                  ))
                ) : (
                  shelterOptions.map(option => (
                    <div 
                      key={option.id} 
                      className="flex justify-between items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                      onClick={() => setCustomAmount(option.amount.toString())}
                    >
                      <span className="font-medium">{option.title}</span>
                      <span className="font-bold text-[#6BBBDB]">₹{option.amount}</span>
                    </div>
                  ))
                )}
              </div>
              <Button 
                className="w-full bg-[#6BBBDB] hover:bg-[#6BBBDB]/90 text-white font-medium py-3 rounded-lg"
                onClick={handleDonateClick}
              >
                <DonateIcon className="mr-2 h-4 w-4" /> Support Shelter
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <Card className="bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto">
          <h3 className="font-heading font-bold text-2xl text-gray-800 mb-6 text-center">Custom Donation</h3>
          <div className="grid grid-cols-3 gap-4 mb-6">
            {["100", "500", "1000", "2000", "5000"].map((amount) => (
              <Button 
                key={amount}
                variant={selectedAmount === amount ? "default" : "outline"} 
                className={selectedAmount === amount 
                  ? "bg-primary text-white" 
                  : "border-primary text-primary hover:bg-primary hover:text-white transition-colors font-bold"
                }
                onClick={() => {
                  setSelectedAmount(amount);
                  setCustomAmount(amount);
                }}
              >
                ₹{amount}
              </Button>
            ))}
            <Button 
              variant={selectedAmount === "custom" ? "default" : "outline"}
              className={selectedAmount === "custom" 
                ? "bg-primary text-white" 
                : "border-primary bg-primary text-white font-bold"
              }
              onClick={() => {
                setSelectedAmount("custom");
                setCustomAmount("");
              }}
            >
              Custom
            </Button>
          </div>
          <div className="mb-6">
            <label htmlFor="custom-amount" className="block text-gray-700 mb-2 font-medium">Enter Amount (₹)</label>
            <Input 
              type="number" 
              id="custom-amount" 
              placeholder="Enter custom amount" 
              value={customAmount}
              onChange={(e) => {
                setCustomAmount(e.target.value);
                setSelectedAmount("custom");
              }}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <Button 
            className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 px-6 rounded-lg"
            onClick={handleDonateClick}
          >
            Proceed to BadgeCent
          </Button>
        </Card>
      </div>
    </section>
  );
}
