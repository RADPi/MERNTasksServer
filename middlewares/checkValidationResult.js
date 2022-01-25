import { validationResult } from 'express-validator'

export default async function (req, res, next) {
  // revisar si hay errores
  const errores = validationResult(req)
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() })
  }
  next()
}
