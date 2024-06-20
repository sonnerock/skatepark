import { Router } from "express"
import jwt from "jsonwebtoken"
import { createSkaters, getSkaters, updateSkaters, deleteSkaters, getEmailSkaters } from "../models/skaters.js"
import path from "node:path"
import { Authorization } from "../middlewares/Authorization.js"

const router = Router()

router.get("/admin", async (req, res) => {
    const skater = await getSkaters()
    res.render("admin", {
        skaters: skaters.rows
    })
})

router.get("/login", async (req, res) => {
    res.render("login")
})

router.get("/registro", async (req, res) => {
    res.render("registro")
})

router.get("/datos", Authorization, async (req, res) => {
    const decoded = req.decoded
    console.log(decoded)
    res.render("datos", {
        skater: decoded
    })
})

router.get("/", async (req, res) => {
    const skaters = await getSkaters()
    res.render("home", {
        skaters: skaters.rows
    })
})

export { router }