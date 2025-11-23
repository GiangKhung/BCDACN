# Ứng Dụng Bán Bất Động Sản

Ứng dụng web bán bất động sản được xây dựng với ReactJS, NodeJS và Docker.

## Công nghệ sử dụng

- **Frontend**: React + Vite
- **Backend**: Node.js + Express
- **Containerization**: Docker

## Cài đặt và chạy

### Chạy với Docker (Khuyến nghị)

```bash
npm run docker:build
npm run docker:up
```

### Chạy local

1. Cài đặt dependencies:
```bash
cd client && npm install
cd ../server && npm install
```

2. Chạy ứng dụng:
```bash
npm run dev
```

## Truy cập

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
