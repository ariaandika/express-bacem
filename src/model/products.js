import express from 'express'
import { prisma } from "../lib/prisma.js"
import { handleError } from '../lib/errorHandling.js'


export const products = express.Router()

products.get('/', (req,res) => handleError(res, async () => {

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

    const products = await prisma.products.findMany({ skip, take, })

    res.json(products)
}))

products.get('/:id', (req,res) => handleError(res, async () => {
    const id = parseInt(req.params.id)

    const owner = req.query.owner

    const product = await prisma.products.findFirst({
        where: { id },
        include: owner ? { owner: true } : undefined
    })

    if (!product) {
        res.status(404).json({ error: true, message: "Produk tidak ditemukan" })
        return
    }

    res.json(product)
}))

products.post('/', async (req,res) => handleError(res, async () => {
    await prisma.products.create({
        data: req.body
    })

    res.sendStatus(201)
}))

products.put('/', async (req,res) => handleError(res, async () => {
    await prisma.products.update({
        data: req.body
    })

    res.sendStatus(200)
}))

products.delete('/:id', async (req,res) => handleError(res, async () => {
    const id = parseInt(req.params.id)

    if (isNaN(id)) {
        return res.sendStatus(400)
    }

    await prisma.products.delete({ where: { id } })

    res.sendStatus(200)
}))


