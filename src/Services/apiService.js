// src/services/apiService.js
export const fetchMatchesByDate = async (date) => {
    const formattedDate = date.toISOString().split("T")[0]; // Format date to YYYY-MM-DD
    try {
      const response = await fetch(`https://api.superapp.mobizone.cloud/api/match/date/${formattedDate}`);
      if (!response.ok) {
        throw new Error(`Error fetching matches: ${response.statusText}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching matches:", error);
      throw error;
    }
  };
  // src/services/apiService.js

// src/services/apiService.js

// src/services/apiService.js

export const fetchMatchInformation = async (matchId) => {
  const apiUrl = `https://api.superapp.mobizone.cloud/api/match/${matchId}`;
  console.log('Fetching from API:', apiUrl);
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      console.error('Network response was not ok:', response.status);
      throw new Error(`Error fetching match information: ${response.statusText}`);
    }
    const data = await response.json();
    console.log('Fetched data:', data);
    return data;
  } catch (error) {
    console.error("Error fetching match information:", error);
    throw error;
  }
};
