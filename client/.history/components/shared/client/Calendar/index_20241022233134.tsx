"use client";
import React, { useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import resourceTimeGridPlugin from "@fullcalendar/resource-timegrid";



const Calendar = () => {
  const calendarComponentRef = useRef(null);
  const [events, setEvents] = useState([
    { id: 1, title: "event 1", date: "2019-12-01" },
    {
      title: "event 2",
      start: "2019-12-01",
      end: "2019-12-05",
      allDay: true,
      HostName: "William",
    },
    {
      title: "event 3",
      start: "2019-12-05",
      end: "2019-12-07",
      allDay: true,
    },
    {
      title: "event 4",
      start: "2019-12-05",
      end: "2019-12-07",
      allDay: true,
    },
    {
      title: "event 5",
      start: "2019-12-05",
      end: "2019-12-07",
      allDay: true,
    },
    {
      title: "event 6",
      start: "2019-12-05",
      end: "2019-12-07",
      allDay: true,
    },
  ]);

  const handleDateClick = (arg) => {
    alert(arg.dateStr);
  };

  const handleSelectedDates = (info) => {
    alert("selected " + info.startStr + " to " + info.endStr);
    const title = prompt("What's the name of the title");
    if (title != null) {
      const newEvent = {
        title,
        start: info.startStr,
        end: info.endStr,
      };
      setEvents((prevEvents) => [...prevEvents, newEvent]);
    }
  };

  return (
    <div>
      <FullCalendar
        schedulerLicenseKey="GPL-My-Project-Is-Open-Source"
        ref={calendarComponentRef}
        defaultView="dayGridMonth"
        dateClick={handleDateClick}
        displayEventTime={true}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
        }}
        selectable={true}
        plugins={[
          dayGridPlugin,
          interactionPlugin,
          timeGridPlugin,
          resourceTimeGridPlugin,
        ]}
        eventClick={(event) => {
          console.log(event.event._def.publicId);
        }}
        events={events}
        select={handleSelectedDates}
        eventLimit={3}
      />
    </div>
  );
};

export default Calendar;
