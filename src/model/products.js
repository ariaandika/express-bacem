import express from 'express'
import { prisma } from "../lib/prisma.js"


export const products = express.Router()

products.get('/', async (req,res) => {

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
})

products.get('/:id', async (req,res) => {
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
})

products.post('/', async (req,res) => {
    try {
        await prisma.products.create({
            data: req.body
        })

        res.sendStatus(201)
    } catch (err) {
        console.error(err.message)
        res.sendStatus(500)
    }
})


