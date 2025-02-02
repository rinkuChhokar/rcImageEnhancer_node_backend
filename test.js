const rcEnhanceImage = require('./index');
const path = require('path');
const inputImagePath = path.join(__dirname, 'images', 'exo2.jpg');
const outputImagePath = path.join(__dirname, 'output');


rcEnhanceImage(inputImagePath, outputImagePath, true);

