export const fetchH2H = async (matchId) => {
    const response = await fetch(`https://api.superapp.mobizone.cloud/api/h2h/${matchId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch H2H data');
    }
    const data = await response.json();
    return data;
  };
  