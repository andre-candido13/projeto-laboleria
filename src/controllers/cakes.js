import { db } from "../database/database.js"



export async function createCakes (req, res) {

    const { name, price, image, description } = req.body

    try {

        const cakeRepetido = await db.query(`SELECT "name" FROM cakes WHERE "name" = $1`, ([name]))

        if (cakeRepetido.rowCount ==! 0) {
            return res.status(409).send("bolo já existente")
        }

        const cakes = await db.query(`INSERT INTO cakes ("name", "price", "image", "description") VALUES($1, $2, $3, $4);`
        ,([name, price, image, description]))
    
        return res.sendStatus(201)
    
 
    } catch (err) {
        res.status(500).send(err.message)
    }





}