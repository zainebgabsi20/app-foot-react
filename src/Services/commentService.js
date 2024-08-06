// commentService.js
export const fetchComments = async (matchId) => {
    const apiUrl = `https://api.superapp.mobizone.cloud/api/commentary/${matchId}`;
    console.log('Fetching from API:', apiUrl);
  
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };
  