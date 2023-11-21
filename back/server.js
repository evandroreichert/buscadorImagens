// 1 - iniciar o server - express
// 2 - dotenv - api key
// 3 - middleware - cors
// 4 - criar rota /api/photos - dar fetch na api

import express from 'express'
import fetch from 'node-fetch'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const port = 3000

const unsplashApiKey = process.env.API_KEY

// Middleware permitir solicitações de qualquer origem (CORS)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
  });

app.get('/api/photos', async (req, res) => {
    try {
        const query = req.query.query // pega a query do front

        const response = await fetch(`https://api.unsplash.com/search/photos?per_page=27&client_id=${unsplashApiKey}&query=${query}`)

        const photos = await response.json()

        res.json(photos.results)
    } catch (error) {
        console.error('Erro ao chamar API', error);
    }
})

app.listen(port, () => {
    console.log(`Server em http://localhost:${port}`);
})
  