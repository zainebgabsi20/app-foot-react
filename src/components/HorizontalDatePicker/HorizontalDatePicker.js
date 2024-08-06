import React, { useState, useEffect } from "react";
import "./HorizontalDatePicker.css";

const HorizontalDatePicker = ({ selectedDate, onSelectedDay }) => {
  const getStartOfWeek = (date) => {
    const start = new Date(date);
    const day = start.getDay();
    const diff = start.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
    return new Date(start.setDate(diff));
  };

  const [date, setDate] = useState(selectedDate);
  const [startDate, setStartDate] = useState(getStartOfWeek(selectedDate));

  useEffect(() => {
    setDate(selectedDate);
    setStartDate(getStartOfWeek(selectedDate));
    console.log("Selected date is:", selectedDate);
  }, [selectedDate]);

  const handleDateChange = (date) => {
    setDate(date);
    onSelectedDay(date);
    console.log("Selected date is:", date);
  };

  const getWeekDays = (start) => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const newDate = new Date(start);
      newDate.setDate(start.getDate() + i);
      days.push(newDate);
    }
    return days;
  };

  const formatDay = (day) => {
    const weekdayFormatter = new Intl.DateTimeFormat('en-GB', { weekday: 'short' });
    const dateFormatter = new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short' });
    const weekday = weekdayFormatter.format(day);
    const date = dateFormatter.format(day);
    return (
      <>
        <div>{weekday}</div>
        <div>{date}</div>
      </>
    );
  };

  const handlePreviousWeek = () => {
    const newStartDate = new Date(startDate);
    newStartDate.setDate(startDate.getDate() - 7);
    setStartDate(newStartDate);
  };

  const handleNextWeek = () => {
    const newStartDate = new Date(startDate);
    newStartDate.setDate(startDate.getDate() + 7);
    setStartDate(newStartDate);
  };

  const days = getWeekDays(startDate);

  return (
    <div className="horizontal-date-picker-container">
      <img className="calendar-icon" src="/calendar.png" alt="Calendar" width="5px" height="5px" />
      <button className="custom-arrow-button previous" onClick={handlePreviousWeek}>
        <svg viewBox="0 0 24 24">
          <path fill="currentColor" d="M15.41 16.58L10.83 12 15.41 7.41 14 6l-6 6 6 6z" />
        </svg>
      </button>
      <div className="date-scroll-container">
        {days.map((day, index) => (
          <div key={index} className="date-item">
            <button
              className={`date-button ${date.toDateString() === day.toDateString() ? "selected" : ""}`}
              onClick={() => handleDateChange(day)}
            >
              {formatDay(day)}
            </button>
          </div>
        ))}
      </div>
      <button className="custom-arrow-button next" onClick={handleNextWeek}>
        <svg viewBox="0 0 24 24">
          <path fill="currentColor" d="M8.59 16.58L13.17 12 8.59 7.41 10 6l6 6-6 6z" />
        </svg>
      </button>
    </div>
  );
};

export default HorizontalDatePicker;
