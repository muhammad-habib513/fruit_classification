import React, { useState, useRef } from 'react';
import './App.css';

function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [history, setHistory] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const dropRef = useRef();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setResult(null);
    if (selectedFile) {
      setPreview(URL.createObjectURL(selectedFile));
    } else {
      setPreview(null);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      setPreview(URL.createObjectURL(droppedFile));
      setResult(null);
    }
    dropRef.current.classList.remove('dragover');
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropRef.current.classList.add('dragover');
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropRef.current.classList.remove('dragover');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('http://localhost:8000/predict', {
      method: 'POST',
      body: formData,
    });
    const data = await response.json();
    setResult(data);
    setHistory([{ file: preview, ...data }, ...history]);
    setLoading(false);
  };

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
    document.body.classList.toggle('dark', !darkMode);
  };

  return (
    <div className={`container${darkMode ? ' dark' : ''}`}> 
      <div className="card">
        <div className="header-row">
          <h2>🍎 Fruit Classifier</h2>
          <button className="dark-toggle" onClick={toggleDarkMode} title="Toggle dark mode">
            {darkMode ? '🌙' : '☀️'}
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div
            className="drop-area"
            ref={dropRef}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <span>Drag & drop an image here</span>
            <span style={{ fontSize: 12, color: '#888' }}>or</span>
            <input type="file" accept="image/*" onChange={handleFileChange} className="file-input" />
          </div>
          <button type="submit" disabled={!file || loading} className="predict-btn">
            {loading ? 'Predicting...' : 'Predict'}
          </button>
        </form>
        {preview && (
          <div className="preview">
            <img src={preview} alt="Preview" />
          </div>
        )}
        {result && (
          <div className="result">
            <strong>Prediction:</strong> {result.class} <br />
            <strong>Confidence:</strong> {(result.confidence * 100).toFixed(2)}%
          </div>
        )}
        {history.length > 0 && (
          <div className="history">
            <h4>Prediction History</h4>
            <ul>
              {history.map((item, idx) => (
                <li key={idx}>
                  <img src={item.file} alt="history" />
                  <span>{item.class} ({(item.confidence * 100).toFixed(1)}%)</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
