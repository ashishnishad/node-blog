require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require('cors');

connectDB();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3001',  // React app URL
    credentials: true
}))
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/posts', require('./routes/postRoutes'));
app.get("/", (req, res)=>{
    res.send("Hello");
});



app.listen(PORT, () =>{
    console.log("Server is running.");
    
})