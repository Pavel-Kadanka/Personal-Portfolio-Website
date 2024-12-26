export const getImage = async (folderName) => {
  try {
    // Remove any leading or trailing slashes
    const sanitizedFolder = folderName.replace(/^\/+|\/+$/g, '');
    const response = await fetch(`/api/images?folder=${encodeURIComponent(sanitizedFolder)}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch images: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching images for folder "${folderName}":`, error.message);
    throw error;
  }
};