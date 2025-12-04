# Bảng Danh Sách Các Thực Thể và Mối Kết Hợp - Mô Hình ERD

## Danh Sách Các Thực Thể

| STT | Tên Thực Thể | Loại | Diễn Giải |
|-----|-------------|------|----------|
| 1 | Property | Thực Thể | Đại diện cho một bất động sản cụ thể như căn hộ, nhà, đất, văn phòng, shophouse. Chứa thông tin chi tiết về giá, diện tích, vị trí, loại hình, trạng thái và thông tin liên hệ của người đăng. |
| 2 | Project | Thực Thể | Đại diện cho một dự án bất động sản như khu đô thị, chung cư, biệt thự. Chứa thông tin về chủ đầu tư, tiến độ, quy mô, giá cả, tiện ích và chính sách bán hàng. |
| 3 | Agent | Thực Thể | Đại diện cho một người đăng tin hoặc môi giới bất động sản. Chứa thông tin cá nhân như tên, số điện thoại, email, trạng thái hoạt động và ảnh đại diện. |
| 4 | Address | Thực Thể | Đại diện cho một địa chỉ cụ thể. Chứa thông tin chi tiết về đường, phường/xã, quận/huyện, thành phố/tỉnh và địa chỉ đầy đủ. |
| 5 | Coordinates | Thực Thể | Đại diện cho tọa độ GPS của một vị trí. Chứa vĩ độ (lat) và kinh độ (lng) để hiển thị trên bản đồ. |
| 6 | Image | Thực Thể | Đại diện cho một hình ảnh trong dự án. Chứa đường dẫn hình ảnh, chú thích và loại hình ảnh (main, gallery, masterplan, facility, location). |
| 7 | Video | Thực Thể | Đại diện cho một video trong dự án. Chứa đường dẫn video, tiêu đề và ảnh thumbnail. |
| 8 | Utility | Thực Thể | Đại diện cho một tiện ích trong dự án. Chứa danh mục tiện ích (Nội khu, Giáo dục, Y tế, Mua sắm, Thể thao, Giải trí), tên tiện ích và biểu tượng. |
| 9 | NearbyPlace | Thực Thể | Đại diện cho một địa điểm lân cận dự án. Chứa tên địa điểm, khoảng cách và loại địa điểm (city, airport, district, hospital, school, mall). |
| 10 | MasterPlan | Thực Thể | Đại diện cho mặt bằng tổng thể của dự án. Chứa hình ảnh mặt bằng và mô tả chi tiết. |
| 11 | SalesPolicy | Thực Thể | Đại diện cho một chính sách bán hàng của dự án. Chứa tiêu đề chính sách (chiết khấu, hỗ trợ vay, tặng nội thất, v.v.) và mô tả chi tiết. |
| 12 | News | Thực Thể | Đại diện cho một tin tức hoặc thông báo của dự án. Chứa tiêu đề, ngày đăng, nội dung tin tức và hình ảnh minh họa. |
| 13 | Contact | Thực Thể | Đại diện cho thông tin liên hệ của dự án. Chứa số hotline, email, website và địa chỉ showroom. |
| 14 | SEO | Thực Thể | Đại diện cho thông tin SEO của dự án. Chứa tiêu đề SEO, mô tả SEO và danh sách từ khóa. |

---

## Danh Sách Các Mối Kết Hợp

| STT | Tên Mối Kết Hợp | Loại Kết Hợp | Thực Thể 1 | Thực Thể 2 | Diễn Giải |
|-----|-----------------|-------------|-----------|-----------|----------|
| 1 | Agent_Property | 1:N | Agent | Property | Một người đăng (Agent) có thể đăng nhiều bất động sản (Property), nhưng mỗi bất động sản chỉ có một người đăng. Ví dụ: Agent "Trần Thị B" đăng nhiều Property khác nhau. |
| 2 | Project_Property | N:1 | Property | Project | Nhiều bất động sản (Property) có thể thuộc về một dự án (Project), nhưng mỗi bất động sản chỉ thuộc một dự án (nếu có). Ví dụ: Nhiều căn hộ thuộc Project "Vinhomes Ocean Park". |
| 3 | Property_Address | 1:1 | Property | Address | Mỗi bất động sản (Property) có một địa chỉ duy nhất (Address). Mối kết hợp này đảm bảo mỗi Property có thông tin vị trí chi tiết. |
| 4 | Property_Coordinates | 1:1 | Property | Coordinates | Mỗi bất động sản (Property) có một tọa độ GPS duy nhất (Coordinates). Tọa độ này được sử dụng để hiển thị Property trên bản đồ. |
| 5 | Project_Address | 1:1 | Project | Address | Mỗi dự án (Project) có một địa chỉ duy nhất (Address). Mối kết hợp này đảm bảo mỗi Project có thông tin vị trí chi tiết. |
| 6 | Project_Coordinates | 1:1 | Project | Coordinates | Mỗi dự án (Project) có một tọa độ GPS duy nhất (Coordinates). Tọa độ này được sử dụng để hiển thị Project trên bản đồ. |
| 7 | Project_Image | 1:N | Project | Image | Một dự án (Project) có nhiều hình ảnh (Image). Các hình ảnh này bao gồm ảnh chính, ảnh thư viện, mặt bằng, tiện ích và vị trí. |
| 8 | Project_Video | 1:N | Project | Video | Một dự án (Project) có nhiều video (Video). Các video này giới thiệu về dự án, tiện ích và các tính năng nổi bật. |
| 9 | Project_Utility | 1:N | Project | Utility | Một dự án (Project) có nhiều tiện ích (Utility). Các tiện ích này được phân loại theo danh mục như Nội khu, Giáo dục, Y tế, Mua sắm, Thể thao, Giải trí. |
| 10 | Project_NearbyPlace | 1:N | Project | NearbyPlace | Một dự án (Project) có nhiều địa điểm lân cận (NearbyPlace). Các địa điểm này giúp người mua hiểu rõ vị trí dự án so với các địa điểm quan trọng. |
| 11 | Project_MasterPlan | 1:1 | Project | MasterPlan | Mỗi dự án (Project) có một mặt bằng tổng thể duy nhất (MasterPlan). Mặt bằng này hiển thị bố cục toàn bộ dự án. |
| 12 | Project_SalesPolicy | 1:N | Project | SalesPolicy | Một dự án (Project) có nhiều chính sách bán hàng (SalesPolicy). Các chính sách này bao gồm chiết khấu, hỗ trợ vay, tặng nội thất, miễn phí quản lý, v.v. |
| 13 | Project_News | 1:N | Project | News | Một dự án (Project) có nhiều tin tức (News). Các tin tức này cập nhật thông tin về tiến độ xây dựng, chính sách mới, sự kiện, v.v. |
| 14 | Project_Contact | 1:1 | Project | Contact | Mỗi dự án (Project) có một thông tin liên hệ duy nhất (Contact). Thông tin này bao gồm hotline, email, website và showroom. |
| 15 | Project_SEO | 1:1 | Project | SEO | Mỗi dự án (Project) có một thông tin SEO duy nhất (SEO). Thông tin này bao gồm tiêu đề SEO, mô tả SEO và từ khóa. |

---

## Tóm Tắt Thống Kê

| Loại | Số Lượng |
|------|---------|
| Tổng số Thực Thể | 14 |
| Tổng số Mối Kết Hợp | 15 |
| Mối Kết Hợp 1:1 | 8 |
| Mối Kết Hợp 1:N | 6 |
| Mối Kết Hợp N:1 | 1 |

---

## Ghi Chú Quan Trọng

### 1. Mối Kết Hợp Tùy Chọn
- Mối kết hợp giữa **Property** và **Project** là tùy chọn. Một bất động sản có thể không thuộc dự án nào (ví dụ: nhà riêng lẻ, đất riêng lẻ).

### 2. Dữ Liệu Nhúng (Embedded Data)
- Các thực thể như **Address**, **Coordinates**, **Image**, **Video**, **Utility**, **NearbyPlace**, **MasterPlan**, **SalesPolicy**, **News**, **Contact**, **SEO** được nhúng trực tiếp trong **Property** hoặc **Project** thay vì tạo bảng riêng.
- Điều này phù hợp với cấu trúc MongoDB (NoSQL) hiện tại.

### 3. Khóa Chính (Primary Key)
- **Property**: `_id` (MongoDB ObjectId)
- **Project**: `_id` (MongoDB ObjectId)
- **Agent**: Được lưu trực tiếp trong Property, không có bảng riêng

### 4. Khóa Ngoài (Foreign Key)
- **Property.agent**: Tham chiếu đến Agent
- **Property.project**: Tham chiếu đến Project (tùy chọn)

### 5. Mở Rộng Tương Lai
Có thể thêm các thực thể mới như:
- **User**: Người dùng hệ thống (khách hàng, admin)
- **Favorite**: Danh sách yêu thích của người dùng
- **Review**: Đánh giá và bình luận
- **Transaction**: Giao dịch mua/bán/cho thuê
- **Notification**: Thông báo cho người dùng
- **Category**: Danh mục bất động sản
- **District**: Quận/Huyện
- **Ward**: Phường/Xã
- **City**: Thành phố/Tỉnh

### 6. Tính Toàn Vẹn Dữ Liệu
- Khi xóa một **Agent**, cần xử lý các **Property** liên quan (xóa hoặc gán cho Agent khác)
- Khi xóa một **Project**, cần xử lý các **Property** liên quan (xóa hoặc gán project = null)

### 7. Hiệu Suất
- Các trường `views` và `favorites` được lưu trực tiếp trong **Property** và **Project** để tối ưu hóa truy vấn
- Có thể tạo index trên các trường này để tăng tốc độ tìm kiếm

---

## Sơ Đồ Mối Kết Hợp Chi Tiết

```
┌──────────────────────────────────────────────────────────────────────────┐
│                                 AGENT                                    │
│  ┌────────────────────────────────────────────────────────────────────┐  │
│  │ - name: String                                                     │  │
│  │ - phone: String                                                    │  │
│  │ - email: String                                                    │  │
│  │ - status: String                                                   │  │
│  │ - avatar: String                                                   │  │
│  └────────────────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────────────┘
                                    │
                                    │ 1:N (Agent_Property)
                                    │
                                    ▼
┌──────────────────────────────────────────────────────────────────────────┐
│                              PROPERTY                                    │
│  ┌────────────────────────────────────────────────────────────────────┐  │
│  │ - _id: ObjectId (Primary Key)                                      │  │
│  │ - title: String                                                    │  │
│  │ - location: String                                                 │  │
│  │ - address: Address (1:1)                                           │  │
│  │ - coordinates: Coordinates (1:1)                                   │  │
│  │ - price: Number                                                    │  │
│  │ - propertyType: String                                             │  │
│  │ - bedrooms: Number                                                 │  │
│  │ - bathrooms: Number                                                │  │
│  │ - area: Number                                                     │  │
│  │ - status: String                                                   │  │
│  │ - agent: Agent (1:1)                                               │  │
│  │ - project: Project._id (N:1, Optional)                             │  │
│  │ - views: Number                                                    │  │
│  │ - favorites: Number                                                │  │
│  │ - timestamps: Date                                                 │  │
│  └────────────────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────────────┘
                                    │
                                    │ N:1 (Project_Property)
                                    │
                                    ▼
┌──────────────────────────────────────────────────────────────────────────┐
│                              PROJECT                                     │
│  ┌────────────────────────────────────────────────────────────────────┐  │
│  │ - _id: ObjectId (Primary Key)                                      │  │
│  │ - name: String                                                     │  │
│  │ - slug: String (Unique)                                            │  │
│  │ - location: String                                                 │  │
│  │ - address: Address (1:1)                                           │  │
│  │ - coordinates: Coordinates (1:1)                                   │  │
│  │ - developer: String                                                │  │
│  │ - status: String                                                   │  │
│  │ - scale: Object                                                    │  │
│  │ - priceRange: Object                                               │  │
│  │ - progress: Object                                                 │  │
│  │ - images: [Image] (1:N)                                            │  │
│  │ - videos: [Video] (1:N)                                            │  │
│  │ - utilities: [Utility] (1:N)                                       │  │
│  │ - nearbyPlaces: [NearbyPlace] (1:N)                                │  │
│  │ - masterPlan: MasterPlan (1:1)                                     │  │
│  │ - salesPolicy: [SalesPolicy] (1:N)                                 │  │
│  │ - news: [News] (1:N)                                               │  │
│  │ - contact: Contact (1:1)                                           │  │
│  │ - seo: SEO (1:1)                                                   │  │
│  │ - views: Number                                                    │  │
│  │ - favorites: Number                                                │  │
│  │ - featured: Boolean                                                │  │
│  │ - verified: Boolean                                                │  │
│  │ - timestamps: Date                                                 │  │
│  └────────────────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────────────┘
         │              │              │              │              │
         │ 1:N          │ 1:N          │ 1:N          │ 1:N          │ 1:N
         │              │              │              │              │
         ▼              ▼              ▼              ▼              ▼
    ┌────────┐    ┌────────┐    ┌────────┐    ┌────────┐    ┌────────┐
    │ IMAGE  │    │ VIDEO  │    │UTILITY │    │NEARBY  │    │MASTER  │
    │        │    │        │    │        │    │ PLACE  │    │ PLAN   │
    └────────┘    └────────┘    └────────┘    └────────┘    └────────┘

         │              │              │
         │ 1:N          │ 1:N          │ 1:N
         │              │              │
         ▼              ▼              ▼
    ┌────────┐    ┌────────┐    ┌────────┐
    │ SALES  │    │ NEWS   │    │CONTACT │
    │POLICY  │    │        │    │        │
    └────────┘    └────────┘    └────────┘

         │
         │ 1:1
         │
         ▼
    ┌────────┐
    │  SEO   │
    └────────┘
```

---

## Ví Dụ Dữ Liệu

### Property Example
```json
{
  "_id": "ObjectId",
  "title": "Cho thuê gấp CHCC 3PN tại The Golden Armor",
  "location": "Ba Đình, Hà Nội",
  "address": {
    "street": "The Golden Armor",
    "ward": "Phường Ba Đình",
    "district": "Quận Ba Đình",
    "city": "Hà Nội",
    "fullAddress": "The Golden Armor, Phường Ba Đình, Quận Ba Đình, Hà Nội"
  },
  "coordinates": {
    "lat": 21.0285,
    "lng": 105.8581
  },
  "price": 20000000,
  "propertyType": "apartment",
  "bedrooms": 3,
  "bathrooms": 2,
  "area": 100,
  "agent": {
    "name": "Trần Thị B",
    "phone": "0902456***",
    "email": "tranb@example.com",
    "status": "Đăng hôm nay",
    "avatar": "avatar.jpg"
  },
  "project": "ObjectId_of_The_Golden_Armor_Project",
  "views": 456,
  "favorites": 23,
  "status": "available",
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T10:30:00Z"
}
```

### Project Example
```json
{
  "_id": "ObjectId",
  "name": "Vinhomes Ocean Park",
  "slug": "vinhomes-ocean-park",
  "location": "Gia Lâm, Hà Nội",
  "address": {
    "street": "Đại lộ Thăng Long",
    "ward": "Phường Đa Tốn",
    "district": "Quận Gia Lâm",
    "city": "Hà Nội",
    "fullAddress": "Đại lộ Thăng Long, Phường Đa Tốn, Quận Gia Lâm, Hà Nội"
  },
  "coordinates": {
    "lat": 21.0452,
    "lng": 105.9452
  },
  "developer": "Vingroup",
  "status": "selling",
  "scale": {
    "totalArea": 420,
    "totalUnits": 15000,
    "density": 35
  },
  "images": [
    {
      "url": "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200",
      "caption": "Phối cảnh tổng thể",
      "type": "main"
    }
  ],
  "utilities": [
    {
      "category": "Nội khu",
      "name": "Công viên biển nhân tạo 6.1ha",
      "icon": "beach"
    }
  ],
  "contact": {
    "hotline": "1900 232 389",
    "email": "info@vinhomes.vn",
    "website": "www.vinhomes.vn",
    "showroom": "Gia Lâm, Hà Nội"
  },
  "views": 45230,
  "favorites": 892,
  "featured": true,
  "verified": true,
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-15T10:30:00Z"
}
```
