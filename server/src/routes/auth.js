import { Router } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const router = Router()

const JWT_SECRET = process.env.JWT_SECRET || 'devsecret'
const JWT_EXP = '7d'

router.post('/register', async (req, res, next) => {
  try {
    const { email, password, role } = req.body
    const exist = await User.findOne({ email })
    if (exist) return res.status(400).json({ message: 'Email đã tồn tại' })
    const passwordHash = await bcrypt.hash(password, 10)
    const user = await User.create({ email, passwordHash, role: role === 'admin' ? 'admin' : 'user' })
    res.status(201).json({ id: user._id, email: user.email, role: user.role })
  } catch (e) { next(e) }
})

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) return res.status(401).json({ message: 'Sai thông tin đăng nhập' })
    const ok = await bcrypt.compare(password, user.passwordHash)
    if (!ok) return res.status(401).json({ message: 'Sai thông tin đăng nhập' })
    const token = jwt.sign({ uid: user._id, role: user.role }, JWT_SECRET, { expiresIn: JWT_EXP })
    res.json({ token, user: { id: user._id, email: user.email, role: user.role } })
  } catch (e) { next(e) }
})

export function requireAuth(roles = []) {
  return (req, res, next) => {
    try {
      const auth = req.headers.authorization || ''
      const token = auth.startsWith('Bearer ') ? auth.slice(7) : null
      if (!token) return res.status(401).json({ message: 'Unauthorized' })
      const decoded = jwt.verify(token, JWT_SECRET)
      req.user = decoded
      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ message: 'Forbidden' })
      }
      next()
    } catch (e) {
      return res.status(401).json({ message: 'Unauthorized' })
    }
  }
}

export default router


