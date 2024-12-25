import fs from 'fs';
import path from 'path';

export default defineEventHandler(async (event) => {
    try {
        // Extract the folder name from the route parameters
        const { folderName } = event.context.params;

        // Log the received folder name
        console.log('Folder name received:', folderName);

        // Check if folderName exists
        if (!folderName) {
            console.warn('Folder name is missing in the request.');
            throw createError({ statusCode: 400, message: "Folder name is required" });
        }

        // Resolve the directory path
        const imageDirectory = path.join(process.cwd(), 'public', 'projects', 'images', folderName);

        // Log the resolved directory path
        console.log('Resolved directory path:', imageDirectory);

        // Check if the directory exists
        if (!fs.existsSync(imageDirectory)) {
            console.warn('Directory does not exist:', imageDirectory);
            throw createError({ statusCode: 404, message: `Image directory "${folderName}" not found` });
        }

        // Read the directory contents
        const files = await fs.promises.readdir(imageDirectory);

        // Log all files found
        console.log('Files found in directory:', files);

        // Filter files to include only images
        const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif|svg)$/i.test(file));

        // Log filtered image files
        console.log('Filtered image files:', imageFiles);

        // If no image files are found, log a warning
        if (imageFiles.length === 0) {
            console.warn('No image files found in directory:', imageDirectory);
            throw createError({ statusCode: 404, message: "No image files found in the directory" });
        }

        // Return the list of image paths
        return imageFiles.map(file => `/projects/images/${folderName}/${file}`);
    } catch (error) {
        // Log the full error for debugging
        console.error('Error occurred in API handler:', error.message);
        console.error('Error stack trace:', error.stack);

        // Rethrow the error with a generic message to avoid exposing sensitive details
        throw createError({
            statusCode: 500,
            message: "An internal server error occurred. Check server logs for more details."
        });
    }
});
