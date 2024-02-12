import { PrismaClient } from "@prisma/client"


declare global {

    namespace Express {
        interface Locals {
            prisma: InstanceType<typeof PrismaClient>
        }
    }
}

export {}
