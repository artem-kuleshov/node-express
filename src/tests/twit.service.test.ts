import { TwitService } from "../twit/twit.service"

describe('TwitService', () => {

    const twitService = new TwitService()
    
    it('should create a twit', async () => {
        const twit = await twitService.createTwit({
            text: "Test twit create"
        })
        
        expect(twit).toHaveProperty('id')
        expect(twit.text).toEqual('Test twit create')
    })
})