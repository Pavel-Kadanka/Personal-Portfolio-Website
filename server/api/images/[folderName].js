import fs from 'fs';
import path from 'path';

export default defineEventHandler(async (event) => {
    try {
        const { folderName } = event.context.params;

        if (!folderName) {
            console.error('Folder name is missing.');
            throw createError({ statusCode: 400, message: "Folder name is required" });
        }

        const imageDirectory = path.resolve('./public/projects/images', folderName);

        // Log resolved path and check directory existence
        console.log('Resolved directory path:', imageDirectory);
        if (!fs.existsSync(imageDirectory)) {
            console.error('Directory does not exist:', imageDirectory);
            throw createError({ statusCode: 404, message: "Image directory not found" });
        }

        // Read directory safely
        const files = await fs.promises.readdir(imageDirectory);
        console.log('Files found in directory:', files);

        const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif|svg)$/i.test(file));
        console.log('Filtered image files:', imageFiles);

        return imageFiles.map(file => `/projects/images/${folderName}/${file}`);
    } catch (error) {
        console.error('Error in API handler:', error);
        throw createError({ statusCode: 500, message: "Unable to process request" });
    }
});
