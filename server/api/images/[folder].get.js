import fs from 'fs';
import path from 'path';
import { createError } from 'h3';

export default defineEventHandler((event) => {
  const folder = event.context.params.folder;
  
  // Remove any leading or trailing slashes
  const sanitizedFolder = folder.replace(/^\/+|\/+$/g, '');
  
  try {
    // Use process.cwd() to ensure we're using the correct base path
    const imageDirectory = path.join(process.cwd(), 'public', 'projects', 'images', sanitizedFolder);

    if (!fs.existsSync(imageDirectory)) {
      throw createError({ 
        statusCode: 404, 
        statusMessage: `Directory "${sanitizedFolder}" not found` 
      });
    }

    const files = fs.readdirSync(imageDirectory);
    // Return URLs with correct path format
    return files.map((file) => `/projects/images/${sanitizedFolder}/${file}`);
  } catch (error) {
    console.error('Server error:', error); // Add logging for debugging
    throw createError({ 
      statusCode: 500, 
      statusMessage: `Error processing request: ${error.message}` 
    });
  }
}); 