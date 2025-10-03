import swaggerJSDoc from "swagger-jsdoc";
import { SwaggerUiOptions } from "swagger-ui-express";

const options: swaggerJSDoc.Options = {
    swaggerDefinition: {
        openapi: '3.1.0',
        tags: [
            {
                name: 'Products',
                description: 'API operations related to products'
            }
        ],
        info: {
            title: 'REST API Node.js / Express / TypeScript',
            version: '1.0',
            description: 'API Docs for Products'
        }
    },
    apis: ['./src/router.ts']
}

const swaggerSpec = swaggerJSDoc(options)

const swaggerUiOptions: SwaggerUiOptions = {
    customCss : `
        .topbar-wrapper .link {
            content: url('https://pm1.aminoapps.com/6781/70690ed13425dffae783df9c621ec21d14d64d53v2_hq.jpg');
            height: 120px;
            width: auto;
        }
    `,
    customSiteTitle: 'Documentación REST API Express / TypeScript'
}
export default swaggerSpec
export {
    swaggerUiOptions
}