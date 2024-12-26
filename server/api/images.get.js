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

  // Define your image mappings - you can move this to a separate config file
  const imageMap = {
    'portfolio': [
      '/projects/images/portfolio/image1.png',
      '/projects/images/portfolio/image2.png',
      '/projects/images/portfolio/image3.png',
      // Add all your portfolio images
    ],
    'takovi': [
      '/projects/images/takovi/image1.png',
      //xd
    ]
  };

  const images = imageMap[folder];
  
  if (!images) {
    throw createError({
      statusCode: 404,
      statusMessage: `No images found for folder: ${folder}`
    });
  }

  return images;
}); 
