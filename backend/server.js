import express from 'express';
import data from './data.js'
import mongoose from 'mongoose';

const app = express();
mongoose.connect('mongodb')

app.get('/api/products',(req,res) => {
    res.send(data.products);
});


app.get('/',(req,res) => {
    res.send('Server is ready af!');
});

const port = process.env.PORT || 5000;
app.listen(port, ()=>{
    console.log(`Server started at http://localhost:${port}`);
});