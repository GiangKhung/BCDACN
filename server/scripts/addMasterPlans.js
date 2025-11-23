import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Project from '../models/Project.js'

dotenv.config()

const masterPlans = {
    'masteri-thao-dien': {
        image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=1200',
        description: 'Mặt bằng tổng thể Masteri Thảo Điền với 2000 căn hộ cao cấp, bao gồm các tòa tháp, công viên Nhật Bản và trung tâm thương mại'
    },
    'sunshine-city-saigon': {
        image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200',
        description: 'Mặt bằng tổng thể Sunshine City Sài Gòn với 3500 căn hộ, shophouse và các tiện ích hiện đại'
    },
    'ecopark-grand-the-island': {
        image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=1200',
        description: 'Mặt bằng tổng thể Ecopark Grand The Island với 500 biệt thự đảo cao cấp, sân golf 36 lỗ và bãi biển nhân tạo'
    },
    'the-diamond-residence': {
        image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=1200',
        description: 'Mặt bằng tổng thể The Diamond Residence với 800 căn hộ cao cấp, sky lounge và các tiện ích đẳng cấp'
    },
    'starlake-urban-city': {
        image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200',
        description: 'Mặt bằng tổng thể Starlake Urban City với hồ điều hòa 34ha, 5000 căn hộ, biệt thự và shophouse'
    },
    'imperia-sky-garden': {
        image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200',
        description: 'Mặt bằng tổng thể Imperia Sky Garden với 600 căn hộ, vườn treo Sky Garden độc đáo trên các tầng cao'
    },
    'saigon-south-residences': {
        image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200',
        description: 'Mặt bằng tổng thể Saigon South Residences với 1800 căn hộ ven sông, công viên xanh và các tiện ích đầy đủ'
    }
}

async function addMasterPlans() {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('✅ MongoDB đã kết nối')

        for (const [slug, masterPlan] of Object.entries(masterPlans)) {
            const project = await Project.findOne({ slug })

            if (project) {
                project.masterPlan = masterPlan
                await project.save()
                console.log(`✅ Đã thêm mặt bằng cho: ${project.name}`)
            } else {
                console.log(`⚠️  Không tìm thấy dự án: ${slug}`)
            }
        }

        console.log('\n🎉 Hoàn thành thêm mặt bằng cho tất cả dự án!')
        process.exit(0)
    } catch (error) {
        console.error('❌ Lỗi:', error)
        process.exit(1)
    }
}

addMasterPlans()
