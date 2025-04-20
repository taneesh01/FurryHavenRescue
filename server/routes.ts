import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertNewsletterSchema } from "@shared/schema";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes - prefix all routes with /api
  
  // Get all animals
  app.get("/api/animals", async (req: Request, res: Response) => {
    try {
      const animals = await storage.getAnimals();
      res.json(animals);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch animals" });
    }
  });

  // Get animals by type
  app.get("/api/animals/type/:type", async (req: Request, res: Response) => {
    try {
      const { type } = req.params;
      const animals = await storage.getAnimalsByType(type);
      res.json(animals);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch animals by type" });
    }
  });

  // Get animal by id
  app.get("/api/animals/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid animal ID" });
      }
      
      const animal = await storage.getAnimal(id);
      if (!animal) {
        return res.status(404).json({ message: "Animal not found" });
      }
      
      res.json(animal);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch animal" });
    }
  });

  // Get shop items
  app.get("/api/shop", async (req: Request, res: Response) => {
    try {
      const items = await storage.getShopItems();
      res.json(items);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch shop items" });
    }
  });

  // Get shop item by id
  app.get("/api/shop/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid shop item ID" });
      }
      
      const item = await storage.getShopItem(id);
      if (!item) {
        return res.status(404).json({ message: "Shop item not found" });
      }
      
      res.json(item);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch shop item" });
    }
  });

  // Get donation options
  app.get("/api/donations", async (req: Request, res: Response) => {
    try {
      const options = await storage.getDonationOptions();
      res.json(options);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch donation options" });
    }
  });

  // Get donation options by category
  app.get("/api/donations/category/:category", async (req: Request, res: Response) => {
    try {
      const { category } = req.params;
      const options = await storage.getDonationOptionsByCategory(category);
      res.json(options);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch donation options by category" });
    }
  });

  // Register a new user
  app.post("/api/users/register", async (req: Request, res: Response) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      
      const existingUser = await storage.getUserByEmail(userData.email);
      if (existingUser) {
        return res.status(400).json({ message: "Email already in use" });
      }
      
      const user = await storage.createUser(userData);
      // Don't return the password in the response
      const { password, ...userWithoutPassword } = user;
      
      res.status(201).json(userWithoutPassword);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      res.status(500).json({ message: "Failed to register user" });
    }
  });

  // Subscribe to newsletter
  app.post("/api/newsletter/subscribe", async (req: Request, res: Response) => {
    try {
      const newsletterData = insertNewsletterSchema.parse(req.body);
      
      // Check if email already subscribed
      const users = Array.from((await storage.getAnimals()).values());
      const existingSubscription = users.find(user => user.name === newsletterData.email);
      
      if (existingSubscription) {
        return res.status(400).json({ message: "Email already subscribed to the newsletter" });
      }
      
      const newsletter = await storage.subscribeToNewsletter(newsletterData);
      res.status(201).json(newsletter);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      res.status(500).json({ message: "Failed to subscribe to newsletter" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
