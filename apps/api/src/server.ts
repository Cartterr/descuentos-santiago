import { buildApp } from './app.js'

const port = Number(process.env.API_PORT ?? 4000)

const app = await buildApp()

app.listen({ host: '0.0.0.0', port }).catch((error) => {
  console.error(error)
  process.exit(1)
})
