// Rutas para autenticar usuarios
import { Router } from 'express'
import { check } from 'express-validator'
import {
	autenticarUsuario,
	usuarioAutenticado,
} from '../controllers/authController'
import checkValidationResult from '../middlewares/checkValidationResult'
import auth from '../middlewares/auth'

const router = Router()

// api/auth
router.post(
	'/', // Iniciar sesion
	check('email', 'Agrega un email válido').isEmail(),
	check('password', 'El password debe tener mínimo 6 caracteres.').isLength({
		min: 6,
	}),
	checkValidationResult,
	autenticarUsuario,
)

router.get('/', auth, usuarioAutenticado)

export default router
