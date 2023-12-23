
import React, { createContext, useState } from 'react';

// Create a new context
export const SeismicDataContext = createContext();

// Create a provider component
export const SeismicDataProvider = ({ children }) => {
  // State to store the data from USGSapi.js
  const [seismicDataHour, setSeismicDataHour] = useState([]);
  const [seismicDataToday, setSeismicDataToday] = useState([]);
  const [seismicDataWeek, setSeismicDataWeek] = useState([]);
  const [seismicDataMonth, setSeismicDataMonth] = useState([]);

  // Functions to update the seismic data
  const updateSeismicDataHour = (data) => {
    setSeismicDataHour(data);
  };

  const updateSeismicDataToday = (data) => {
    setSeismicDataToday(data);
  };

  const updateSeismicDataWeek = (data) => {
    setSeismicDataWeek(data);
  };
  
  const updateSeismicDataMonth = (data) => {
    setSeismicDataMonth(data);
  };


  // Value object to be provided by the context
  const value = {
    seismicDataHour,
    setSeismicDataHour,
    seismicDataToday,
    updateSeismicDataToday,
    seismicDataWeek,
    updateSeismicDataWeek,
    seismicDataMonth,
    updateSeismicDataMonth,
  };

  return (
    <SeismicDataContext.Provider value={value}>
      {children}
    </SeismicDataContext.Provider>
  );
};
