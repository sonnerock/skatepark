import { Router } from "express"
import * as db from "../bd/db.js"
import { createSkaters, deleteSkaters, getSkaters, updateSkaters } from "../models/skaters.js"

const router = Router()

router.get("/", async (req, res) => {
    try {
        const result = await getSkaters

        res.json({
            skaters: result.rows
        })
    } catch (error) {
        res.status(500).json({
            message: "Interal Server Error"
        })
    }
})

router.post("/", async (req, res) => {

    try {
        const data = req.body

        const result = await createSkaters(data)
        res.json({
            message: "Exito",
            skater: result.rows[0]
        })
    } catch (error) {
        res.status(500).json({
            mssage: "Internal Server Error"
        })

    }
})

router.put("/", async (req, res) => {
    try {

        const result = await updateSkaters(data)

        res.json({
            message: "Actualizado",
            skater: result.rows[0]
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
})

router.delete("/", async (req, res) => {

    try {
        const data = req.query
        const result = await deleteSkaters(data)

        res.json({
            message: `Usuario ${email} eliminado`
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
})

export { router }