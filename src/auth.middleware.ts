import { NextFunction, Request, Response } from "express"

export const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const authHeader = req.headers.authorization
    if (!authHeader) {
        return res.status(401).json({ message: "Not auth" })
    }

    next()
}