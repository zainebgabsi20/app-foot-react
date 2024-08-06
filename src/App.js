import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Navbarb from './components/NavbarB/NavbarB';
import Acceuil from './components/acceuil/acceuil';
import MatchDetails from './components/Match-details/Match-details';
import Team from './components/Team/Team';
import Standing from './components/Standing/Standing';
import Draw from './components/Draw/Draw';
import LanguageSelector from './components/traduction/LanguageSelector';
import './components/traduction/i18n';

function App() {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [selectedTimeZone, setSelectedTimeZone] = useState('UTC');

  const handleClose = () => {
    window.close();
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <Router>
      <div className="App">
        <Navbars handleClose={handleClose} handleRefresh={handleRefresh} />
        <LanguageSelector 
          selectedLanguage={selectedLanguage}
          onLanguageChange={setSelectedLanguage}
          selectedTimeZone={selectedTimeZone}
          onTimeZoneChange={setSelectedTimeZone}
        />
        <Routes>
          <Route path="/" element={<RedirectToAcceuilAfterDelay />} />
          <Route path="/acceuil" element={<Acceuil language={selectedLanguage} timeZone={selectedTimeZone} />} />
          <Route path="/match/:matchId" element={<MatchDetails language={selectedLanguage} timeZone={selectedTimeZone} />} />
          <Route path="/team/:teamId" element={<Team language={selectedLanguage} />} />
          <Route path="/standing/:leagueId" element={<Standing language={selectedLanguage} />} />
          <Route path="/draw/:leagueId" element={<Draw language={selectedLanguage} />} />
        </Routes>
      </div>
    </Router>
  );
}

function RedirectToAcceuilAfterDelay() {
  const navigate = useNavigate();
  const [showHome, setShowHome] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHome(false);
      navigate('/acceuil');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return showHome ? <Home /> : null;
}

// Navbars component to conditionally render the appropriate navbar
const Navbars = ({ handleClose, handleRefresh }) => {
  const location = useLocation();
  const isSpecialPage = location.pathname.startsWith('/match') || 
                        location.pathname.startsWith('/team') || 
                        location.pathname.startsWith('/standing') || 
                        location.pathname.startsWith('/draw');

  return isSpecialPage ? (
    <Navbarb onClose={handleClose} onRefresh={handleRefresh} />
  ) : (
    <Navbar onClose={handleClose} onRefresh={handleRefresh} />
  );
};

export default App;
