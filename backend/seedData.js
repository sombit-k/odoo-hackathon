// Backend test data seeder
import mongoose from 'mongoose';
import { connectDb } from './src/lib/db.js';
import Category from './src/models/category.model.js';
import Item from './src/models/item.model.js';
import { config } from 'dotenv';

config();

const seedData = async () => {
  try {
    await connectDb();
    console.log('Connected to MongoDB');

    // Clear existing data
    await Category.deleteMany({});
    await Item.deleteMany({});
    console.log('Cleared existing data');

    // Create categories
    const categories = await Category.insertMany([
      {
        name: 'Electronics',
        description: 'Electronic devices and accessories',
        icon: 'electronics-icon.png',
        isActive: true,
        parentCategory: null,
        subcategories: [],
        itemCount: 0
      },
      {
        name: 'Clothing',
        description: 'Clothing and fashion items',
        icon: 'clothing-icon.png',
        isActive: true,
        parentCategory: null,
        subcategories: [],
        itemCount: 0
      },
      {
        name: 'Books',
        description: 'Books and educational materials',
        icon: 'books-icon.png',
        isActive: true,
        parentCategory: null,
        subcategories: [],
        itemCount: 0
      },
      {
        name: 'Home & Garden',
        description: 'Home improvement and garden items',
        icon: 'home-icon.png',
        isActive: true,
        parentCategory: null,
        subcategories: [],
        itemCount: 0
      },
      {
        name: 'Sports',
        description: 'Sports equipment and accessories',
        icon: 'sports-icon.png',
        isActive: true,
        parentCategory: null,
        subcategories: [],
        itemCount: 0
      }
    ]);

    console.log(`Created ${categories.length} categories`);

    // Create sample items
    const items = await Item.insertMany([
      {
        title: 'Vintage Leather Jacket',
        description: 'A classic brown leather jacket in excellent condition. Perfect for fall and winter.',
        category: categories[1]._id, // Clothing
        type: 'both',
        size: 'L',
        condition: 'Good',
        images: ['https://via.placeholder.com/400x400/8B4513/FFFFFF?text=Leather+Jacket'],
        tags: ['vintage', 'leather', 'jacket', 'brown'],
        pointsValue: 50,
        owner: new mongoose.Types.ObjectId(), // Mock owner ID
        location: {
          city: 'New York',
          state: 'NY',
          zipCode: '10001'
        },
        status: 'approved',
        isAvailable: true
      },
      {
        title: 'iPhone 13 Pro',
        description: 'Unlocked iPhone 13 Pro with 256GB storage. Screen protector and case included.',
        category: categories[0]._id, // Electronics
        type: 'swap',
        size: 'One Size',
        condition: 'Like New',
        images: ['https://via.placeholder.com/400x400/000000/FFFFFF?text=iPhone+13+Pro'],
        tags: ['iphone', 'apple', 'smartphone', 'unlocked'],
        pointsValue: 0,
        owner: new mongoose.Types.ObjectId(),
        location: {
          city: 'San Francisco',
          state: 'CA',
          zipCode: '94102'
        },
        status: 'approved',
        isAvailable: true
      },
      {
        title: 'The Great Gatsby - First Edition',
        description: 'Rare first edition of The Great Gatsby by F. Scott Fitzgerald.',
        category: categories[2]._id, // Books
        type: 'points',
        size: 'One Size',
        condition: 'Fair',
        images: ['https://via.placeholder.com/400x400/8B4513/FFFFFF?text=Great+Gatsby'],
        tags: ['book', 'classic', 'literature', 'first-edition'],
        pointsValue: 200,
        owner: new mongoose.Types.ObjectId(),
        location: {
          city: 'Boston',
          state: 'MA',
          zipCode: '02101'
        },
        status: 'approved',
        isAvailable: true
      },
      {
        title: 'Mountain Bike - Trek 3700',
        description: 'Well-maintained Trek 3700 mountain bike. Perfect for trails and city riding.',
        category: categories[4]._id, // Sports
        type: 'both',
        size: 'One Size',
        condition: 'Good',
        images: ['https://via.placeholder.com/400x400/FF6B35/FFFFFF?text=Mountain+Bike'],
        tags: ['bike', 'mountain', 'trek', 'cycling'],
        pointsValue: 75,
        owner: new mongoose.Types.ObjectId(),
        location: {
          city: 'Denver',
          state: 'CO',
          zipCode: '80202'
        },
        status: 'approved',
        isAvailable: true
      },
      {
        title: 'Vintage Armchair',
        description: 'Beautiful vintage armchair with original upholstery. Great for reading nook.',
        category: categories[3]._id, // Home & Garden
        type: 'swap',
        size: 'One Size',
        condition: 'Good',
        images: ['https://via.placeholder.com/400x400/8B4513/FFFFFF?text=Vintage+Chair'],
        tags: ['chair', 'vintage', 'furniture', 'antique'],
        pointsValue: 0,
        owner: new mongoose.Types.ObjectId(),
        location: {
          city: 'Portland',
          state: 'OR',
          zipCode: '97201'
        },
        status: 'approved',
        isAvailable: true
      },
      {
        title: 'Nike Air Max Sneakers',
        description: 'Size 10 Nike Air Max sneakers in great condition. Lightly worn.',
        category: categories[1]._id, // Clothing
        type: 'both',
        size: 'L', // Changed from '10' to 'L' to match enum values
        condition: 'Like New',
        images: ['https://via.placeholder.com/400x400/FF6B35/FFFFFF?text=Nike+Air+Max'],
        tags: ['nike', 'sneakers', 'shoes', 'airmax'],
        pointsValue: 40,
        owner: new mongoose.Types.ObjectId(),
        location: {
          city: 'Miami',
          state: 'FL',
          zipCode: '33101'
        },
        status: 'approved',
        isAvailable: true
      }
    ]);

    console.log(`Created ${items.length} items`);

    // Update category item counts
    for (const category of categories) {
      const itemCount = await Item.countDocuments({ category: category._id });
      await Category.findByIdAndUpdate(category._id, { itemCount });
    }

    console.log('Updated category item counts');
    console.log('✅ Seed data created successfully!');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
