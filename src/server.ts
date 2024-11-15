import express, { NextFunction, Request, Response } from 'express'
import { twitRouter } from './twit/twit.controller'
import dotenv from 'dotenv'
import path from 'path'
import { PrismaClient } from '@prisma/client'
import { logger } from './utils/log'

dotenv.config() 

const app = express()

const prisma = new PrismaClient()

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

  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.error(err.stack)
    res.status(500).send('Что-то пошло не так!')
  })

  app.listen(port, () =>
    logger.info(`Server running on port ${port}, http://localhost:${port}`)
  )
}

main().then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    logger.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })