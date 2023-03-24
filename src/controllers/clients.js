import { db } from "../database/database.js"



export async function postClients (req, res) {

const { name, address, phone } = req.body

try {

await db.query(`INSERT INTO "clients" ("name", "address", "phone") VALUES ($1, $2, $3)`, ([name, address, phone]))
 return res.sendStatus(201)

} catch (err) {
    res.status(500).send(err.message)

}
}

export async function getClientsByIdOrders (req, res) {

    const { id } = req.params


    const result = db.query(` SELECT * FROM orders WHERE id = $1`, ([id]))

    if (!(await result).rowCount) {
        return res.sendStatus(404)
    }

    try{

    const orders = await db.query(` SELECT 
    orders.id AS "orderId",
    orders.quantity,
    TO_CHAR(orders."createdAt", 'YYYY-MM-DD HH24:MI') AS "createdAt",
    orders."totalPrice",
    cakes."name" AS "cakeName"
    FROM
    orders
    JOIN cakes
    ON
    orders."cakeId" = cakes.id
    JOIN clients
    ON
    orders."clientId" = clients.id
    WHERE orders.id = $1`, ([id]))


    return res.status(200).send(orders.rows)


    } catch (err) {
        res.status(500).send(err.message)
    }

}

