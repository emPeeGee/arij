import type { Component } from 'vue'

export type AppRoute = { id: string; to?: string; icon: Component; label: string }
export type LabeledValue = { label: string; value: string }
