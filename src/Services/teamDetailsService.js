import { fetchTeamData, fetchCoachData, fetchVenueData, fetchLastMatchesData } from './teamService';

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

// teamDetailsService.js
export const fetchSeasonAndStandings = async (teamid) => {
    const leagues = [/* list of league ids */];
    let standings = [];
  
    for (const leagueId of leagues) {
      try {
        const seasonResponse = await fetch(`https://api.superapp.mobizone.cloud/api/season/${leagueId}`);
        const seasonData = await seasonResponse.json();
        const seasonId = seasonData.id;
  
        const standingsResponse = await fetch(`https://api.superapp.mobizone.cloud/api/standings/${seasonId}`);
        const standingsData = await standingsResponse.json();
  
        if (standingsData && standingsData.length > 0) {
          standings = standingsData;
          break;
        }
      } catch (error) {
        console.error(`Error fetching data for league ${leagueId}:`, error);
      }
    }
  
    if (standings.length === 0) {
      throw new Error('No valid standings data found for any league.');
    }
  
    return standings;
  };
  
  

