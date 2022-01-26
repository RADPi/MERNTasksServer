import mongoose from 'mongoose'

const ProductoSchema = mongoose.Schema({
	nombre: {
		type: String,
		required: true,
		trim: true,
	},
	precio: {
		type: Number,
		required: true,
		default: 0,
	},
},
{
	timestamps: true,
	versionKey: false,
})

// Duplicate the ID field.
ProductoSchema.virtual('id').get(function () {
	return this._id.toHexString()
})

// Ensure virtual fields are serialised.
ProductoSchema.set('toJSON', {
	virtuals: true,
})

export default mongoose.model('Producto', ProductoSchema)
