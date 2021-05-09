const http = require('http');
const app = require('./app');

const port = process.env.PORT || 5000;

const server = http.createServer(app);

server.listen(port);

// //added a new api for product details using its id.
// app.get('/api/products/:id', (req, res) =>{
//     const product = data.products.find((x) => x._id === req.params.id);
//     if(!product) {
//         res.status(404).send({message: 'We could not find the requested product'});
//     }else{
//         res.send(product);
//     }
// });

app.get('/',(req,res) => {
    res.send('Server is ready!');
});