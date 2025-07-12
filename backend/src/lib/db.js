import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    // Check if MONGODB_URI is defined
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI environment variable is not defined");
    }

    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Successfully connected to MongoDB:`, conn.connection.host);
  } catch (err) {
    console.log("Error encountered while connecting to MongoDB:", err.message);
    process.exit(1); // Exit the process if database connection fails
  }
};

// Clean up old Clerk-related indexes and data
export const cleanupOldData = async () => {
  try {
    const db = mongoose.connection.db;

    // Drop the users collection entirely to remove old indexes
    try {
      await db.collection("users").drop();
      console.log("Dropped users collection with old indexes");
    } catch (error) {
      if (error.codeName === "NamespaceNotFound") {
        console.log("Users collection does not exist, skipping drop");
      } else {
        console.log("Error dropping users collection:", error.message);
      }
    }

    // Also clean up any other collections that might have clerk references
    const collections = [
      "items",
      "categories",
      "swaps",
      "transactions",
      "notifications",
      "reports",
      "messages",
    ];

    for (const collectionName of collections) {
      try {
        const collection = db.collection(collectionName);
        const hasClerkField = await collection.findOne({
          clerkId: { $exists: true },
        });

        if (hasClerkField) {
          await collection.updateMany(
            { clerkId: { $exists: true } },
            { $unset: { clerkId: "" } }
          );
          console.log(`Removed clerkId field from ${collectionName} collection`);
        }
      } catch (error) {
        console.log(`Error cleaning ${collectionName}:`, error.message);
      }
    }

    console.log("Database cleanup completed");
  } catch (error) {
    console.error("Error during database cleanup:", error);
  }
};
