import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config({ path: 'variables.env' })

const conectarDB = async () => {
	try {
		await mongoose.connect(process.env.MONGO_DB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		console.log('DB conectada')
	} catch (error) {
		console.log(error)
		process.exit(1)
	}
}

export default conectarDB
