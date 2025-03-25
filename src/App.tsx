import React from 'react';
import './App.css';
import ProfessorData from './Components/ProfessorData';
import TitleCard from './Components/TitleCard';



function App() {
  
  
  return (
    <div className="App">
      <header className="App-header">
        <TitleCard></TitleCard>
        <ProfessorData></ProfessorData>
      </header>
    </div>
  );
}

export default App;
