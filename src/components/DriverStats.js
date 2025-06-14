import React from 'react';
import './DriverStats.css';
import { FaTrophy, FaFlagCheckered } from 'react-icons/fa';

const DriverStats = ({ driver }) => {
  const stats = {
    'VER': { wins: 54, podiums: 98, poles: 32, fastestLaps: 28, championships: 3 },
    'HAM': { wins: 103, podiums: 197, poles: 104, fastestLaps: 65, championships: 7 },
    'LEC': { wins: 5, podiums: 28, poles: 23, fastestLaps: 7, championships: 0 },
    'NOR': { wins: 1, podiums: 13, poles: 1, fastestLaps: 6, championships: 0 },
    'RUS': { wins: 2, podiums: 11, poles: 1, fastestLaps: 6, championships: 0 }
  };

  const driverInfo = {
    'VER': { name: 'Max Verstappen', team: 'Red Bull Racing', number: 1, image: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/M/MAXVER01_Max_Verstappen/maxver01.png' },
    'HAM': { name: 'Lewis Hamilton', team: 'Mercedes', number: 44, image: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/L/LEWHAM01_Lewis_Hamilton/lewham01.png' },
    'LEC': { name: 'Charles Leclerc', team: 'Ferrari', number: 16, image: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/C/CHALEC01_Charles_Leclerc/chalec01.png' },
    'NOR': { name: 'Lando Norris', team: 'McLaren', number: 4, image: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/L/LANNOR01_Lando_Norris/lannor01.png' },
    'RUS': { name: 'George Russell', team: 'Mercedes', number: 63, image: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/G/GEORUS01_George_Russell/georus01.png' }
  };

  if (!driver || !stats[driver]) return null;

  const currentStats = stats[driver];
  const info = driverInfo[driver];

  return (
    <div className="driver-stats">
      <div className="driver-header">
        <img src={info.image} alt={info.name} className="driver-image" />
        <div className="driver-info">
          <h3>{info.name}</h3>
          <p className="team"><FaFlagCheckered style={{color:'#e10600',marginRight:4}}/> {info.team}</p>
          <p className="number">#{info.number}</p>
        </div>
      </div>
      
      <div className="stats-grid">
        <div className="stat-item">
          <span className="stat-value"><FaTrophy style={{color:'#e10600',marginRight:4}}/>{currentStats.wins}</span>
          <span className="stat-label">Galibiyet</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">{currentStats.podiums}</span>
          <span className="stat-label">Podyum</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">{currentStats.poles}</span>
          <span className="stat-label">Pole</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">{currentStats.fastestLaps}</span>
          <span className="stat-label">En Hızlı Tur</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">{currentStats.championships}</span>
          <span className="stat-label">Şampiyonluk</span>
        </div>
      </div>
    </div>
  );
};

export default DriverStats; 