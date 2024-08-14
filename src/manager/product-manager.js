import { promises as fs } from "fs";
import { v4 as uuidv4 } from "uuid";
            
export class ProductManager {
    constructor() {
        this.path = "./src/data/products.json";
        this.products = [];
    }

    addProduct = async (product) => {
        try {
            const products = await this.getProducts();
            product.id = uuidv4();
            // Solo asignar la imagen por defecto si no se proporciona una imagen
            if (!product.imagen) {
                product.imagen = "/img/200w.gif"; // Imagen por defecto
            }
            product.clase = "coders"; // Establece la clase "coders"
            products.push(product);
            await fs.writeFile(this.path, JSON.stringify(products, null, 2));
            return product;
        } catch (error) {
            throw new Error("No se pudo agregar el producto");
        }
    }
                                //  Toma los productos y espera respuesta
    getProducts = async () => {
        try {
            const response = await fs.readFile(this.path, "utf8");
            return JSON.parse(response);
        } catch (error) {
            throw new Error("Error");
        }
    }

    getProductById = async (id) => {
        const products = await this.getProducts();
        return products.find(product => product.id === id);
    }
                // Actualiza los productos recibidos
    updateProduct = async (id, data) => {
        const products = await this.getProducts();
        const index = products.findIndex(product => product.id === id);

        if (index !== -1) {
            products[index] = { id, ...data };
            await fs.writeFile(this.path, JSON.stringify(products, null, 2));
            return products[index];
        } else {
            throw new Error("Producto no encontrado");
        }
    }
            // Borra un producto en especifico
    deleteProduct = async (id) => {
        const products = await this.getProducts();
        const index = products.findIndex(product => product.id === id);

        if (index !== -1) {
            products.splice(index, 1);
            await fs.writeFile(this.path, JSON.stringify(products, null, 2));
        } else {
            throw new Error("Producto no encontrado");
        }
    }
}