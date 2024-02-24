import express from 'express'
import { prisma } from "../lib/prisma.js"


export const users = express.Router()

users.get('/', async (req,res) => {

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
})

users.get('/:id', async (req,res) => {
    const id = parseInt(req.params.id)

    const user = await prisma.users.findFirst({
        where: { id },
    })

    if (!user) {
        res.status(404).json({ error: true, message: "User tidak ditemukan" })
        return
    }

    res.json(user)
})

users.get('/:id/products', async (req,res) => {
    const id = parseInt(req.params.id)

    const products = await prisma.products.findMany({
        where: { owner: { id: { equals: id } } }
    })

    res.json(products)
})

users.post('/', async (req,res) => {
    try {
        await prisma.users.create({
            data: req.body
        })

        res.sendStatus(201)
    } catch (err) {
        console.error(err.message)
        res.sendStatus(500)
    }
})

