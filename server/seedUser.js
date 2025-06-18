// seedUser.js

import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/userModel.js";

dotenv.config();

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    // Clear old users if needed
    await User.deleteMany();

    // Create users with hashed passwords via 'save'
    const users = [
      {
        name: "Admin User",
        title: "Administrator",
        role: "admin",
        email: "admin@example.com",
        password: "password123", // This will get hashed
        isAdmin: true
      },
      {
        name: "Regular User",
        title: "User",
        role: "user",
        email: "user@example.com",
        password: "password123", // This too
        isAdmin: false
      },
       {
        name: "Abhinav Chauhan",
        title: "User",
        role: "user",
        email: "user2@example.com",
        password: "password123", // This too
        isAdmin: false
      }
    ];

    for (const userData of users) {
      const user = new User(userData);
      await user.save();
    }

    console.log("Users seeded successfully!");
    process.exit();
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
};

seedUsers();
