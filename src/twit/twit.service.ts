import { ITwit } from "./twit.types"
import { Twit } from ".prisma/client"
import { PrismaClient } from '@prisma/client'

export class TwitService {
    private prisma = new PrismaClient()

    createTwit(twit: ITwit): Promise<Twit> {
        return this.prisma.twit.create({
            data: twit
        })
    }

    async getTwits(): Promise<Twit[]> {        
        return this.prisma.twit.findMany()
    }

    async getTwit(id: number): Promise<Twit> {
        return await this.prisma.twit.findFirstOrThrow({where: {id}})
    }

    async updateTwit(id: number, data: ITwit): Promise<Twit> {
        return await this.prisma.twit.update({where: {id}, data: data})
    }

    async deleteTwit(id: number): Promise<Twit> {
        return await this.prisma.twit.delete({where: {id}})
    }
}