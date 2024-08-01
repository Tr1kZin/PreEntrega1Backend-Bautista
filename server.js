const express = require('express');
const app = express();
const port = 8080;

app.use(express.json());

const productRoutes = require('./routes/product-routes');
const cartRoutes = require('./routes/carts-routes');

app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});