import type { Product } from '@prisma/client'

export type ProductModel = Product

export type CreateProductDTO = {
    name: string
    price: number
    description?: string
}

export type ProductDTO = {
    id: number
    name: string
    price: number
    description?: string
    createdAt: string // ISO date string
}