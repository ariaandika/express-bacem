// @ts-check

import express from "express"


export const logging = express.Router()

logging.use((req,_,next) => {
    const date = new Date()
    const jam = date.getHours()
    const menit = date.getMinutes()

    console.log(`[${jam}:${menit}] ${req.method} ${req.path}`)
    next()
})

