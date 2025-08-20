import './App.css';
import React, { useState } from 'react';
import NavBar from './Components/NavBar';
import News from './Components/News';
import LoadingBar from 'react-top-loading-bar';
import { HashRouter as Router, Routes, Route } from "react-router-dom"; 

const App = () => {
  const max = 8;
  const [page, setPage] = useState(1);
  const apiKey = process.env.REACT_APP_NEWS_API;

  const [progress, setProgress] = useState(0);
  const [text, setText] = useState('Enable dark mode');
  const [mode, setMode] = useState('light'); // Whether dark mode is enabled or not?

  const toggleMode = () => {
    if (mode === 'light') {
      setText('Enable light mode');
      setMode('dark');
      document.body.style.backgroundColor = 'black';
    } else {
      setText('Enable dark mode');
      setMode('light');
      document.body.style.backgroundColor = 'white';
    }
  };

  return (
    <div>
      <Router>
        <NavBar toggleMode={toggleMode} text={text} mode={mode} />
        <LoadingBar
          color='#f11946'
          height={3}
          progress={progress}
        />
        
        <Routes>
          <Route index element={<News setProgress={setProgress} apiKey={apiKey} max={max} page={page} setPage={setPage} country="pk" mode={mode} category="general" />} />
          <Route path="/business" element={<News setProgress={setProgress} apiKey={apiKey} max={max} page={page} setPage={setPage} country="pk" mode={mode} category="business" />} />
          <Route path="/entertainment" element={<News setProgress={setProgress} apiKey={apiKey} max={max} page={page} setPage={setPage} country="pk" mode={mode} category="entertainment" />} />
          <Route path="/general" element={<News setProgress={setProgress} apiKey={apiKey} max={max} page={page} setPage={setPage} country="pk" mode={mode} category="general" />} />
          <Route path="/health" element={<News setProgress={setProgress} apiKey={apiKey} max={max} page={page} setPage={setPage} country="pk" mode={mode} category="health" />} />
          <Route path="/science" element={<News setProgress={setProgress} apiKey={apiKey} max={max} page={page} setPage={setPage} country="pk" mode={mode} category="science" />} />
          <Route path="/sports" element={<News setProgress={setProgress} apiKey={apiKey} max={max} page={page} setPage={setPage} country="pk" mode={mode} category="sports" />} />
          <Route path="/technology" element={<News setProgress={setProgress} apiKey={apiKey} max={max} page={page} setPage={setPage} country="pk" mode={mode} category="technology" />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
