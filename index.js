const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

function rcEnhanceImage(inputPath, outputPath, isAnime = false) {
    const filePath = path.resolve(inputPath);  // Ensure absolute path
    const fileNameWithExt = path.basename(inputPath);
    const fileName = path.parse(inputPath).name;
    const fileExt = path.extname(inputPath).slice(1);
    const outputFilePath = path.resolve(outputPath, `${fileName}_enhanced_image.${fileExt}`); // Define output path

    // Read file into a Buffer
    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return;
        }

        // Convert image to Base64 string (Data URI format)
        const base64Image = `data:image/${fileExt === "jpg" ? "jpeg" : fileExt};base64,${data.toString('base64')}`;

        const formData = new FormData();
        formData.append('image', base64Image);
        formData.append('fileNameWithExt', fileNameWithExt);
        formData.append('isAnime', isAnime ? "y" : "n");
        formData.append('fileExt', fileExt);

        // **Set Timeout Using AbortController**
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 30 * 60 * 1000); // 30 minutes timeout

        // Send Data URI to Flask backend
        fetch('http://127.0.0.1:5000/enhance', {
            method: 'POST',
            body: formData,
            signal: controller.signal, // Attach signal for timeout
        })
            .then((res) => res.json())
            .then((data) => {
                clearTimeout(timeout); // Clear timeout if request succeeds
                if (!data.enhanced_image) {
                    console.error('Error: No enhanced image received');
                    return;
                }

                // Extract Base64 content correctly
                const base64Data = data.enhanced_image.replace(new RegExp(`^data:image\/${fileExt};base64,`), "");

                // Ensure output directory exists
                if (!fs.existsSync(outputPath)) {
                    fs.mkdirSync(outputPath, { recursive: true });
                }

                // Save enhanced image to output folder
                fs.writeFile(outputFilePath, base64Data, { encoding: "base64" }, (err) => {
                    if (err) {
                        console.error('Error saving enhanced image:', err);
                    } else {
                        console.log(`Enhanced image saved at: ${outputFilePath}`);
                    }
                });
            })
            .catch((err) => {
                console.error('Error:', err);
            });
    });
}


module.exports = rcEnhanceImage;
