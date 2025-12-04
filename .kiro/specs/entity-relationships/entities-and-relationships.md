# Danh Sách Các Thực Thể và Mối Kết Hợp

## 1. Tổng Quan Hệ Thống

Hệ thống bất động sản gồm các thực thể chính liên quan đến quản lý bất động sản, dự án, người dùng và các thông tin liên quan.

---

## 2. Các Thực Thể Chính

### 2.1 Property (Bất Động Sản)
**Mô tả:** Đại diện cho một bất động sản cụ thể (căn hộ, nhà, đất, văn phòng, v.v.)

**Thuộc tính chính:**
- `id`: Mã định danh duy nhất
- `title`: Tiêu đề bất động sản
- `location`: Vị trí (tỉnh/thành phố)
- `address`: Địa chỉ chi tiết (đường, phường, quận, thành phố)
- `coordinates`: Tọa độ GPS (lat, lng)
- `price`: Giá tiền
- `pricePerMonth`: Có phải giá theo tháng không
- `pricePerSqm`: Giá trên m²
- `propertyType`: Loại bất động sản (apartment, house, villa, land, townhouse, office, shophouse)
- `bedrooms`: Số phòng ngủ
- `bathrooms`: Số phòng tắm
- `floors`: Số tầng
- `area`: Diện tích (m²)
- `width`: Chiều ngang (m)
- `length`: Chiều dài (m)
- `direction`: Hướng nhà (east, west, south, north, northeast, northwest, southeast, southwest)
- `balconyDirection`: Hướng ban công
- `legalDocument`: Loại giấy tờ pháp lý (red-book, pink-book, sale-contract, waiting)
- `furniture`: Tình trạng nội thất (full, basic, empty)
- `features`: Danh sách đặc điểm
- `amenities`: Danh sách tiện ích
- `images`: Số lượng hình ảnh
- `image`: Hình ảnh chính
- `imageList`: Danh sách hình ảnh
- `description`: Mô tả chi tiết
- `project`: Thông tin dự án (nếu có)
- `vip`: Mức VIP
- `verified`: Đã xác minh
- `hasVideo`: Có video
- `status`: Trạng thái (available, pending, sold, rented)
- `agent`: Thông tin người đăng
- `yearBuilt`: Năm xây dựng
- `roadWidth`: Chiều rộng đường (m)
- `distanceToRoad`: Cách mặt đường (m)
- `views`: Số lượt xem
- `favorites`: Số lượt yêu thích
- `timestamps`: Thời gian tạo/cập nhật

---

### 2.2 Project (Dự Án)
**Mô tả:** Đại diện cho một dự án bất động sản (khu đô thị, chung cư, biệt thự, v.v.)

**Thuộc tính chính:**
- `id`: Mã định danh duy nhất
- `name`: Tên dự án
- `slug`: Đường dẫn thân thiện (URL slug)
- `location`: Vị trí (tỉnh/thành phố)
- `address`: Địa chỉ chi tiết
- `coordinates`: Tọa độ GPS
- `developer`: Tên chủ đầu tư
- `status`: Trạng thái (planning, selling, building, completed, handover)
- `scale`: Quy mô dự án
  - `totalArea`: Tổng diện tích (ha)
  - `totalUnits`: Tổng số căn
  - `density`: Mật độ xây dựng (%)
- `productTypes`: Loại sản phẩm (villa, townhouse, apartment, shophouse, land)
- `priceRange`: Khoảng giá
  - `min`: Giá tối thiểu
  - `max`: Giá tối đa
  - `unit`: Đơn vị (vnd, million, billion)
- `priceText`: Văn bản giá
- `progress`: Tiến độ dự án
  - `startDate`: Ngày bắt đầu
  - `completionDate`: Ngày hoàn thành
  - `handoverDate`: Ngày bàn giao
  - `currentProgress`: Tiến độ hiện tại (%)
- `images`: Danh sách hình ảnh
- `mainImage`: Hình ảnh chính
- `videos`: Danh sách video
- `description`: Mô tả dự án
- `overview`: Tổng quan
- `utilities`: Danh sách tiện ích
- `nearbyPlaces`: Địa điểm lân cận
- `masterPlan`: Mặt bằng tổng thể
- `legal`: Thông tin pháp lý
- `salesPolicy`: Chính sách bán hàng
- `contact`: Thông tin liên hệ
- `news`: Tin tức dự án
- `seo`: Thông tin SEO
- `views`: Số lượt xem
- `favorites`: Số lượt yêu thích
- `featured`: Nổi bật
- `verified`: Đã xác minh
- `timestamps`: Thời gian tạo/cập nhật

---

### 2.3 Agent (Người Đăng/Môi Giới)
**Mô tả:** Đại diện cho một người đăng tin hoặc môi giới bất động sản

**Thuộc tính chính:**
- `name`: Tên người đăng
- `phone`: Số điện thoại
- `email`: Email
- `status`: Trạng thái (ví dụ: "Đăng hôm nay")
- `avatar`: Ảnh đại diện

---

### 2.4 Address (Địa Chỉ)
**Mô tả:** Đại diện cho một địa chỉ cụ thể

**Thuộc tính chính:**
- `street`: Tên đường
- `ward`: Phường/Xã
- `district`: Quận/Huyện
- `city`: Thành phố/Tỉnh
- `fullAddress`: Địa chỉ đầy đủ

---

### 2.5 Coordinates (Tọa Độ)
**Mô tả:** Đại diện cho tọa độ GPS

**Thuộc tính chính:**
- `lat`: Vĩ độ
- `lng`: Kinh độ

---

### 2.6 Image (Hình Ảnh)
**Mô tả:** Đại diện cho một hình ảnh trong dự án

**Thuộc tính chính:**
- `url`: Đường dẫn hình ảnh
- `caption`: Chú thích
- `type`: Loại (main, gallery, masterplan, facility, location)

---

### 2.7 Video (Video)
**Mô tả:** Đại diện cho một video trong dự án

**Thuộc tính chính:**
- `url`: Đường dẫn video
- `title`: Tiêu đề
- `thumbnail`: Ảnh thumbnail

---

### 2.8 Utility (Tiện Ích)
**Mô tả:** Đại diện cho một tiện ích trong dự án

**Thuộc tính chính:**
- `category`: Danh mục (Nội khu, Giáo dục, Y tế, Mua sắm, Thể thao, Giải trí)
- `name`: Tên tiện ích
- `icon`: Biểu tượng

---

### 2.9 NearbyPlace (Địa Điểm Lân Cận)
**Mô tả:** Đại diện cho một địa điểm lân cận dự án

**Thuộc tính chính:**
- `name`: Tên địa điểm
- `distance`: Khoảng cách
- `placeType`: Loại địa điểm (city, airport, district, hospital, school, mall)

---

### 2.10 MasterPlan (Mặt Bằng Tổng Thể)
**Mô tả:** Đại diện cho mặt bằng tổng thể của dự án

**Thuộc tính chính:**
- `image`: Hình ảnh mặt bằng
- `description`: Mô tả

---

### 2.11 SalesPolicy (Chính Sách Bán Hàng)
**Mô tả:** Đại diện cho một chính sách bán hàng

**Thuộc tính chính:**
- `title`: Tiêu đề chính sách
- `description`: Mô tả chính sách

---

### 2.12 News (Tin Tức)
**Mô tả:** Đại diện cho một tin tức dự án

**Thuộc tính chính:**
- `title`: Tiêu đề tin tức
- `date`: Ngày đăng
- `content`: Nội dung
- `image`: Hình ảnh

---

### 2.13 Contact (Thông Tin Liên Hệ)
**Mô tả:** Đại diện cho thông tin liên hệ

**Thuộc tính chính:**
- `hotline`: Số hotline
- `email`: Email
- `website`: Website
- `showroom`: Địa chỉ showroom

---

### 2.14 SEO (Thông Tin SEO)
**Mô tả:** Đại diện cho thông tin SEO

**Thuộc tính chính:**
- `title`: Tiêu đề SEO
- `description`: Mô tả SEO
- `keywords`: Danh sách từ khóa

---

## 3. Mối Kết Hợp Giữa Các Thực Thể

### 3.1 Property - Agent (1:N)
**Mô tả:** Một người đăng có thể đăng nhiều bất động sản, nhưng mỗi bất động sản chỉ có một người đăng

```
Agent (1) ----< (N) Property
```

**Ví dụ:**
- Agent "Trần Thị B" đăng Property "Cho thuê gấp CHCC 3PN tại The Golden Armor"
- Agent "Trần Thị B" cũng đăng Property "BQL GoldSeason Nguyễn Tuân cho thuê 500m2"

---

### 3.2 Property - Project (N:1)
**Mô tả:** Nhiều bất động sản có thể thuộc về một dự án, nhưng mỗi bất động sản chỉ thuộc một dự án (nếu có)

```
Project (1) ----< (N) Property
```

**Ví dụ:**
- Project "The Pearl - Waterpoint" có nhiều Property (biệt thự, nhà phố)
- Property "TẤT TẦN TẤT GIỜ HÀNG MUA TỪ CDT VÀ GIỜ HÀNG CHUYỂN NHƯỢNG THE GIÓ RIVERSIDE" thuộc Project "The Gió Riverside"

---

### 3.3 Property - Address (1:1)
**Mô tả:** Mỗi bất động sản có một địa chỉ duy nhất

```
Property (1) ---- (1) Address
```

---

### 3.4 Property - Coordinates (1:1)
**Mô tả:** Mỗi bất động sản có một tọa độ GPS duy nhất

```
Property (1) ---- (1) Coordinates
```

---

### 3.5 Project - Address (1:1)
**Mô tả:** Mỗi dự án có một địa chỉ duy nhất

```
Project (1) ---- (1) Address
```

---

### 3.6 Project - Coordinates (1:1)
**Mô tả:** Mỗi dự án có một tọa độ GPS duy nhất

```
Project (1) ---- (1) Coordinates
```

---

### 3.7 Project - Image (1:N)
**Mô tả:** Một dự án có nhiều hình ảnh

```
Project (1) ----< (N) Image
```

---

### 3.8 Project - Video (1:N)
**Mô tả:** Một dự án có nhiều video

```
Project (1) ----< (N) Video
```

---

### 3.9 Project - Utility (1:N)
**Mô tả:** Một dự án có nhiều tiện ích

```
Project (1) ----< (N) Utility
```

---

### 3.10 Project - NearbyPlace (1:N)
**Mô tả:** Một dự án có nhiều địa điểm lân cận

```
Project (1) ----< (N) NearbyPlace
```

---

### 3.11 Project - MasterPlan (1:1)
**Mô tả:** Mỗi dự án có một mặt bằng tổng thể duy nhất

```
Project (1) ---- (1) MasterPlan
```

---

### 3.12 Project - SalesPolicy (1:N)
**Mô tả:** Một dự án có nhiều chính sách bán hàng

```
Project (1) ----< (N) SalesPolicy
```

---

### 3.13 Project - News (1:N)
**Mô tả:** Một dự án có nhiều tin tức

```
Project (1) ----< (N) News
```

---

### 3.14 Project - Contact (1:1)
**Mô tả:** Mỗi dự án có một thông tin liên hệ duy nhất

```
Project (1) ---- (1) Contact
```

---

### 3.15 Project - SEO (1:1)
**Mô tả:** Mỗi dự án có một thông tin SEO duy nhất

```
Project (1) ---- (1) SEO
```

---

## 4. Sơ Đồ Mối Kết Hợp (ER Diagram)

```
┌─────────────────────────────────────────────────────────────────┐
│                         AGENT                                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ - name: String                                           │  │
│  │ - phone: String                                          │  │
│  │ - email: String                                          │  │
│  │ - status: String                                         │  │
│  │ - avatar: String                                         │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ 1:N
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                       PROPERTY                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ - id: String                                             │  │
│  │ - title: String                                          │  │
│  │ - location: String                                       │  │
│  │ - price: Number                                          │  │
│  │ - propertyType: String                                   │  │
│  │ - bedrooms: Number                                       │  │
│  │ - bathrooms: Number                                      │  │
│  │ - area: Number                                           │  │
│  │ - status: String                                         │  │
│  │ - views: Number                                          │  │
│  │ - favorites: Number                                      │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ N:1
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                       PROJECT                                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ - id: String                                             │  │
│  │ - name: String                                           │  │
│  │ - slug: String                                           │  │
│  │ - location: String                                       │  │
│  │ - developer: String                                      │  │
│  │ - status: String                                         │  │
│  │ - scale: Object                                          │  │
│  │ - priceRange: Object                                     │  │
│  │ - progress: Object                                       │  │
│  │ - views: Number                                          │  │
│  │ - favorites: Number                                      │  │
│  │ - featured: Boolean                                      │  │
│  │ - verified: Boolean                                      │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
         │              │              │              │
         │ 1:N          │ 1:N          │ 1:N          │ 1:N
         │              │              │              │
         ▼              ▼              ▼              ▼
    ┌────────┐    ┌────────┐    ┌────────┐    ┌────────┐
    │ IMAGE  │    │ VIDEO  │    │UTILITY │    │ NEWS   │
    └────────┘    └────────┘    └────────┘    └────────┘
```

---

## 5. Bảng Tóm Tắt Mối Kết Hợp

| Thực Thể 1 | Mối Kết Hợp | Thực Thể 2 | Mô Tả |
|-----------|-----------|-----------|-------|
| Agent | 1:N | Property | Một người đăng có nhiều bất động sản |
| Project | 1:N | Property | Một dự án có nhiều bất động sản |
| Property | 1:1 | Address | Mỗi bất động sản có một địa chỉ |
| Property | 1:1 | Coordinates | Mỗi bất động sản có một tọa độ |
| Project | 1:1 | Address | Mỗi dự án có một địa chỉ |
| Project | 1:1 | Coordinates | Mỗi dự án có một tọa độ |
| Project | 1:N | Image | Một dự án có nhiều hình ảnh |
| Project | 1:N | Video | Một dự án có nhiều video |
| Project | 1:N | Utility | Một dự án có nhiều tiện ích |
| Project | 1:N | NearbyPlace | Một dự án có nhiều địa điểm lân cận |
| Project | 1:1 | MasterPlan | Mỗi dự án có một mặt bằng tổng thể |
| Project | 1:N | SalesPolicy | Một dự án có nhiều chính sách bán hàng |
| Project | 1:N | News | Một dự án có nhiều tin tức |
| Project | 1:1 | Contact | Mỗi dự án có một thông tin liên hệ |
| Project | 1:1 | SEO | Mỗi dự án có một thông tin SEO |

---

## 6. Ghi Chú Quan Trọng

1. **Mối Kết Hợp Tùy Chọn:** Mối kết hợp giữa Property và Project là tùy chọn (một bất động sản có thể không thuộc dự án nào)

2. **Dữ Liệu Nhúng:** Các thực thể như Address, Coordinates, Image, Video, v.v. được nhúng trực tiếp trong Property hoặc Project thay vì tạo bảng riêng

3. **Mở Rộng Tương Lai:** Có thể thêm các thực thể mới như User, Favorite, Review, Transaction, v.v.

4. **Tính Toàn Vẹn Dữ Liệu:** Cần đảm bảo tính toàn vẹn dữ liệu khi xóa Agent hoặc Project
