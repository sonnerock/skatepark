import * as db from "../bd/db.js"

export const getSkaters = async () => {
    const text = "SELECT * FROM skaters"
    const result = await db.query(text)

    return result.rows
}

export const createSkaters = async (data) => {
    const { email, nombre, password, anos_experiencia, especialidad, foto } = data

    const text = "INSERT INTO skaters (email, nombre, password, anos_experiencia, especialidad, foto, estado) VALUES ($1, $2, $3, $4, $5, $6, $7)"

    const values = [
        email,
        nombre,
        password,
        anos_experiencia,
        especialidad,
        foto,
        false
    ]

    const result = await db.query(text, values)

    return result
}

export const updateSkaters = async (data) => {
    const { email, nombre, password, anos_experiencia, especialidad, estado } = data


    const text = "UPDATE skaters SET nombre = $1, password = $2, anos_experiencia = $3, estado = $4 WHERE email = $5 RETUNRING *"
    const values = [
        email,
        nombre,
        password,
        anos_experiencia,
        especialidad,
        estado
    ]

    const result = await db.query(text, values)

    return result

}

export const deleteSkaters = async (data) => {
    const { email } = data

    const text = "DELETE FROM skaters WHERE email = $1"
    const values = [email]

    const result = await db.query(text, values)

    return result
}

export const getEmailSkaters = async (data) => {
    const { email } = data
    const text = "SELECT * FROM skaters WHERE email = $1"
    const values = [email]

    const result = await db.query(text, values)
    return result
}

export const updateSkaterStatus = async (data) => {
    const { estado, id } = data
    const text = "UPDATE skaters SET estado = $1 WHERE id = $2"
    const values = [estado, id]

    const result = await db.query(text, values)
    return result
}