const API_BASE_URL = 'https://api.superapp.mobizone.cloud/api';

export const fetchMatchData = async (matchId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/match/${matchId}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching match data:', error);
    throw error;
  }
};
