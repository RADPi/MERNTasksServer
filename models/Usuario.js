import mongoose from 'mongoose'

const UsuariosSchema = mongoose.Schema(
	{
		nombre: {
			type: String,
			required: true,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			trim: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
		versionKey: false,
	},
)

export default mongoose.model('Usuario', UsuariosSchema)
