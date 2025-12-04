# Hướng Dẫn Trang Chi Tiết Phân Tích & Đánh Giá

## 📋 Tổng Quan

Trang chi tiết phân tích & đánh giá hiển thị nội dung đầy đủ của các bài phân tích, báo cáo thị trường, video đánh giá và góc nhìn chuyên gia về bất động sản.

## 🎯 Mục Đích

- Hiển thị nội dung chi tiết bài phân tích với định dạng chuyên nghiệp
- Cung cấp thông tin tác giả và nguồn tin đáng tin cậy
- Tăng tương tác qua share và related content
- Thu thập email qua newsletter subscription

## 📁 Files Liên Quan

```
client/src/pages/
├── AnalysisDetail.jsx      # Component chính
├── AnalysisDetail.css      # Styles
├── Analysis.jsx            # Trang danh sách (có link đến detail)
└── Analysis.css

client/src/App.jsx          # Route configuration
test-analysis-detail.html   # File test
```

## 🚀 Cách Sử Dụng

### 1. Truy Cập Trang

Có 2 cách để truy cập trang chi tiết:

**Cách 1: Từ trang danh sách**
```
1. Vào http://localhost:5173/analysis
2. Click vào bất kỳ bài phân tích nào
3. Tự động chuyển đến /analysis/:id
```

**Cách 2: Truy cập trực tiếp**
```
http://localhost:5173/analysis/1
http://localhost:5173/analysis/6
http://localhost:5173/analysis/7
```

### 2. Navigation

**Breadcrumb:**
```
Trang chủ / Phân tích & Đánh giá / [Loại bài viết]
```
- Click vào "Trang chủ" → về trang chủ
- Click vào "Phân tích & Đánh giá" → về trang danh sách

**Related Articles:**
- Click vào bài viết liên quan → chuyển sang bài đó
- Tự động load lại nội dung mới

## 🎨 Cấu Trúc Layout

### Main Content (Cột Trái)

```
┌─────────────────────────────────────┐
│ Breadcrumb Navigation               │
├─────────────────────────────────────┤
│ Category Badge                      │
│ Article Title (H1)                  │
│                                     │
│ ┌─────────────┐  Date & Stats      │
│ │ Author Info │                     │
│ └─────────────┘                     │
├─────────────────────────────────────┤
│ Featured Image                      │
├─────────────────────────────────────┤
│ Summary Box (Highlighted)           │
├─────────────────────────────────────┤
│ Main Content                        │
│ - Headings (H2, H3)                │
│ - Paragraphs                        │
│ - Lists                             │
│ - Images                            │
├─────────────────────────────────────┤
│ Tags                                │
├─────────────────────────────────────┤
│ Share Buttons                       │
└─────────────────────────────────────┘
```

### Sidebar (Cột Phải)

```
┌─────────────────────────┐
│ Related Articles        │
│ ┌─────────────────────┐ │
│ │ Article 1           │ │
│ └─────────────────────┘ │
│ ┌─────────────────────┐ │
│ │ Article 2           │ │
│ └─────────────────────┘ │
│ ┌─────────────────────┐ │
│ │ Article 3           │ │
│ └─────────────────────┘ │
├─────────────────────────┤
│ Newsletter Signup       │
│ ┌─────────────────────┐ │
│ │ Email Input         │ │
│ │ [Đăng ký]          │ │
│ └─────────────────────┘ │
└─────────────────────────┘
```

## 🎯 Các Thành Phần Chính

### 1. Article Header

**Thông tin hiển thị:**
- Category badge (màu xanh)
- Tiêu đề bài viết (H1, lớn, nổi bật)
- Avatar tác giả
- Tên tác giả
- Vai trò/chức danh
- Ngày đăng
- Lượt xem
- Lượt share

### 2. Featured Image

- Hình ảnh chính của bài viết
- Full width
- Border radius 12px
- Responsive

### 3. Summary Box

- Background màu xám nhạt
- Border trái màu xanh
- Font chữ lớn hơn
- Italic style
- Tóm tắt nội dung chính

### 4. Main Content

**Hỗ trợ các thẻ HTML:**
- `<h2>`, `<h3>` - Headings
- `<p>` - Paragraphs
- `<ul>`, `<ol>`, `<li>` - Lists
- `<strong>`, `<em>` - Text formatting
- `<img>` - Images

**Styling tự động:**
- H2: Border bottom màu xanh
- H3: Margin top/bottom
- Paragraphs: Line height 1.8
- Lists: Padding left, margin

### 5. Tags

- Hiển thị dạng pills
- Background xám
- Hover → màu xanh
- Click → filter bài viết (tính năng tương lai)

### 6. Share Buttons

**4 nút chia sẻ:**
- Facebook (màu xanh Facebook)
- Twitter (màu xanh Twitter)
- LinkedIn (màu xanh LinkedIn)
- Copy Link (màu xám)

**Hover effect:**
- Transform translateY(-3px)
- Box shadow

### 7. Related Articles

**Mỗi item hiển thị:**
- Thumbnail image
- Category
- Title
- Date

**Interaction:**
- Hover → translateX(5px)
- Click → navigate to article

### 8. Newsletter Form

**Components:**
- Email input field
- Submit button
- Description text

**Validation:**
- Email format check
- Required field

## 📱 Responsive Design

### Desktop (>1024px)
```css
.analysis-detail-content {
  grid-template-columns: 1fr 350px;
  gap: 2rem;
}
```

### Tablet (768px - 1024px)
```css
.analysis-detail-content {
  grid-template-columns: 1fr;
}
/* Sidebar xuống dưới */
```

### Mobile (<768px)
```css
.article-main {
  padding: 2rem 1.5rem;
}
.article-title {
  font-size: 1.8rem;
}
.article-meta {
  flex-direction: column;
}
```

## 🔧 Customization

### Thay Đổi Màu Sắc

```css
/* Primary color */
--primary-color: #3498db;

/* Text colors */
--text-dark: #2c3e50;
--text-gray: #666;

/* Background */
--bg-light: #f8f9fa;
```

### Thay Đổi Font Size

```css
.article-title {
  font-size: 2.5rem; /* Desktop */
}

@media (max-width: 768px) {
  .article-title {
    font-size: 1.8rem; /* Mobile */
  }
}
```

### Thay Đổi Layout

```css
/* 3 columns layout */
.analysis-detail-content {
  grid-template-columns: 250px 1fr 350px;
}

/* Full width (no sidebar) */
.analysis-detail-content {
  grid-template-columns: 1fr;
}
```

## 🔌 Tích Hợp API

### Hiện Tại (Mock Data)

```javascript
const mockArticle = {
  id: id,
  title: 'Biểu Đồ Giá...',
  category: 'Biểu đồ giá',
  date: '15/10/2025 10:00',
  author: 'Nguyễn Văn A',
  // ...
};
```

### Tương Lai (Real API)

**1. Tạo API Endpoint:**

```javascript
// server/routes/analysis.js
router.get('/:id', async (req, res) => {
  try {
    const article = await Analysis.findById(req.params.id);
    res.json(article);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

**2. Update Component:**

```javascript
const fetchArticleDetail = async () => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/analysis/${id}`
    );
    setArticle(response.data);
  } catch (error) {
    console.error('Error:', error);
  }
};
```

**3. Tạo Model:**

```javascript
// server/models/Analysis.js
const analysisSchema = new mongoose.Schema({
  title: String,
  category: String,
  date: Date,
  author: {
    name: String,
    role: String,
    avatar: String
  },
  image: String,
  summary: String,
  content: String,
  tags: [String],
  views: Number,
  shares: Number
});
```

## 🎬 Xử Lý Video Content

Đối với bài viết có video:

```javascript
// Thêm video player
<div className="article-video">
  <iframe
    src={article.videoUrl}
    frameBorder="0"
    allowFullScreen
  />
</div>
```

```css
.article-video {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 */
  height: 0;
  overflow: hidden;
}

.article-video iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
```

## 📊 Analytics & Tracking

### Track Page Views

```javascript
useEffect(() => {
  // Increment view count
  axios.post(`/api/analysis/${id}/view`);
  
  // Google Analytics
  if (window.gtag) {
    window.gtag('event', 'page_view', {
      page_title: article.title,
      page_path: `/analysis/${id}`
    });
  }
}, [id]);
```

### Track Shares

```javascript
const handleShare = async (platform) => {
  // Increment share count
  await axios.post(`/api/analysis/${id}/share`, { platform });
  
  // Open share dialog
  const shareUrl = window.location.href;
  const shareText = article.title;
  
  switch(platform) {
    case 'facebook':
      window.open(`https://facebook.com/sharer/sharer.php?u=${shareUrl}`);
      break;
    case 'twitter':
      window.open(`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareText}`);
      break;
    // ...
  }
};
```

## 🔍 SEO Optimization

### Meta Tags

```javascript
import { Helmet } from 'react-helmet';

<Helmet>
  <title>{article.title} | Real Estate Analysis</title>
  <meta name="description" content={article.summary} />
  <meta property="og:title" content={article.title} />
  <meta property="og:description" content={article.summary} />
  <meta property="og:image" content={article.image} />
  <meta property="og:url" content={window.location.href} />
</Helmet>
```

### Structured Data

```javascript
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "{article.title}",
  "image": "{article.image}",
  "author": {
    "@type": "Person",
    "name": "{article.author}"
  },
  "datePublished": "{article.date}"
}
</script>
```

## 🧪 Testing

### Test Cases

1. **Navigation**
   - ✓ Breadcrumb links work
   - ✓ Related articles navigation
   - ✓ Back button works

2. **Content Display**
   - ✓ Title renders correctly
   - ✓ Author info displays
   - ✓ Image loads
   - ✓ HTML content formats properly
   - ✓ Tags display

3. **Interactions**
   - ✓ Share buttons work
   - ✓ Newsletter form submits
   - ✓ Related articles clickable

4. **Responsive**
   - ✓ Desktop layout (>1024px)
   - ✓ Tablet layout (768-1024px)
   - ✓ Mobile layout (<768px)

5. **Error Handling**
   - ✓ Loading state
   - ✓ 404 not found
   - ✓ Network error

### Test File

Mở `test-analysis-detail.html` trong trình duyệt để xem hướng dẫn test chi tiết.

## 🚀 Deployment

### Build

```bash
cd client
npm run build
```

### Environment Variables

```env
VITE_API_URL=https://api.yourdomain.com
```

### Update API URLs

```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const response = await axios.get(`${API_URL}/api/analysis/${id}`);
```

## 📝 Checklist Hoàn Thiện

- [x] Tạo component AnalysisDetail.jsx
- [x] Tạo styles AnalysisDetail.css
- [x] Thêm route vào App.jsx
- [x] Tạo file test HTML
- [x] Viết documentation
- [ ] Tích hợp API thực
- [ ] Thêm video player
- [ ] Implement share functionality
- [ ] Thêm comments section
- [ ] SEO optimization
- [ ] Analytics tracking
- [ ] Performance optimization

## 🎯 Tính Năng Mở Rộng

### 1. Comments Section
- Cho phép người dùng bình luận
- Reply to comments
- Like/dislike comments

### 2. Reading Progress Bar
- Hiển thị % đã đọc
- Sticky progress bar ở top

### 3. Table of Contents
- Auto-generate từ headings
- Sticky sidebar
- Smooth scroll to section

### 4. Print/PDF Export
- Export bài viết ra PDF
- Print-friendly layout

### 5. Bookmark/Save
- Lưu bài viết để đọc sau
- Sync across devices

## 📞 Hỗ Trợ

Nếu có vấn đề hoặc câu hỏi, vui lòng:
1. Kiểm tra console log
2. Xem file test-analysis-detail.html
3. Đọc lại documentation này
4. Liên hệ team support
