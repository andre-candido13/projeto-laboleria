import { db } from "../database/database.js"


export async function postOrder (req, res) {
   
    const { clientId, cakeId, quantity, totalPrice} = req.body

    const clientIdExist = await db.query(` SELECT * FROM clients WHERE id = $1`, ([clientId]))

    if (!clientIdExist.rows.length) {
        return res.sendStatus(404)
    }

    const cakeExist = await db.query(`SELECT * FROM cakes WHERE id = $1`, ([cakeId]))

    if (!cakeExist.rows.length) {
        return res.sendStatus(404)
    }


    try {

        await db.query(`INSERT INTO "orders" ("clientId", "cakeId", "quantity", "totalPrice", "createdAt") VALUES ($1,
            $2, $3, $4, now())`, ([clientId, cakeId, quantity, totalPrice]))
            return res.sendStatus(201)


    } catch (err) {
        res.status(500).send(err.message)
    }

}

export async function getOrders (req, res) {

const { date } = req.query

try {

let allOrders = ` SELECT 
json_build_object('id', clients.id, 'name', clients.name, 'address', clients.address, 'phone', clients.phone) AS client,
json_build_object('id', cakes.id, 'name', cakes.name, 'price', cakes.price, 'description', cakes.description, 'image', cakes.image)
AS cake, orders.id AS ordersId,
TO_CHAR(orders."createdAt", 'YYYY-MM-DD HH24:MI') AS "createdAt",
orders.quantity, 
orders."totalPrice" FROM orders JOIN cakes 
ON 
orders."cakeId" = cakes.id JOIN clients
ON
orders."clientId" = clients.id`

let orders;

if (date) {
    allOrders = allOrders + `WHERE "createdAt"::date = $1`
    orders = await db.query(allOrders, [date])
} else {
    orders = await db.query(allOrders)
}

if(orders.rows.length < 1){
     return res.status(404).send(orders.rows)
    
}

return res.status(200).send(orders.rows)


} catch (err) {
    res.status(500).send(err.message)
}
}



