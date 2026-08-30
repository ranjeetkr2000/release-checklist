import React, { useState, useEffect } from 'react';
import ReleaseList from './components/ReleaseList';
import ReleaseDetail from './components/ReleaseDetail';
import { fetchReleases, createRelease, updateRelease, deleteRelease } from './api/releaseAPI';
import './App.css';

function App() {
  const [releases, setReleases] = useState([]);
  const [currentView, setCurrentView] = useState('list');
  const [selectedRelease, setSelectedRelease] = useState(null);

  const loadReleases = async () => {
    try {
      const res = await fetchReleases();
      setReleases(res.data);
    } catch (error) { 
      console.error(error); 
    }
  };

  useEffect(() => { 
    loadReleases(); 
  }, []);

  const handleSave = async (releaseData) => {
    try {
      if (releaseData.id) {
        await updateRelease(releaseData.id, releaseData);
      } else {
        await createRelease(releaseData);
      }
      loadReleases();
      setCurrentView('list');
    } catch (error) { 
      console.error(error); 
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this release?')) {
      try {
        await deleteRelease(id);
        loadReleases();
        setCurrentView('list');
      } catch (error) { 
        console.error(error); 
      }
    }
  };

  return (
    <div className="app-container">
      <h1>Release Checklist</h1>
      <hr />
      {currentView === 'list' ? (
        <ReleaseList 
          releases={releases} 
          onNew={() => { setSelectedRelease(null); setCurrentView('detail'); }} 
          onView={(r) => { setSelectedRelease(r); setCurrentView('detail'); }} 
          onDelete={handleDelete} 
        />
      ) : (
        <ReleaseDetail 
          release={selectedRelease} 
          onBack={() => setCurrentView('list')} 
          onSave={handleSave} 
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}

export default App;