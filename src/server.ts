import express from "express"
import colors from "colors"
import swaggerUi from 'swagger-ui-express'
import swaggerSpec, { swaggerUiOptions } from "./config/swagger"
import router from "./router"
import db from "./config/db"

// Conectar a base de datos
async function connetDB() {
    try {
        await db.authenticate()
        await db.sync({ alter: true })

        console.log( colors.blue('Conexion exitosa a la DB'))
    } catch (error) {
        console.log(error)
        console.log( colors.red.bold('Hubo un error al conectar a la DB') )
    }
}
connetDB()

// Instancia de express
const server = express()

// Leer datos de formularios
server.use(express.json())

server.use('/api/products', router)

// Docs
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions))

export default server