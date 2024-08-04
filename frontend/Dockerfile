## Build stage
FROM node:18-alpine AS build

# Thiết lập thư mục làm việc
WORKDIR /app

# Sao chép các tệp package.json và package-lock.json (hoặc yarn.lock) trước
COPY package*.json ./

# Cài đặt các dependencies
RUN npm install

# Sao chép mã nguồn của ứng dụng
COPY . .

# Build ứng dụng
RUN npm run build

## Run stage
FROM nginx:alpine

# Xóa tệp cấu hình mặc định của nginx
RUN rm -rf /usr/share/nginx/html/*

# Sao chép các tệp build từ bước build vào thư mục nginx html
COPY --from=build /app/build /usr/share/nginx/html

# Expose cổng 80
EXPOSE 80

# Chạy nginx trong foreground
CMD ["nginx", "-g", "daemon off;"]
