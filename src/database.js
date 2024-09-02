import mongoose from "mongoose";

const db = "MongoDB"

mongoose.connect("mongodb+srv://dylanbaucarc9:dylanbaucarc99@cluster1.umasb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1")
    .then(() => console.log(`Successful connection - ${db}`))
    .catch((error) => console.log(`Error connecting - ${db}`, error))