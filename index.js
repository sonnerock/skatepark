import express from "express"
import fileUpload from "express-fileupload"
import { engine } from "express-handlebars"

import { router as skaters } from "./routes/skaters.js"
import { router as views } from "./routes/views.js"
import { router as auth } from "./routes/auth.js"

const app = express()

app.listen(3000, () => (console.log("escuchando puerto 3000")))

app.engine("handlebars", engine())
app.set("view engine", "handlebars")

app.use(fileUpload())
app.use(express.json())

app.use(express.static("static"))

app.use("/", views)
app.use("/skaters", skaters)
app.use("/auth", auth)