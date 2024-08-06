import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import Navbar from "../NavbarB/NavbarB";
import "./acceuil.css";
import HorizontalDatePicker from "../HorizontalDatePicker/HorizontalDatePicker";
import HotMatchesSlider from "../HotMatchesSlider/HotMatchesSlider";
import MatchComponent from "../MatchComponent/MatchComponent";
import LeagueFilterDropdown from "../LeagueFilterDropdown/LeagueFilterDropdown";
import { fetchMatchesByDate } from "../../Services/apiService";
import Loading from "../Loading/Loading";

const Acceuil = () => {
  const { t, i18n } = useTranslation();

  const [liveFilter, setLiveFilter] = useState(false);
  const [matches, setMatches] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [selectedLeagues, setSelectedLeagues] = useState([]);
  const [leagueData, setLeagueData] = useState([]);
  const [selectedTimeZone, setSelectedTimeZone] = useState("UTC");

  const [selectedLanguage, setSelectedLanguage] = useState(() => {
    return localStorage.getItem('language') || 'en';
  });

  useEffect(() => {
    i18n.changeLanguage(selectedLanguage);
  }, [i18n, selectedLanguage]);

  const fetchMatches = useCallback(async (date) => {
    setLoading(true);
    try {
      const data = await fetchMatchesByDate(date);
      //console.log("Fetched matches data:", data); // Log fetched data
      setMatches(data);

      const leagues = data.flatMap((league) =>
        league.matches.map((match) => ({
          id: match.league.id,
          name: match.league.name,
        }))
      );

      const uniqueLeagues = Array.from(
        new Set(leagues.map((league) => league.name))
      ).map((name) => {
        return {
          name: name,
          id: leagues.find((league) => league.name === name).id,
        };
      });

      setLeagueData(uniqueLeagues);
    } catch (error) {
      console.error("Error fetching matches:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMatches(selectedDate);
  }, [selectedDate, fetchMatches]);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");

    ws.onopen = () => {
      console.log("WebSocket connection opened*************************");
      ws.send(JSON.stringify({ type: "subscribe", date: selectedDate }));
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === "update") {
        console.log("Received update:", message.data);
        setMatches((prevMatches) => {
          const updatedMatches = [...prevMatches, ...message.data];
          console.log("Updated Matches after WebSocket:", updatedMatches);
          return updatedMatches;
        });
      }
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed, attempting to reconnect...");
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      ws.close();
    };
  }, [selectedDate]);


  const toggleLiveFilter = () => {
    setLiveFilter(!liveFilter);
  };

  const handleSelectedDay = (date) => {
    setSelectedDate(date);
  };

  const handleLeagueChange = (leagues) => {
    setSelectedLeagues(leagues);
  };

  const handleTimeZoneChange = (event) => {
    setSelectedTimeZone(event.target.value);
  };

  const handleLanguageChange = (event) => {
    const newLanguage = event.target.value;
    setSelectedLanguage(newLanguage);
    i18n.changeLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  const formatMatchTime = (utcTime) => {
    const date = new Date(utcTime);
    return new Intl.DateTimeFormat("en-US", {
      timeZone: selectedTimeZone,
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).format(date);
  };

  const filteredMatches = useMemo(() => {
    let allMatches = matches.flatMap((league) => league.matches);

    //console.log("All Matches before filter:***********************", allMatches);

    if (liveFilter) {
      allMatches = allMatches.filter((match) => {
        //console.log("Match", match.id, "status:", match.status); // Debugging line
        return match.status === "1"; // Ensure the match.status is a string
      });
    }

    if (selectedLeagues.length > 0) {
      allMatches = allMatches.filter((match) =>
        selectedLeagues.includes(match.league.name)
      );
    }

    return allMatches.filter(
      (match) => match.teams && match.teams.home && match.teams.away
    );
  }, [matches, liveFilter, selectedLeagues]);

  useEffect(() => {
    //console.log("Matches in Acceuil:", matches);
    //console.log("Leagues in Acceuil:", leagueData);
    //console.log("Filtered Matches:------------------", filteredMatches);
  }, [matches, leagueData, filteredMatches]);

  const hasLiveMatches = filteredMatches.some((match) => match.status === "1");

  return (
    <div className="home-container">
      {loading ? (
        <Loading />
      ) : (
        <>
          <Navbar />
          <div className="filters">
            <div className="filter-item">
              <label className="switch">
                <input
                  type="checkbox"
                  checked={liveFilter}
                  onChange={toggleLiveFilter}
                />
                <span className="slider"></span>
              </label>
              <span className="filter-live-label">{t('common.live')}</span>
            </div>
            <div className="filter-item">
              <LeagueFilterDropdown
                leagues={leagueData}
                selectedLeagues={selectedLeagues}
                onChange={handleLeagueChange}
              />
            </div>
            <div className="filter-item">
              <select
                className="filter-select"
                value={selectedLanguage}
                onChange={handleLanguageChange}
              >
                <option value="en">English</option>
                <option value="fr">Français</option>
                <option value="es">Español</option>
                <option value="ar">Arabic</option>
              </select>
              <select
                className="filter-select"
                value={selectedTimeZone}
                onChange={handleTimeZoneChange}
              >
                <option value="UTC">GMT</option>
                <option value="America/Los_Angeles">PST</option>
                <option value="America/New_York">EST</option>
              </select>
            </div>
          </div>
          <div className="date-picker-container">
            <HorizontalDatePicker
              selectedDate={selectedDate}
              onSelectedDay={handleSelectedDay}
            />
          </div>
          {(!liveFilter || hasLiveMatches) && (
            <div className="hot-matches-header">
              <h2>{t('common.hot')}</h2>
            </div>
          )}
          <div className="hot-matches-slider-container">
            <HotMatchesSlider matches={filteredMatches} liveFilter={liveFilter} timeZone={selectedTimeZone} />
          </div>
          <div className="hot-matches-header">
            <h2>{t('common.popular')}</h2>
          </div>
          <div className="match">
            <MatchComponent
              matches={filteredMatches}
              leagueData={leagueData}
              timeZone={selectedTimeZone}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Acceuil;
