import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/context/CartContext";
import { ShoppingCart, ArrowRight, Star, StarHalf } from "lucide-react";
import type { ShopItem } from "@shared/schema";

export default function Shop() {
  const { toast } = useToast();
  const { addToCart } = useCart();
  
  const { data: shopItems, isLoading } = useQuery<ShopItem[]>({
    queryKey: ["/api/shop"],
  });

  const handleAddToCart = (item: ShopItem) => {
    addToCart(item);
    toast({
      title: "Added to Cart",
      description: `${item.name} has been added to your cart successfully.`,
    });
  };

  const handleBuyNow = (item: ShopItem) => {
    addToCart(item);
    toast({
      title: "Proceeding to Checkout",
      description: "Feature coming soon.",
    });
  };

  // Function to render star ratings
  const renderStarRating = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    return (
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} className="text-yellow-400" fill="currentColor" size={16} />
        ))}
        {hasHalfStar && <StarHalf className="text-yellow-400" fill="currentColor" size={16} />}
        {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map((_, i) => (
          <Star key={`empty-${i}`} className="text-yellow-400" size={16} />
        ))}
      </div>
    );
  };

  return (
    <section id="shop" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-gray-800 mb-4">Shop & Support</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Every purchase you make directly supports our rescue efforts. Shop our collection of pet supplies and merchandise to make a difference.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {isLoading ? (
            Array(4).fill(0).map((_, index) => (
              <Card key={index} className="bg-white rounded-lg overflow-hidden shadow-md">
                <Skeleton className="h-48 w-full" />
                <div className="p-5">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <div className="flex justify-between items-center mb-4">
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-5/6 mb-4" />
                  <div className="flex space-x-2">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                </div>
              </Card>
            ))
          ) : (
            shopItems?.map((item) => (
              <Card key={item.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-heading font-bold text-lg mb-2">{item.name}</h3>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-primary font-bold text-lg">₹{item.price}</span>
                    {renderStarRating(item.rating)}
                  </div>
                  <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      className="flex-1 bg-white border border-primary text-primary hover:bg-primary hover:text-white"
                      onClick={() => handleAddToCart(item)}
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                    </Button>
                    <Button 
                      className="flex-1 bg-primary hover:bg-primary/90 text-white"
                      onClick={() => handleBuyNow(item)}
                    >
                      Buy Now
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
        
        <div className="text-center mt-12">
          <Button className="bg-primary hover:bg-primary/90 text-white font-bold py-3 px-8 rounded-full">
            View All Products <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
