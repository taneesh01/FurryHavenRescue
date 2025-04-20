import React from 'react';
import { X, Minus, Plus, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/hooks/use-toast';

export function CartIcon() {
  const { toggleCart, totalItems } = useCart();
  
  return (
    <div className="relative cursor-pointer" onClick={toggleCart}>
      <ShoppingCart className="h-6 w-6" />
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
          {totalItems}
        </span>
      )}
    </div>
  );
}

export function Cart() {
  const { 
    cartItems, 
    isCartOpen, 
    toggleCart, 
    removeFromCart, 
    updateQuantity,
    clearCart,
    totalAmount
  } = useCart();
  
  const { toast } = useToast();
  
  if (!isCartOpen) return null;
  
  const handleCheckout = () => {
    toast({
      title: "Checkout Initiated",
      description: "This would normally proceed to payment processing."
    });
    clearCart();
    toggleCart();
  };
  
  return (
    <div className="cart-container">
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity" 
        onClick={toggleCart}
      />
      
      {/* Cart panel */}
      <div className="fixed top-0 right-0 h-full w-full md:w-96 bg-white shadow-xl z-50 transform transition-transform">
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="font-heading font-bold text-xl">Your Cart</h2>
            <button onClick={toggleCart} className="text-gray-500 hover:text-gray-700">
              <X className="h-6 w-6" />
            </button>
          </div>
        
          <div className="flex-1 overflow-y-auto p-4">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <ShoppingCart className="h-16 w-16 mb-4" />
                <p>Your cart is empty</p>
              </div>
            ) : (
              <ul className="space-y-4">
                {cartItems.map(item => (
                  <li key={item.id} className="flex border-b pb-4">
                    <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    
                    <div className="ml-4 flex flex-1 flex-col">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>{item.name}</h3>
                        <p className="ml-4">₹{item.price}</p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500 line-clamp-1">{item.description}</p>
                      
                      <div className="flex items-center justify-between text-sm mt-2">
                        <div className="flex items-center border rounded-md">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-2 py-1 text-gray-600 hover:text-gray-800"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="px-2 py-1">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-2 py-1 text-gray-600 hover:text-gray-800"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="font-medium text-primary hover:text-primary/80"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
          
          {cartItems.length > 0 && (
            <div className="border-t border-gray-200 p-4">
              <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
                <p>Subtotal</p>
                <p>₹{totalAmount}</p>
              </div>
              <Button
                onClick={handleCheckout}
                className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 rounded-lg"
              >
                Checkout
              </Button>
              <div className="mt-2">
                <Button
                  onClick={toggleCart}
                  variant="outline"
                  className="w-full border border-gray-300 text-gray-700 font-medium py-2"
                >
                  Continue Shopping
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}