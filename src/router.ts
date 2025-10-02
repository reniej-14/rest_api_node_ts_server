import { Router } from "express"
import { body, param } from 'express-validator'
import { createProduct, deleteProduct, getProductById, getProducts, updateAvailability, updateProduct } from "./handlers/product"
import { handleInputErrors } from "./middleware"

const router = Router()

/** 
* @swagger
* components:
*   schemas:
*       Product:
*           type;: object
*           properties:
*               id: 
*                   type: integer
*                   description: The Product ID
*                   example: 1
*               name:
*                   type: string
*                   description: The Product name
*                   example: Monitor curvo de 43"
*               price: 
*                   type: number
*                   description: The Product price
*                   example: 300
*               availability: 
*                   type: boolean
*                   description: The Product availability
*                   example: true
*/

// Routing
router.get('/', getProducts)
router.get('/:id', 
    param('id').isInt().withMessage('ID no valido'),
    handleInputErrors,
    getProductById
)

router.post('/', 
    // Validación
    body('name')
        .notEmpty().withMessage('El nombre del producto no puede ir vacio'),
    body('price')
        .isNumeric().withMessage('Valor no válido')
        .notEmpty().withMessage('El precio del producto no puede ir vacio')
        .custom(value => value > 0).withMessage('Precio no válido'),
        handleInputErrors,
    createProduct
)

router.put('/:id', 
    param('id').isInt().withMessage('ID no valido'),
    body('name')
        .notEmpty().withMessage('El nombre del producto no puede ir vacio'),
    body('price')
        .isNumeric().withMessage('Valor no válido')
        .notEmpty().withMessage('El precio del producto no puede ir vacio')
        .custom(value => 0).withMessage('Precio no válido'),
    body('availability')
        .isBoolean().withMessage('Valor para disponibilidad no válido'),
    handleInputErrors,
    updateProduct
)

router.patch('/:id', 
    param('id').isInt().withMessage('ID no valido'),
    body('name')
        .notEmpty().withMessage('El nombre del producto no puede ir vacio'),
    body('price')
        .isNumeric().withMessage('Valor no válido')
        .notEmpty().withMessage('El precio del producto no puede ir vacio')
        .custom(value => 0).withMessage('Precio no válido'),
    body('availability')
        .isBoolean().withMessage('Valor para disponibilidad no válido'),
    handleInputErrors,
    updateAvailability
)

router.delete('/:id', 
    param('id').isInt().withMessage('ID no valido'),
    handleInputErrors,
    deleteProduct
)

export default router