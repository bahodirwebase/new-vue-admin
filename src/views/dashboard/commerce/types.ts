import type { Component } from 'vue'

export interface StatCard {
  title: string
  value: string
  trend: string
  isPositive: boolean
  period: string
  icon: Component
  color: 'orange' | 'gray' | 'blue'
}

export interface Order {
  no: number
  orderId: string
  customer: string
  product: string
  productIcon: string
  qty: number
  total: number
  status: 'Shipped' | 'Processing' | 'Delivered' | 'Pending'
}

export interface Category {
  name: string
  value: number
}

export interface TrafficSource {
  name: string
  percentage: number
}

export interface Country {
  name: string
  percentage: number
}

export interface Activity {
  icon: Component
  iconColor: string
  iconBg: string
  text: string
  time: string
}

export interface ConversionStat {
  label: string
  value: number
  trend: number
}

