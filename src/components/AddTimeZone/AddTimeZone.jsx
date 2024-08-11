import React, { useState, useEffect } from 'react';
import moment from 'moment-timezone';

const AddTimeZone = ({ onAdd }) => {
  const [selectedTimeZone, setSelectedTimeZone] = useState('');
  const [timeZones, setTimeZones] = useState([]);

  useEffect(() => {
    // Get the list of time zones when the component mounts
    setTimeZones(moment.tz.names());
  }, []);

  const handleAdd = () => {
    if (selectedTimeZone) {
      onAdd(selectedTimeZone);
      setSelectedTimeZone(''); // Clear selection after adding
    }
  };

  return (
    <div className="add-time-zone">
      <div className="form-group">
        <label htmlFor="timeZoneSelect">Select Time Zone:</label>
        <select
          id="timeZoneSelect"
          className="form-control"
          value={selectedTimeZone}
          onChange={(e) => setSelectedTimeZone(e.target.value)}
        >
          <option value="">-- Select a Time Zone --</option>
          {timeZones.map((zone) => (
            <option key={zone} value={zone}>
              {zone}
            </option>
          ))}
        </select>
      </div>
      <button className="btn btn-primary mt-3" onClick={handleAdd}>
        Add Time Zone
      </button>
    </div>
  );
};

export default AddTimeZone;
