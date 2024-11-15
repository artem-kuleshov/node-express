import { IRouterMatcher, Request, Response, Router } from "express"
import { TwitService } from "./twit.service"
import { authMiddleware } from "../auth.middleware"
import { createTwitDto } from "./twit.dto"

const router = Router()
const twitService = new TwitService()

router.post('/', authMiddleware, async (req, res) => {
    const validation = createTwitDto.safeParse(req.body)
    if (!validation.success) {
        res.status(400).json({message: validation.error.errors})
    } else {
        const twit = await twitService.createTwit(req.body)
        res.status(201).json(twit)
    }
})

router.get('/', async (req, res) => {
    const twits = await twitService.getTwits()
    res.json(twits)
})

export const twitRouter = router