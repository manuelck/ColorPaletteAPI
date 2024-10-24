require('dotenv').config(); 
const express = require("express");
const cors = require("cors");
const { connectDB } = require("./src/config/db"); 
const userRouter = require("./src/api/routes/user"); 
const paletteRouter = require("./src/api/routes/colorPalette"); 
const authRouter = require("./src/api/routes/auth"); 

const app = express();
const PORT = process.env.PORT || 3000; 


app.use(cors());
app.use(express.json()); 


connectDB(); 

app.use("/api/v1/users", userRouter); 
app.use("/api/v1/palettes", paletteRouter);
app.use("/api/v1/auth", authRouter); 

app.use((req, res) => {
    res.status(404).json({ message: '404 Not Found' });
});

app.listen(PORT, () => {
    console.log(`Server running on: http://localhost:${PORT}`);
});
