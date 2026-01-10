import axios from 'axios'
import crypto from 'crypto'

class SepayService {
    constructor() {
        this.accessToken = process.env.SEPAY_ACCESS_TOKEN
        this.bankAccountId = process.env.SEPAY_BANK_ACCOUNT_ID
        this.webhookSecret = process.env.SEPAY_WEBHOOK_SECRET
        this.apiUrl = process.env.SEPAY_API_URL || 'https://my.sepay.vn/api/v1'
    }

    /**
     * Tạo nội dung chuyển khoản với mã thanh toán
     */
    generateTransferContent(paymentId) {
        return `THANHTOAN ${paymentId}`
    }

    /**
     * Tạo QR code URL cho thanh toán
     * Sử dụng VietQR API để tạo QR code
     */
    generateQRCode(amount, transferContent, accountNo = '1234567890', bankCode = 'VCB') {
        // VietQR API format
        const qrUrl = `https://img.vietqr.io/image/${bankCode}-${accountNo}-compact2.png?amount=${amount}&addInfo=${encodeURIComponent(transferContent)}&accountName=${encodeURIComponent('CONG TY BAT DONG SAN')}`

        return qrUrl
    }

    /**
     * Tạo webhook để nhận thông báo từ SePay
     */
    async createWebhook(webhookUrl) {
        try {
            const response = await axios.post(
                `${this.apiUrl}/webhooks`,
                {
                    bank_account_id: parseInt(this.bankAccountId),
                    name: 'Real Estate Payment Webhook',
                    event_type: 'In_only', // Chỉ nhận giao dịch tiền vào
                    authen_type: 'Api_Key',
                    webhook_url: webhookUrl,
                    is_verify_payment: 1, // Xác thực thanh toán
                    skip_if_no_code: 1, // Bỏ qua nếu không có mã
                    active: 1,
                    api_key: this.webhookSecret,
                    request_content_type: 'Json'
                },
                {
                    headers: {
                        'Authorization': `Bearer ${this.accessToken}`,
                        'Content-Type': 'application/json'
                    }
                }
            )

            return {
                success: true,
                data: response.data
            }
        } catch (error) {
            console.error('Create webhook error:', error.response?.data || error.message)
            return {
                success: false,
                error: error.response?.data || error.message
            }
        }
    }

    /**
     * Lấy danh sách webhooks
     */
    async getWebhooks() {
        try {
            const response = await axios.get(
                `${this.apiUrl}/webhooks`,
                {
                    headers: {
                        'Authorization': `Bearer ${this.accessToken}`
                    }
                }
            )

            return {
                success: true,
                data: response.data
            }
        } catch (error) {
            console.error('Get webhooks error:', error.response?.data || error.message)
            return {
                success: false,
                error: error.response?.data || error.message
            }
        }
    }

    /**
     * Xác thực webhook từ SePay
     */
    verifyWebhook(payload, signature) {
        // Tạo signature từ payload
        const calculatedSignature = crypto
            .createHmac('sha256', this.webhookSecret)
            .update(JSON.stringify(payload))
            .digest('hex')

        return calculatedSignature === signature
    }

    /**
     * Xử lý webhook data từ SePay
     */
    parseWebhookData(webhookPayload) {
        try {
            // Format của SePay webhook
            const {
                id,
                gateway,
                transaction_date,
                account_number,
                sub_account,
                amount_in,
                amount_out,
                accumulated,
                code,
                transaction_content,
                reference_number,
                body
            } = webhookPayload

            // Trích xuất payment ID từ transaction_content
            // Format: "THANHTOAN 67890abcdef12345"
            const paymentIdMatch = transaction_content?.match(/THANHTOAN\s+([a-zA-Z0-9]+)/)
            const paymentId = paymentIdMatch ? paymentIdMatch[1] : null

            return {
                transactionId: id,
                gateway,
                transactionDate: transaction_date,
                accountNumber: account_number,
                subAccount: sub_account,
                amountIn: amount_in,
                amountOut: amount_out,
                accumulated,
                code,
                content: transaction_content,
                referenceNumber: reference_number,
                body,
                paymentId
            }
        } catch (error) {
            console.error('Parse webhook data error:', error)
            return null
        }
    }

    /**
     * Lấy thông tin giao dịch từ SePay
     */
    async getTransaction(transactionId) {
        try {
            const response = await axios.get(
                `${this.apiUrl}/transactions/${transactionId}`,
                {
                    headers: {
                        'Authorization': `Bearer ${this.accessToken}`
                    }
                }
            )

            return {
                success: true,
                data: response.data
            }
        } catch (error) {
            console.error('Get transaction error:', error.response?.data || error.message)
            return {
                success: false,
                error: error.response?.data || error.message
            }
        }
    }
}

export default new SepayService()
