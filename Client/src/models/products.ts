//import data from '../data/products.json'
import type { DataListEnvelope, DataEnvelope } from './dataEnvelope'
import { restAPI } from './myFetch'

export async function getAll() {
  return restAPI<DataListEnvelope<Product>>('products')
}
export async function getById(id: number) {
  return restAPI<DataEnvelope<Product>>(`products/${id}`)
}
export function create(product: Product) {
  return restAPI<DataEnvelope<Product>>('products', product)
}
export function update(product: Product) {
  return restAPI<DataEnvelope<Product>>(
    `products/${product.id}`,
    product,
    'PATCH',
  )
}
export function remove(id: number) {
  return restAPI<DataEnvelope<Product>>(`products/${id}`, undefined, 'DELETE')
}
interface Review {
  rating: number
  comment: string
  date: string
  reviewerName: string
  reviewerEmail: string
}
export interface Product {
  id: number
  title: string
  description: string
  category: string
  price: number
  rating: number
  tags: string[]
  brand?: string
  weight: number
  dimensions: {
    width: number
    height: number
    depth: number
  }
  reviews: Review[]
  returnPolicy: string
  minimumOrderQuantity: number
  images: string[]
  thumbnail: string
}
