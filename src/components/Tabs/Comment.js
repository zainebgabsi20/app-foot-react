import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // Import useTranslation
import Loader from '../Loader/Loader';
import NoData from '../NoData/NoData';
import { fetchComments } from '../../Services/commentService';
import { fetchMatchData } from '../../Services/matchService';
import './Comment.css';
import './loading.css';

const Comment = () => {
  const { matchId } = useParams();
  const { t } = useTranslation(); // Initialize translation hook
  const [comments, setComments] = useState(null);
  const [matchData, setMatchData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [commentResult, matchResult] = await Promise.all([
          fetchComments(matchId),
          fetchMatchData(matchId),
        ]);
        setComments(commentResult);
        setMatchData(matchResult);
        console.log('Fetched comment data:', commentResult);
        console.log('Fetched match data:', matchResult);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(true);
        setComments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [matchId]);

  if (loading) {
    return <Loader loading={loading} />;
  }

  if (error || !comments || !matchData || comments.length === 0) {
    return <NoData />;
  }

  const determineCurrentHalf = (minute) => {
    if (minute >= 1 && minute <= 45) {
      return t('common.first_half'); // Translate First Half
    } else if (minute > 45 && minute <= 90) {
      return t('common.second_half'); // Translate Second Half
    } else {
      return t('common.extra_time'); // Translate Extra Time
    }
  };

  const { ht_score, ft_score } = matchData;
  const currentScore = ht_score !== undefined && ht_score !== null && ft_score !== undefined && ft_score !== null 
    ? `${ht_score} - ${ft_score}` 
    : null;

  const getHalfScore = (half) => {
    if (half === t('common.first_half')) {
      return ht_score;
    } else if (half === t('common.second_half')) {
      return ft_score;
    }
    return null;
  };

  return (
    <div className="commentary-container">
      <h3>{t('common.comment')}</h3> {/* Translate Comments title */}
      <div className="commentary-list">
        {comments.map((comment, index) => (
          <React.Fragment key={comment._id}>
            {(index === 0 || determineCurrentHalf(comments[index - 1].minute) !== determineCurrentHalf(comment.minute)) && (
              <div className="current-half">
                <img src="/whistle_black.png" alt="Icon" className="half-icon" />
                <span>
                  {determineCurrentHalf(comment.minute)} {getHalfScore(determineCurrentHalf(comment.minute)) && `(${getHalfScore(determineCurrentHalf(comment.minute))})`}
                </span>
              </div>
            )}
            <div className={`commentary-item ${index % 2 === 0 ? 'even' : 'odd'}`}>
              <span className="commentary-minute">{`${comment.minute}${comment.extra_minute ? '+' + comment.extra_minute : ''}' :`}</span>
              <span className="commentary-text">{comment.comment}</span> {/* Dynamic comment text from API */}
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Comment;
