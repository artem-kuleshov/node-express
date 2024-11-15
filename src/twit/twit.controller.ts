import { IRouterMatcher, Request, Response, Router } from "express"
import { TwitService } from "./twit.service"
import { authMiddleware } from "../auth.middleware"
import { createTwitDto } from "./twit.dto"

const router = Router()
const twitService = new TwitService()

router.get('/', async (req, res) => {
    const twits = await twitService.getTwits()
    res.json(twits)
})

router.post('/', authMiddleware, async (req, res) => {
    const validation = createTwitDto.safeParse(req.body)
    if (!validation.success) {
        res.status(400).json({message: validation.error.errors})
    } else {
        const twit = await twitService.createTwit(req.body)
        res.status(201).json(twit)
    }
})

router.get('/:id', async (req, res) => {
    try {
        const twit = await twitService.getTwit(Number(req.params.id))        
        res.json(twit)
    } catch (error) { 
        res.status(404).json({message: "not found"})
    }
})

router.patch('/:id/edit', async (req, res) => {
    const validation = createTwitDto.safeParse(req.body)
    if (!validation.success) {
        res.status(400).json({message: validation.error.errors})
    } else {
        try {
            const twit = await twitService.updateTwit(Number(req.params.id), req.body)      
            res.json(twit)
        } catch (error) { 
            res.status(404).json({message: "not found"})
        }
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const twit = await twitService.deleteTwit(Number(req.params.id))        
        res.json(twit)
    } catch (error) { 
        res.status(404).json({message: "not found"})
    }
})

export const twitRouter = router