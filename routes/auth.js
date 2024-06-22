import { Router } from "express"
import { getSkater, createSkater } from "../models/skaters.js"
import jwt from "jsonwebtoken"
import path from "node:path"

const router = Router()

router.post("/login", async (req, res) => {
    try {
        const data = req.body
        const skater = await getSkater(data)

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

        const isSkater = await getSkater({ email })

        if (isSkater.rowCount > 0) {
            res.status(401).json({
                message: "Usuario existe"
            })
        } else {
            const file = req.files.foto

            const photoUrl = path.join(import.meta.dirname, "../static/photos", file.name)
            const dbUrl = path.join("photos", file.name)

            file.mv(photoUrl)

            data.foto = dbUrl
            
            const result = await createSkater(data)

            const secret = process.env.JWT_SECRET
            const payload = {
                email: email,
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