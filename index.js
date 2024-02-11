import express from 'express';
import { port,mongodb } from './config.js';
import mongoose from 'mongoose';
import bookRoute from "./routes/bookRoute.js";
import cors from 'cors';

const app=express();

app.use(express.json());


//Allow all origins with default of cors
app.use(cors());

//Allow selected origins

// app.use(cors({
//     origin:'http://localhost:3000',
//     methods:['GET','POST','PUT','DELETE'],
//     allowedHeaders:['Content-Type'] 
// }))



app.use('/books',bookRoute);


app.get('/',(req,res)=>{
    console.log(req);
    return res.status(201).send('Welcome');
});



mongoose.connect(mongodb).then(()=>{
    app.listen(port,()=>{
        console.log(`Server is running on ${port}`);
    });
    console.log("Successfully connected to the DB");
}).catch((error)=>{
    console.log(error);
})


