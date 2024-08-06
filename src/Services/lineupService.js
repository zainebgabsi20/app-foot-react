export const fetchLineup = async (matchId) => {
  const apiUrl = `https://api.superapp.mobizone.cloud/api/lineup/${matchId}`;
  console.log('Fetching from API:', apiUrl);

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch lineup:', error);
    return []; // Return an empty array if there's an error
  }
};
