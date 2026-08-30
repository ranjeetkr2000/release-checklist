import React, { useState, useEffect } from 'react';
import { fetchSteps } from '../api/releaseAPI';

function ReleaseDetail({ release, onSave, onBack, onDelete }) {
  const [name, setName] = useState(release?.name || '');
  const initialDate = release?.release_date ? new Date(release.release_date).toISOString().slice(0, 16) : '';
  const [date, setDate] = useState(initialDate);
  const [info, setInfo] = useState(release?.additional_info || '');
  const [steps, setSteps] = useState(release?.steps || []);

  useEffect(() => {
    if (!release) {
      fetchSteps()
        .then(res => {
          const defaultSteps = res.data.map(step => ({ ...step, completed: false }));
          setSteps(defaultSteps);
        })
        .catch(console.error);
    }
  }, [release]);

  const handleToggle = (index) => {
    const updated = steps.map((s, i) => i === index ? { ...s, completed: !s.completed } : s);
    setSteps(updated);
  };

  return (
    <div className="form-container">
      <h2>{release?.id ? 'Edit Release' : 'New Release'}</h2>
      
      <div className="form-group">
        <label>Release Name</label>
        <input type="text" value={name} onChange={e => setName(e.target.value)} required />
      </div>

      <div className="form-group">
        <label>Date</label>
        <input type="datetime-local" value={date} onChange={e => setDate(e.target.value)} required />
      </div>

      <div className="checklist">
        <strong>Checklist Steps:</strong><br /><br />
        {steps.map((step, idx) => (
          <div key={idx} className="checkbox-row">
            <label>
              <input 
                type="checkbox" 
                checked={step.completed} 
                onChange={() => handleToggle(idx)} 
              />
              {step.label}
            </label>
          </div>
        ))}
      </div>

      <div className="form-group">
        <label>Additional Info</label>
        <textarea rows="4" value={info} onChange={e => setInfo(e.target.value)}></textarea>
      </div>

      <div className="action-buttons">
        <button className="btn btn-save" onClick={() => onSave({ id: release?.id, name, release_date: date, additional_info: info, steps })}>
          Save
        </button>
        <button className="btn" onClick={onBack}>Cancel</button>
        {release?.id && (
          <button className="btn btn-danger" onClick={() => onDelete(release.id)}>
            Delete
          </button>
        )}
      </div>
    </div>
  );
}

export default ReleaseDetail;