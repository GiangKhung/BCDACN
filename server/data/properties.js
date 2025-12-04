export const properties = [
    // Cho thuê văn phòng
    {
        id: 1,
        title: 'Chính chủ cho kinh doanh tầng 1 đến 6, DT 70m2, giá 14tr/tháng',
        location: 'Ba Đình, Hà Nội',
        address: {
            street: 'Phố Cù Lộc',
            ward: 'Phường Thượng Đình',
            district: 'Quận Ba Đình',
            city: 'Hà Nội',
            fullAddress: 'Phố Cù Lộc, Phường Thượng Đình, Quận Ba Đình, Hà Nội'
        },
        price: 14000000,
        pricePerMonth: true,
        pricePerSqm: 0.2,
        propertyType: 'office',
        bedrooms: 0,
        bathrooms: 1,
        floors: 6,
        area: 70,
        direction: 'east',
        legalDocument: 'red-book',
        furniture: 'empty',
        features: [
            'Chính chủ cho thuê',
            'Tầng 1 đến 6',
            'Phù hợp kinh doanh',
            'Vị trí đẹp',
            'Giao thông thuận lợi'
        ],
        images: 4,
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
        imageList: [
            'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
            'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800',
            'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800',
            'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800'
        ],
        description: `Căn hộ 3PN cho thuê. Đăng hôm nay.

Thông tin chi tiết:
- Diện tích: 70m²
- Tầng: 1-6
- Giá: 14 triệu/tháng
- Phù hợp: Văn phòng, kinh doanh
- Chính chủ cho thuê

Liên hệ: Chủng`,
        verified: false,
        hasVideo: false,
        status: 'available',
        agent: {
            name: 'Lê Văn C',
            phone: '0901348***',
            status: 'Đăng hôm nay'
        },
        yearBuilt: 2018,
        views: 245,
        favorites: 12
    },
    // Cho thuê căn hộ
    {
        id: 2,
        title: 'Cho thuê gấp CHCC 3PN tại The Golden Armor Bộ Giáo Vụ,...',
        location: 'Ba Đình, Hà Nội',
        address: {
            street: 'The Golden Armor',
            ward: 'Phường Ba Đình',
            district: 'Quận Ba Đình',
            city: 'Hà Nội',
            fullAddress: 'The Golden Armor, Phường Ba Đình, Quận Ba Đình, Hà Nội'
        },
        price: 20000000,
        pricePerMonth: true,
        pricePerSqm: 0.2,
        propertyType: 'apartment',
        bedrooms: 3,
        bathrooms: 2,
        floors: 1,
        area: 100,
        direction: 'south',
        balconyDirection: 'east',
        legalDocument: 'red-book',
        furniture: 'full',
        features: [
            'Nội thất đầy đủ',
            'View đẹp',
            'An ninh 24/7',
            'Gần trường học',
            'Gần siêu thị'
        ],
        amenities: [
            'Hồ bơi',
            'Phòng gym',
            'Sân chơi trẻ em',
            'Bãi đỗ xe',
            'Siêu thị'
        ],
        images: 4,
        image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
        imageList: [
            'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
            'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=800',
            'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800',
            'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800'
        ],
        description: `Cho thuê căn hộ 3 phòng ngủ tại The Golden Armor

Thông tin chi tiết:
- Diện tích: 100m²
- 3 phòng ngủ, 2 phòng tắm
- Nội thất đầy đủ
- View đẹp
- Giá: 20 triệu/tháng

Tiện ích:
- Hồ bơi
- Phòng gym
- An ninh 24/7
- Bãi đỗ xe

Liên hệ xem nhà`,
        verified: true,
        hasVideo: false,
        status: 'available',
        agent: {
            name: 'Trần Thị B',
            phone: '0902456***',
            status: 'Đăng hôm nay'
        },
        yearBuilt: 2020,
        views: 456,
        favorites: 23
    },
    // Nhà đất cho thuê
    {
        id: 3,
        title: 'Cho thuê nhà Đường Thành Thái, P.14 Quận 10 DT: 17x10 1 hầm 1...',
        location: 'Quận 10, Hồ Chí Minh',
        price: 125000000,
        pricePerMonth: true,
        bedrooms: 3,
        bathrooms: 2,
        area: 170,
        images: 5,
        image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
        description: 'Nhà mặt tiền đường Thành Thái, vị trí đẹp, kinh doanh tốt. Đăng hôm nay.',
        agent: {
            name: 'Nguyễn Văn A',
            status: 'Đăng hôm nay'
        }
    },
    {
        id: 4,
        title: 'BQL GoldSeason Nguyễn Tuân cho thuê 500m2 c...',
        location: 'Thanh Xuân, Hà Nội',
        price: 220000000,
        pricePerMonth: true,
        verified: true,
        bedrooms: 4,
        bathrooms: 3,
        area: 500,
        images: 3,
        image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
        description: 'Văn phòng cao cấp tại GoldSeason. Đăng hôm nay.',
        agent: {
            name: 'Trần Thị B',
            status: 'Đăng hôm nay'
        }
    },

    // Nhà đất bán - VIP KIM CƯƠNG
    {
        id: 101,
        title: 'TẤT TẦN TẤT GIỜ HÀNG MUA TỪ CDT VÀ GIỜ HÀNG CHUYỂN NHƯỢNG THE GIÓ RIVERSIDE',
        location: 'Dĩ An, Bình Dương',
        price: 2990000000,
        vip: 'VIP KIM CƯƠNG',
        bedrooms: 2,
        bathrooms: 2,
        area: 65,
        pricePerSqm: 46.06,
        images: 15,
        image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
        description: 'Giỏ hàng dành cho quý chị đang quan tâm đến Tháp Gió Đông 2 dự án The Gió Riverside, tháp view sông đẹp nhất của dự án.',
        agent: {
            name: 'Đặc Thành Chi',
            status: 'Đăng hôm nay'
        }
    },
    {
        id: 102,
        title: 'GIẢM GIÁ BÁN NHANH NHÀ PHỐ DT 100M2 GIÁ 7.9TỶ DT 160M GIÁ 11TỶ',
        location: 'Quận 9, Hồ Chí Minh',
        price: 7900000000,
        vip: 'VIP KIM CƯƠNG',
        bedrooms: 4,
        bathrooms: 4,
        area: 100,
        pricePerSqm: 79,
        images: 13,
        image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
        description: 'Chính chủ gửi bán giỏ hàng cam kết tốt nhất dự án đầy đủ các diện tích các lô góc đẹp.',
        agent: {
            name: 'Ngọc Khuyên',
            status: 'Đăng hôm nay'
        }
    },

    // Nhà đất bán - Thường
    {
        id: 3,
        title: 'Giá thật! Bán căn hộ chung cư Bạn có yêu Chính phủ, 100.8m, 3PN',
        location: 'Thanh Xuân, Hà Nội',
        price: 9900000000,
        bedrooms: 3,
        bathrooms: 2,
        area: 100.8,
        images: 4,
        image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800',
        description: 'Căn hộ chung cư đẹp tại Thanh Xuân. Đăng hôm nay.',
        agent: {
            name: 'Phạm Minh D',
            status: 'Đăng hôm nay'
        }
    },
    {
        id: 4,
        title: 'Mặt tiền Nguyễn Sinh Sắc chỉ 1 lô duy nhất xây cao tầng chào bán',
        location: 'Liên Chiểu, Đà Nẵng',
        price: 17500000000,
        bedrooms: 4,
        bathrooms: 3,
        area: 142,
        images: 3,
        image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
        description: 'Mặt tiền đẹp tại Đà Nẵng. Đăng hôm nay.',
        agent: {
            name: 'Hoàng Văn E',
            status: 'Đăng hôm nay'
        }
    },
    {
        id: 5,
        title: 'Sở hữu shop khối đế 101.8m2 ngay bên dự án Vinhomes Ocean...',
        location: 'Sơn Trà, Đà Nẵng',
        price: 8780000000,
        bedrooms: 2,
        bathrooms: 2,
        area: 101.8,
        images: 14,
        image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
        description: 'Shop khối đế cao cấp. Đăng hôm nay.',
        agent: {
            name: 'Vũ Thị F',
            status: 'Đăng hôm nay'
        }
    },
    {
        id: 6,
        title: 'Bán Gấp Căn 2PN Full Nội Thất Iris Garden View Đẹp Giá Tốt...',
        location: 'Nam Từ Liêm, Hà Nội',
        price: 0,
        priceText: 'Giá thỏa thuận',
        bedrooms: 2,
        bathrooms: 2,
        area: 62,
        images: 6,
        image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
        description: 'Căn hộ 2PN full nội thất. Đăng hôm nay.',
        agent: {
            name: 'Đỗ Văn G',
            status: 'Đăng hôm nay'
        }
    },
    {
        id: 7,
        title: 'CÓ TIN CÓ CĂN, KHÔNG ẢO KÉO KHÁCH, CHUYỂN NHƯỢNG LẠI CĂN...',
        location: 'Bình Chánh, Hồ Chí Minh',
        price: 2650000000,
        bedrooms: 2,
        bathrooms: 2,
        area: 59,
        images: 6,
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
        description: 'Căn hộ giá tốt tại Bình Chánh. Đăng hôm nay.',
        agent: {
            name: 'Bùi Thị H',
            status: 'Đăng hôm nay'
        }
    },
    {
        id: 9,
        title: 'Độc quyền villa song lập 189m2 Mua Thu - Eco City Đức Hòa',
        location: 'Bến Lức, Long An',
        price: 0,
        priceText: 'Giá thỏa thuận',
        bedrooms: 4,
        bathrooms: 3,
        area: 189,
        images: 24,
        hasVideo: true,
        image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
        description: 'Villa song lập cao cấp tại khu đô thị Eco City. Đăng hôm nay.',
        agent: {
            name: 'Ngô Văn I',
            status: 'Đăng hôm nay'
        }
    },
    {
        id: 10,
        title: 'Chính chủ cần bán gấp căn nhà phân lô phố Thịnh Quang',
        location: 'Ba Đình, Hà Nội',
        price: 17500000000,
        bedrooms: 4,
        bathrooms: 3,
        area: 35,
        images: 4,
        image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800',
        description: 'Nhà phân lô đẹp tại Ba Đình, Hà Nội. Đăng hôm nay.',
        agent: {
            name: 'Đinh Văn K',
            status: 'Đăng hôm nay'
        }
    },
    {
        id: 11,
        title: 'Bán căn nhà mới xây 2 lầu diện tích sử dụng gần 200m2 bán gấp...',
        location: 'Thuận An, Bình Dương',
        price: 6300000000,
        bedrooms: 3,
        bathrooms: 2,
        area: 168,
        images: 9,
        image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
        description: 'Nhà mới xây 2 lầu tại Thuận An. Đăng hôm nay.',
        agent: {
            name: 'Lý Thị L',
            status: 'Đăng hôm nay'
        }
    },
    {
        id: 12,
        title: 'CHỦ ĐỊNH CƯ RA NƯỚC NGOÀI BÁN GẤP - NHÀ TẶNG - CHÍNH CHỦ',
        location: 'Bình Tân, Hồ Chí Minh',
        price: 9400000000,
        bedrooms: 2,
        bathrooms: 2,
        area: 73,
        images: 6,
        image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
        description: 'Nhà bán gấp do chủ định cư nước ngoài. Đăng hôm nay.',
        agent: {
            name: 'Mai Văn M',
            status: 'Đăng hôm nay'
        }
    },
    {
        id: 13,
        title: 'Đất đẹp nở hậu tại Phúc Lợi, Long Biên, cách đường ô tô...',
        location: 'Long Biên, Hà Nội',
        price: 6450000000,
        bedrooms: 0,
        bathrooms: 0,
        area: 72.8,
        images: 3,
        image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
        description: 'Đất đẹp tại Long Biên, Hà Nội. Đăng hôm nay.',
        agent: {
            name: 'Phan Thị N',
            status: 'Đăng hôm nay'
        }
    },
    {
        id: 14,
        title: 'Bán biệt thự biển mặt tiền Võ Thị Sáu Vũng Tàu Bà Rịa Vũng Tàu',
        location: 'Vũng Tàu, Bà Rịa Vũng Tàu',
        price: 35000000000,
        bedrooms: 5,
        bathrooms: 4,
        area: 300,
        images: 5,
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
        description: 'Biệt thự biển mặt tiền đẹp tại Vũng Tàu. Đăng hôm nay.',
        agent: {
            name: 'Quách Văn O',
            status: 'Đăng hôm nay'
        }
    },
    {
        id: 15,
        title: 'Biệt Thự Đảo mẫu Đơn Lập xế khe, Giá: 26 tỷ/270m, 31 tỷ/295...',
        location: 'Bến Lức, Long An',
        price: 26000000000,
        bedrooms: 4,
        bathrooms: 4,
        area: 270,
        images: 24,
        hasVideo: true,
        image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
        description: 'Biệt thự đảo cao cấp tại Long An. Đăng hôm nay.',
        agent: {
            name: 'Trương Thị P',
            status: 'Đăng hôm nay'
        }
    }
]
