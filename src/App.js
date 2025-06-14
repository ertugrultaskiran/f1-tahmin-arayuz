import React, { useState, useEffect } from 'react';
import './App.css';
import DriverStats from './components/DriverStats';
import RaceCalendar from './components/RaceCalendar';
import PredictionHistory from './components/PredictionHistory';
import TrackConditions from './components/TrackConditions';
import { FaTrophy, FaCalendarAlt, FaHistory } from 'react-icons/fa';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

Chart.register(ArcElement, Tooltip, Legend);

function App() {
  const [selectedDriver, setSelectedDriver] = useState('');
  const [teamPerformance, setTeamPerformance] = useState('');
  const [trackConditions, setTrackConditions] = useState({
    weather: 'dry',
    temperature: 25,
    humidity: 50,
    windSpeed: 0,
    trackStatus: 'clean',
    gripLevel: 'medium'
  });
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [predictions, setPredictions] = useState([]);
  const [activeTab, setActiveTab] = useState('predict'); // 'predict', 'calendar', 'history'

  const drivers = [
    { id: 'VER', name: 'Max Verstappen', team: 'Red Bull Racing' },
    { id: 'HAM', name: 'Lewis Hamilton', team: 'Mercedes' },
    { id: 'LEC', name: 'Charles Leclerc', team: 'Ferrari' },
    { id: 'NOR', name: 'Lando Norris', team: 'McLaren' },
    { id: 'RUS', name: 'George Russell', team: 'Mercedes' }
  ];

  useEffect(() => {
    // Geçmiş tahminleri localStorage'dan yükle
    const savedPredictions = localStorage.getItem('predictions');
    if (savedPredictions) {
      setPredictions(JSON.parse(savedPredictions));
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          driver: selectedDriver,
          team_performance: teamPerformance,
          track_conditions: trackConditions
        })
      });

      const data = await response.json();
      const newPrediction = {
        ...data,
        timestamp: new Date().toISOString(),
        driver: selectedDriver,
        teamPerformance,
        trackConditions
      };
      
      setPrediction(data.prediction);
      
      // Tahmini geçmişe ekle
      const updatedPredictions = [newPrediction, ...predictions];
      setPredictions(updatedPredictions);
      localStorage.setItem('predictions', JSON.stringify(updatedPredictions));
    } catch (error) {
      console.error('Tahmin alınırken hata oluştu:', error);
    } finally {
      setLoading(false);
    }
  };

  // Grafik için örnek veri (pilot galibiyet oranları)
  const winData = {
    labels: ['Verstappen', 'Hamilton', 'Leclerc', 'Norris', 'Russell'],
    datasets: [
      {
        label: 'Galibiyetler',
        data: [54, 103, 5, 1, 2],
        backgroundColor: [
          '#e10600',
          '#00d2be',
          '#dc0000',
          '#ff8700',
          '#27a3e2'
        ],
        borderWidth: 0
      }
    ]
  };

  // Takım galibiyet dağılımı için örnek veri
  const teamWinData = {
    labels: ['Red Bull', 'Mercedes', 'Ferrari', 'McLaren'],
    datasets: [
      {
        label: 'Takım Galibiyetleri',
        data: [60, 120, 20, 5],
        backgroundColor: [
          '#1e41ff', // Red Bull
          '#00d2be', // Mercedes
          '#dc0000', // Ferrari
          '#ff8700'  // McLaren
        ],
        borderWidth: 0
      }
    ]
  };

  return (
    <div className="app-container">
      <header>
        <div className="header-vertical">
          <img src="/logo-f1.svg" alt="F1 Logo" className="f1-logo main animated-logo" />
          <h1>Formula 1 Yarış Tahmin Sistemi</h1>
        </div>
        <nav className="main-nav">
          <button 
            className={activeTab === 'predict' ? 'active' : ''} 
            onClick={() => setActiveTab('predict')}
          >
            <FaTrophy style={{ marginRight: 8 }}/> Tahmin Et
          </button>
          <button 
            className={activeTab === 'calendar' ? 'active' : ''} 
            onClick={() => setActiveTab('calendar')}
          >
            <FaCalendarAlt style={{ marginRight: 8 }}/> Yarış Takvimi
          </button>
          <button 
            className={activeTab === 'history' ? 'active' : ''} 
            onClick={() => setActiveTab('history')}
          >
            <FaHistory style={{ marginRight: 8 }}/> Geçmiş Tahminler
          </button>
        </nav>
      </header>

      <main>
        {activeTab === 'predict' && (
          <>
            <div className="prediction-section">
              <div style={{ position: 'relative' }}>
                <img src="/logo-f1.svg" alt="F1 Logo" className="f1-logo watermark" />
                <form onSubmit={handleSubmit} className="prediction-form">
                  <div className="form-group">
                    <label>Pilot Seçin:</label>
                    <select 
                      value={selectedDriver} 
                      onChange={(e) => setSelectedDriver(e.target.value)}
                      required
                    >
                      <option value="">Pilot seçin...</option>
                      {drivers.map(driver => (
                        <option key={driver.id} value={driver.id}>
                          {driver.name} ({driver.team})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Takım Performansı:</label>
                    <select 
                      value={teamPerformance} 
                      onChange={(e) => setTeamPerformance(e.target.value)}
                      required
                    >
                      <option value="">Seçin...</option>
                      <option value="excellent">Mükemmel</option>
                      <option value="good">İyi</option>
                      <option value="average">Orta</option>
                      <option value="poor">Zayıf</option>
                    </select>
                  </div>

                  <TrackConditions 
                    conditions={trackConditions}
                    onConditionChange={setTrackConditions}
                  />

                  <button type="submit" disabled={loading}>
                    {loading ? 'Tahmin Yapılıyor...' : 'Tahmin Et'}
                  </button>
                </form>
                {selectedDriver && <DriverStats driver={selectedDriver} />}
                {prediction && (
                  <div className="prediction-result">
                    <h2>Tahmin Sonucu</h2>
                    <p>{prediction}</p>
                  </div>
                )}
              </div>
              <div>
                <div className="chart-flex-col">
                  <div className="chart-card">
                    <h2>Pilot Galibiyet Dağılımı</h2>
                    <div style={{ width: 280, height: 280, margin: '0 auto' }}>
                      <Doughnut data={winData} options={{ maintainAspectRatio: false }} />
                    </div>
                  </div>
                  <div className="chart-card" style={{ marginTop: 32 }}>
                    <h2>Takım Galibiyet Dağılımı</h2>
                    <div style={{ width: 280, height: 280, margin: '0 auto' }}>
                      <Doughnut data={teamWinData} options={{ maintainAspectRatio: false }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'calendar' && (
          <RaceCalendar />
        )}

        {activeTab === 'history' && (
          <PredictionHistory predictions={predictions} />
        )}
      </main>
      <footer className="footer-bar">
        <img src="/logo-f1.svg" alt="F1 Logo" className="f1-logo footer-logo" />
        <span>© {new Date().getFullYear()} Formula 1 Tahmin Sistemi</span>
      </footer>
    </div>
  );
}

export default App;
