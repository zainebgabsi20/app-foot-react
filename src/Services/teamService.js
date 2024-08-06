export const fetchTeamData = async (teamId) => {
  const response = await fetch(`https://api.superapp.mobizone.cloud/api/teams/${teamId}`);
  const data = await response.json();
  return data;
};

export const fetchCoachData = async (coachId) => {
  const response = await fetch(`https://api.superapp.mobizone.cloud/api/coaches/${coachId}`);
  const data = await response.json();
  return data;
};

export const fetchVenueData = async (venueId) => {
  const response = await fetch(`https://api.superapp.mobizone.cloud/api/venues/${venueId}`);
  const data = await response.json();
  return data;
};

export const fetchLastMatchesData = async (teamId) => {
  const response = await fetch(`https://api.superapp.mobizone.cloud/api/match/fixtures/${teamId}`);
  const data = await response.json();
  return data;
};

export const getTeamData = async (teamId) => {
  try {
    const data = await fetchTeamData(teamId);
    const coachPromise = data.coach_id ? fetchCoachData(data.coach_id) : Promise.resolve({ name: '-' });
    const venuePromise = data.venue_id ? fetchVenueData(data.venue_id) : Promise.resolve({ name: '-' });

    const [coachData, venueData] = await Promise.all([coachPromise, venuePromise]);

    return {
      teamData: data,
      coachName: coachData?.name || '-',
      venueName: venueData?.name || '-'
    };
  } catch (error) {
    console.error('Error fetching team data:', error);
    throw error;
  }
};

export const getLastMatchesData = async (teamId) => {
  try {
    const lastMatchesData = await fetchLastMatchesData(teamId);
    const lastFiveMatches = lastMatchesData.last.slice(0, 5);
    return lastFiveMatches;
  } catch (error) {
    console.error('Error fetching last matches data:', error);
    throw error;
  }
};

// teamService.js

// Service function
export const fetchLeagueDetails = async (leagueId) => {
  try {
    const response = await fetch(`https://api.superapp.mobizone.cloud/api/league/${leagueId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching league details:", error);
    throw error;
  }
};

export const fetchStandingsData = async (seasonId) => {
  try {
    const response = await fetch(`https://api.superapp.mobizone.cloud/api/standing/${seasonId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching standings data:", error);
    throw error;
  }
};


export const fetchSquadData = async (teamId) => {
  const apiUrl = `https://api.superapp.mobizone.cloud/api/team/squad/${teamId}`; // Replace with your actual API URL
  console.log('Fetching squad data from API:', apiUrl);
  
  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data;
};

export const fetchNewsData = async (teamId) => {
  const apiUrl = `https://api.superapp.mobizone.cloud/api/news/${teamId}`;
  console.log('Fetching news data from API:', apiUrl);

  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const data = await response.json();
  return data;
};



// teamService.js
// Services/teamService.js
