import React from "react";
import './CalendarColumn.css'
import {data} from '../../data.js'
import MeetingOverlay from "../meetingOverlay/MeetingOverlay";

const {day} = data;

function CalendarColumn() {
  return (
    <div className="parent__container__hour"  >
      {day.map((hour, index) => (
        <div className="container__hour" key={index}>
        </div>
      ))}
      
      <MeetingOverlay />
    </div>
  );
}

export default CalendarColumn;