import fs from 'fs';
import path from 'path';
import { createError } from 'h3';

export default defineEventHandler((event) => {
  const query = getQuery(event);
  const folder = query.folder;
  
  if (!folder) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Folder parameter is required'
    });
  }

  // Remove any leading or trailing slashes
  const sanitizedFolder = folder.replace(/^\/+|\/+$/g, '');
  
  try {
    // Log the current working directory
    console.log('CWD:', process.cwd());
    
    const imageDirectory = path.join(process.cwd(), 'public', 'projects', 'images', sanitizedFolder);
    
    // Log the full path we're trying to access
    console.log('Attempting to access:', imageDirectory);
    
    // Check if directory exists and log the result
    const directoryExists = fs.existsSync(imageDirectory);
    console.log('Directory exists:', directoryExists);

    if (!directoryExists) {
      throw createError({ 
        statusCode: 404,
        statusMessage: `Directory not found: ${imageDirectory}` 
      });
    }

    const files = fs.readdirSync(imageDirectory);
    console.log('Found files:', files);

    // Return URLs with correct path format
    const imageUrls = files.map((file) => `/projects/images/${sanitizedFolder}/${file}`);
    console.log('Returning URLs:', imageUrls);
    
    return imageUrls;
  } catch (error) {
    // Log the full error details
    console.error('Detailed error:', {
      message: error.message,
      stack: error.stack,
      code: error.code
    });
    
    throw createError({ 
      statusCode: 500, 
      statusMessage: `Server error: ${error.message}` 
    });
  }
}); 