import fs from 'fs';
import path from 'path';

export default defineEventHandler(async (event) => {
    try {
        const { folderName } = event.context.params;
        console.log("Folder name:", folderName);

        if (!folderName) {
            throw createError({ statusCode: 400, message: "Folder name is required" });
        }

        const imageDirectory = path.resolve('./public/projects/images', folderName);
        console.log("Resolved image directory:", imageDirectory);

        const files = await fs.promises.readdir(imageDirectory);
        console.log("Files found:", files);

        const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif|svg)$/i.test(file));
        console.log("Filtered image files:", imageFiles);

        return imageFiles.map(file => `/projects/images/${folderName}/${file}`);
    } catch (error) {
        console.error('Error handling API request:', error.message, error.stack);
        throw createError({ statusCode: 500, message: "Unable to process request" });
    }
});