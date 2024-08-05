import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Match.css';

const Match = ({ match, handleResultChange, selectedResults, username }) => {
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const existingResult = selectedResults.find(result => result.matchId === match.id);
    setSelected(existingResult ? existingResult.result : null);
  }, [selectedResults, match.id]);

  const selectTeam = (team) => {
    if (!username) {
      toast.error('Por favor, ingresa tu nombre antes de seleccionar un equipo.');
      return;
    }
    setSelected(team);
    handleResultChange(match.id, team);
  };

  return (
    <div className={`match ${!username ? 'disabled' : ''}`}>
      <div className="match-info">
        <span className="match-date">{match.date}</span>
        <span className="match-time">{match.time}</span>
        <span className="match-stadium">{match.stadium}</span>
      </div>
      <div
        className={`team ${selected === 'L' ? 'selected' : ''}`}
        onClick={() => selectTeam('L')}
      >
        <div className="team-content">
          <img src={match.homeTeam.logo} alt={`${match.homeTeam.name} logo`} />
          <span className="team-name">{match.homeTeam.name}</span>
        </div>
      </div>
      <div
        className={`result ${selected === 'E' ? 'selected' : ''}`}
        onClick={() => selectTeam('E')}
      >
        <span>Empate</span>
      </div>
      <div
        className={`team ${selected === 'V' ? 'selected' : ''}`}
        onClick={() => selectTeam('V')}
      >
        <div className="team-content">
          <span className="team-name">{match.awayTeam.name}</span>
          <img src={match.awayTeam.logo} alt={`${match.awayTeam.name} logo`} />
        </div>
      </div>
    </div>
  );
};

export default Match;