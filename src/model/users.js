import express from 'express'
import { prisma } from "../lib/prisma.js"
import { handleError } from "../lib/errorHandling.js"


export const users = express.Router()

users.get('/', (req,res) => handleError(async () => {
    const limit = parseInt(req.query.limit?.toString())
    const page = parseInt(req.query.page?.toString())

    let skip
    let take

    if (!isNaN(limit)) {
        take = limit

        if (!isNaN(page)) {
            skip = page * limit
        }
    }

    const users = await prisma.users.findMany({ skip, take, })

    res.json(users)
}))

users.get('/:id', async (req,res) => handleError(async () => {
    const id = parseInt(req.params.id)

    const user = await prisma.users.findFirst({
        where: { id },
    })

    if (!user) {
        res.status(404).json({ error: true, message: "User tidak ditemukan" })
        return
    }

    res.json(user)
}))

users.get('/:id/products', (req,res) => handleError(async () => {
    const id = parseInt(req.params.id)

    const products = await prisma.products.findMany({
        where: { owner: { id: { equals: id } } }
    })

    res.json(products)
}))

users.post('/', (req,res) => handleError(res, async () => {
    await prisma.users.create({
        data: req.body
    })

    res.sendStatus(201)
}))


