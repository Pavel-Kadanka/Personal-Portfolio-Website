import fs from 'fs';
import path from 'path';

export default defineEventHandler(async (event) => {
    try {
        const { folderName } = event.context.params;

        if (!folderName) {
            throw createError({ statusCode: 400, message: "Folder name is required" });
        }

        const imageDirectory = path.resolve('./public/projects/images', folderName);

        // Safely read directory
        const files = await fs.promises.readdir(imageDirectory);
        const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif|svg)$/i.test(file));

        return imageFiles.map(file => `/projects/images/${folderName}/${file}`);
    } catch (error) {
        console.error('Error handling API request:', error);
        throw createError({ statusCode: 500, message: "Unable to process request" });
    } //test
});

