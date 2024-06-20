import { Router } from "express"
import jwt from "jsonwebtoken"
import { createSkaters, getSkaters, updateSkaters, deleteSkaters, getEmailSkaters, updateSkaterStatus } from "../models/skaters.js"
import path from "node:path"

const router = Router()

router.post("/login", async (req, res) => {
    try {
        const data = req.body
        const skater = await getEmailSkaters(data)

        if (skater.rowCount == 0) {
            res.status(404).json({
                message: "Usuario no existe"
            })
        } else {
            if (req.body.password != skater.rows[0].password) {
                res.status(400).json({
                    message: "Usuario no existe"
                })
            } else {
                const payload = {
                    email: skater.rows[0].email,
                    nombre: skater.rows[0].nombre,
                    anos_experiencia: skater.rows[0].anos_experiencia,
                    especialidad: skater.rows[0].especialidad,
                    estado: skater.rows[0].estado
                }
                const secret = process.env.JWT_SECRET
                const token = jwt.sign(payload, secret, { expiresIn: "1d" })

                res.json({
                    token: token
                })
            }
        }
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
})

router.post("/registro", async (req, res) => {
    try {
        const { email } = req.body
        const data = req.body

        const skater = await getSkaters({ email })

        if (skater.rowCount > 0) {
            res.status(401).json({
                message: "Usuario existe"
            })
        } else {
            const foto = req.files.foto
            const fotoUrl = path.join(import.meta.dirname, "../public/fotos", file.name)
            const dbUrl = path.join("fotos", file.name)

            data.foto = dbUrl
            const result = await createSkaters(data)

            const secret = process.env.JWT_SECRET
            const payload = {
                email: data.email,
                nombre: data.nombre,
                anos_experiencia: data.anos_experiencia,
                especialidad: data.especialidad
            }

            const token = jwt.sign(payload, secret, {expiresIn: "1d"})

            res.json({
                token: token,
                message: "Usuario creado"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Error interno de servidor"
        })
    }
})

export { router }