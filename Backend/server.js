import express from 'express';
//import products from './data/products.js';
import connDb from './config/db.js'
import dotenv from 'dotenv'
import productRoutes from './routes/productRouter.js'
import userRoutes from './routes/userRoutes.js'

const app = express();

app.use(express.json())
dotenv.config()

connDb()

app.get('/', (req, res) => {
    res.send('home page');
});

app.use('/products', productRoutes)
app.use('/users', userRoutes)

app.listen(3002, console.log('listening to port 3002'));