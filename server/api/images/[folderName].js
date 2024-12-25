import fs from 'fs';
import path from 'path';

export default defineEventHandler(async (event) => {
    try {
    const imageDirectory = path.join(process.cwd(), 'public', 'projects', 'images', folderName);

    console.log('Resolved directory path:', imageDirectory);

    if (!fs.existsSync(imageDirectory)) {
        console.error('Directory does not exist:', imageDirectory);
        throw createError({ statusCode: 404, message: "Image directory not found" });
    }

    const files = await fs.promises.readdir(imageDirectory);

    const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif|svg)$/i.test(file));
    console.log('Filtered image files:', imageFiles);

    if (imageFiles.length === 0) {
        console.warn('No image files found in directory:', imageDirectory);
        throw createError({ statusCode: 404, message: "No image files found" });
    }

    return imageFiles.map(file => `/projects/images/${folderName}/${file}`);
} catch (error) {
    console.error('Error occurred:', error.message, error.stack);
    throw createError({ statusCode: 500, message: error.message || "Unable to process request" });
}
});
