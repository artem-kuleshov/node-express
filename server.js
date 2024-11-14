import express from 'express'
import { twitRouter } from './src/twit/twit.controller.js'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

dotenv.config() 

const app = express()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.set('views', path.join(__dirname, '/src/views'))
app.set('view engine', 'ejs')

const port = process.env.PORT || 4000

async function main() {
  app.use(express.json())

  app.get('/profile', (req, res) => {
    res.render('profile', {user: {
      name: 'user',
      age: 251
    }})
  })

  app.use('/api/twits', twitRouter)

  app.get('/error', (req, res) => {
    throw new Error('This is error!!!!');
    
  })

  app.all('*', (req, res) => {
    res.status(404).json({message: 'not found'})
  })

  app.use((err, req, res, next) => {
    res.status(500).send('Что-то пошло не так!')
  })

  app.listen(port, () =>
    console.log(`Server running on port ${port}, http://localhost:${port}`)
  )
}

main()