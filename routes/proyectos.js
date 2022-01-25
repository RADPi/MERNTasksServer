import { Router } from 'express'
import { check } from 'express-validator'
import {
	actualizarProyecto,
	crearProyecto,
	eliminarProyecto,
	obtenerProyectos,
} from '../controllers/proyectoController'
import auth from '../middlewares/auth'
import checkValidationResult from '../middlewares/checkValidationResult'

const router = Router()
// api/proyectos

// Crea proyectos
router.post(
	'/',
	auth,
	check('nombre', 'El nombre del proyecto es obligatorio').notEmpty(),
	checkValidationResult,
	crearProyecto,
)

// Obtener proyectos
router.get('/', auth, obtenerProyectos)

// Actualiza proyecto por ID
router.put(
	'/:id',
	auth,
	check('nombre', 'El nombre del proyecto es obligatorio').notEmpty(),
	checkValidationResult,
	actualizarProyecto,
)

// Eliminar proyecto por ID
router.delete('/:id', auth, eliminarProyecto)

export default router
