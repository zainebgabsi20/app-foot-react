import React, { useState, useEffect } from "react";
import ReactHorizontalDatePicker from "react-horizontal-strip-datepicker";
import "react-horizontal-strip-datepicker/dist/ReactHorizontalDatePicker.css";
import "./DatePicker.css";

const DatePicker = ({ selectedDate, onSelectedDay }) => {
  const [date, setDate] = useState(selectedDate);

  useEffect(() => {
    setDate(selectedDate);
    console.log("la date sélectionnée est ****:", selectedDate);
  }, [selectedDate]);

  const handleSelectedDay = (val) => {
    setDate(val);
    onSelectedDay(val);
    console.log("la date sélectionnée est ****:", val);
  };

  const handlePreviousClick = () => {
    const previousButton = document.querySelector(".datepicker-button-previous");
    if (previousButton) {
      previousButton.click();
    }
  };

  const handleNextClick = () => {
    const nextButton = document.querySelector(".datepicker-button-next");
    if (nextButton) {
      nextButton.click();
    }
  };

  return (
    <div className="horizontal-date-picker-container">
      <div className="calendar-icon-container">
        {/* Your SVG icon */}
      </div>
      <button className="custom-arrow-button previous" onClick={handlePreviousClick}>
        <svg viewBox="0 0 24 24">
          <path fill="currentColor" d="M15.41 16.58L10.83 12 15.41 7.41 14 6l-6 6 6 6z" />
        </svg>
      </button>
      <div>
        <ReactHorizontalDatePicker
          getSelectedDay={handleSelectedDay}
          endDate={0}
          startDate={-100}
          selectDate={date}
          labelFormat={"ddd DD MMM"}
          color={"#374e8c"}
        />
      </div>
      <button className="custom-arrow-button next" onClick={handleNextClick}>
        <svg viewBox="0 0 24 24">
          <path fill="currentColor" d="M8.59 16.58L13.17 12 8.59 7.41 10 6l6 6-6 6z" />
        </svg>
      </button>
    </div>
  );
};

export default DatePicker;
