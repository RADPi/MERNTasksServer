import mongoose from 'mongoose'

const ProyectoSchema = mongoose.Schema(
	{
		nombre: {
			type: String,
			required: true,
			trim: true,
		},
		creador: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Usuario',
		},
	},
	{
		timestamps: true,
		versionKey: false,
	},
)

export default mongoose.model('Proyecto', ProyectoSchema)
