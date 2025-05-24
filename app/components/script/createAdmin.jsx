import mongoose from "mongoose";
import bcrypt from "bcrypt";
// import { config } from "dotenv";
import dotenv from 'dotenv';
import { connectDB } from "../../../lib/config/connectDB.js";
import UserModel from "../../../lib/models/UserModel.js";
// import { connectDB } from "@/lib/config/connectDB.js";

dotenv.config();
// config(); // Charge les variables d'environnement

const createAdmin = async () => {
  try {
    
    // console.log(process.env.MONGODB_URI)  ; 
      await connectDB() ; 
    //  await mongoose.connect(process.env.MONGODB_URI)  ; 

    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;

    if (!email || !password) {
      console.error(" ADMIN_EMAIL ou ADMIN_PASSWORD manquant dans .env");
      return;
    }

    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      console.log(" Un utilisateur avec cet email existe déjà.");
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = new UserModel({
      email,
      username: "admin",
      password: hashedPassword,
      gender : "male" , 
      isAdmin: true,
    });

    await admin.save();
    console.log(" Admin créé avec succès !");
  } catch (err) {
    console.error(" Erreur :", err.message);
  } finally {
    await mongoose.disconnect();
  }
};

createAdmin();

