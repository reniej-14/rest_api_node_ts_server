import { Router } from "express"
import { body } from 'express-validator'
import { createProduct } from "./handlers/product"

const router = Router()

// Routing
router.get('/', (req, res) => {
    res.json('Desde get')
})

router.post('/', 
    // Validación
    body('name')
        .notEmpty().withMessage('El nombre del producto no puede ir vacio'),
    body('price')
        .isNumeric().withMessage('Valor no válido')
        .notEmpty().withMessage('El precio del producto no puede ir vacio')
        .custom(value => value > 0).withMessage('Precio no válido'),

    createProduct
)

router.put('/', (req, res) => {
    res.json('Desde put')
})

router.patch('/', (req, res) => {
    res.json('Desde patch')
})

router.delete('/', (req, res) => {
    res.json('Desde delete')
})

export default router