export const getImage = async (folderName) => {
  try {
    // Remove any leading or trailing slashes
    const sanitizedFolder = folderName.replace(/^\/+|\/+$/g, '');
    return await useFetch(`/api/images`, {
      query: {
        folder: sanitizedFolder
      }
    });
  } catch (error) {
    console.error(`Error fetching images for folder "${folderName}":`, error.message);
    throw error;
  }
};