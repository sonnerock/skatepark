import { Router } from "express"
import { getSkaters, createSkater, updateSkater, updateSkaterStatus, deleteSkater } from "../models/skaters.js"
import * as db from "../db/db.js"

const router = Router()

router.get("/", async (req, res) => {
    try {
        const result = await getSkaters()

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

        const result = await createSkater(data)
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

        const data = req.body

        if (!data.estado){
            data.estado = false
        }

        const result = await updateSkater(data)

        res.json({
            message: "Update skater",
            skater: result.rows
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
})

router.put("/status", async (req, res) => {
    try {
        const data = req.body
        const result = await updateSkaterStatus(data)

        res.json({
            message: "Updater user status"
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
        const result = await deleteSkater(data)

        res.json({
            message: `Usuario ${data.email} eliminado`
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
})

export { router }