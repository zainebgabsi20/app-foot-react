import React, { useEffect, useState } from 'react';
import Loader from '../Loader/Loader'; // Adjust the path as needed
import NoData from '../NoData/NoData'; // Adjust the path as needed
import { fetchSquadData } from '../../Services/teamService'; // Adjust the path as needed
import './Squad.css';

const SquadComponent = ({ teamId }) => {
  const [squadData, setSquadData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSquadData = async () => {
      console.log('Fetching squad data for teamId:', teamId); // Log teamId
      if (!teamId) {
        console.error('No teamId provided');
        setLoading(false);
        return;
      }

      try {
        const data = await fetchSquadData(teamId);
        console.log('Fetched squad data:', data); // Log fetched data
        if (data && data.squad) {
          setSquadData(data.squad);
        } else {
          console.error('Invalid data structure:', data);
        }
      } catch (error) {
        console.error('Error fetching squad data:', error);
      } finally {
        setLoading(false);
      }
    };

    getSquadData();
  }, [teamId]);

  console.log('Rendered squadData:', squadData);

  return (
    <div className="squad-container">
      {loading ? (
        <Loader loading={loading} />
      ) : Array.isArray(squadData) && squadData.length > 0 ? (
        <table className="squad-table">
          <thead>
            <tr>
              <th className="left-align"></th>
              <th className="right-align">Age</th>
              <th className="right-align">Height</th>
              <th className="right-align">Weight</th>
            </tr>
          </thead>
          <tbody>
            {squadData
              .filter(player => player.player.firstname || player.player.lastname) // Filter out players with null names
              .map((player) => (
                <tr key={player.player.id}>
                  <td className="left-align">
                    <div className="player-info">
                      <div className='number'>
                        {player.number !== '0' && (
                          <span>{player.number} </span>
                        )}
                      </div>
                      <div className="flag-container-player">
                        {player.player.country.cc ? (
                          <img className="country-flag-player" src={`https://flagcdn.com/${player.player.country.cc}.svg`} alt={`${player.player.country.name} Flag`} />
                        ) : (
                          <div className="country-flag-placeholder"></div>
                        )}
                      </div>
                      <div className="squad-player-name">
                        <span>{player.player.common_name || `${player.player.firstname} ${player.player.lastname}`}</span>
                      </div>
                      <div className="player-image-container">
                        {player.player.img && (
                          <img className="player-image" src={player.player.img} alt={player.player.common_name} />
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="right-align">{player.player.age}</td>
                  {player.player.height !== '0' && <td className="center-align">{player.player.height}</td>}
                  {player.player.weight !== '0' && <td className="center-align">{player.player.weight}</td>}
                </tr>
              ))}
          </tbody>
        </table>
      ) : (
        <NoData message="No squad data available" />
      )}
    </div>
  );
};

export default SquadComponent;
