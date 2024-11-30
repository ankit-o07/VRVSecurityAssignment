import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectMongoDB } from './src/Config/DbConnection.js';



import { AuthRoutes } from './src/Routes/AuthRoute.js';
import { AdminRoutes } from './src/Routes/AdminRoute.js';
import { UserRoutes } from './src/Routes/UserRoute.js';
import { ModeratorRoutes } from './src/Routes/ModeratorRouts.js';



dotenv.config();
 
const PORT  = process.env.PORT || 8080;

// connect dateBase
const MONGO_URL = process.env.MONGO_URL;
console.log(MONGO_URL)
connectMongoDB(MONGO_URL);

const app = express();

app.use(bodyParser.json());
app.use(cors());






// Auth Routes (Public access for registration, login, etc.)
app.use('/api/auth', AuthRoutes);

// Admin Routes (Only accessible by Admin)
app.use('/api/admin', AdminRoutes);

// User Routes (Only accessible by authenticated users)
app.use('/api/user', UserRoutes);

// Moderator Routes (Only accessible by Moderator)
app.use('/api/moderator', ModeratorRoutes);


app.get("/ping",(req,res)=>{
    res.send("PONG");
})


app.listen(PORT,()=>{
    console.log(`Server is  running on port number ${8081}`);
})