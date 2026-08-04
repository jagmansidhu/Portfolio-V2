import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolveDeezerPreviews } from './api/_resolveDeezerPreviews.js'

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = []
    req.on('data', (c) => chunks.push(c))
    req.on('end', () => {
      try {
        const raw = Buffer.concat(chunks).toString('utf8')
        resolve(raw ? JSON.parse(raw) : {})
      } catch (err) {
        reject(err)
      }
    })
    req.on('error', reject)
  })
}

function deezerPreviewsDevPlugin() {
  return {
    name: 'deezer-previews-dev',
    configureServer(server) {
      server.middlewares.use('/api/deezer-previews', async (req, res) => {
        res.setHeader('Content-Type', 'application/json')
        res.setHeader('Cache-Control', 'no-store')

        try {
          let ids = []
          if (req.method === 'GET') {
            const url = new URL(req.url || '', 'http://localhost')
            ids = (url.searchParams.get('ids') || '')
              .split(',')
              .map((s) => s.trim())
              .filter(Boolean)
          } else if (req.method === 'POST') {
            const body = await readJsonBody(req)
            ids = Array.isArray(body.ids) ? body.ids : []
          } else {
            res.statusCode = 405
            res.end(JSON.stringify({ error: 'Method not allowed' }))
            return
          }

          if (ids.length === 0) {
            res.statusCode = 400
            res.end(JSON.stringify({ error: 'Provide ids' }))
            return
          }
          if (ids.length > 12) {
            res.statusCode = 400
            res.end(JSON.stringify({ error: 'Too many ids (max 12)' }))
            return
          }

          const previews = await resolveDeezerPreviews(ids)
          res.statusCode = 200
          res.end(JSON.stringify({ previews }))
        } catch {
          res.statusCode = 502
          res.end(JSON.stringify({ error: 'Failed to resolve previews' }))
        }
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), deezerPreviewsDevPlugin()],
})
