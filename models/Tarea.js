import mongoose from 'mongoose'

const TareaSchema = mongoose.Schema({
	nombre: {
		type: String,
		required: true,
		trim: true,
	},
	estado: {
		type: Boolean,
		default: false,
	},
	proyecto: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Proyecto',
	},
},
{
	timestamps: true,
	versionKey: false,
})

export default mongoose.model('Tarea', TareaSchema)
