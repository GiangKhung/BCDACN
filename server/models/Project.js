import mongoose from 'mongoose'

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    location: {
        type: String,
        required: true
    },
    address: {
        street: String,
        ward: String,
        district: String,
        city: String,
        fullAddress: String
    },
    coordinates: {
        lat: Number,
        lng: Number
    },
    developer: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['planning', 'selling', 'building', 'completed', 'handover'],
        default: 'selling'
    },
    scale: {
        totalArea: Number,
        totalUnits: Number,
        density: Number
    },
    productTypes: [{
        type: String,
        enum: ['villa', 'townhouse', 'apartment', 'shophouse', 'land']
    }],
    priceRange: {
        min: Number,
        max: Number,
        unit: {
            type: String,
            enum: ['vnd', 'million', 'billion'],
            default: 'billion'
        }
    },
    priceText: String,
    progress: {
        startDate: Date,
        completionDate: Date,
        handoverDate: Date,
        currentProgress: Number
    },
    images: [{
        url: String,
        caption: String,
        type: {
            type: String,
            enum: ['main', 'gallery', 'masterplan', 'facility', 'location']
        }
    }],
    mainImage: String,
    videos: [{
        url: String,
        title: String,
        thumbnail: String
    }],
    description: String,
    overview: String,
    utilities: [{
        category: String,
        name: String,
        icon: String
    }],
    nearbyPlaces: [{
        name: String,
        distance: String,
        placeType: String
    }],
    masterPlan: {
        image: String,
        description: String
    },
    legal: {
        legalType: String,
        description: String
    },
    salesPolicy: [{
        title: String,
        description: String
    }],
    contact: {
        hotline: String,
        email: String,
        website: String,
        showroom: String
    },
    news: [{
        title: String,
        date: Date,
        content: String,
        image: String
    }],
    seo: {
        title: String,
        description: String,
        keywords: [String]
    },
    views: {
        type: Number,
        default: 0
    },
    favorites: {
        type: Number,
        default: 0
    },
    featured: {
        type: Boolean,
        default: false
    },
    verified: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

const Project = mongoose.model('Project', projectSchema)

export default Project
