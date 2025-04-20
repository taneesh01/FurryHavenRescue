import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User schema
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  name: true,
  email: true,
  password: true,
});

// Animal schema
export const animals = pgTable("animals", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(), // "dog", "cat", "other"
  breed: text("breed").notNull(),
  age: text("age").notNull(), // e.g. "2 months", "1 year"
  gender: text("gender").notNull(), // "male", "female"
  image: text("image").notNull(),
  description: text("description").notNull(),
  isAdopted: boolean("is_adopted").default(false),
  isRescued: boolean("is_rescued").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertAnimalSchema = createInsertSchema(animals).omit({
  id: true,
  createdAt: true,
});

// Newsletter schema
export const newsletters = pgTable("newsletters", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertNewsletterSchema = createInsertSchema(newsletters).pick({
  name: true,
  email: true,
});

// Shop item schema
export const shopItems = pgTable("shop_items", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  price: integer("price").notNull(), // in Rupees
  description: text("description").notNull(),
  image: text("image").notNull(),
  rating: integer("rating").notNull().default(5), // Out of 5
  category: text("category").notNull(), // "toy", "accessory", "clothing", etc.
});

export const insertShopItemSchema = createInsertSchema(shopItems).omit({
  id: true,
});

// Donation option schema
export const donationOptions = pgTable("donation_options", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  amount: integer("amount").notNull(), // in Rupees
  category: text("category").notNull(), // "food", "medical", "shelter"
  icon: text("icon").notNull(),
});

export const insertDonationOptionSchema = createInsertSchema(donationOptions).omit({
  id: true,
});

// Define types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Animal = typeof animals.$inferSelect;
export type InsertAnimal = z.infer<typeof insertAnimalSchema>;

export type Newsletter = typeof newsletters.$inferSelect;
export type InsertNewsletter = z.infer<typeof insertNewsletterSchema>;

export type ShopItem = typeof shopItems.$inferSelect;
export type InsertShopItem = z.infer<typeof insertShopItemSchema>;

export type DonationOption = typeof donationOptions.$inferSelect;
export type InsertDonationOption = z.infer<typeof insertDonationOptionSchema>;
