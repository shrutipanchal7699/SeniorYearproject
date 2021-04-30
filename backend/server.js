<<<<<<< Updated upstream
import express from 'express';
import data from './data.js'
import mongoose from 'mongoose';
import userRouter from './routers/userRouters.js';

const app = express();
mongoose.connect('mongodb+srv://<username>:<password>@cluster0.bd5dq.mongodb.net/userDB?retryWrites=true&w=majority'
,{
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useCreateIndex: true,
});

app.get('/api/products',(req,res) => {
    res.send(data.products);
});

app.use('/api/users',userRouter);

app.get('/',(req,res) => {
    res.send('Server is ready af!');
});

app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message });
  });

const port = process.env.PORT || 5000;
app.listen(port, ()=>{
    console.log(`Server started at http://localhost:${port}`);
});
=======
//author Param Patel
//012421227
const http = require('http');
const app = require('./app');

const port = process.env.PORT || 5000;

const server = http.createServer(app);

server.listen(port);
>>>>>>> Stashed changes
