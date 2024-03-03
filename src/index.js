import express from "express"
import parser from "body-parser"
import { logging } from "./middleware/logging.js"
import cors from "cors"
import { users } from "./model/users.js"
import { products } from "./model/products.js"

const app = express()

app.use(parser.json())
app.use(logging)
app.use(cors())
app.use("/users",users)
app.use("/products",products)

app.listen(3000, () => console.log(`Listening http://localhost:3000`))

