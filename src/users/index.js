import express from 'express'



const users = express.Router()

users.get('/', async (req,res) => {

    const limit = parseInt(req.query.limit?.toString())
    const page = parseInt(req.query.page?.toString())

    /** @type {number} */
    let skip

    /** @type {number} */
    let take

    if (!isNaN(limit)) {
        take = limit

        if (!isNaN(page)) {
            skip = page * limit
        }
    }

    const users = await res.locals.prisma.user.findMany({
        skip,
        take,
    })

    res.json(users)
})

users.post('/', async (req,res) => {
    await res.locals.prisma.user.create({
        data: req.body
    })
    res.status(201)
})


