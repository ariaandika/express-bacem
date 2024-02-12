// @ts-check
///<reference path="./app.d.ts" />
import express from "express"
import { json } from "body-parser"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
const app = express()

app.use(json())

app.use((req,_,next) => {
    const date = new Date()
    const jam = date.getHours()
    const menit = date.getMinutes()

    console.log(`${jam}:${menit} ${req.method} ${req.path}`)
    next()
})

app.use((_,res,next) => {
    res.locals.prisma = prisma
    next()
})

app.listen(3000)


