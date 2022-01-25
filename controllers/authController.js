import bcryptjs from 'bcryptjs'
import Usuario from '../models/Usuario'
import jwt from 'jsonwebtoken'

export async function autenticarUsuario (req, res) {
	const { email, password } = req.body

	try {
		// Revisar que sea un usuario registrado
		const usuario = await Usuario.findOne({ email })
		if (!usuario) {
			return res.status(400).json({ msg: 'El usuario no existe' })
		}

		// Revisar el password
		const passCorrecto = await bcryptjs.compare(password, usuario.password)
		if (!passCorrecto) {
			return res.status(400).json({ msg: 'Password Incorrecto' })
		}

		// Si todo es correcto Crear y firmar el JWT
		const payload = {
			usuario: {
				id: usuario.id,
			},
		}

		// Firmar el JWT
		jwt.sign(payload, process.env.SECRET, {
			expiresIn: 3600,
		}, (error, token) => {
			if (error) throw error
			res.json({ token })
		})
	} catch (error) {
		console.error(error)
	}
}

export async function usuarioAutenticado (req, res) {
	try {
		const usuario = await Usuario.findById(req.usuario.id).select('-password')
		res.json({ usuario })
	} catch (error) {
		console.error(error)
		res.status(500).json({ msg: 'Hubo un error' })
	}
}
