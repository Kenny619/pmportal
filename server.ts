import { Hono } from 'hono'
import { serveStatic } from '@hono/node-server/serve-static'
import { serve } from '@hono/node-server'
import { cors } from 'hono/cors'
import { fetchData } from './server/fetchData'

const app = new Hono()
app.use('*', cors({
    origin: 'http://localhost:5173', // or use '*' in development
}))
// Serve static assets from React's build folder
app.use('/assets/*', serveStatic({ root: './dist' }))
app.use('/favicon.svg', serveStatic({ path: './dist/favicon.svg' }))

// Serve index.html for all other routes (SPA fallback)
app.get('*', serveStatic({ path: './dist/index.html' }))

/*
//verify 
app.get('/verify/', async (c) => await verify(c));

//save directory path
app.get('/save/', async (c) => await save(c))
*/

//load wbs data
app.get('/load/', async (c) => await fetchData(c));

// Start server on localhost:3000
serve({
    fetch: app.fetch,
    port: 8888
})

console.log('Server running at http://localhost:8888')
