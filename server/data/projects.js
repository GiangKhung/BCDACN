export const projects = [
    {
        name: 'The Pearl - Waterpoint',
        slug: 'the-pearl-waterpoint',
        location: 'Bến Lức, Long An',
        address: {
            street: 'Khu đô thị Waterpoint',
            ward: 'Xã Ấn Thạnh',
            district: 'Huyện Bến Lức',
            city: 'Long An',
            fullAddress: 'Xã Ấn Thạnh, Huyện Bến Lức, Long An'
        },
        coordinates: {
            lat: 10.6517,
            lng: 106.5517
        },
        developer: 'Nam Long Group',
        status: 'selling',
        scale: {
            totalArea: 24.3,
            totalUnits: 241,
            density: 39
        },
        productTypes: ['villa', 'townhouse'],
        priceRange: {
            min: 3.5,
            max: 8,
            unit: 'billion'
        },
        priceText: 'Từ 3.5 tỷ - 8 tỷ',
        progress: {
            startDate: new Date('2022-01-01'),
            completionDate: new Date('2025-12-31'),
            handoverDate: new Date('2025-12-31'),
            currentProgress: 65
        },
        images: [
            {
                url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200',
                caption: 'Phối cảnh tổng thể dự án',
                type: 'main'
            },
            {
                url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200',
                caption: 'Biệt thự mẫu',
                type: 'gallery'
            },
            {
                url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200',
                caption: 'Khu vực sông và kênh đào',
                type: 'gallery'
            },
            {
                url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200',
                caption: 'Tiện ích nội khu',
                type: 'facility'
            }
        ],
        mainImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200',
        videos: [
            {
                url: 'https://www.youtube.com/watch?v=example',
                title: 'Video giới thiệu dự án',
                thumbnail: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400'
            }
        ],
        description: `Dự án The Pearl nằm trong khu đô thị Waterpoint, ngay mặt tiền Tỉnh lộ 830, xã Ấn Thạnh, huyện Bến Lức, tỉnh Long An.

Vị trí gần với các tiện ích như:
- Cách trung tâm TP.HCM 30km
- Gần sân bay Tân Sơn Nhất
- Kết nối dễ dàng với các tỉnh miền Tây
- Mặt tiền Tỉnh lộ 830

Dự án có vị trí đắc địa:
- Vị trí Double Waterfront khan hiếm
- RST tự định cao cấp nhất
- Hệ thống cảnh quan thiết kế gần gũi với thiên nhiên
- Công viên trung tâm
- Khu thể thao
- Hồ bơi
- Khu vui chơi trẻ em`,
        overview: `Phân khu The Pearl được xây dựng theo phong cách Địa Trung Hải, có quy mô 24.3 ha thuộc khu đô thị Waterpoint (355 ha). 

Dự án được phát triển bởi Nam Long Group và các đối tác Nhật Bản, với loại hình sản phẩm biệt thự, sinh thự cao cấp bên sông và kênh đào. 

Số lượng giới hạn chỉ 241 sản phẩm.

Đặc điểm nổi bật:
1. Vị trí Double Waterfront khan hiếm
2. RST tự định cao cấp nhất`,
        utilities: [
            {
                category: 'Nội khu',
                name: 'Hồ bơi vô cực',
                icon: 'pool'
            },
            {
                category: 'Nội khu',
                name: 'Công viên trung tâm',
                icon: 'park'
            },
            {
                category: 'Nội khu',
                name: 'Khu thể thao',
                icon: 'sport'
            },
            {
                category: 'Nội khu',
                name: 'Khu BBQ',
                icon: 'bbq'
            },
            {
                category: 'Nội khu',
                name: 'An ninh 24/7',
                icon: 'security'
            },
            {
                category: 'Nội khu',
                name: 'Sân chơi trẻ em',
                icon: 'playground'
            },
            {
                category: 'Giáo dục',
                name: 'Trường mầm non',
                icon: 'school'
            },
            {
                category: 'Giáo dục',
                name: 'Trường tiểu học',
                icon: 'school'
            },
            {
                category: 'Y tế',
                name: 'Phòng khám đa khoa',
                icon: 'hospital'
            },
            {
                category: 'Mua sắm',
                name: 'Trung tâm thương mại',
                icon: 'mall'
            },
            {
                category: 'Mua sắm',
                name: 'Siêu thị mini',
                icon: 'supermarket'
            }
        ],
        nearbyPlaces: [
            {
                name: 'Trung tâm TP.HCM',
                distance: '30km',
                placeType: 'city'
            },
            {
                name: 'Sân bay Tân Sơn Nhất',
                distance: '35km',
                placeType: 'airport'
            },
            {
                name: 'Phú Mỹ Hưng',
                distance: '25km',
                placeType: 'district'
            },
            {
                name: 'Bệnh viện quốc tế',
                distance: '5km',
                placeType: 'hospital'
            },
            {
                name: 'Trường quốc tế',
                distance: '3km',
                placeType: 'school'
            },
            {
                name: 'Siêu thị Lotte Mart',
                distance: '8km',
                placeType: 'mall'
            }
        ],
        masterPlan: {
            image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200',
            description: 'Mặt bằng tổng thể dự án The Pearl với 241 căn biệt thự và nhà phố cao cấp'
        },
        legal: {
            legalType: 'red-book',
            description: 'Sổ đỏ lâu dài, pháp lý chuẩn chỉ'
        },
        salesPolicy: [
            {
                title: 'Chiết khấu 5%',
                description: 'Khi thanh toán theo tiến độ'
            },
            {
                title: 'Hỗ trợ vay 70%',
                description: 'Lãi suất 0% trong 24 tháng, ân hạn nợ gốc'
            },
            {
                title: 'Tặng gói nội thất',
                description: 'Trị giá 200 triệu đồng'
            },
            {
                title: 'Miễn phí quản lý',
                description: '2 năm đầu tiên'
            },
            {
                title: 'Quà tặng 3 cây vàng',
                description: 'Cho khách hàng đặt cọc sớm'
            },
            {
                title: 'Chiết khấu thêm 1%',
                description: 'Khi mua từ sản phẩm thứ 2 trở lên'
            }
        ],
        contact: {
            hotline: '1900 6666',
            email: 'info@thepearlwaterpoint.com',
            website: 'www.thepearlwaterpoint.com',
            showroom: 'Xã Ấn Thạnh, Huyện Bến Lức, Long An'
        },
        news: [
            {
                title: 'The Pearl Waterpoint chính thức mở bán',
                date: new Date('2024-01-15'),
                content: 'Dự án The Pearl Waterpoint chính thức mở bán với nhiều ưu đãi hấp dẫn',
                image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400'
            },
            {
                title: 'Tiến độ xây dựng đạt 65%',
                date: new Date('2024-11-01'),
                content: 'Dự án đang trong giai đoạn hoàn thiện hạ tầng và cảnh quan',
                image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400'
            }
        ],
        seo: {
            title: 'The Pearl Waterpoint - Biệt thự ven sông Long An',
            description: 'Dự án biệt thự cao cấp The Pearl Waterpoint tại Long An, phong cách Địa Trung Hải, 241 căn, giá từ 3.5 tỷ',
            keywords: ['the pearl waterpoint', 'biệt thự long an', 'nam long group', 'waterpoint', 'bến lức']
        },
        views: 15420,
        favorites: 234,
        featured: true,
        verified: true
    },
    {
        name: 'Vinhomes Ocean Park',
        slug: 'vinhomes-ocean-park',
        location: 'Gia Lâm, Hà Nội',
        address: {
            street: 'Đại lộ Thăng Long',
            ward: 'Phường Đa Tốn',
            district: 'Quận Gia Lâm',
            city: 'Hà Nội',
            fullAddress: 'Đại lộ Thăng Long, Phường Đa Tốn, Quận Gia Lâm, Hà Nội'
        },
        coordinates: {
            lat: 21.0452,
            lng: 105.9452
        },
        developer: 'Vingroup',
        status: 'selling',
        scale: {
            totalArea: 420,
            totalUnits: 15000,
            density: 35
        },
        productTypes: ['apartment', 'villa', 'townhouse', 'shophouse'],
        priceRange: {
            min: 1.5,
            max: 15,
            unit: 'billion'
        },
        priceText: 'Từ 1.5 tỷ - 15 tỷ',
        progress: {
            startDate: new Date('2019-01-01'),
            completionDate: new Date('2026-12-31'),
            handoverDate: new Date('2024-12-31'),
            currentProgress: 80
        },
        images: [
            {
                url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200',
                caption: 'Phối cảnh tổng thể',
                type: 'main'
            },
            {
                url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200',
                caption: 'Biệt thự mẫu',
                type: 'gallery'
            },
            {
                url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200',
                caption: 'Công viên biển nhân tạo',
                type: 'facility'
            }
        ],
        mainImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200',
        description: `Vinhomes Ocean Park là đại đô thị đẳng cấp với hệ thống tiện ích 5 sao, công viên biển nhân tạo lớn nhất Đông Nam Á.

Vị trí:
- Cách trung tâm Hà Nội 15km
- Gần sân bay Nội Bài
- Kết nối dễ dàng với các quận trung tâm

Tiện ích:
- Công viên biển nhân tạo 6.1ha
- Trung tâm thương mại Vincom
- Trường học quốc tế
- Bệnh viện quốc tế
- Khu thể thao đa năng`,
        overview: `Vinhomes Ocean Park là đại đô thị đẳng cấp với hệ thống tiện ích 5 sao, công viên biển nhân tạo lớn nhất Đông Nam Á.

Quy mô: 420ha
Số căn: 15,000 căn
Mật độ: 35%`,
        utilities: [
            {
                category: 'Nội khu',
                name: 'Công viên biển nhân tạo 6.1ha',
                icon: 'beach'
            },
            {
                category: 'Nội khu',
                name: 'Hồ bơi vô cực',
                icon: 'pool'
            },
            {
                category: 'Nội khu',
                name: 'Khu thể thao đa năng',
                icon: 'sport'
            },
            {
                category: 'Giáo dục',
                name: 'Trường quốc tế Vinschool',
                icon: 'school'
            },
            {
                category: 'Y tế',
                name: 'Bệnh viện quốc tế Vinmec',
                icon: 'hospital'
            },
            {
                category: 'Mua sắm',
                name: 'Vincom Center',
                icon: 'mall'
            }
        ],
        nearbyPlaces: [
            {
                name: 'Trung tâm Hà Nội',
                distance: '15km',
                type: 'city'
            },
            {
                name: 'Sân bay Nội Bài',
                distance: '25km',
                type: 'airport'
            }
        ],
        masterPlan: {
            image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200',
            description: 'Mặt bằng tổng thể Vinhomes Ocean Park với quy mô 420ha, bao gồm các phân khu chức năng: khu dân cư, công viên biển, trung tâm thương mại, trường học và bệnh viện'
        },
        salesPolicy: [
            {
                title: 'Chiết khấu 3%',
                description: 'Thanh toán nhanh'
            },
            {
                title: 'Hỗ trợ vay 70%',
                description: 'Lãi suất ưu đãi'
            }
        ],
        contact: {
            hotline: '1900 232 389',
            email: 'info@vinhomes.vn',
            website: 'www.vinhomes.vn'
        },
        views: 45230,
        favorites: 892,
        featured: true,
        verified: true
    },
    {
        name: 'Masteri Thảo Điền',
        slug: 'masteri-thao-dien',
        location: 'Quận 2, Hồ Chí Minh',
        address: {
            street: 'Xa Lộ Hà Nội',
            ward: 'Phường Thảo Điền',
            district: 'Quận 2',
            city: 'Hồ Chí Minh',
            fullAddress: 'Xa Lộ Hà Nội, Phường Thảo Điền, Quận 2, Hồ Chí Minh'
        },
        coordinates: {
            lat: 10.8031,
            lng: 106.7340
        },
        developer: 'Masterise Homes',
        status: 'selling',
        scale: {
            totalArea: 9.2,
            totalUnits: 2000,
            density: 40
        },
        productTypes: ['apartment'],
        priceRange: {
            min: 3,
            max: 8,
            unit: 'billion'
        },
        priceText: 'Từ 3 tỷ - 8 tỷ',
        progress: {
            startDate: new Date('2020-01-01'),
            completionDate: new Date('2024-12-31'),
            handoverDate: new Date('2024-06-30'),
            currentProgress: 95
        },
        images: [
            {
                url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200',
                caption: 'View sông Sài Gòn',
                type: 'main'
            },
            {
                url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200',
                caption: 'Căn hộ mẫu',
                type: 'gallery'
            },
            {
                url: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=1200',
                caption: 'Hồ bơi vô cực',
                type: 'facility'
            }
        ],
        mainImage: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200',
        description: `Masteri Thảo Điền là khu căn hộ cao cấp tại trung tâm Quận 2 với view sông Sài Gòn tuyệt đẹp.`,
        overview: `Masteri Thảo Điền sở hữu vị trí đắc địa tại Quận 2, view sông Sài Gòn và hệ thống tiện ích 5 sao.`,
        utilities: [
            {
                category: 'Nội khu',
                name: 'Hồ bơi vô cực',
                icon: 'pool'
            },
            {
                category: 'Nội khu',
                name: 'Công viên Nhật Bản',
                icon: 'park'
            },
            {
                category: 'Mua sắm',
                name: 'Trung tâm thương mại',
                icon: 'mall'
            },
            {
                category: 'Thể thao',
                name: 'Phòng gym & yoga',
                icon: 'gym'
            },
            {
                category: 'Giải trí',
                name: 'Rạp chiếu phim',
                icon: 'cinema'
            }
        ],
        masterPlan: {
            image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=1200',
            description: 'Mặt bằng tổng thể Masteri Thảo Điền với 2000 căn hộ cao cấp, bao gồm các tòa tháp, công viên Nhật Bản và trung tâm thương mại'
        },
        contact: {
            hotline: '1900 1234',
            email: 'info@masterisehomes.com',
            website: 'www.masterisehomes.com'
        },
        views: 32100,
        favorites: 567,
        featured: true,
        verified: true
    },
    {
        name: 'Sunshine City Sài Gòn',
        slug: 'sunshine-city-saigon',
        location: 'Quận 7, Hồ Chí Minh',
        address: {
            street: 'Đường Phú Mỹ Hưng',
            ward: 'Phường Tân Phú',
            district: 'Quận 7',
            city: 'Hồ Chí Minh',
            fullAddress: 'Đường Phú Mỹ Hưng, Phường Tân Phú, Quận 7, Hồ Chí Minh'
        },
        coordinates: {
            lat: 10.7308,
            lng: 106.7186
        },
        developer: 'Sunshine Group',
        status: 'selling',
        scale: {
            totalArea: 16.8,
            totalUnits: 3500,
            density: 38
        },
        productTypes: ['apartment', 'shophouse'],
        priceRange: {
            min: 2.5,
            max: 6,
            unit: 'billion'
        },
        priceText: 'Từ 2.5 tỷ - 6 tỷ',
        progress: {
            startDate: new Date('2021-06-01'),
            completionDate: new Date('2025-12-31'),
            handoverDate: new Date('2025-06-30'),
            currentProgress: 70
        },
        images: [
            {
                url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200',
                caption: 'Phối cảnh dự án',
                type: 'main'
            },
            {
                url: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200',
                caption: 'Khu vực công viên',
                type: 'gallery'
            },
            {
                url: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200',
                caption: 'Tiện ích nội khu',
                type: 'facility'
            }
        ],
        mainImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200',
        description: `Sunshine City Sài Gòn là khu đô thị thông minh tại Quận 7 với hệ thống tiện ích hiện đại.`,
        overview: `Khu đô thị thông minh với kết nối giao thông thuận lợi và tiện ích đầy đủ.`,
        utilities: [
            {
                category: 'Nội khu',
                name: 'Hồ bơi tràn bờ',
                icon: 'pool'
            },
            {
                category: 'Nội khu',
                name: 'Công viên trung tâm',
                icon: 'park'
            },
            {
                category: 'Mua sắm',
                name: 'Trung tâm thương mại',
                icon: 'mall'
            },
            {
                category: 'Giáo dục',
                name: 'Trường học liên cấp',
                icon: 'school'
            },
            {
                category: 'Thể thao',
                name: 'Khu thể thao đa năng',
                icon: 'sport'
            }
        ],
        masterPlan: {
            image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200',
            description: 'Mặt bằng tổng thể Sunshine City Sài Gòn với 3500 căn hộ, shophouse và các tiện ích hiện đại'
        },
        contact: {
            hotline: '1900 6789',
            email: 'info@sunshinegroup.vn',
            website: 'www.sunshinegroup.vn'
        },
        views: 28500,
        favorites: 421,
        featured: true,
        verified: true
    },
    {
        name: 'Ecopark Grand The Island',
        slug: 'ecopark-grand-the-island',
        location: 'Văn Giang, Hưng Yên',
        address: {
            street: 'Đại lộ Ecopark',
            ward: 'Xã Xuân Quan',
            district: 'Huyện Văn Giang',
            city: 'Hưng Yên',
            fullAddress: 'Đại lộ Ecopark, Xã Xuân Quan, Huyện Văn Giang, Hưng Yên'
        },
        coordinates: {
            lat: 20.9897,
            lng: 105.9167
        },
        developer: 'Vinaconex',
        status: 'selling',
        scale: {
            totalArea: 288,
            totalUnits: 500,
            density: 25
        },
        productTypes: ['villa'],
        priceRange: {
            min: 8,
            max: 20,
            unit: 'billion'
        },
        priceText: 'Từ 8 tỷ - 20 tỷ',
        progress: {
            startDate: new Date('2020-03-01'),
            completionDate: new Date('2025-12-31'),
            handoverDate: new Date('2025-06-30'),
            currentProgress: 75
        },
        images: [
            {
                url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200',
                caption: 'Biệt thự đảo cao cấp',
                type: 'main'
            },
            {
                url: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200',
                caption: 'Bãi biển nhân tạo',
                type: 'gallery'
            },
            {
                url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200',
                caption: 'Sân golf 36 lỗ',
                type: 'facility'
            }
        ],
        mainImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200',
        description: `Ecopark Grand The Island là phân khu biệt thự đảo cao cấp với không gian xanh mát và tiện ích resort 5 sao.`,
        overview: `Biệt thự đảo cao cấp với hệ thống tiện ích resort đẳng cấp quốc tế.`,
        utilities: [
            {
                category: 'Nội khu',
                name: 'Bãi biển nhân tạo',
                icon: 'beach'
            },
            {
                category: 'Thể thao',
                name: 'Sân golf 36 lỗ',
                icon: 'golf'
            },
            {
                category: 'Giải trí',
                name: 'Công viên nước',
                icon: 'waterpark'
            },
            {
                category: 'Giáo dục',
                name: 'Trường quốc tế',
                icon: 'school'
            },
            {
                category: 'Y tế',
                name: 'Bệnh viện đa khoa',
                icon: 'hospital'
            },
            {
                category: 'Giải trí',
                name: 'Marina & Yacht Club',
                icon: 'yacht'
            }
        ],
        masterPlan: {
            image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=1200',
            description: 'Mặt bằng tổng thể Ecopark Grand The Island với 500 biệt thự đảo cao cấp, sân golf 36 lỗ và bãi biển nhân tạo'
        },
        contact: {
            hotline: '1900 8668',
            email: 'info@ecopark.com.vn',
            website: 'www.ecopark.com.vn'
        },
        views: 41200,
        favorites: 789,
        featured: true,
        verified: true
    },
    {
        name: 'The Diamond Residence',
        slug: 'the-diamond-residence',
        location: 'Thanh Xuân, Hà Nội',
        address: {
            street: '25 Lê Văn Lương',
            ward: 'Phường Nhân Chính',
            district: 'Quận Thanh Xuân',
            city: 'Hà Nội',
            fullAddress: '25 Lê Văn Lương, Phường Nhân Chính, Quận Thanh Xuân, Hà Nội'
        },
        coordinates: {
            lat: 20.9967,
            lng: 105.8047
        },
        developer: 'Diamond Group',
        status: 'selling',
        scale: {
            totalArea: 8.5,
            totalUnits: 800,
            density: 42
        },
        productTypes: ['apartment'],
        priceRange: {
            min: 3.5,
            max: 7,
            unit: 'billion'
        },
        priceText: 'Từ 3.5 tỷ - 7 tỷ',
        progress: {
            startDate: new Date('2021-09-01'),
            completionDate: new Date('2025-03-31'),
            handoverDate: new Date('2025-01-31'),
            currentProgress: 85
        },
        images: [
            {
                url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200',
                caption: 'Tòa nhà hiện đại',
                type: 'main'
            },
            {
                url: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200',
                caption: 'Lobby sang trọng',
                type: 'gallery'
            },
            {
                url: 'https://images.unsplash.com/photo-1600566753151-384129cf4e3e?w=1200',
                caption: 'Sky lounge',
                type: 'facility'
            }
        ],
        mainImage: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200',
        description: `The Diamond Residence là dự án chung cư cao cấp tại vị trí đắc địa trên đường Lê Văn Lương.`,
        overview: `Chung cư cao cấp với thiết kế hiện đại, sang trọng và hệ thống tiện ích đẳng cấp.`,
        utilities: [
            {
                category: 'Nội khu',
                name: 'Hồ bơi 4 mùa',
                icon: 'pool'
            },
            {
                category: 'Giải trí',
                name: 'Sky lounge',
                icon: 'lounge'
            },
            {
                category: 'Thể thao',
                name: 'Phòng gym cao cấp',
                icon: 'gym'
            },
            {
                category: 'Giải trí',
                name: 'Khu BBQ',
                icon: 'bbq'
            },
            {
                category: 'Giải trí',
                name: 'Sân chơi trẻ em',
                icon: 'playground'
            }
        ],
        masterPlan: {
            image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=1200',
            description: 'Mặt bằng tổng thể The Diamond Residence với 800 căn hộ cao cấp, sky lounge và các tiện ích đẳng cấp'
        },
        contact: {
            hotline: '1900 3456',
            email: 'info@diamondgroup.vn',
            website: 'www.diamondresidence.vn'
        },
        views: 19800,
        favorites: 312,
        featured: false,
        verified: true
    },
    {
        name: 'Starlake Urban City',
        slug: 'starlake-urban-city',
        location: 'Tây Hồ, Hà Nội',
        address: {
            street: 'Đường Lê Trọng Tấn',
            ward: 'Phường Dương Nội',
            district: 'Quận Hà Đông',
            city: 'Hà Nội',
            fullAddress: 'Đường Lê Trọng Tấn, Phường Dương Nội, Quận Hà Đông, Hà Nội'
        },
        coordinates: {
            lat: 20.9722,
            lng: 105.7544
        },
        developer: 'Daewoo E&C',
        status: 'selling',
        scale: {
            totalArea: 186,
            totalUnits: 5000,
            density: 35
        },
        productTypes: ['apartment', 'villa', 'shophouse'],
        priceRange: {
            min: 2.8,
            max: 12,
            unit: 'billion'
        },
        priceText: 'Từ 2.8 tỷ - 12 tỷ',
        progress: {
            startDate: new Date('2018-01-01'),
            completionDate: new Date('2026-12-31'),
            handoverDate: new Date('2024-12-31'),
            currentProgress: 80
        },
        images: [
            {
                url: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=1200',
                caption: 'Khu đô thị hiện đại',
                type: 'main'
            },
            {
                url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200',
                caption: 'Hồ điều hòa',
                type: 'gallery'
            },
            {
                url: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200',
                caption: 'Công viên xanh',
                type: 'facility'
            }
        ],
        mainImage: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=1200',
        description: `Starlake là khu đô thị hiện đại với hồ điều hòa lớn và không gian xanh mát.`,
        overview: `Khu đô thị đẳng cấp với hồ điều hòa 34ha và hệ thống tiện ích hoàn chỉnh.`,
        utilities: [
            {
                category: 'Nội khu',
                name: 'Hồ điều hòa 34ha',
                icon: 'lake'
            },
            {
                category: 'Nội khu',
                name: 'Công viên Nhật Bản',
                icon: 'park'
            },
            {
                category: 'Mua sắm',
                name: 'Trung tâm thương mại',
                icon: 'mall'
            },
            {
                category: 'Giáo dục',
                name: 'Trường quốc tế',
                icon: 'school'
            },
            {
                category: 'Y tế',
                name: 'Phòng khám đa khoa',
                icon: 'hospital'
            }
        ],
        masterPlan: {
            image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200',
            description: 'Mặt bằng tổng thể Starlake Urban City với hồ điều hòa 34ha, 5000 căn hộ, biệt thự và shophouse'
        },
        contact: {
            hotline: '1900 2468',
            email: 'info@starlake.vn',
            website: 'www.starlake.vn'
        },
        views: 35600,
        favorites: 654,
        featured: true,
        verified: true
    },
    {
        name: 'Imperia Sky Garden',
        slug: 'imperia-sky-garden',
        location: 'Minh Khai, Hà Nội',
        address: {
            street: '423 Minh Khai',
            ward: 'Phường Vĩnh Tuy',
            district: 'Quận Hai Bà Trưng',
            city: 'Hà Nội',
            fullAddress: '423 Minh Khai, Phường Vĩnh Tuy, Quận Hai Bà Trưng, Hà Nội'
        },
        coordinates: {
            lat: 20.9967,
            lng: 105.8647
        },
        developer: 'Thanh Xuân Investment',
        status: 'completed',
        scale: {
            totalArea: 3.2,
            totalUnits: 600,
            density: 45
        },
        productTypes: ['apartment'],
        priceRange: {
            min: 2.2,
            max: 4.5,
            unit: 'billion'
        },
        priceText: 'Từ 2.2 tỷ - 4.5 tỷ',
        progress: {
            startDate: new Date('2019-06-01'),
            completionDate: new Date('2023-12-31'),
            handoverDate: new Date('2023-12-31'),
            currentProgress: 100
        },
        images: [
            {
                url: 'https://images.unsplash.com/photo-1600047509358-9dc75507daeb?w=1200',
                caption: 'Tòa tháp đôi',
                type: 'main'
            },
            {
                url: 'https://images.unsplash.com/photo-1600585152915-d208bec867a1?w=1200',
                caption: 'Vườn treo Sky Garden',
                type: 'gallery'
            },
            {
                url: 'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=1200',
                caption: 'Tiện ích tầng cao',
                type: 'facility'
            }
        ],
        mainImage: 'https://images.unsplash.com/photo-1600047509358-9dc75507daeb?w=1200',
        description: `Imperia Sky Garden là dự án chung cư cao cấp với vườn treo độc đáo trên cao.`,
        overview: `Chung cư cao cấp với thiết kế vườn treo Sky Garden độc đáo và view toàn cảnh thành phố.`,
        utilities: [
            {
                category: 'Nội khu',
                name: 'Vườn treo Sky Garden',
                icon: 'garden'
            },
            {
                category: 'Nội khu',
                name: 'Hồ bơi tầng cao',
                icon: 'pool'
            },
            {
                category: 'Thể thao',
                name: 'Phòng gym',
                icon: 'gym'
            },
            {
                category: 'Giải trí',
                name: 'Khu vui chơi trẻ em',
                icon: 'playground'
            },
            {
                category: 'Mua sắm',
                name: 'Siêu thị mini',
                icon: 'supermarket'
            }
        ],
        masterPlan: {
            image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200',
            description: 'Mặt bằng tổng thể Imperia Sky Garden với 600 căn hộ, vườn treo Sky Garden độc đáo trên các tầng cao'
        },
        contact: {
            hotline: '1900 1357',
            email: 'info@imperiaskygarden.vn',
            website: 'www.imperiaskygarden.vn'
        },
        views: 15200,
        favorites: 234,
        featured: false,
        verified: true
    },
    {
        name: 'Saigon South Residences',
        slug: 'saigon-south-residences',
        location: 'Nhà Bè, Hồ Chí Minh',
        address: {
            street: 'Đường Nguyễn Hữu Thọ',
            ward: 'Phường Phước Kiển',
            district: 'Huyện Nhà Bè',
            city: 'Hồ Chí Minh',
            fullAddress: 'Đường Nguyễn Hữu Thọ, Phường Phước Kiển, Huyện Nhà Bè, Hồ Chí Minh'
        },
        coordinates: {
            lat: 10.6833,
            lng: 106.7333
        },
        developer: 'Phu My Hung Corporation',
        status: 'selling',
        scale: {
            totalArea: 12.5,
            totalUnits: 1800,
            density: 36
        },
        productTypes: ['apartment'],
        priceRange: {
            min: 2.8,
            max: 7.5,
            unit: 'billion'
        },
        priceText: 'Từ 2.8 tỷ - 7.5 tỷ',
        progress: {
            startDate: new Date('2020-08-01'),
            completionDate: new Date('2025-06-30'),
            handoverDate: new Date('2025-03-31'),
            currentProgress: 72
        },
        images: [
            {
                url: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1200',
                caption: 'Khu căn hộ ven sông',
                type: 'main'
            },
            {
                url: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=1200',
                caption: 'View sông tuyệt đẹp',
                type: 'gallery'
            },
            {
                url: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=1200',
                caption: 'Công viên ven sông',
                type: 'facility'
            }
        ],
        mainImage: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1200',
        description: `Saigon South Residences là khu căn hộ cao cấp ven sông với không gian xanh mát.`,
        overview: `Căn hộ cao cấp tại khu Nam Sài Gòn với view sông và hệ thống tiện ích đầy đủ.`,
        utilities: [
            {
                category: 'Nội khu',
                name: 'Công viên ven sông',
                icon: 'park'
            },
            {
                category: 'Nội khu',
                name: 'Hồ bơi ngoài trời',
                icon: 'pool'
            },
            {
                category: 'Thể thao',
                name: 'Sân tennis',
                icon: 'tennis'
            },
            {
                category: 'Giáo dục',
                name: 'Trường mầm non',
                icon: 'school'
            },
            {
                category: 'Mua sắm',
                name: 'Trung tâm thương mại',
                icon: 'mall'
            }
        ],
        masterPlan: {
            image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200',
            description: 'Mặt bằng tổng thể Saigon South Residences với 1800 căn hộ ven sông, công viên xanh và các tiện ích đầy đủ'
        },
        contact: {
            hotline: '1900 5555',
            email: 'info@phumyhung.com.vn',
            website: 'www.saigonsouthresidences.com'
        },
        views: 22400,
        favorites: 389,
        featured: false,
        verified: true
    }
]
