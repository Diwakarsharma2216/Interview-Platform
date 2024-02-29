const express = require('express');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());


app.get("/",(req,res)=>{
    
    res.send("Hello World")
})

app.listen(PORT,()=>{
    try {
        console.log(`Server running on port ${PORT}`)
    } catch (error) {
        console.log(error)
    }
});