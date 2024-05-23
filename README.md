# Puppeteer Screenshot Service

This project provides a web service to capture screenshots of web pages using Puppeteer. It supports various features such as custom viewport sizes, full-page screenshots, and image compression using the `sharp` library. Additionally, it can be run as a Docker container for easy deployment.

## 中文说明

[中文说明](README_CN.md)

## Features

- Capture screenshots of web pages.
- Support for mobile and desktop viewports.
- Customizable viewport dimensions.
- Full-page screenshots.
- Image compression using `sharp`.

## Prerequisites

- Node.js (v16 or higher recommended)
- npm (v7 or higher recommended)
- Docker (optional, for containerized deployment)

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/puppeteer-screenshot-service.git
    cd puppeteer-screenshot-service
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

## Usage

### Running as a Node.js Application

1. Start the server:
    ```sh
    node index.js
    ```

2. The service will be available at `http://localhost:3000`.

### Running as a Docker Container

1. Build the Docker image:
    ```sh
    docker build -t puppeteer-screenshot-service .
    ```

2. Run the Docker container:
    ```sh
    docker run -d -p 3000:3000 puppeteer-screenshot-service
    ```

## API Endpoints

### Capture Screenshot

- **URL**: `/screenshot`
- **Method**: `GET`
- **Query Parameters**:
  - `url` (required): The URL of the web page to capture.
  - `type` (optional): The type of device to emulate (`mobile` for iPhone 15).
  - `width` (optional): The viewport width in pixels.
  - `height` (optional): The viewport height in pixels.
  - `fullPage` (optional): Whether to capture a full-page screenshot (`true` or `false`).
  - `quality` (optional): The quality of the output image (1-100, default is 80).

- **Response**: 
  - Content-Disposition: attachment; filename=screenshot_<random_string>.jpg
  - Content-Type: image/jpeg


## API Request Methods

| Method | Endpoint         | Description                              |
|--------|------------------|------------------------------------------|
| GET    | `/screenshot`    | Capture a screenshot of a webpage.       |

### Query Parameters

| Parameter | Type    | Required | Description                                           |
|-----------|---------|----------|-------------------------------------------------------|
| `url`     | String  | Yes      | The URL of the webpage to capture.                    |
| `type`    | String  | No       | The type of device to emulate (`mobile` for iPhone 15). |
| `width`   | Integer | No       | The viewport width in pixels.                        |
| `height`  | Integer | No       | The viewport height in pixels.                       |
| `fullPage`| Boolean | No       | Whether to capture a full-page screenshot (`true` or `false`). |
| `quality` | Integer | No       | The quality of the output image (1-100, default is 80). |

### Examples

1. **Default (1920x1080) Screenshot**:
    ```sh
    curl "http://localhost:3000/screenshot?url=https://example.com" --output screenshot_default.jpg
    ```

2. **Mobile (iPhone 15) Screenshot**:
    ```sh
    curl "http://localhost:3000/screenshot?url=https://example.com&type=mobile" --output screenshot_mobile.jpg
    ```

3. **Custom Dimensions (1024x768) Screenshot**:
    ```sh
    curl "http://localhost:3000/screenshot?url=https://example.com&width=1024&height=768" --output screenshot_custom.jpg
    ```

4. **Full Page Screenshot**:
    ```sh
    curl "http://localhost:3000/screenshot?url=https://example.com&fullPage=true" --output screenshot_fullpage.jpg
    ```

5. **Custom Quality (e.g., quality=50)**:
    ```sh
    curl "http://localhost:3000/screenshot?url=https://example.com&quality=50" --output screenshot_compressed.jpg
    ```


## Configuration

- **`index.js`**: This is the main file that sets up the Express server, Puppeteer, and `sharp` for image processing.
- **`package.json`**: Contains project metadata and dependencies.

## Error Handling

If a screenshot capture fails, the server will respond with a 500 status code and an error message.

## Contributing

Feel free to submit issues or pull requests if you find any bugs or have suggestions for improvements.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
