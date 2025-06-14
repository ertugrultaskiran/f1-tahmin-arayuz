import React from 'react';
import './RaceCalendar.css';
import { FaMapMarkerAlt } from 'react-icons/fa';

const countryFlags = {
  'Bahrain': '🇧🇭',
  'Saudi Arabia': '🇸🇦',
  'Australia': '🇦🇺',
  'Japan': '🇯🇵',
  'China': '🇨🇳'
};

const RaceCalendar = () => {
  const races = [
    {
      id: 1,
      name: 'Bahreyn Grand Prix',
      date: '2024-03-02',
      circuit: 'Bahrain International Circuit',
      country: 'Bahrain',
      round: 1
    },
    {
      id: 2,
      name: 'Suudi Arabistan Grand Prix',
      date: '2024-03-09',
      circuit: 'Jeddah Corniche Circuit',
      country: 'Saudi Arabia',
      round: 2
    },
    {
      id: 3,
      name: 'Avustralya Grand Prix',
      date: '2024-03-24',
      circuit: 'Melbourne Grand Prix Circuit',
      country: 'Australia',
      round: 3
    },
    {
      id: 4,
      name: 'Japonya Grand Prix',
      date: '2024-04-07',
      circuit: 'Suzuka Circuit',
      country: 'Japan',
      round: 4
    },
    {
      id: 5,
      name: 'Çin Grand Prix',
      date: '2024-04-21',
      circuit: 'Shanghai International Circuit',
      country: 'China',
      round: 5
    }
  ];

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('tr-TR', options);
  };

  return (
    <div className="race-calendar">
      <h2>2024 Formula 1 Yarış Takvimi</h2>
      <div className="calendar-grid">
        {races.map(race => (
          <div key={race.id} className="race-card">
            <div className="race-header">
              <span className="round">Yarış {race.round}</span>
              <h3>{race.name}</h3>
            </div>
            <div className="race-details">
              <p className="date">{formatDate(race.date)}</p>
              <p className="circuit"><FaMapMarkerAlt style={{color:'#e10600',marginRight:4}}/>{race.circuit}</p>
              <p className="country">{countryFlags[race.country] || ''} {race.country}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RaceCalendar; 