import pg from 'pg'
const { Pool } = pg
 
const pool = new Pool({
    host: process.env.HOST,
    database: process.env.DATABASE,
    port: process.env.PORT,
    user: process.env.USER,
    password: process.env.PASS
})


export const query = async (text, params) => {
    const start = Date.now()
    const res = await pool.query(text, params)
    const duration = Date.now() - start
    console.log('executed query', { text, duration, rows: res.rowCount })
    return res
  }

  export const getClient = async () => {
    const client = await pool.connect()
    const query = client.query
    const release = client.release
    const timeout = setTimeout(() => {
      console.error('A client has been checked out for more than 5 seconds!')
      console.error(`The last executed query on this client was: ${client.lastQuery}`)
    }, 5000)
    client.query = (...args) => {
      client.lastQuery = args
      return query.apply(client, args)
    }
    client.release = () => {
      clearTimeout(timeout)
      client.query = query
      client.release = release
      return release.apply(client)
    }
    return client
  }