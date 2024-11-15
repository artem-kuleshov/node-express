import { ICreateTwit } from "./twit.types"
import { Twit } from ".prisma/client"
import { PrismaClient } from '@prisma/client'

export class TwitService {
    private prisma = new PrismaClient()

    createTwit(twit: ICreateTwit): Promise<Twit> {
        return this.prisma.twit.create({
            data: twit
        })
    }

    async getTwits(): Promise<Twit[]> {        
        return this.prisma.twit.findMany()
    }
}