# Hướng Dẫn Sử Dụng Chức Năng Tìm Kiếm Bất Động Sản

## Tổng Quan

Hệ thống tìm kiếm bất động sản đã được tích hợp đầy đủ với các tính năng lọc và sắp xếp mạnh mẽ.

## Các Tính Năng Chính

### 1. Tìm Kiếm Theo Từ Khóa
- Nhập từ khóa vào ô tìm kiếm (ví dụ: "Nhà riêng Thủ Đức", "Chung cư 2 phòng ngủ")
- Hệ thống sẽ tìm kiếm trong:
  - Tiêu đề bất động sản
  - Địa điểm
  - Mô tả chi tiết
- Nhấn Enter hoặc click nút "Tìm kiếm"

### 2. Lọc Theo Khoảng Giá

#### Mua Bán:
- Thỏa thuận
- Dưới 500 triệu
- 500 - 800 triệu
- 800 triệu - 1 tỷ
- 1 - 2 tỷ
- 2 - 3 tỷ
- 3 - 5 tỷ
- 5 - 7 tỷ
- 7 - 10 tỷ
- 10 - 20 tỷ
- 20 - 30 tỷ
- 30 - 40 tỷ
- 40 - 60 tỷ
- Trên 60 tỷ

#### Cho Thuê:
- Thỏa thuận
- Dưới 1 triệu
- 1 - 3 triệu
- 3 - 5 triệu
- 5 - 10 triệu
- 10 - 40 triệu
- 40 - 70 triệu
- 70 - 100 triệu
- Trên 100 triệu

### 3. Lọc Theo Diện Tích
- Dưới 30 m²
- 30 - 50 m²
- 50 - 80 m²
- 80 - 100 m²
- 100 - 150 m²
- 150 - 200 m²
- 200 - 250 m²
- 250 - 300 m²
- 300 - 500 m²
- Trên 500 m²

### 4. Lọc Theo Số Phòng
- **Phòng ngủ**: 1+, 2+, 3+, 4+, 5+ phòng ngủ
- **Phòng tắm**: 1+, 2+, 3+, 4+ phòng tắm

### 5. Lọc Theo Địa Điểm
Hỗ trợ tìm kiếm theo các thành phố lớn:
- Hồ Chí Minh
- Hà Nội
- Đà Nẵng
- Bình Dương
- Khánh Hòa
- Hải Phòng
- Cần Thơ
- Và nhiều tỉnh thành khác

### 6. Tin Xác Thực
- Chọn checkbox "Tin xác thực" để chỉ hiển thị các bất động sản đã được xác minh

### 7. Sắp Xếp Kết Quả
- **Mặc định**: Theo độ liên quan
- **Mới nhất**: Tin đăng mới nhất
- **Giá thấp đến cao**: Sắp xếp theo giá tăng dần
- **Giá cao đến thấp**: Sắp xếp theo giá giảm dần
- **Diện tích nhỏ đến lớn**: Sắp xếp theo diện tích tăng dần
- **Diện tích lớn đến nhỏ**: Sắp xếp theo diện tích giảm dần

## API Endpoints

### GET /api/properties

Tìm kiếm và lọc bất động sản với các query parameters:

```
GET /api/properties?search=nhà&minPrice=1000000000&maxPrice=5000000000&minArea=50&maxArea=100&bedrooms=2&verified=true&sortBy=price-asc
```

#### Query Parameters:

| Parameter | Mô tả | Ví dụ |
|-----------|-------|-------|
| `search` | Từ khóa tìm kiếm | `nhà riêng` |
| `location` | Địa điểm | `Hồ Chí Minh` |
| `minPrice` | Giá tối thiểu (VNĐ) | `1000000000` |
| `maxPrice` | Giá tối đa (VNĐ) | `5000000000` |
| `minArea` | Diện tích tối thiểu (m²) | `50` |
| `maxArea` | Diện tích tối đa (m²) | `100` |
| `bedrooms` | Số phòng ngủ tối thiểu | `2` |
| `bathrooms` | Số phòng tắm tối thiểu | `2` |
| `verified` | Tin xác thực | `true` |
| `sortBy` | Sắp xếp | `price-asc`, `price-desc`, `area-asc`, `area-desc`, `newest`, `oldest` |

## Cách Sử Dụng

### 1. Tìm Kiếm Từ Trang Chủ
```
1. Truy cập trang chủ
2. Chọn tab: "Mua bán", "Cho thuê" hoặc "Dự án"
3. Nhập từ khóa vào ô tìm kiếm
4. Nhấn Enter hoặc click "Tìm kiếm"
5. Hệ thống tự động chuyển đến trang tương ứng với kết quả tìm kiếm
```

### 2. Tìm Kiếm Cơ Bản
```
1. Truy cập trang Mua Bán, Cho Thuê hoặc Dự Án
2. Nhập từ khóa vào ô tìm kiếm
3. Nhấn Enter hoặc click "Tìm kiếm"
```

### 3. Tìm Kiếm Nâng Cao
```
1. Nhập từ khóa (tùy chọn)
2. Chọn các bộ lọc:
   - Khoảng giá
   - Diện tích
   - Số phòng ngủ/tắm
   - Địa điểm
   - Tin xác thực
3. Chọn cách sắp xếp
4. Kết quả tự động cập nhật
```

### 4. Xóa Bộ Lọc
```
Click nút "Xóa bộ lọc" để reset tất cả các bộ lọc về mặc định
```

## Ví Dụ Tìm Kiếm

### Ví dụ 1: Tìm kiếm từ trang chủ
```
1. Vào trang chủ
2. Chọn tab "Mua bán"
3. Nhập "Nhà riêng Thủ Đức"
4. Click "Tìm kiếm"
5. Hệ thống chuyển đến trang Nhà Đất Bán với kết quả tìm kiếm
```

### Ví dụ 2: Tìm nhà riêng ở Thủ Đức dưới 8 tỷ
```
- Từ khóa: "Nhà riêng Thủ Đức"
- Khoảng giá: "5 - 7 tỷ" hoặc "7 - 10 tỷ"
- Sắp xếp: "Giá thấp đến cao"
```

### Ví dụ 3: Tìm chung cư cho thuê 2 phòng ngủ
```
- Từ khóa: "Chung cư"
- Phòng ngủ: "2+ phòng ngủ"
- Khoảng giá: "5 - 10 triệu"
- Tin xác thực: Bật
```

### Ví dụ 4: Tìm đất nền diện tích lớn
```
- Từ khóa: "Đất nền"
- Diện tích: "300 - 500 m²" hoặc "Trên 500 m²"
- Sắp xếp: "Diện tích lớn đến nhỏ"
```

### Ví dụ 5: Tìm dự án từ trang chủ
```
1. Vào trang chủ
2. Chọn tab "Dự án"
3. Nhập "Vinhomes"
4. Click "Tìm kiếm"
5. Hệ thống chuyển đến trang Dự Án với kết quả tìm kiếm
```

## Lưu Ý

1. **Tìm kiếm từ trang chủ**: Thanh tìm kiếm ở trang chủ tự động điều hướng đến đúng trang dựa trên tab đã chọn
2. **Tự động cập nhật**: Kết quả tìm kiếm tự động cập nhật khi thay đổi bộ lọc
3. **Kết hợp bộ lọc**: Có thể kết hợp nhiều bộ lọc cùng lúc
4. **Không có kết quả**: Nếu không tìm thấy kết quả, thử điều chỉnh bộ lọc hoặc từ khóa
5. **Phân biệt Mua/Thuê**: Trang Mua Bán và Cho Thuê có bộ lọc giá khác nhau
6. **Query params**: Từ khóa tìm kiếm được lưu trong URL, có thể chia sẻ link tìm kiếm

## Kỹ Thuật

### Backend (Server)
- File: `server/routes/properties.js`
- Sử dụng MongoDB query với regex và operators
- Hỗ trợ tìm kiếm không phân biệt hoa thường
- Tối ưu hiệu suất với indexing

### Frontend (Client)
- Files: 
  - `client/src/pages/Home.jsx` - Thanh tìm kiếm trang chủ với điều hướng
  - `client/src/pages/PropertyList.jsx` - Trang danh sách BDS
  - `client/src/pages/ForSale.jsx` - Trang BDS bán
  - `client/src/pages/ForRent.jsx` - Trang BDS cho thuê
  - `client/src/pages/Projects.jsx` - Trang dự án
- Sử dụng React hooks (useState, useEffect)
- useNavigate để điều hướng từ trang chủ
- useSearchParams để đọc query từ URL
- Tự động fetch khi filters thay đổi
- URLSearchParams để xây dựng query string

## Cải Tiến Trong Tương Lai

- [ ] Tìm kiếm theo bản đồ
- [ ] Lưu bộ lọc yêu thích
- [ ] Nhận thông báo email khi có tin mới
- [ ] Tìm kiếm theo khoảng cách
- [ ] Lọc theo tiện ích xung quanh
- [ ] Tìm kiếm bằng giọng nói
- [ ] Gợi ý tìm kiếm thông minh
