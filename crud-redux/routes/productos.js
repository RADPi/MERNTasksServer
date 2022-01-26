// Rutas para autenticar usuarios
import { Router } from 'express'
import { agregarProducto, editarProducto, eliminarProducto, obtenerProductos } from '../controllers/productoControllers'
const router = Router()

router.get('/', obtenerProductos)

router.post('/', agregarProducto)

router.put('/:id', editarProducto)

router.delete('/:id', eliminarProducto)

export default router
