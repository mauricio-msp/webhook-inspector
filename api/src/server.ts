import { app } from '@/app'
import { env } from '@/env'

app.listen({ port: env.PORT, host: env.HOST }).then(() => {
  console.log(`🔥 HTTP server running on http://localhost:${env.PORT}`)
  console.log(`📖 Docs available at http://localhost:${env.PORT}/docs`)
})
