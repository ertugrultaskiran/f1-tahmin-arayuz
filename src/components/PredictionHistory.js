import React from 'react';
import './PredictionHistory.css';
import { FaCheckCircle, FaTimesCircle, FaUserCheck } from 'react-icons/fa';

const PredictionHistory = ({ predictions }) => {
  if (!predictions || predictions.length === 0) {
    return (
      <div className="prediction-history">
        <h2>Geçmiş Tahminler</h2>
        <p className="no-predictions">Henüz tahmin yapılmamış.</p>
      </div>
    );
  }

  return (
    <div className="prediction-history">
      <h2>Geçmiş Tahminler</h2>
      <div className="predictions-list">
        {predictions.map((prediction, index) => (
          <div key={index} className="prediction-card">
            <div className="prediction-header">
              <span className="prediction-date">
                {new Date(prediction.timestamp).toLocaleString('tr-TR')}
              </span>
              <span className={`prediction-status ${prediction.correct ? 'correct' : 'incorrect'}`}>
                {prediction.correct ? <FaCheckCircle style={{color:'#28a745',marginRight:4}}/> : <FaTimesCircle style={{color:'#dc3545',marginRight:4}}/>}
                {prediction.correct ? 'Doğru' : 'Yanlış'}
              </span>
            </div>
            <div className="prediction-details">
              <div className="driver-info">
                <FaUserCheck style={{color:'#e10600',marginRight:4}}/>
                <strong>Pilot:</strong> {prediction.driver}
              </div>
              <div className="conditions">
                <strong>Koşullar:</strong>
                <ul>
                  <li>Takım Performansı: {prediction.teamPerformance}</li>
                  <li>Hava Durumu: {prediction.trackConditions.weather}</li>
                  <li>Pist Sıcaklığı: {prediction.trackConditions.temperature}°C</li>
                </ul>
              </div>
              <div className="result">
                <strong>Sonuç:</strong> {prediction.result}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PredictionHistory; 