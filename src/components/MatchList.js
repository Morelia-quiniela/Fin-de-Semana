import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Match from './Match';
import { FaWhatsapp, FaTrash } from 'react-icons/fa';
import './MatchList.css';

const MatchList = () => {
  const [quinielas, setQuinielas] = useState([]);
  const [username, setUsername] = useState('');
  const [matches] = useState([
    {
      id: 1,
      date: '23 AGO',
      time: '19:00',
      homeTeam: { name: 'Querétaro', logo: '..public/club/Liga-Mx/queretaro.png' },
      awayTeam: { name: 'Cruz Azul', logo: '/club/Liga-Mx/cruzazul.png' }
    },
    {
      id: 2,
      date: '23 AGO',
      time: '20:00',
      homeTeam: { name: 'Mazatlan', logo: '/club/Liga-Mx/mazatlan.png' },
      awayTeam: { name: 'Pachuca', logo: '/club/Liga-Mx/pachuca.png' }
    },
    {
      id: 3,
      date: '23 AGO',
      time: '21:05',
      homeTeam: { name: 'Tijuana', logo: '/club/Liga-Mx/tijuana.png' },
      awayTeam: { name: 'Monterrey', logo: '/club/Liga-Mx/monterrey.png' }
    },
    {
      id: 4,
      date: '24 AGO',
      time: '17:00',
      homeTeam: { name: 'Necaxa', logo: '/club/Liga-Mx/necaxa.png' },
      awayTeam: { name: 'Fc Juárez', logo: '/club/Liga-Mx/juarez.png' }
    },
    {
      id: 5,
      date: '24 AGO',
      time: '19:00',
      homeTeam: { name: 'Atlas', logo: '/club/Liga-Mx/atlas.png' },
      awayTeam: { name: 'Pumas', logo: '/club/Liga-Mx/pumas.png' }
    },
    {
      id: 6,
      date: '24 AGO',
      time: '19:00',
      homeTeam: { name: 'León', logo: '/club/Liga-Mx/leon.png' },
      awayTeam: { name: 'Santos', logo: '/club/Liga-Mx/santos.png' }
    },
    {
      id: 7,
      date: '24 AGO',
      time: '21:00',
      homeTeam: { name: 'Tigres', logo: '/club/Liga-Mx/tigres.png' },
      awayTeam: { name: 'Chivas', logo: '/club/Liga-Mx/guadalajara.png' }
    },
    {
      id: 8,
      date: '24 AGO',
      time: '21:05',
      homeTeam: { name: 'América', logo: '/club/Liga-Mx/america.png' },
      awayTeam: { name: 'Puebla', logo: '/club/Liga-Mx/puebla.png' }
    },
    {
      id: 9,
      date: '25 AGO',
      time: '12:00',
      homeTeam: { name: 'Toluca', logo: '/club/Liga-Mx/toluca.png' },
      awayTeam: { name: 'Atletico San Luis', logo: '/club/Liga-Mx/atleticosl.png' }
    },
  ]);

  const [results, setResults] = useState({});
  const [selectedResults, setSelectedResults] = useState([]);

  const handleResultChange = (matchId, result) => {
    const newResults = {
      ...results,
      [matchId]: result
    };
    setResults(newResults);
    setSelectedResults(Object.keys(newResults).map(id => ({ matchId: parseInt(id), result: newResults[id] })));
  };

  const handleSaveQuiniela = () => {
    if (!username) {
      toast.error('Por favor, ingresa tu nombre antes de guardar la quiniela.');
      return;
    }
    if (Object.keys(results).length !== matches.length) {
      toast.error('Por favor, selecciona un resultado para todos los partidos antes de guardar la quiniela.');
      return;
    }
    setQuinielas([...quinielas, { username, results }]);
    setUsername('');
    setResults({});
    setSelectedResults([]);
    toast.success('Quiniela guardada correctamente.');
  };

  const handleClear = () => {
    setUsername('');
    setResults({});
    setSelectedResults([]);
    setQuinielas([]);
  };

  const handleDeleteQuiniela = (index) => {
    const newQuinielas = quinielas.filter((_, i) => i !== index);
    setQuinielas(newQuinielas);
    toast.info('Quiniela eliminada.');
  };

  const handleSendQuinielas = () => {
    const phoneNumber = '524433514416';
    const exportResults = quinielas
      .map((q) => `${q.username}\t${formatResults(q.results)}`)
      .join('\n');

    const whatsappMessage = encodeURIComponent(exportResults);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${whatsappMessage}`;

    window.open(whatsappUrl, '_blank');
    handleClear();
    toast.info('Quinielas enviadas y limpiadas.');
  };

  const formatResults = (results) => {
    return Object.entries(results)
      .map(([matchId, result]) => result)
      .join('\t');
  };

  const quinielaCost = 20;
  const totalCost = quinielas.length * quinielaCost;

  return (
    <div className="match-list">
      <h2>Quiniela Morelia Jornada 5 - Del 23 al 25 de agosto</h2>
      <p className="cost">Costo por quiniela: ${quinielaCost}</p>
      <p className="deadline">Cierra: Martes 11pm</p>
      <input
        type="text"
        placeholder="Ingresa tu nombre"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <ToastContainer />
      {matches.map((match) => (
        <Match
          key={match.id}
          match={match}
          handleResultChange={handleResultChange}
          selectedResults={selectedResults}
          username={username}
        />
      ))}
      <div className="results">
        <h3>Resultados</h3>  
        <p className="total-cost">Total: ${totalCost}</p>
        {quinielas.map((q, index) => (
          <div key={index} className="saved-quiniela">
            <p>{q.username} {formatResults(q.results)}</p>
            <svg xmlns="http://www.w3.org/2000/svg" onClick={() => handleDeleteQuiniela(index)} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="delete-icon">
              <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          </div>
        ))}
       
      </div>
      <div>
        <button onClick={handleSaveQuiniela} className="save-button">
          Guardar Quiniela
        </button>
        <button onClick={handleClear} className="clear-button">
          <FaTrash size={18} color="#ffffff" /> Limpiar
        </button>
        {quinielas.length > 0 && (
          <button onClick={handleSendQuinielas} className="whatsapp-button">
            <FaWhatsapp size={24} /> Enviar por WhatsApp
          </button>
        )}
      </div>
    </div>
  );
};

export default MatchList;
