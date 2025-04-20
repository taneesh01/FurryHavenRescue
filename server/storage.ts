import { 
  users, type User, type InsertUser,
  animals, type Animal, type InsertAnimal, 
  newsletters, type Newsletter, type InsertNewsletter,
  shopItems, type ShopItem, type InsertShopItem,
  donationOptions, type DonationOption, type InsertDonationOption
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Animal methods
  getAnimals(): Promise<Animal[]>;
  getAnimalsByType(type: string): Promise<Animal[]>;
  getAnimal(id: number): Promise<Animal | undefined>;
  createAnimal(animal: InsertAnimal): Promise<Animal>;
  
  // Newsletter methods
  subscribeToNewsletter(newsletter: InsertNewsletter): Promise<Newsletter>;
  
  // Shop item methods
  getShopItems(): Promise<ShopItem[]>;
  getShopItem(id: number): Promise<ShopItem | undefined>;
  
  // Donation option methods
  getDonationOptions(): Promise<DonationOption[]>;
  getDonationOptionsByCategory(category: string): Promise<DonationOption[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private animals: Map<number, Animal>;
  private newsletters: Map<number, Newsletter>;
  private shopItems: Map<number, ShopItem>;
  private donationOptions: Map<number, DonationOption>;
  
  private userId: number;
  private animalId: number;
  private newsletterId: number;
  private shopItemId: number;
  private donationOptionId: number;

  constructor() {
    this.users = new Map();
    this.animals = new Map();
    this.newsletters = new Map();
    this.shopItems = new Map();
    this.donationOptions = new Map();
    
    this.userId = 1;
    this.animalId = 1;
    this.newsletterId = 1;
    this.shopItemId = 1;
    this.donationOptionId = 1;
    
    // Initialize with sample data
    this.initializeData();
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }

  async createUser(userData: InsertUser): Promise<User> {
    const id = this.userId++;
    const user: User = { ...userData, id };
    this.users.set(id, user);
    return user;
  }

  // Animal methods
  async getAnimals(): Promise<Animal[]> {
    return Array.from(this.animals.values());
  }

  async getAnimalsByType(type: string): Promise<Animal[]> {
    return Array.from(this.animals.values()).filter(
      (animal) => animal.type === type,
    );
  }

  async getAnimal(id: number): Promise<Animal | undefined> {
    return this.animals.get(id);
  }

  async createAnimal(animalData: InsertAnimal): Promise<Animal> {
    const id = this.animalId++;
    const animal: Animal = { 
      ...animalData, 
      id, 
      createdAt: new Date() 
    };
    this.animals.set(id, animal);
    return animal;
  }

  // Newsletter methods
  async subscribeToNewsletter(newsletterData: InsertNewsletter): Promise<Newsletter> {
    const id = this.newsletterId++;
    const newsletter: Newsletter = { 
      ...newsletterData, 
      id, 
      createdAt: new Date() 
    };
    this.newsletters.set(id, newsletter);
    return newsletter;
  }

  // Shop item methods
  async getShopItems(): Promise<ShopItem[]> {
    return Array.from(this.shopItems.values());
  }

  async getShopItem(id: number): Promise<ShopItem | undefined> {
    return this.shopItems.get(id);
  }

  // Donation option methods
  async getDonationOptions(): Promise<DonationOption[]> {
    return Array.from(this.donationOptions.values());
  }

  async getDonationOptionsByCategory(category: string): Promise<DonationOption[]> {
    return Array.from(this.donationOptions.values()).filter(
      (option) => option.category === category,
    );
  }

  // Initialize some data
  private initializeData(): void {
    // Sample animals
    const animals: InsertAnimal[] = [
      {
        name: "Buddy",
        type: "dog",
        breed: "Mixed Breed",
        age: "2 months",
        gender: "male",
        image: "https://images.unsplash.com/photo-1601979031925-424e53b6caaa",
        description: "Found abandoned near a construction site, Buddy is now thriving with proper care and attention.",
        isAdopted: false,
        isRescued: true,
      },
      {
        name: "Luna",
        type: "cat",
        breed: "Domestic Shorthair",
        age: "1 year",
        gender: "female",
        image: "https://images.unsplash.com/photo-1573865526739-10659fec78a5",
        description: "Rescued from a drainage pipe during monsoon, Luna is now a playful and affectionate cat.",
        isAdopted: false,
        isRescued: true,
      },
      {
        name: "Max",
        type: "dog",
        breed: "Labrador Mix",
        age: "8 months",
        gender: "male",
        image: "https://images.unsplash.com/photo-1550697851-920b181d8ca8",
        description: "Found malnourished on the streets, Max has made a remarkable recovery and loves playing fetch.",
        isAdopted: false,
        isRescued: true,
      },
      {
        name: "Rocky",
        type: "dog",
        breed: "Indian Pariah",
        age: "3 years",
        gender: "male",
        image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e",
        description: "Rocky is a friendly and energetic dog who loves outdoor activities and playing fetch. Good with children and other pets.",
        isAdopted: false,
        isRescued: true,
      },
      {
        name: "Misha",
        type: "cat",
        breed: "Domestic Shorthair",
        age: "2 years",
        gender: "female",
        image: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce",
        description: "Misha is a gentle and affectionate cat who enjoys quiet moments and occasional play. Perfect for a calm household.",
        isAdopted: false,
        isRescued: true,
      },
      {
        name: "Leo",
        type: "dog",
        breed: "Mixed Breed",
        age: "4 years",
        gender: "male",
        image: "https://images.unsplash.com/photo-1511044568932-338cba0ad803",
        description: "Leo is a loyal and protective dog who bonds deeply with his humans. Needs an active family with some dog experience.",
        isAdopted: false,
        isRescued: true,
      },
      {
        name: "Bella",
        type: "cat",
        breed: "Persian Mix",
        age: "1 year",
        gender: "female",
        image: "https://images.unsplash.com/photo-1571566882372-1598d88abd90",
        description: "Bella is a playful and curious cat who loves to explore. She's good with other cats and enjoys interactive toys.",
        isAdopted: false,
        isRescued: true,
      },
      {
        name: "Buddy",
        type: "dog",
        breed: "Labrador Mix",
        age: "5 years",
        gender: "male",
        image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb",
        description: "Buddy is a calm and gentle soul who loves lounging around. Great with children and perfect for a relaxed home.",
        isAdopted: false,
        isRescued: true,
      },
      {
        name: "Oscar",
        type: "cat",
        breed: "Tabby",
        age: "3 years",
        gender: "male",
        image: "https://images.unsplash.com/photo-1543852786-1cf6624b9987",
        description: "Oscar is an independent cat who appreciates his quiet time but also enjoys gentle pets. Best for a mature household.",
        isAdopted: false,
        isRescued: true,
      }
    ];

    // Add animals to the store
    animals.forEach(animal => this.createAnimal(animal));

    // Sample shop items
    const shopItems: InsertShopItem[] = [
      {
        name: "Eco-Friendly Dog Toy",
        price: 399,
        description: "Durable, non-toxic toy made from sustainable materials. Perfect for energetic dogs.",
        image: "https://images.unsplash.com/photo-1581467655410-0c2bf55d9d6c",
        rating: 5,
        category: "toy",
      },
      {
        name: "Cat Climbing Tree",
        price: 1499,
        description: "Multi-level climbing tree with scratching posts and cozy hideaways for your feline friend.",
        image: "https://images.unsplash.com/photo-1559715541-5daf8a0296c0",
        rating: 5,
        category: "accessory",
      },
      {
        name: "\"Rescue Dad\" T-Shirt",
        price: 599,
        description: "Comfortable, 100% cotton tee with our \"Proud Rescue Dad\" design. Available in multiple sizes.",
        image: "https://images.unsplash.com/photo-1589831377283-33cb1cc6bd5d",
        rating: 4,
        category: "clothing",
      },
      {
        name: "Adjustable Pet Leash",
        price: 349,
        description: "Durable nylon leash with adjustable length and comfortable padded handle for daily walks.",
        image: "https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8",
        rating: 5,
        category: "accessory",
      }
    ];

    // Add shop items to the store
    shopItems.forEach(item => {
      const id = this.shopItemId++;
      this.shopItems.set(id, { ...item, id });
    });

    // Sample donation options
    const donationOptions: InsertDonationOption[] = [
      {
        title: "Feed 5 strays for a day",
        description: "Provide nutritious meals for 5 stray animals for a full day.",
        amount: 100,
        category: "food",
        icon: "utensils",
      },
      {
        title: "Feed 15 strays for a day",
        description: "Provide nutritious meals for 15 stray animals for a full day.",
        amount: 300,
        category: "food",
        icon: "utensils",
      },
      {
        title: "Feed 30 strays for a day",
        description: "Provide nutritious meals for 30 stray animals for a full day.",
        amount: 600,
        category: "food",
        icon: "utensils",
      },
      {
        title: "Basic checkup for one animal",
        description: "Fund a complete health check for one rescued animal.",
        amount: 500,
        category: "medical",
        icon: "stethoscope",
      },
      {
        title: "Vaccination package",
        description: "Provide essential vaccines for one rescued animal.",
        amount: 1200,
        category: "medical",
        icon: "syringe",
      },
      {
        title: "Emergency surgery fund",
        description: "Contribute to our emergency surgery fund for critical cases.",
        amount: 5000,
        category: "medical",
        icon: "hospital",
      },
      {
        title: "Blankets and bedding",
        description: "Provide warm blankets and bedding for animals in our shelter.",
        amount: 800,
        category: "shelter",
        icon: "bed",
      },
      {
        title: "Monthly shelter supplies",
        description: "Fund a month's worth of essential supplies for our shelter.",
        amount: 2500,
        category: "shelter",
        icon: "home",
      },
      {
        title: "Shelter expansion project",
        description: "Help us expand our shelter to accommodate more animals in need.",
        amount: 10000,
        category: "shelter",
        icon: "building",
      }
    ];

    // Add donation options to the store
    donationOptions.forEach(option => {
      const id = this.donationOptionId++;
      this.donationOptions.set(id, { ...option, id });
    });
  }
}

export const storage = new MemStorage();
