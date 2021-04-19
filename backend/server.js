import express from 'express';
import data from './data.js';


const app = express();

app.get("/api/products", (req,res)=> {
    res.send(data.products);
});

app.get('/api/products/:id', (req, res) =>{
    const product = data.products.find((x) => x._id === req.params.id);
    if(!product) {
        res.status(404).send({message: 'We could not find the requested product'});
    }else{
        res.send(product);
    }
});

app.get('/',(req,res) => {
    res.send('Server is ready!');
});

const port = process.env.PORT || 5000;
app.listen(port, ()=>{
    console.log(`Server started at http://localhost:${port}`);
});