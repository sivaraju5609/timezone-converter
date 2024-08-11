import React from 'react';
import moment from 'moment-timezone';
const TimeZoneDisplay = ({ timeZone, currentTime, onDelete }) => {
  const timeInZone = currentTime.tz(timeZone).format('HH:mm:ss');
  
  return (
    <div className="card mb-3 w-100">
      <div className="card-body d-flex justify-content-between align-items-center">
        <p className="card-text mb-0">
          <strong>{timeZone}</strong>: {timeInZone}
        </p>
        <button onClick={onDelete} className="btn btn-danger btn-sm">
          Remove
        </button>
      </div>
    </div>
  );
};

export default TimeZoneDisplay;
