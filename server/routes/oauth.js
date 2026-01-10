import express from 'express'

const router = express.Router()

/**
 * OAuth 2.0 Token Endpoint
 * Endpoint này để SePay lấy access token
 */
router.post('/token', (req, res) => {
    // Trả về fake token cho SePay
    res.json({
        access_token: 'batdongsan_access_token_' + Date.now(),
        token_type: 'Bearer',
        expires_in: 3600
    })
})

export default router
