import type { Product } from './types'

export const PRODUCT: Product = {
  id: 1,
  name: "Wireless Headphones Pro",
  sku: "WHP-001",
  description:
    "Premium wireless headphones with advanced noise cancellation technology, superior sound quality, and all-day comfort. Perfect for music lovers, professionals, and travelers.",
  price: 299.99,
  salePrice: 249.99,
  stock: 45,
  category: "Electronics",
  status: "active",
  isNew: true,
  isOnSale: true,
  rating: 4.5,
  reviewCount: 128,
  images: [
    "https://picsum.photos/seed/headphones1/600/400.jpg",
    "https://picsum.photos/seed/headphones2/600/400.jpg",
    "https://picsum.photos/seed/headphones3/600/400.jpg",
    "https://picsum.photos/seed/headphones4/600/400.jpg",
  ],
  variants: [
    {
      name: "Color",
      options: [
        { value: "black", label: "Black" },
        { value: "white", label: "White" },
        { value: "blue", label: "Blue" },
      ],
    },
    {
      name: "Size",
      options: [
        { value: "standard", label: "Standard" },
        { value: "large", label: "Large" },
      ],
    },
  ],
  specifications: {
    weight: "250g",
    dimensions: "18 x 15 x 8 cm",
    material: "Premium Plastic & Metal",
    color: "Multiple Colors Available",
    warranty: "2 Years International Warranty",
  },
  brand: "AudioTech Pro",
  manufacturer: "AudioTech Industries",
  countryOfOrigin: "USA",
  releaseDate: "2024-01-15",
  productLine: "Professional Audio Series",
  warehouse: "Main Warehouse - New York",
  reorderLevel: 20,
  lastRestocked: "2024-01-10",
  reviews: [
    {
      id: 1,
      reviewer: "John Doe",
      rating: 5,
      content:
        "Amazing sound quality! The noise cancellation is incredible. Worth every penny.",
      date: "2024-01-12",
      images: ["https://picsum.photos/seed/review1/100/100.jpg"],
    },
    {
      id: 2,
      reviewer: "Jane Smith",
      rating: 4,
      content:
        "Great headphones, very comfortable for long use. Battery life could be better.",
      date: "2024-01-10",
    },
  ],
  analytics: {
    totalSales: 1247,
    revenue: 311753.53,
    avgOrderValue: 249.99,
  },
  history: [
    {
      id: 1,
      type: "success",
      title: "Product Added",
      description: "Product was added to inventory",
      timestamp: "2024-01-08T10:00:00Z",
    },
    {
      id: 2,
      type: "info",
      title: "Price Updated",
      description: "Price changed from $349.99 to $299.99",
      timestamp: "2024-01-10T14:30:00Z",
    },
    {
      id: 3,
      type: "warning",
      title: "Low Stock Alert",
      description: "Stock level below reorder threshold",
      timestamp: "2024-01-12T09:15:00Z",
    },
  ],
};
