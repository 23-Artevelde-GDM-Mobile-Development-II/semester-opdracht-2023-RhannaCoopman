require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();
const pool = require(__dirname + "/db");
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/test', async (req, res) => {

    try {
        
        const { rows }  = await pool.query('SELECT * FROM "test"')
        res.json(rows)

    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server error')
    }

})

app.get('/klanten', async (req, res) => {

    try {
        
        const { rows }  = await pool.query('SELECT * FROM klanten')
        res.json(rows)

    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server error')
    }

})

app.get('/klanten/:id', async (req, res) => {

    try {
        
        const{rows} = await pool.query('SELECT * FROM klanten WHERE id = $1',[ req.params.id])
        res.json(rows)

    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server error')
    }

})

app.get('/klanten/:id/:age', async (req, res) => {

    try {
        
      const { rows }  = await pool.query('SELECT * FROM klanten WHERE id = $1 AND leeftijd = $2', [
        req.params.id,
        req.params.age
        ])
      res.json(rows)

    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server error')
    }

})

app.post('/klanten', async (req, res) => {
    try {
        
        const data = req.body

        const { rows } = await pool.query("INSERT INTO klanten (naam, leeftijd, adres) VALUES ($1, $2, $3) RETURNING *",
        [
            data.name,
            data.age,
            data.address
        ])

        res.json(rows)

    } catch(err) {
        console.log(err.message)
        res.status(500).send('Server error')
    }
})

app.put('/klanten/:id', async (req, res) => {

    try {
        
        const data = req.body
        
        const id = req.params.id  
        const { rows }  = await pool.query('UPDATE klanten SET naam = $1 WHERE id = $2 RETURNING *', [
            data.name,
            id
        ])
        res.json(rows)
    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server error')
    }
})

app.delete('/klanten/:id', async (req, res) => {
    try {
        const id = req.params.id
        const { rows }  = await pool.query('DELETE FROM klanten WHERE id = $1 RETURNING *', [id])
        res.json(rows)
    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server error')
    }
})


app.listen(port, () =>{
    console.log(`Running on port ${port}`);
})