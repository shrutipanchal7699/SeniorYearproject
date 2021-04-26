import express from 'express';
import data from './data.js';


const app = express();
mongoose.connect('mongodb+srv://<username>:<password>@cluster0.bd5dq.mongodb.net/userDB?retryWrites=true&w=majority'
,{
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useCreateIndex: true
});

app.get("/api/products", (req,res)=> {
    res.send(data.products);
});

//added a new api for product details using its id.
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