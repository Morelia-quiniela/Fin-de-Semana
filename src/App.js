import React from 'react';
import MatchList from './components/MatchList';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className='calichitas'>Quiniela Morelia</h1>
      </header>
      <main>
        <MatchList />
      </main>
    </div>
  );
}

export default App;
