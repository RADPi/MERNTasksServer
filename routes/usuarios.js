// Rutas para crear ususarios
import { Router } from 'express'
import { crearUsuario } from '../controllers/usuarioController'
import { check } from 'express-validator'

const router = Router()

// Crear un usuario
// api/usuarios
router.post(
	'/',
	[
		check('nombre', 'El nombre es obligatorio').not().isEmpty(),
		check('email', 'Agrega un email válido').isEmail(),
		check('password', 'El password debe tener mínimo 6 caracteres.').isLength({
			min: 6,
		}),
	],
	crearUsuario,
)

export default router
