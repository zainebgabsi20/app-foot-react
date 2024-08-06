import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Loader from '../Loader/Loader'; // Adjust the path as needed
import { fetchTeamData, fetchCoachData, fetchVenueData, fetchStandingsData, fetchLastMatchesData, fetchLeagueDetails } from '../../Services/teamService';
import './TeamDetails.css';

const TeamDetails = () => {
  const { teamId } = useParams();
  const navigate = useNavigate();
  const [teamData, setTeamData] = useState(null);
  const [coachName, setCoachName] = useState('');
  const [venueName, setVenueName] = useState('');
  const [form, setForm] = useState([]);
  const [standings, setStandings] = useState(null);
  const [league, setLeague] = useState({ name: '', logo: '', id: '' });
  const [loading, setLoading] = useState(true);
  const [standingsLoading, setStandingsLoading] = useState(true);
  const [matchesPlayed, setMatchesPlayed] = useState('N/A');
  const [goalsScored, setGoalsScored] = useState('N/A');

  useEffect(() => {
    const getTeamData = async () => {
      try {
        setLoading(true);
        const data = await fetchTeamData(teamId);
        setTeamData(data);

        const coachPromise = data.coach_id ? fetchCoachData(data.coach_id) : Promise.resolve({ name: '-' });
        const venuePromise = data.venue_id ? fetchVenueData(data.venue_id) : Promise.resolve({ name: '-' });

        const [coachData, venueData] = await Promise.all([coachPromise, venuePromise]);

        setCoachName(coachData?.name || '-');
        setVenueName(venueData?.name || '-');
      } catch (error) {
        console.error('Error fetching team data:', error);
      } finally {
        setLoading(false);
      }
    };

    getTeamData();
  }, [teamId]);

  useEffect(() => {
    const getLastMatches = async () => {
      try {
        const lastMatchesData = await fetchLastMatchesData(teamId);
        console.log('Fetched last matches data:', lastMatchesData);

        if (lastMatchesData && lastMatchesData.last && Array.isArray(lastMatchesData.last)) {
          const lastFiveMatches = lastMatchesData.last.slice(0, 5);
          setForm(lastFiveMatches);
          console.log('Last 5 matches:', lastFiveMatches);
        } else {
          console.error('No matches found in lastMatchesData');
        }
      } catch (error) {
        console.error('Error fetching last matches data:', error);
      }
    };

    getLastMatches();
  }, [teamId]);

  useEffect(() => {
    const fetchSeasonAndStandings = async () => {
      try {
        setStandingsLoading(true);
        const teamData = await fetchTeamData(teamId);
        console.log('Fetched full team data:', teamData);

        let seasonId = null;
        let selectedLeague = null;
        for (let i = teamData.leagues.length - 1; i >= 0; i--) {
          if (teamData.leagues[i].current_season_id) {
            seasonId = teamData.leagues[i].current_season_id;
            selectedLeague = teamData.leagues[i];
            break;
          }
        }

        console.log('Selected league data:', selectedLeague);
        console.log('Season ID:', seasonId);

        if (seasonId) {
          const standingsData = await fetchStandingsData(seasonId);
          console.log('Fetched standings data:', standingsData);

          if (standingsData && standingsData.standings && standingsData.standings.length > 0) {
            setStandings(standingsData.standings);
            setLeague({ name: selectedLeague.name, logo: selectedLeague.logo, id: selectedLeague.league_id });

            // Update matches played and goals scored
            const teamStandings = standingsData.standings.flat().find(team => team.team_id === teamId);
            if (teamStandings) {
              setMatchesPlayed(teamStandings.overall.games_played);
              setGoalsScored(teamStandings.overall.goals_scored);
            }
          } else {
            console.error('No standings data found.');
          }
        } else {
          console.error('No valid season ID found.');
        }
      } catch (error) {
        console.error('Error fetching season and standings data:', error);
      } finally {
        setStandingsLoading(false);
      }
    };

    fetchSeasonAndStandings();
  }, [teamId]);

  const determineMatchOutcome = (match) => {
    const winnerTeamId = match.winner_team_id;
    if (winnerTeamId === teamId) {
      return 'win';
    } else if (winnerTeamId === null) {
      return 'draw';
    } else {
      return 'loss';
    }
  };

  const handleLeagueClick = () => {
    navigate(`/league/${league.id}`);
  };

  if (loading) {
    return <Loader loading={loading} />;
  }

  if (!teamData) {
    return <p>Loading team details...</p>;
  }

  const countryFlagUrl = `https://flagcdn.com/${teamData.country_code}.svg`;

  return (
    <div className="team-info">
      <div className="team-info-header">
        <img src={teamData.img} alt={`${teamData.name} Logo`} className="team-logo" />
        <h3>{teamData.name}</h3>
      </div>
      <div className="team-stats">
        <table className="team-stats-table">
          <tbody>
            <tr>
              <td className="bold-text">Country</td>
              <td className='country'>
                <img src={countryFlagUrl} alt={`${teamData.country_name} Flag`} className="country-flag" />
                {teamData.country_name}
              </td>
              <td className="bold-text">Tournament</td>
              <td>{teamData.leagues[0]?.name || 'N/A'}</td>
            </tr>
            <tr>
              <td className="bold-text">Venue</td>
              <td>{venueName}</td>
              <td className="bold-text">Matches Played</td>
              <td>{matchesPlayed}</td>
            </tr>
            <tr>
              <td className="bold-text">Manager</td>
              <td>{coachName}</td>
              <td className="bold-text">Goals Scored</td>
              <td>{goalsScored}</td>
            </tr>
            <tr>
              <td className="bold-text">Form</td>
              <td colSpan="3">
                {form.length > 0 ? (
                  form.map((match) => {
                    const outcome = determineMatchOutcome(match);
                    return (
                      <span
                        key={match.id} // Use unique match ID as key
                        className={`form-circle ${outcome}`}
                      ></span>
                    );
                  })
                ) : (
                  'No recent matches'
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {standingsLoading ? (
        <Loader loading={standingsLoading} />
      ) : (
        standings && (
          <div className="team-standings">
            <div className="league-info">
              {league.logo && <img src={league.logo} alt={`${league.name} Logo`} className="league-logo" />}
              <h3 onClick={handleLeagueClick} style={{ cursor: 'pointer', color: 'blue' }}>{league.name}</h3>
            </div>
            <StandingsTable standings={standings} />
          </div>
        )
      )}
    </div>
  );
};

const StandingsTable = ({ standings }) => {
  const iconPath = '/team-icon.png'; 
  const [teamLogos, setTeamLogos] = useState({});

  useEffect(() => {
    const fetchLogos = async () => {
      const logos = {};
      for (const group of standings) {
        for (const team of group) {
          if (!logos[team.team_id]) {
            try {
              const teamData = await fetchTeamData(team.team_id);
              logos[team.team_id] = teamData.img || 'default-logo-url.png';
              console.log(`Fetched logo for team ${team.team_id}:`, teamData.img); // Debugging line
            } catch (error) {
              console.error(`Error fetching data for team ${team.team_id}:`, error);
              logos[team.team_id] = 'default-logo-url.png'; // fallback in case of error
            }
          }
        }
      }
      setTeamLogos(logos);
    };

    fetchLogos();
  }, [standings]);

  useEffect(() => {
    console.log('Team logos:', teamLogos); // Debugging line
  }, [teamLogos]);

  return (
    <table className="standings-table">
      <thead>
        <tr>
          <th><img src={iconPath} alt="Icon" className="icon"/></th>
          <th>Team</th>
          <th>MP</th>
          <th>W</th>
          <th>D</th>
          <th>L</th>
          <th>GD</th>
          <th className="points-column">PTS</th>
          <th>Gr</th>
        </tr>
      </thead>
      <tbody>
        {standings.flatMap((group) =>
          group.map((team) => {
            const teamLogo = teamLogos[team.team_id] || 'default-logo-url.png';
            const groupLetter = team.group_name.slice(-1); // Extract the last character
            return (
              <tr key={team.team_id}>
                <td>
                  <div className="position-circle">{team.overall.position}</div>
                </td>
                <td>
                  <img src={teamLogo} alt={`${team.team_name} Logo`} className="team-logo5" />
                  {team.team_name}
                </td>
                <td>{team.overall?.games_played ?? '-'}</td>
                <td>{team.overall?.won ?? '-'}</td>
                <td>{team.overall?.draw ?? '-'}</td>
                <td>{team.overall?.lost ?? '-'}</td>
                <td>{team.overall?.goals_diff ?? '-'}</td>
                <td className="points-column">{team.overall?.points ?? '-'}</td>
                <td>{groupLetter}</td>
              </tr>
            );
          })
        )}
      </tbody>
    </table>
  );
};

export default TeamDetails;
