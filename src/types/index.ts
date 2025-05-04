export interface User {
  id: number
  name: string
  email: string
  avatar?: string
  phone?: string
}

export interface Product {
  id: number
  name: string
  description: string
  price: number
  discountPrice?: number
  images: string[]
  rating: number
  reviewCount: number
  categoryId: number
  inStock: boolean
  tags?: string[]
  colors?: string[]
  sizes?: string[]
}

export interface Category {
  id: number
  name: string
  image: string
  productCount: number
}

export interface Address {
  id: number
  name: string
  street: string
  city: string
  state: string
  zipCode: string
  country: string
  isDefault: boolean
}

export interface PaymentMethod {
  id: number
  type: "card" | "paypal" | "applepay" | "googlepay"
  last4?: string
  expiryDate?: string
  isDefault: boolean
}

export interface OrderItem {
  productId: number
  productName: string
  productImage: string
  quantity: number
  price: number
}

export interface Order {
  id: number
  orderNumber: string
  date: string
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  items: OrderItem[]
  totalAmount: number
  shippingAddress: Address
  paymentMethod: PaymentMethod
  trackingNumber?: string
}
