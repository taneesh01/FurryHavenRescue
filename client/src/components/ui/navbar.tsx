import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { PawPrint } from "lucide-react";
import { CartIcon } from "@/components/ui/cart";

const NavLink = ({ href, children }: { href: string, children: React.ReactNode }) => {
  const [location] = useLocation();
  const isActive = location === href;
  
  return (
    <Link href={href}>
      <a className={`font-medium transition-colors ${isActive ? 'text-primary' : 'hover:text-primary'}`}>
        {children}
      </a>
    </Link>
  );
};

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/">
          <a className="flex items-center">
            <div className="text-primary text-3xl mr-2">
              <PawPrint />
            </div>
            <div>
              <span className="font-heading font-bold text-xl text-primary">Furry<span className="text-[#F0945A]">Haven</span></span>
            </div>
          </a>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/about">About Us</NavLink>
          <NavLink href="/adopt">Adopt</NavLink>
          <NavLink href="/donate">Donate</NavLink>
          <NavLink href="/shop">Shop</NavLink>
          <NavLink href="/newsletter">Newsletter</NavLink>
          <div className="ml-2">
            <CartIcon />
          </div>
          <Link href="/signup">
            <Button className="bg-primary text-white hover:bg-primary/90 rounded-full">Sign Up</Button>
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <Button 
          variant="ghost" 
          onClick={toggleMobileMenu} 
          className="md:hidden text-gray-700 hover:text-primary"
          aria-label="Toggle mobile menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <nav className="md:hidden bg-white border-t border-gray-100 px-4 py-2">
          <div className="flex flex-col space-y-3 pb-3">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/about">About Us</NavLink>
            <NavLink href="/adopt">Adopt</NavLink>
            <NavLink href="/donate">Donate</NavLink>
            <NavLink href="/shop">Shop</NavLink>
            <NavLink href="/newsletter">Newsletter</NavLink>
            <div className="flex items-center py-2">
              <span className="font-medium mr-2">Cart</span>
              <CartIcon />
            </div>
            <Link href="/signup">
              <Button className="bg-primary text-white hover:bg-primary/90 rounded-full w-full">Sign Up</Button>
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
