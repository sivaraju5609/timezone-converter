import React, { Component } from 'react';
import moment from 'moment-timezone';
import DatePicker from 'react-datepicker';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import TimeZoneDisplay from '../TimeZoneDisplay/TimeZoneDisplay';
import AddTimeZone from '../AddTimeZone/AddTimeZone';
import 'react-datepicker/dist/react-datepicker.css'; 
import './timeZoneConverter.css'

class TimeZoneConverter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeZones: ['UTC', 'Asia/Kolkata'], 
      currentTime: moment(),
      darkMode: false,
      selectedDate: new Date(),
    };
  }

  handleTimeZoneAddition = (timeZone) => {
    this.setState(prevState => ({
      timeZones: [...prevState.timeZones, timeZone]
    }));
  };

  handleTimeZoneDeletion = (index) => {
    this.setState(prevState => ({
      timeZones: prevState.timeZones.filter((_, i) => i !== index)
    }));
  };

  onDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(this.state.timeZones);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    this.setState({ timeZones: items });
  };

  handleDateChange = (date) => {
    this.setState({ currentTime: moment(date) });
  };

  toggleDarkMode = () => {
    this.setState(prevState => ({ darkMode: !prevState.darkMode }));
  };

  reverseTimeZones = () => {
    this.setState(prevState => ({
      timeZones: prevState.timeZones.slice().reverse()
    }));
  };

  generateShareableLink = () => {
    const { timeZones, currentTime } = this.state;
    const timeZoneList = timeZones.join(',');
    const currentTimeFormatted = currentTime.format('YYYY-MM-DDTHH:mm:ss');
    return `${window.location.origin}/share?timeZones=${encodeURIComponent(timeZoneList)}&currentTime=${encodeURIComponent(currentTimeFormatted)}`;
  };

  openGoogleCalendar = () => {
    const { timeZones, currentTime } = this.state;
    const eventDate = currentTime.format('YYYYMMDDTHHmmss');
    const eventTitle = 'Meeting';
    const eventDetails = `Meeting with time zones: ${timeZones.join(', ')}`;
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventTitle)}&dates=${eventDate}/${eventDate}&details=${encodeURIComponent(eventDetails)}`;
    window.open(googleCalendarUrl, '_blank');
  };

  render() {
    const { timeZones, currentTime, darkMode, selectedDate } = this.state;
    const containerClass = darkMode ? 'container dark-mode' : 'container';

    return (
      <div className={`${containerClass} p-5 pb-0 min-vh-100 min-vw-100`}  >
        <h2 className="text-center mb-4">Time Zone Converter</h2>
        <div className="mb-3">
          <AddTimeZone onAdd={this.handleTimeZoneAddition} />
        </div>
        <div className="mb-3 d-flex w-100 gap-3">
          <button className="btn btn-secondary" onClick={this.reverseTimeZones}>Reverse Order</button>
          <button className="btn btn-secondary ml-2" onClick={this.toggleDarkMode}>
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
        <div className="mb-3">
          <DatePicker
            selected={selectedDate}
            onChange={this.handleDateChange}
            showTimeSelect
            dateFormat="Pp"
            className="form-control"
          />
        </div>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div {...provided.droppableProps} ref={provided.innerRef} className="list-group">
                {timeZones.map((zone, index) => (
                  <Draggable key={zone} draggableId={zone} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="list-group-item d-flex justify-content-between align-items-center"
                      >
                        <TimeZoneDisplay
                          timeZone={zone}
                          currentTime={currentTime}
                          onDelete={() => this.handleTimeZoneDeletion(index)}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <div className="mt-4 w-100 d-flex gap-3">
          <a href={this.generateShareableLink()} target="_blank" rel="noopener noreferrer" className="btn btn-info">
            Generate Shareable Link
          </a>
          <button className="btn btn-primary ml-2" onClick={this.openGoogleCalendar}>
            Schedule Meet
          </button>
        </div>
      </div>
    );
  }
}

export default TimeZoneConverter;
