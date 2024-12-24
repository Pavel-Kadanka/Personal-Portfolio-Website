import fs from 'fs';
import path from 'path';

export default defineEventHandler(async (event) => {
    const { folderName } = event.context.params; // Get folder name from URL parameter
    const imageDirectory = path.resolve('./public/projects/images', folderName); // Path to your image folder
    const files = fs.readdirSync(imageDirectory);

    // Filter out non-image files (optional)
    const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif|svg)$/i.test(file));

    // Return the list of image paths relative to the public directory
    return imageFiles.map(file => `/projects/images/${folderName}/${file}`);
});
