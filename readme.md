# rcEnhanceImage

## Overview

`rcEnhanceImage` is a Node.js function that enhances images using a Flask-based ESRGAN backend. It converts an input image to Base64 format, sends it to the backend for enhancement, and saves the enhanced image locally.

## Features

- Converts input images to Base64 and sends them to a Flask backend.
- Supports anime and non-anime image enhancement.
- Handles file reading and writing automatically.
- Uses `AbortController` to set a 30-minute request timeout.
- Ensures output directory exists before saving the enhanced image.

## Prerequisites

- Node.js installed
- A running Flask backend at `http://127.0.0.1:5000/enhance`
- Required Node.js dependencies:
  ```sh
  npm install node-fetch form-data
  ```

## Installation

Clone the repository and install dependencies:

```sh
npm install
```

## Usage

Import the function and use it in your Node.js project:

```javascript
const rcEnhanceImage = require("./rcEnhanceImage");

const inputImagePath = "path/to/input/image.jpg";
const outputFolderPath = "path/to/output/folder";
const isAnime = true; // Set to false for non-anime enhancement

rcEnhanceImage(inputImagePath, outputFolderPath, isAnime);
```

## Parameters

- `inputPath` (string): Path to the input image.
- `outputPath` (string): Directory where the enhanced image will be saved.
- `isAnime` (boolean, optional): Set `true` for anime-style images, `false` for standard images (default: `false`).

## Expected Output

- The enhanced image will be saved in the `outputPath` with `_enhanced_image` appended to the filename.
- Console logs will indicate the process status.

## Error Handling

- Logs errors if the input file is missing or cannot be read.
- Logs an error if the Flask backend does not return an enhanced image.
- Handles network request failures.

## License

This project is open-source and available under the MIT License.

## Author

Developed by [Rinku](https://github.com/rinkuChhokar)
