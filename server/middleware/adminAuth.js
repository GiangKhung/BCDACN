// Middleware kiểm tra quyền Admin
const adminAuth = (req, res, next) => {
    try {
        // Kiểm tra user đã đăng nhập chưa
        if (!req.user) {
            return res.status(401).json({
                message: 'Vui lòng đăng nhập'
            })
        }

        // Kiểm tra có phải admin không
        if (req.user.role !== 'admin') {
            return res.status(403).json({
                message: 'Bạn không có quyền truy cập. Chỉ Admin mới có quyền này.'
            })
        }

        next()
    } catch (error) {
        console.error('Admin auth error:', error)
        res.status(500).json({
            message: 'Lỗi xác thực quyền admin'
        })
    }
}

export default adminAuth
