import { DomainError } from '@descuentos-santiago/domain'
import type { FastifyPluginAsync } from 'fastify'
import { z } from 'zod'
import { dependencies } from '../plugins/dependencies.js'

const filtersSchema = z.object({
  comuna: z.string().optional(),
  category: z.enum(['Comida', 'Farmacia', 'Retail', 'Belleza', 'Servicios', 'Panorama']).optional(),
  status: z.enum(['draft', 'published', 'archived']).optional(),
  priority: z.enum(['high', 'medium', 'low']).optional(),
  featured: z
    .union([z.literal('true'), z.literal('false')])
    .transform((value) => value === 'true')
    .optional(),
  search: z.string().optional(),
})

const payloadSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(3),
  description: z.string().min(10),
  businessName: z.string().min(2),
  comuna: z.string().min(2),
  category: z.enum(['Comida', 'Farmacia', 'Retail', 'Belleza', 'Servicios', 'Panorama']),
  percentageOff: z.number().min(1).max(100),
  sourceUrl: z.string().url().optional().or(z.literal('')),
  tags: z.array(z.string()).default([]),
  priority: z.enum(['high', 'medium', 'low']),
  featured: z.boolean(),
  startsAt: z.string().datetime(),
  expiresAt: z.string().datetime(),
  status: z.enum(['draft', 'published', 'archived']).optional(),
})

export const discountRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get('/health', async () => ({ status: 'ok' }))

  fastify.get('/api/dashboard', async () => dependencies.getDashboardMetrics.execute())

  fastify.get('/api/discounts', async (request, reply) => {
    const parsed = filtersSchema.safeParse(request.query)

    if (!parsed.success) {
      return reply.status(400).send({ message: 'Invalid filters.', issues: parsed.error.issues })
    }

    return dependencies.listDiscounts.execute(parsed.data)
  })

  fastify.post('/api/discounts', async (request, reply) => {
    const parsed = payloadSchema.safeParse(request.body)

    if (!parsed.success) {
      return reply.status(400).send({ message: 'Invalid discount payload.', issues: parsed.error.issues })
    }

    try {
      const payload = {
        ...parsed.data,
        sourceUrl: parsed.data.sourceUrl || undefined,
      }
      const result = await dependencies.saveDiscount.execute(payload)
      return reply.status(201).send(result)
    } catch (error) {
      if (error instanceof DomainError) {
        return reply.status(400).send({ message: error.message })
      }
      throw error
    }
  })

  fastify.put('/api/discounts/:id', async (request, reply) => {
    const params = z.object({ id: z.string().min(1) }).safeParse(request.params)
    const parsed = payloadSchema.safeParse({ ...(request.body as object), id: (request.params as { id: string }).id })

    if (!params.success || !parsed.success) {
      return reply.status(400).send({ message: 'Invalid discount update request.' })
    }

    try {
      const payload = {
        ...parsed.data,
        sourceUrl: parsed.data.sourceUrl || undefined,
      }
      return dependencies.saveDiscount.execute(payload)
    } catch (error) {
      if (error instanceof DomainError) {
        return reply.status(400).send({ message: error.message })
      }
      throw error
    }
  })

  fastify.post('/api/discounts/:id/publish', async (request, reply) => {
    const params = z.object({ id: z.string().min(1) }).safeParse(request.params)
    if (!params.success) return reply.status(400).send({ message: 'Invalid discount id.' })

    try {
      return dependencies.publishDiscount.execute(params.data.id)
    } catch (error) {
      if (error instanceof DomainError) {
        return reply.status(400).send({ message: error.message })
      }
      throw error
    }
  })

  fastify.post('/api/discounts/:id/archive', async (request, reply) => {
    const params = z.object({ id: z.string().min(1) }).safeParse(request.params)
    if (!params.success) return reply.status(400).send({ message: 'Invalid discount id.' })

    try {
      return dependencies.archiveDiscount.execute(params.data.id)
    } catch (error) {
      if (error instanceof DomainError) {
        return reply.status(400).send({ message: error.message })
      }
      throw error
    }
  })
}
