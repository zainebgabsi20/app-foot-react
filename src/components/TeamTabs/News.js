import React, { useEffect, useState } from 'react';
import { fetchNewsData } from '../../Services/teamService'; // Adjust the path as needed
import Loader from '../Loader/Loader'; // Adjust the path as needed
import NoData from '../NoData/NoData'; // Adjust the path as needed
import './News.css'; // Ensure you have a CSS file for styling

const NewsComponent = ({ teamId }) => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchNewsData(teamId);
        console.log('Fetched news data:', data); // Log the fetched data

        if (Array.isArray(data)) {
          setNewsData(data);
        } else {
          console.error('Unexpected response format:', data);
        }
      } catch (error) {
        console.error('Error fetching news data:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };

    fetchData();
  }, [teamId]);

  console.log('Rendered newsData:', newsData); // Log the state data

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="news-container">
      {Array.isArray(newsData) && newsData.length > 0 ? (
        newsData.map((newsItem) => (
          <div key={newsItem.id} className="news-item">
            <img src={newsItem.imageUrl} alt={newsItem.title} className="news-image" />
            <p className="news-caption">{newsItem.titre}</p>
          </div>
        ))
      ) : (
        <NoData />
      )}
    </div>
  );
};

export default NewsComponent;
