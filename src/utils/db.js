const mongoose= require('mongoose');
//dotenv instance intialized in the main file
const dotenv= require('dotenv');

dotenv.config();

const connectDB= async()=>{

    try {
        //doing it this way due to small project less modular 
        await mongoose.connect(process.env.MONGO_URL,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Mongo DB connected");
    } catch (error) {
        console.log("MongoDB connection error:",error);
        process.exit(1);
    }
};

module.exports= connectDB;