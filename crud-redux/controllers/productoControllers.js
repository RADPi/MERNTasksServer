import Producto from '../models/producto'

export async function obtenerProductos (req, res) {
	try {
		const productos = await Producto.find()
		res.json({ productos })
	} catch (error) {
		console.error(error)
		res.status(500).send('Hubo un error')
	}
}

export async function agregarProducto (req, res) {
	try {
		const producto = new Producto(req.body)
		await producto.save()
		res.json({ producto })
	} catch (error) {
		console.error(error)
		res.status(500).send('Hubo un error')
	}
}

export async function editarProducto (req, res) {
	try {
		// Revisar el ID
		let producto = await Producto.findById(req.params.id)

		// Revisar si el proyecto existe
		if (!producto) return res.status(404).json({ msg: 'Producto no encontrado' })

		// Actualizar
		producto = await Producto.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
		res.json({ producto })
	} catch (error) {
		console.error(error)
		res.status(500).send('Hubo un error')
	}
}

export async function eliminarProducto (req, res) {
	try {
		// Revisar el ID
		const proyecto = await Producto.findById(req.params.id)

		// Revisar si el proyecto existe
		if (!proyecto) return res.status(404).json({ msg: 'Producto no encontrado' })

		// Eliminar
		await Producto.findOneAndRemove({ _id: req.params.id })
		res.json({ msg: 'Producto eliminado' })
	} catch (error) {
		console.error(error)
		res.status(500).send('Hubo un error')
	}
}
