import React, { useEffect, useState } from "react";
import "./MeetingOverlay.css";
import { data } from "../../data.js";
const { meetings } = data;


function MeetingOverlay() {
  const [meetingsState, setMeetingsState] = useState({});

  useEffect(() => {
    const meetingsArr = meetings.sort(customSort);
    
    const initMeetings = initMeetingsObj(meetingsArr);
    let meetingsObj = {...initMeetings};

    // gets meetings with same timings and meetings with intersections.
    const [sameTimings, intersectTimings] = getSameAndIntersectMeetings(meetingsArr);
    console.log(sameTimings, intersectTimings, meetingsArr);

    meetingsObj = addCSSToSameMeetings({...meetingsObj}, sameTimings);
    meetingsObj = addCSSToIntersectedMeetings({...meetingsObj}, intersectTimings);

    setMeetingsState(meetingsObj);
  }, []);

  const customSort = function(meeting1, meeting2) {
    // sorts array in ascending order
    
    const startTime1 = Number(meeting1.startTime);
    const startTime2 = Number(meeting2.startTime);

    if (startTime1 < startTime2) {
      return -1;
    }
    if (startTime1 > startTime2) {
      return 1;
    }
    
    return 0;
  }

  const doesIntersect = (currentStartTime, currentEndTime, previousStartTime, previousEndTime) => {
    // returns true or false
    return Math.min(currentStartTime, currentEndTime) < Math.max(previousStartTime,previousEndTime)
  }

  const initMeetingsObj = (meetingsArray) => {
    const meetingsObj = {};

    meetingsArray.map(meeting => {
      const endTime = meeting["endTime"];
      const startTime = meeting["startTime"];
      const height = (endTime - startTime) * 100 +((startTime - 1) * 2 + 1) + "px";
      const marginTop =  (startTime - 1) * 100 + "px";
      const marginLeft =  '0%';
      const backgroundColor = meeting["color"];

      meetingsObj[meeting.id] = {
        ...meeting,
        height,
        marginTop,
        marginLeft,
        backgroundColor
      }
    })

    return meetingsObj;
  }

  const getSameAndIntersectMeetings = (meetingsArray) => {
    const sameTimings = {};
    const intersectTimings = {};

    meetingsArray?.map((meeting, meetingIndex) => {
      const startTime = meeting["startTime"], endTime = meeting["endTime"];
      const key = startTime + "-" + endTime;
      
      if(meetingIndex > 0) {
        const previousStartTime = meetingsArray[meetingIndex - 1]["startTime"], previousEndTime = meetingsArray[meetingIndex - 1]["endTime"];

        // if intersect
        if(doesIntersect(startTime, endTime, previousStartTime, previousEndTime)) {
          const intersectKey = Math.min(startTime, previousStartTime);

          if(intersectTimings[intersectKey]) {
            intersectTimings[intersectKey].push(meeting.id)
          }else {
            intersectTimings[intersectKey] = [meetingsArray[meetingIndex - 1].id, meeting.id]
          }
        }
      }

      // if the meeting has same timings with previous meetings
      if(!sameTimings[key]) {
        sameTimings[key] = [meeting.id]
      }else {
        sameTimings[key].push(meeting.id)
      }
    });

    return [sameTimings, intersectTimings];
  }

  const addCSSToSameMeetings = (meetingsObj, sameTimings) => {

    for(let key in sameTimings) {
      const len = sameTimings[key].length;
      const parts = 100 / len;
      let marginLeft = 0;

      sameTimings[key].map(id => {
        meetingsObj[id].width = parts + '%';
        meetingsObj[id].marginLeft = marginLeft + '%';

        marginLeft += parts;
      })
    }

    return meetingsObj;
  }

  const addCSSToIntersectedMeetings = (meetingsObj, intersectTimings) => {
    for(let key in intersectTimings) {
      let width = 100;
      let marginLeft = 0;

      intersectTimings[key].map(id => {
        const startTime = meetingsObj[id]["startTime"], endTime = meetingsObj[id]["endTime"];
        const key = startTime + "-" + endTime;

          if(Number(meetingsObj[id].width.slice(0, -1)) !== 100) {
            console.log(meetingsObj[id].width, id)
            width = Number(meetingsObj[id].width.slice(0, -1));
            marginLeft = Number(meetingsObj[id].marginLeft.slice(0, -1))
          }

          meetingsObj[id].width = width + '%';
          meetingsObj[id].marginLeft = marginLeft + '%';

          width -= 10;
          marginLeft += 10;
      })
    }

    return meetingsObj;
  }

  return (
    <div className="meetingOverlay__container">
      {Object.keys(meetingsState).map((meetingId, meetingIndex) => {
        const meeting = meetingsState[meetingId];

        return (
          <div
            className="meetingOverlay__meeting"
            key={meeting.id}
            style={{
              height: meeting.height,
              backgroundColor: meeting.backgroundColor,
              marginTop: meeting.marginTop,
              marginLeft:
              meeting.marginLeft,
              width:
              meeting.width
            }}
          >
            {meeting["title"]}
            <br />
            {meeting["startTime"]} - {meeting["endTime"]}
          </div>
        )
      })}
    </div>
  );
}

export default MeetingOverlay;
