import React from 'react';
import './TrackConditions.css';

const TrackConditions = ({ conditions, onConditionChange }) => {
  const handleChange = (field, value) => {
    onConditionChange({
      ...conditions,
      [field]: value
    });
  };

  return (
    <div className="track-conditions">
      <h3>Pist Koşulları</h3>
      
      <div className="conditions-grid">
        <div className="condition-group">
          <label>Hava Durumu</label>
          <select
            value={conditions.weather}
            onChange={(e) => handleChange('weather', e.target.value)}
          >
            <option value="dry">Kuru</option>
            <option value="wet">Yağışlı</option>
            <option value="mixed">Karışık</option>
            <option value="damp">Nemli</option>
          </select>
        </div>

        <div className="condition-group">
          <label>Pist Sıcaklığı (°C)</label>
          <input
            type="number"
            value={conditions.temperature}
            onChange={(e) => handleChange('temperature', parseInt(e.target.value))}
            min="0"
            max="50"
          />
        </div>

        <div className="condition-group">
          <label>Nem Oranı (%)</label>
          <input
            type="number"
            value={conditions.humidity}
            onChange={(e) => handleChange('humidity', parseInt(e.target.value))}
            min="0"
            max="100"
          />
        </div>

        <div className="condition-group">
          <label>Rüzgar Hızı (km/s)</label>
          <input
            type="number"
            value={conditions.windSpeed}
            onChange={(e) => handleChange('windSpeed', parseInt(e.target.value))}
            min="0"
            max="100"
          />
        </div>

        <div className="condition-group">
          <label>Pist Durumu</label>
          <select
            value={conditions.trackStatus}
            onChange={(e) => handleChange('trackStatus', e.target.value)}
          >
            <option value="clean">Temiz</option>
            <option value="dirty">Kirli</option>
            <option value="rubbered">Lastik İzi</option>
            <option value="wet">Islak</option>
          </select>
        </div>

        <div className="condition-group">
          <label>Grip Seviyesi</label>
          <select
            value={conditions.gripLevel}
            onChange={(e) => handleChange('gripLevel', e.target.value)}
          >
            <option value="high">Yüksek</option>
            <option value="medium">Orta</option>
            <option value="low">Düşük</option>
            <option value="variable">Değişken</option>
          </select>
        </div>
      </div>

      <div className="track-map">
        <h4>Pist Haritası</h4>
        <div className="track-layout">
          {/* Burada pist haritası görseli eklenebilir */}
          <div className="track-info">
            <p>Pist Uzunluğu: 5.412 km</p>
            <p>Tur Sayısı: 57</p>
            <p>Toplam Mesafe: 308.238 km</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackConditions; 