import type { DashboardMetrics, DiscountFormState, DiscountRecord } from '../types'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://127.0.0.1:4000'

type ListFilters = {
  comuna?: string
  category?: string
  status?: string
  priority?: string
  search?: string
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
    ...init,
  })

  if (!response.ok) {
    const payload = (await response.json().catch(() => null)) as { message?: string } | null
    throw new Error(payload?.message ?? `Request failed with status ${response.status}`)
  }

  return response.json() as Promise<T>
}

export async function fetchDashboard(): Promise<DashboardMetrics> {
  return request('/api/dashboard')
}

export async function fetchDiscounts(filters: ListFilters): Promise<DiscountRecord[]> {
  const query = new URLSearchParams()

  for (const [key, value] of Object.entries(filters)) {
    if (value) query.set(key, value)
  }

  return request(`/api/discounts?${query.toString()}`)
}

export async function saveDiscount(input: DiscountFormState): Promise<DiscountRecord> {
  const payload = {
    ...input,
    tags: input.tags
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean),
  }

  if (input.id) {
    return request(`/api/discounts/${input.id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    })
  }

  return request('/api/discounts', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export async function publishDiscount(id: string): Promise<DiscountRecord> {
  return request(`/api/discounts/${id}/publish`, { method: 'POST' })
}

export async function archiveDiscount(id: string): Promise<DiscountRecord> {
  return request(`/api/discounts/${id}/archive`, { method: 'POST' })
}
