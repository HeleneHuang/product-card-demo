import type { Request, Response } from 'express'
import prisma from '../config/db';

// GET /products
export const getAllProducts = async (req: Request, res: Response) => {
    try {
        const products = await prisma.product.findMany()
        res.json(products)
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' })
    }
}

// GET /products/:id
export const getProductById = async (req: Request, res: Response) => {
    const idParam = req.params.id
    if (!idParam) {
        return res.status(400).json({ error: 'Missing product ID' })
    }
    const productId = parseInt(idParam)
    try {
        const product = await prisma.product.findUnique({ where: { id: productId } })
        if (!product) return res.status(404).json({ error: 'Product not found' })
        res.json(product)
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' })
    }
}
