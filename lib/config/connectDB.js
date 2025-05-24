import mongoose from "mongoose"

export  const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("mongo connected succesfully")
    } catch (error) {
        console.log("mongo not connected succesfully")
        console.log("Erreur :" , error.message)
    }
}
