# Puppeteer 截图服务

该项目提供了一个使用 Puppeteer 捕获网页截图的 Web 服务。它支持各种功能，例如自定义视口大小、全页面截图以及使用 `sharp` 库进行图像压缩。此外，它还可以作为 Docker 容器运行，以便轻松部署。

## 功能特点

- 捕获网页截图。
- 支持移动和桌面视口。
- 可自定义视口尺寸。
- 全页面截图。
- 使用 `sharp` 进行图像压缩。

## 先决条件

- Node.js（推荐 v16 或更高版本）
- npm（推荐 v7 或更高版本）
- Docker（可选，用于容器化部署）

## 安装

1. 克隆存储库：
    ```sh
    git clone https://github.com/yourusername/puppeteer-screenshot-service.git
    cd puppeteer-screenshot-service
    ```

2. 安装依赖项：
    ```sh
    npm install
    ```

## 使用方法

### 作为 Node.js 应用程序运行

1. 启动服务器：
    ```sh
    node index.js
    ```

2. 服务将在 `http://localhost:3000` 上可用。

### 作为 Docker 容器运行

1. 构建 Docker 镜像：
    ```sh
    docker build -t puppeteer-screenshot-service .
    ```

2. 运行 Docker 容器：
    ```sh
    docker run -d -p 3000:3000 puppeteer-screenshot-service
    ```

## API 端点

### 截图

- **URL**：`/screenshot`
- **方法**：`GET`
- **查询参数**：
  - `url`（必填）：要捕获的网页的 URL。
  - `type`（可选）：要模拟的设备类型（`mobile` 用于 iPhone 15）。
  - `width`（可选）：视口宽度（以像素为单位）。
  - `height`（可选）：视口高度（以像素为单位）。
  - `fullPage`（可选）：是否捕获全页面截图（`true` 或 `false`）。
  - `quality`（可选）：输出图像的质量（1-100，默认为 80）。

- **响应**： 
  - Content-Disposition: attachment; filename=screenshot_<random_string>.jpg
  - Content-Type: image/jpeg

## API 请求方法

| 方法   | 端点            | 描述                 |
|--------|-----------------|----------------------|
| GET    | `/screenshot`   | 捕获网页的截图。     |

### 查询参数

| 参数       | 类型    | 必填   | 描述                                   |
|------------|---------|--------|----------------------------------------|
| `url`      | 字符串  | 是     | 要捕获的网页 URL。                    |
| `type`     | 字符串  | 否     | 要模拟的设备类型（`mobile` 用于 iPhone 15）。 |
| `width`    | 整数    | 否     | 视口宽度（以像素为单位）。            |
| `height`   | 整数    | 否     | 视口高度（以像素为单位）。            |
| `fullPage` | 布尔值  | 否     | 是否捕获全页面截图（`true` 或 `false`）。  |
| `quality`  | 整数    | 否     | 输出图像的质量（1-100，默认为 80）。    |

### 示例

1. **默认（1920x1080）截图**：
    ```sh
    curl "http://localhost:3000/screenshot?url=https://example.com" --output screenshot_default.jpg
    ```

2. **移动设备（iPhone 15）截图**：
    ```sh
    curl "http://localhost:3000/screenshot?url=https://example.com&type=mobile" --output screenshot_mobile.jpg
    ```

3. **自定义尺寸（1024x768）截图**：
    ```sh
    curl "http://localhost:3000/screenshot?url=https://example.com&width=1024&height=768" --output screenshot_custom.jpg
    ```

4. **全页面截图**：
    ```sh
    curl "http://localhost:3000/screenshot?url=https://example.com&fullPage=true" --output screenshot_fullpage.jpg
    ```

5. **自定义质量（例如，quality=50）**：
    ```sh
    curl "http://localhost:3000/screenshot?url=https://example.com&quality=50" --output screenshot_compressed.jpg
    ```

## 配置

- **`index.js`**：这是设置 Express 服务器、Puppeteer 和 `sharp` 图像处理的主文件。
- **`package.json`**：包含项目元数据和依赖项。

## 错误处理

如果截图捕获失败，服务器将以 500 状态码和错误消息作为响应。

## 贡献

如果您发现任何错误或对改进有建议，请随时提交问题或拉取请求。

## 许可证

本项目基于 GNU 许可证。有关详细信息，请参阅 `LICENSE` 文件。

