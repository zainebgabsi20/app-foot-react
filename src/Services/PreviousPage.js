import React from 'react';
import { useLocation } from 'react-router-dom';

const PreviousPage = () => {
  const location = useLocation();
  const selectedDate = location.state?.selectedDate || new Date().toISOString().split('T')[0];

  useEffect(() => {
    // Use the selectedDate to fetch matches or perform other actions
  }, [selectedDate]);

  return (
    <div>
      {/* Your component code */}
    </div>
  );
};

export default PreviousPage;
