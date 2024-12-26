export const getImage = async (folderName) => {
  try {
    const response = await fetch(`/api/images/${folderName}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch images: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching images for folder "${folderName}":`, error.message);
    throw error;
  }
};