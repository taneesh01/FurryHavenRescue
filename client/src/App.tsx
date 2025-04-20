import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/context/CartContext";
import { Cart } from "@/components/ui/cart";
import NotFound from "@/pages/not-found";
import Navbar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";
import Home from "@/pages/home";
import About from "@/pages/about";
import Adopt from "@/pages/adopt";
import Donate from "@/pages/donate";
import Newsletter from "@/pages/newsletter";
import Shop from "@/pages/shop";
import Signup from "@/pages/signup";

function Router() {
  return (
    <>
      <Navbar />
      <Cart />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/adopt" component={Adopt} />
        <Route path="/donate" component={Donate} />
        <Route path="/newsletter" component={Newsletter} />
        <Route path="/shop" component={Shop} />
        <Route path="/signup" component={Signup} />
        <Route component={NotFound} />
      </Switch>
      <Footer />
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CartProvider>
          <Toaster />
          <Router />
        </CartProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
