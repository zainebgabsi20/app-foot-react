import React, { memo, useRef, useEffect, useState } from 'react';
import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom';
import { fetchMatchData } from '../../Services/matchService';
import { useTranslation } from 'react-i18next';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './HotMatchesSlider.css';

const liveIconUrl = '/diffuser.svg';
const whistleIconUrl = '/whistle.png';
const fallbackImageUrl = '/path/to/fallback-image.png'; // Replace with your actual fallback image path

const PreviousArrow = ({ className, style, onClick }) => (
  <div
    className={`${className} custom-prev-arrow`}
    style={{ ...style }}
    onClick={onClick}
  />
);

const NextArrow = ({ className, style, onClick }) => (
  <div
    className={`${className} custom-next-arrow`}
    style={{ ...style }}
    onClick={onClick}
  />
);

const HotMatchesSlider = ({ matches, liveFilter, timeZone }) => {
  const { t, i18n } = useTranslation(); // Access i18n to get current language
  const renderCount = useRef(0);
  renderCount.current += 1;
  const navigate = useNavigate();
  const [matchStatuses, setMatchStatuses] = useState({});

  useEffect(() => {
    console.log(`HotMatchesSlider render count: ${renderCount.current}`);
  });

  useEffect(() => {
    const fetchStatuses = async () => {
      const statuses = {};
      for (const match of matches) {
        try {
          const matchData = await fetchMatchData(match.id);
          // Get status name using the current language key
          const languageKey = i18n.language;
          const statusName = matchData.status_name[languageKey] || matchData.status_name.en; // Default to 'en' if no translation
          
          // Ensure statusName is a string and matches the translation keys
          const statusKey = statusName ? statusName.toLowerCase().replace(/\s/g, '') : 'loading'; // Convert to lowercase for consistent matching
          statuses[match.id] = statusKey;
        } catch (error) {
          console.error('Error fetching match status:', error);
        }
      }
      setMatchStatuses(statuses);
    };

    fetchStatuses();
  }, [matches, i18n.language]); // Re-run when language changes

  console.log('Matches received:', matches);

  // Ensure we are checking if the match is live using the correct logic
  const filteredMatches = liveFilter ? matches.filter(match => match.status === "1") : matches;

  if (!filteredMatches || filteredMatches.length === 0) {
    return <div>{t('common.no_matches')}</div>;
  }

  const settings = {
    dots: true,
    infinite: filteredMatches.length > 1,
    speed: 500,
    slidesToShow: 1.75,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '0%',
    prevArrow: <PreviousArrow />,
    nextArrow: <NextArrow />,
    appendDots: (dots) => (
      <div style={{ padding: "10px" }}>
        <ul style={{ margin: "0px", display: 'flex', justifyContent: 'center' }}>
          {dots}
        </ul>
      </div>
    ),
  };

  const handleMatchClick = (matchId) => {
    navigate(`/match/${matchId}`, { state: { timeZone } });
  };

  const getScore = (match) => {
    if (match.scores.et_score) {
      const [homeScore, awayScore] = match.scores.et_score.split('-').map(Number);
      return { homeScore, awayScore };
    } else if (match.scores.ft_score) {
      const [homeScore, awayScore] = match.scores.ft_score.split('-').map(Number);
      return { homeScore, awayScore };
    } else {
      return { homeScore: null, awayScore: null };
    }
  };

  const formatTime = (datetime) => {
    const date = new Date(datetime);
    return new Intl.DateTimeFormat('en-US', {
      timeZone: timeZone,
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <div className="hot-matches-slider">
      <Slider {...settings}>
        {filteredMatches.map((match) => {
          console.log('Rendering match:', match);
          const { homeScore, awayScore } = getScore(match);
          const isScoreAvailable = homeScore !== null && awayScore !== null;
          const matchTime = formatTime(match.time.datetime);
          const matchStatus = matchStatuses[match.id]; // Ensure this is the correct string

          console.log('Match status:', matchStatus);

          return (
            <div key={match.id} className="match-card" onClick={() => handleMatchClick(match.id)}>
              <div className="overlay"></div>
              <div className="match-info-container">
                {match.status === "1" && (
                  <div className="live-indicator1">
                    <img src={liveIconUrl} alt="Live Icon" className="live-icon" />
                    <span className="live-text">{t('common.live')}</span>
                  </div>
                )}
                <div className="league-name-slider">{match.league?.name}</div>
                <div className="match-header">
                  <div className="team-container">
                    <div className="team-logo-container-hot">
                      <img src={match.teams?.home?.img || fallbackImageUrl} alt="Home Team Logo" className="team-logo_hot" onError={(e) => e.target.src = fallbackImageUrl} />
                    </div>
                    <div className={`match-teams ${match.teams?.home?.name?.length > 15 ? 'long-name' : ''}`}>{match.teams?.home?.name}</div>
                  </div>
                  <div className="team-container">
                    <div className="team-logo-container-hot">
                      <img src={match.teams?.away?.img || fallbackImageUrl} alt="Away Team Logo" className="team-logo-hot" onError={(e) => e.target.src = fallbackImageUrl} />
                    </div>
                    <div className={`match-teams ${match.teams?.away?.name?.length > 15 ? 'long-name' : ''}`}>{match.teams?.away?.name}</div>
                  </div>
                </div>
                <div className="match-time">
                  <img src={whistleIconUrl} alt="Whistle Icon" className="whistle-icon" />
                  <div className="match-status">
                    {matchStatus ? t(`status.${matchStatus}`) : t('common.loading')}
                  </div>
                </div>
                {isScoreAvailable ? (
                  <div className="match-score-hot">{homeScore} - {awayScore}</div>
                ) : (
                  <div className="match-scheduled-time">{matchTime}</div>
                )}
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default memo(HotMatchesSlider);
