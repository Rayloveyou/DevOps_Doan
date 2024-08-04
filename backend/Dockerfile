# Stage 1: Build
FROM gradle:7.5.1-jdk17-alpine AS build

# Thiết lập thư mục làm việc
WORKDIR /app

# Sao chép tệp cấu hình Gradle và tệp mã nguồn vào thư mục làm việc
COPY build.gradle settings.gradle /app/
COPY src /app/src

# Tải về các dependencies trước để tận dụng caching
RUN gradle build --no-daemon || return 0

# Sao chép toàn bộ dự án vào thư mục làm việc
COPY . .

# Build dự án và tạo tệp jar, bỏ qua các bài kiểm tra
RUN gradle bootJar -x test --no-daemon

# Stage 2: Run
FROM openjdk:17-jdk-slim

WORKDIR /app

# Sao chép tệp jar từ bước xây dựng trước đó vào thư mục làm việc
COPY --from=build /app/build/libs/*.jar app.jar

# Thiết lập cổng mặc định mà ứng dụng sẽ chạy
EXPOSE 8080

# Lệnh để chạy ứng dụng
ENTRYPOINT ["java", "-jar", "app.jar"]
