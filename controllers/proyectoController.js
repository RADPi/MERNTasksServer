import Proyecto from '../models/Proyecto'

export async function crearProyecto (req, res) {
	try {
		// Crear nuevo pryecto
		const proyecto = new Proyecto(req.body)

		// Guardar el creado via JWT
		proyecto.creador = req.usuario.id

		// Guardamos el proyecto
		await proyecto.save()
		res.json(proyecto)
	} catch (error) {
		console.error(error)
		res.status(500).send('Hubo un error')
	}
}

export async function obtenerProyectos (req, res) {
	try {
		const proyectos = await Proyecto.find({ creador: req.usuario.id }).sort({ createdAt: -1 })
		res.json({ proyectos })
	} catch (error) {
		console.error(error)
		res.status(500).send('Hubo un error')
	}
}

export async function actualizarProyecto (req, res) {
	// Extraer informacion del proyecto
	const { nombre } = req.body
	const nuevoProyecto = {}

	if (nombre) {
		nuevoProyecto.nombre = nombre
	}

	try {
		// Revisar el ID
		let proyecto = await Proyecto.findById(req.params.id)

		// Revisar si el proyecto existe
		if (!proyecto) return res.status(404).json({ msg: 'Proyecto no encontrado' })

		// Verificar el creador del proyecto
		if (proyecto.creador.toString() !== req.usuario.id) return res.status(401).json({ msg: 'No autorizado' })

		// Actualizar
		proyecto = await Proyecto.findByIdAndUpdate(req.params.id, { $set: nuevoProyecto }, { new: true })
		res.json({ proyecto })
	} catch (error) {
		console.error(error)
		res.status(500).send('Hubo un error')
	}
}

export async function eliminarProyecto (req, res) {
	try {
		// Revisar el ID
		const proyecto = await Proyecto.findById(req.params.id)

		// Revisar si el proyecto existe
		if (!proyecto) return res.status(404).json({ msg: 'Proyecto no encontrado' })

		// Verificar el creador del proyecto
		if (proyecto.creador.toString() !== req.usuario.id) return res.status(401).json({ msg: 'No autorizado' })

		// Eliminar
		await Proyecto.findOneAndRemove({ _id: req.params.id })
		res.json({ msg: 'Proyecto eliminado' })
	} catch (error) {
		console.error(error)
		res.status(500).send('Hubo un error')
	}
}
