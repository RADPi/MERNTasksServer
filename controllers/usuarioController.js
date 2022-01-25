import bcryptjs from 'bcryptjs'
import Usuario from '../models/Usuario'
import jwt from 'jsonwebtoken'

export async function crearUsuario (req, res) {
	const { email, password } = req.body

	try {
		let usuario = await Usuario.findOne({ email })
		if (usuario) {
			return res.status(400).json({
				msg: 'El usuario ya existe',
			})
		}

		usuario = new Usuario(req.body)
		// Hashear el password
		const salt = await bcryptjs.genSalt(10)
		usuario.password = await bcryptjs.hash(password, salt)
		await usuario.save()

		// Crear y firmar el JWT
		const payload = {
			usuario: {
				id: usuario.id,
			},
		}

		// Firmar el JWT
		jwt.sign(payload,
			process.env.SECRET,
			{ expiresIn: 3600 },
			(error, token) => {
				if (error) throw error
				res.json({ token })
			},
		)
	} catch (error) {
		console.log(error)
		res.status(400).send('Hubo un error')
	}
}
