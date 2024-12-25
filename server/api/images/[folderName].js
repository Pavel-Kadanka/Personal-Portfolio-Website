import fs from 'fs';
import path from 'path';

export default defineEventHandler(async (event) => {
    const { folderName } = event.context.params; // Extract the folder name from the URL
    console.log('Received folderName:', folderName); // Debugging line

    try {
        // Resolve the directory path based on the folder name
        const imageDirectory = path.resolve('public/projects/images', folderName);

        // Check if the directory exists
        if (!fs.existsSync(imageDirectory)) {
            throw createError({ statusCode: 404, statusMessage: `Directory "${folderName}" not found` });
        }

        // Read all files in the directory
        const files = fs.readdirSync(imageDirectory);

        // Map files to their public paths
        return files.map((file) => `/projects/images/${folderName}/${file}`);
    } catch (error) {
        // Log the error for debugging
        console.error(`Error fetching images for folder "${folderName}":`, error.message);
        throw createError({ statusCode: 500, statusMessage: error.message });
    }
});
