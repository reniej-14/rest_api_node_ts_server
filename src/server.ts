import express from "express"
import router from "./router"
import db from "./config/db"

// Conectar a base de datos
async function connetDB() {
    try {
        await db.authenticate()
        db.sync()

        console.log('Conexion exitosa a la DB')
    } catch (error) {
        console.log(error)
        console.log('Hubo un error al conectar a la DB')
    }
}
connetDB()

const server = express()

server.use('/api/products', router)

export default server