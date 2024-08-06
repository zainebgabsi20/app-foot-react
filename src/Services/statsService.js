

export const fetchMatchStats = async (matchId) => {
    const response = await fetch(`https://api.superapp.mobizone.cloud/api/match/${matchId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch match stats');
    }
    return response.json();
  };
  