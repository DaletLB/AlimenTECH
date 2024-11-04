
const express = require('express');
const { Pool } = require('pg');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 5000; 

const pool = new Pool({
  user: 'access_team',
  host: 'localhost',
  database: 'desarolloweb',
  password: '7Yz!kV2@Pj9#rWQ',
  port: 5432,
});


app.use(bodyParser.json());


app.use(express.static(path.join(__dirname, 'public')));


app.post('/login', async (req, res) => {
  const { correo, password } = req.body;

  try {
    
    const query = 'SELECT * FROM Registro WHERE correo = $1 AND N_contra = $2';
    const result = await pool.query(query, [correo, password]);

    if (result.rows.length > 0) {
      
      res.json({ success: true });
    } else {
      
      res.json({ success: false });
    }
  } catch (err) {
    console.error('Error en la autenticación', err);
    res.status(500).send('Error en el servidor');
  }
});


app.post('/register', async (req, res) => {
  const { nombre, A_paterno, A_materno, correo, N_contra } = req.body;

  try {
    
    const query = 'INSERT INTO Registro (nombre, A_paterno, A_materno, correo, N_contra) VALUES ($1, $2, $3, $4, $5) RETURNING *';
    const result = await pool.query(query, [nombre, A_paterno, A_materno, correo, N_contra]);

    
    res.json({ success: true });
  } catch (err) {
    console.error('Error al registrar', err);
    
    res.json({ success: false, message: 'Error al registrar: ' + err.message });
  }
});


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'InicioSesion.html'));
});


app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}/InicioSesion.html`);
});
