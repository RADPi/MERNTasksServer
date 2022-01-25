import Proyecto from '../models/Proyecto'
import Tarea from '../models/Tarea'

export async function crearTarea (req, res) {
	try {
		// Extraer el proyecto y comprobar si existe
		const { proyecto } = req.body

		// Buscar si existe el proyecto
		const existeProyecto = await Proyecto.findById(proyecto)
		if (!existeProyecto) {
			return res.status(404).json({ msg: 'Proyecto no encontrado' })
		}
		// Revisar si el proyecto pertenece al usuario autenticado
		if (existeProyecto.creador.toString() !== req.usuario.id) {
			return res.status(401).json({ msg: 'No autorizado' })
		}
		// Creamos la tarea
		const tarea = new Tarea(req.body)
		await tarea.save()
		res.json({ tarea })
	} catch (error) {
		console.error(error)
		res.status(500).send('Hubo un error')
	}
}

export async function obtenerTareas (req, res) {
	try {
		// Extraer el proyecto y comprobar si existe
		const { proyecto } = req.query

		// Buscar si existe el proyecto
		const existeProyecto = await Proyecto.findById(proyecto)
		if (!existeProyecto) {
			return res.status(404).json({ msg: 'Proyecto no encontrado' })
		}

		// Revisar si el proyecto pertenece al usuario autenticado
		if (existeProyecto.creador.toString() !== req.usuario.id) {
			return res.status(401).json({ msg: 'No autorizado' })
		}

		const tareas = await Tarea.find({ proyecto }).sort({ createdAt: -1 })
		res.json({ tareas })
	} catch (error) {
		console.error(error)
		res.status(500).send('Hubo un error')
	}
}

export async function actualizarTarea (req, res) {
	// Extraer informacion del proyecto
	const { nombre } = req.body
	const nuevoProyecto = {}

	if (nombre) {
		nuevoProyecto.nombre = nombre
	}

	try {
		// Extraer datos
		const { proyecto, nombre, estado } = req.body

		// Buscar si existe el tarea
		let tarea = await Tarea.findById(req.params.id)
		if (!tarea) return res.status(404).json({ msg: 'Tarea no encontrado' })

		// Extraer proyecto
		const existeProyecto = await Proyecto.findById(proyecto)

		// Revisar si el proyecto pertenece al usuario autenticado
		if (existeProyecto.creador.toString() !== req.usuario.id) { return res.status(401).json({ msg: 'No autorizado' }) }

		// Crea un objeto con la nueva informacion
		const nuevaTarea = {}

		nuevaTarea.nombre = nombre
		nuevaTarea.estado = estado

		// Guardar la tarea
		tarea = await Tarea.findOneAndUpdate({ _id: req.params.id }, nuevaTarea, {
			new: true,
		})
		res.json({ tarea })
	} catch (error) {
		console.error(error)
		res.status(500).send('Hubo un error')
	}
}

export async function eliminarTarea (req, res) {
	try {
		// Extraer el proyecto
		const { proyecto } = req.query

		// Revisar el ID
		const tarea = await Tarea.findById(req.params.id)

		// Revisar si el proyecto existe
		if (!tarea) return res.status(404).json({ msg: 'Tarea no encontrado' })

		// Extraer proyecto
		const existeProyecto = await Proyecto.findById(proyecto)

		// Revisar si el proyecto pertenece al usuario autenticado
		if (existeProyecto.creador.toString() !== req.usuario.id) { return res.status(401).json({ msg: 'No autorizado' }) }

		// Eliminar
		await Tarea.findOneAndRemove({ _id: req.params.id })
		res.json({ msg: 'Tarea eliminada' })
	} catch (error) {
		console.error(error)
		res.status(500).send('Hubo un error')
	}
}
