import request from 'supertest'
import server from '../../server'
import { ExpressValidator } from 'express-validator'

describe('POST /api/products', () => {
    test('should display validation errors', async () => {
        const response = await request(server).post('/api/products').send()

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(4)

        expect(response.status).not.toBe(404)
        expect(response.body.errors).not.toHaveLength(2)
    })

    test('should validate that the price is greater than 0', async () => {
        const response = await request(server).post('/api/products').send({
            name: 'Monitor curvo',
            price: 0
        })

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1)

        expect(response.status).not.toBe(404)
        expect(response.body.errors).not.toHaveLength(2)
    })

    test('should validate that the price is a number and greater than 0', async () => {
        const response = await request(server).post('/api/products').send({
            name: 'Monitor curvo',
            price: 'Hola'
        })

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(2)

        expect(response.status).not.toBe(404)
        expect(response.body.errors).not.toHaveLength(4)
    })

    test('should create a new product', async () => {
        const response = await request(server).post('/api/products').send({
            name: "Iphone - Testing",
            price: "350"
        })

        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty('data')

        expect(response.status).not.toBe(404)
        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('errors')
    })
})

describe('GET /api/products', () => {
    test('Should check if api/products url exist', async () => {
        const response = await request(server).get('/api/products')
        expect(response.status).not.toBe(404)
    })
    test('GET a JSON response with products', async () => {
        const response = await request(server).get('/api/products')

        expect(response.status).toBe(200)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body).toHaveProperty('data')
        expect(response.body.data).toHaveLength(1)

        
        expect(response.body).not.toHaveProperty('errors')
    })
})

describe('GET /api/products/:id', () => {
    test('Shoult return a 404 response for a non-existent product', async () => {
        const productID = 2000
        const response = await request(server).get(`/api/products/${productID}`)

        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toBe('Producto no encontrado')
    })

    test('shoult check a valid ID in the URL', async () => {
        const response = await request(server).get('/api/products/not-valid-url')

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1)
        expect(response.body.errors[0].msg).toBe('ID no valido')
    })

    test('GET a JSON response for a single product', async () => {
        const response = await request(server).get('/api/products/1')

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')
    })
})