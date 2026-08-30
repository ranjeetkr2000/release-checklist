import React from 'react';
import { format } from 'date-fns';

function ReleaseList({ releases, onView, onDelete, onNew }) {
  return (
    <div>
      <button className="btn" onClick={onNew}>+ Create Release</button>
      <br /><br />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {releases.map(release => (
            <tr key={release.id}>
              <td>{release.name}</td>
              <td>{format(new Date(release.release_date), 'PPpp')}</td>
              <td>{release.status}</td>
              <td>
                <button className="btn" onClick={() => onView(release)}>Edit / View</button>
                <button className="btn btn-danger" onClick={() => onDelete(release.id)}>Delete</button>
              </td>
            </tr>
          ))}
          {releases.length === 0 && (
            <tr><td colSpan="4">No releases found.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ReleaseList;