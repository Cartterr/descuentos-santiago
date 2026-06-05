import cors from '@fastify/cors'
import Fastify from 'fastify'
import { discountRoutes } from './http/routes/discount-routes.js'

export async function buildApp() {
  const app = Fastify({ logger: false })

  await app.register(cors, { origin: true })
  await app.register(discountRoutes)

  return app
}
