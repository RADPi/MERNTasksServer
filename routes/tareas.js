import { Router } from 'express'
import { check } from 'express-validator'
import {
	actualizarTarea,
	crearTarea,
	eliminarTarea,
	obtenerTareas,
} from '../controllers/TareaController'
import auth from '../middlewares/auth'
import checkValidationResult from '../middlewares/checkValidationResult'

const router = Router()
// api/tareas

// Crea Tareas
router.post(
	'/',
	auth,
	check('nombre', 'El nombre del tarea es obligatorio').notEmpty(),
	check('proyecto', 'El nombre del proyecto es obligatorio').notEmpty(),
	checkValidationResult,
	crearTarea,
)

// Obtener Tareas
router.get('/', auth, obtenerTareas)

// Actualiza Tarea por ID
router.put(
	'/:id',
	auth,
	[check('nombre', 'El nombre del tarea es obligatorio').notEmpty()],
	actualizarTarea,
)

// Eliminar Tarea por ID
router.delete('/:id', auth, eliminarTarea)

export default router
