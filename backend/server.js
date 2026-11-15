import express from "express";
import dotenv from "dotenv";
const app=express();

dotenv.config();

const port=process.env.PORT || 6000;


app.get("/" , (req,res) => {
    res.send("hellllo world :)")
})

app.listen(port, () => console.log(`server running on port ${port}`));