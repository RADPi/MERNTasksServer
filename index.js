import express from 'express'
import conectarDB from './config/db'
import userRoutes from './routes/usuarios'
import authRoutes from './routes/auth'
import proyectosRoutes from './routes/proyectos'
import tareasRoutes from './routes/tareas'
import cors from 'cors'
import morgan from 'morgan'

// Crear Servidor
const app = express()

// Conectar DB
conectarDB()

app.use(morgan('dev'))

// Habilitar CORS
app.use(cors())

// Habilitar express.json
app.use(express.json({ extended: true }))

// Puerto de la APP
const port = process.env.PORT || 2999

// Importar rutas
app.use('/api/usuarios', userRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/proyectos', proyectosRoutes)
app.use('/api/tareas', tareasRoutes)

// Arrancar el servidor
app.listen(port, () => {
	console.log(`El servidor esta funcionando en el puerto: ${port}`)
})
