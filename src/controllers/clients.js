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