import { PrismaClientKnownRequestError, PrismaClientValidationError } from "@prisma/client/runtime/library"

const internalErrorResponse = {
    error: true,
    message: "Internal Server Error"
}

export async function handleError(res, call) {
    try {
        await call()
    } catch (err) {
        if (err instanceof PrismaClientKnownRequestError) {
            return handlePrismaError(err, res)
        }
        if (err instanceof PrismaClientValidationError) {
            return res.status(400).json({ error: true, message: err.message.split("\n").at(-1) })
        }
        console.error("Uncaught error:",err)
        res.status(500).send(internalErrorResponse)
    }
}


// source: https://www.prisma.io/docs/orm/reference/error-reference#error-codes
function handlePrismaError(err,res) {
    // console.log(err.meta)
    switch (err.code) {
        // "Unique constraint failed on the {constraint}"
        case "P2002": return res.status(422).send({ error: true, message: `${err.constraint} sudah digunakan` });
        // "Foreign key constraint failed on the field: {field_name}"
        case "P2003": return res.status(422).send({ error: true, message: `${err.field_name} tidak ditemukan` });
        // "The value {field_value} stored in the database for the field {field_name} is invalid for the field's type"
        case "P2005": return res.status(422).send({ error: true, message: `${err.field_value} tidak valid` });
        // "The provided value {field_value} for {model_name} field {field_name} is not valid"
        case "P2006": return res.status(422).send({ error: true, message: `${err.field_value} tidak valid` });
        // "Null constraint violation on the {constraint}"
        case "P2011": return res.status(400).send({ error: true, message: `${err.constraint} diperlukan` });
        // "Missing a required value at {path}"
        case "P2012": return res.status(400).send({ error: true, message: `${err.path} diperlukan` });
        // "Missing the required argument {argument_name} for field {field_name} on {object_name}."
        case "P2013": return res.status(400).send({ error: true, message: `${err.field_name} diperlukan` });
        // "The change you are trying to make would violate the required relation '{relation_name}' between the {model_a_name} and {model_b_name} models."
        case "P2014": return res.status(422).send({ error: true, message: `${err.field_name} diperlukan` });
        // "A related record could not be found. {details}"
        case "P2015": return res.status(404).send({ error: true, message: `Tidak ditemukan` });
        default: {
            console.error(err)
            return res.status(500).send(internalErrorResponse);
        }
    }
}

