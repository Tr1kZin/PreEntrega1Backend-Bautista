const fs = require('fs');
const path = require('path');

const cartsFilePath = path.join(__dirname, '../data/carrito.json');

const readCartsFile = async () => {
    const data = fs.readFileSync(cartsFilePath);
    return JSON.parse(data);
};

const writeCartsFile = async (data) => {
    fs.writeFileSync(cartsFilePath, JSON.stringify(data, null, 2));
};

module.exports = { readCartsFile, writeCartsFile };