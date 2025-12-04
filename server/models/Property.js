import mongoose from 'mongoose'

const propertySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        type: String,
        required: true
    },
    // Địa chỉ chi tiết
    address: {
        street: String,
        ward: String,
        district: String,
        city: String,
        fullAddress: String
    },
    // Tọa độ bản đồ
    coordinates: {
        lat: Number,
        lng: Number
    },
    // Giá cả
    price: {
        type: Number,
        default: 0
    },
    priceText: {
        type: String
    },
    pricePerMonth: {
        type: Boolean,
        default: false
    },
    pricePerSqm: {
        type: Number
    },
    // Thông tin cơ bản
    propertyType: {
        type: String,
        enum: ['apartment', 'house', 'villa', 'land', 'townhouse', 'office', 'shophouse', 'other'],
        default: 'apartment'
    },
    bedrooms: {
        type: Number,
        default: 0
    },
    bathrooms: {
        type: Number,
        default: 0
    },
    floors: {
        type: Number,
        default: 0
    },
    area: {
        type: Number,
        required: true
    },
    width: {
        type: Number // Chiều ngang (m)
    },
    length: {
        type: Number // Chiều dài (m)
    },
    // Hướng nhà
    direction: {
        type: String,
        enum: ['east', 'west', 'south', 'north', 'northeast', 'northwest', 'southeast', 'southwest']
    },
    // Hướng ban công
    balconyDirection: {
        type: String,
        enum: ['east', 'west', 'south', 'north', 'northeast', 'northwest', 'southeast', 'southwest']
    },
    // Pháp lý
    legalDocument: {
        type: String,
        enum: ['red-book', 'pink-book', 'sale-contract', 'waiting', 'other']
    },
    // Nội thất
    furniture: {
        type: String,
        enum: ['full', 'basic', 'empty'],
        default: 'empty'
    },
    // Đặc điểm
    features: [{
        type: String
    }],
    // Tiện ích
    amenities: [{
        type: String
    }],
    // Hình ảnh
    images: {
        type: Number,
        default: 1
    },
    image: {
        type: String,
        required: true
    },
    imageList: [{
        type: String
    }],
    // Mô tả
    description: {
        type: String
    },
    // Thông tin dự án (nếu có)
    project: {
        name: String,
        developer: String,
        handoverYear: Number
    },
    // Trạng thái
    vip: {
        type: String
    },
    verified: {
        type: Boolean,
        default: false
    },
    hasVideo: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        enum: ['available', 'pending', 'sold', 'rented'],
        default: 'available'
    },
    // Thông tin người đăng
    agent: {
        name: String,
        phone: String,
        email: String,
        status: String,
        avatar: String
    },
    // Thông tin bổ sung
    yearBuilt: Number,
    roadWidth: Number, // Chiều rộng đường (m)
    distanceToRoad: Number, // Cách mặt đường (m)
    // Thống kê
    views: {
        type: Number,
        default: 0
    },
    favorites: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
})

const Property = mongoose.model('Property', propertySchema)

export default Property
