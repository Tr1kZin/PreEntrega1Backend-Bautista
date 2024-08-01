const express = require('express');
const router = express.Router();
const { readProductsFile, writeProductsFile } = require('../manager/product-manager');

router.get('/', async (req, res) => {
    const products = await readProductsFile();
    const limit = req.query.limit ? parseInt(req.query.limit) : products.length;
    res.json(products.slice(0, limit));
});

router.get('/:pid', async (req, res) => {
    const products = await readProductsFile();
    const product = products.find(p => p.id == req.params.pid);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: 'No se encontro el producto' });
    }
});

router.post('/', async (req, res) => {
    const products = await readProductsFile();
    const newProduct = { ...req.body, id: Date.now().toString(), status: true };
    products.push(newProduct);
    await writeProductsFile(products);
    res.status(201).json(newProduct);
});

router.put('/:pid', async (req, res) => {
    let products = await readProductsFile();
    const productIndex = products.findIndex(p => p.id == req.params.pid);
    if (productIndex !== -1) {
        const updatedProduct = { ...products[productIndex], ...req.body };
        products[productIndex] = updatedProduct;
        await writeProductsFile(products);
        res.json(updatedProduct);
    } else {
        res.status(404).json({ message: 'No se encontro el producto' });
    }
});

router.delete('/:pid', async (req, res) => {
    let products = await readProductsFile();
    products = products.filter(p => p.id != req.params.pid);
    await writeProductsFile(products);
    res.status(204).send();
});

module.exports = router;