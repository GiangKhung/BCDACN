import express from 'express'
import jwt from 'jsonwebtoken'
import Property from '../models/Property.js'

const router = express.Router()

// Tìm kiếm và lọc properties
router.get('/', async (req, res) => {
    try {
        const {
            search,
            location,
            minPrice,
            maxPrice,
            minArea,
            maxArea,
            bedrooms,
            bathrooms,
            verified,
            sortBy
        } = req.query

        // Xây dựng query
        let query = {
            approvalStatus: 'approved' // Chỉ hiển thị tin đã duyệt
        }

        // Tìm kiếm theo từ khóa
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { location: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ]
        }

        // Lọc theo địa điểm
        if (location) {
            query.location = { $regex: location, $options: 'i' }
        }

        // Lọc theo giá
        if (minPrice || maxPrice) {
            query.price = {}
            if (minPrice) query.price.$gte = Number(minPrice)
            if (maxPrice) query.price.$lte = Number(maxPrice)
        }

        // Lọc theo diện tích
        if (minArea || maxArea) {
            query.area = {}
            if (minArea) query.area.$gte = Number(minArea)
            if (maxArea) query.area.$lte = Number(maxArea)
        }

        // Lọc theo số phòng ngủ
        if (bedrooms) {
            query.bedrooms = { $gte: Number(bedrooms) }
        }

        // Lọc theo số phòng tắm
        if (bathrooms) {
            query.bathrooms = { $gte: Number(bathrooms) }
        }

        // Lọc tin xác thực
        if (verified === 'true') {
            query.verified = true
        }

        // Xác định sắp xếp
        let sort = { createdAt: -1 } // Mặc định: mới nhất
        if (sortBy === 'price-asc') sort = { price: 1 }
        else if (sortBy === 'price-desc') sort = { price: -1 }
        else if (sortBy === 'area-asc') sort = { area: 1 }
        else if (sortBy === 'area-desc') sort = { area: -1 }
        else if (sortBy === 'newest') sort = { createdAt: -1 }
        else if (sortBy === 'oldest') sort = { createdAt: 1 }

        const properties = await Property.find(query).sort(sort)
        res.json(properties)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Middleware xác thực
const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.replace('Bearer ', '')
        if (!token) {
            return res.status(401).json({ success: false, message: 'Không tìm thấy token' })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key')
        const User = (await import('../models/User.js')).default
        const user = await User.findById(decoded.userId || decoded.id).select('-password')

        if (!user) {
            return res.status(404).json({ success: false, message: 'Không tìm thấy người dùng' })
        }

        req.userId = decoded.userId || decoded.id
        req.user = user
        next()
    } catch (error) {
        console.error('Auth error:', error)
        res.status(401).json({ success: false, message: 'Token không hợp lệ' })
    }
}

// Tạo property mới
router.post('/', auth, async (req, res) => {
    try {
        const propertyData = {
            ...req.body,
            userId: req.userId
        }
        const property = new Property(propertyData)
        const newProperty = await property.save()
        res.status(201).json(newProperty)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// Lấy properties của user hiện tại
router.get('/my-properties', auth, async (req, res) => {
    try {
        const properties = await Property.find({ userId: req.userId }).sort({ createdAt: -1 })
        res.json(properties)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Lấy property theo ID
router.get('/:id', async (req, res) => {
    try {
        const property = await Property.findById(req.params.id)
        if (!property) {
            return res.status(404).json({ message: 'Không tìm thấy bất động sản' })
        }
        res.json(property)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Cập nhật property
router.put('/:id', async (req, res) => {
    try {
        const property = await Property.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        )
        if (!property) {
            return res.status(404).json({ message: 'Không tìm thấy bất động sản' })
        }
        res.json(property)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// Xóa property
router.delete('/:id', async (req, res) => {
    try {
        const property = await Property.findByIdAndDelete(req.params.id)
        if (!property) {
            return res.status(404).json({ message: 'Không tìm thấy bất động sản' })
        }
        res.json({ message: 'Đã xóa bất động sản thành công' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Lưu/Bỏ lưu tin đăng
router.post('/:id/save', auth, async (req, res) => {
    try {
        const propertyId = req.params.id
        const User = (await import('../models/User.js')).default
        const user = await User.findById(req.user._id)

        if (!user) {
            return res.status(404).json({ success: false, message: 'Không tìm thấy người dùng' })
        }

        // Kiểm tra property có tồn tại không
        const property = await Property.findById(propertyId)
        if (!property) {
            return res.status(404).json({ success: false, message: 'Không tìm thấy tin đăng' })
        }

        // Kiểm tra đã lưu chưa
        const savedIndex = user.savedProperties.findIndex(
            p => p.toString() === propertyId
        )

        if (savedIndex > -1) {
            // Đã lưu -> Bỏ lưu
            user.savedProperties.splice(savedIndex, 1)
            await user.save()
            return res.json({
                success: true,
                message: 'Đã bỏ lưu tin',
                isSaved: false
            })
        } else {
            // Chưa lưu -> Lưu
            user.savedProperties.push(propertyId)
            await user.save()
            return res.json({
                success: true,
                message: 'Đã lưu tin thành công',
                isSaved: true
            })
        }
    } catch (error) {
        console.error('Save property error:', error)
        res.status(500).json({
            success: false,
            message: 'Lỗi khi lưu tin'
        })
    }
})

export default router
