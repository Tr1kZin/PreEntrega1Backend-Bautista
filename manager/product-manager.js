const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productos.json');

const readProductsFile = async () => {
    const data = fs.readFileSync(productsFilePath);
    return JSON.parse(data);
};

const writeProductsFile = async (data) => {
    fs.writeFileSync(productsFilePath, JSON.stringify(data, null, 2));
};

module.exports = { readProductsFile, writeProductsFile };