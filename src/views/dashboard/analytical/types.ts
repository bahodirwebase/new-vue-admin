import type { Component } from 'vue'
import type { ApexOptions } from 'apexcharts'

export interface Transaction {
  id: number
  customer: string
  avatar: string
  item: string
  date: string
  status: 'pending' | 'completed'
}

export interface Lead {
  id: number
  name: string
  time: string
  avatar: string
}

export interface StatInfo {
  value: string
  label: string
  icon: Component
}

export interface Meeting {
  id: number
  title: string
  iconColor: string
}

export interface BrowserStat {
  name: string
  value: number
  colorVar: string
  indicatorClass: string
}

export interface StatsByChartItem {
  series: any[]
  chartOptions: ApexOptions
  type: 'success' | 'error'
  label: string
  value: string
}
