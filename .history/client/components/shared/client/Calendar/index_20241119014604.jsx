"use client"
import { useState } from "react";
import "./Calendar.css";

export const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupDate, setPopupDate] = useState(null);
    const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [reminder, setReminder] = useState("Don't remind me");
  const [eventTitle, setEventTitle] = useState("");
  const [startEventTime, setstartEventTime] = useState("08:00");
  const [EndEventTime, setEndEventTime] = useState("08:00");

  const [allDay, setAllDay] = useState(false);
  const [events, setEvents] = useState([]);
  const [eventDescription, setEventDescription] = useState("");

  const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
  const startOfMonth = (month, year) => new Date(year, month, 1).getDay();
  const today = new Date();

  const handleDayClick = (day) => {
    setPopupDate(
      new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day)
    );
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
  };

  const changeMonth = (direction) => {
    const newMonth = selectedDate.getMonth() + direction;
    setSelectedDate(new Date(selectedDate.getFullYear(), newMonth, 1));
  };

  const handleSaveEvent = () => {
    const newEvent = {
      title: eventTitle,
      date: popupDate,
      time: eventTime,
      allDay: allDay,
      reminder: reminder,
      description: eventDescription,
    };
  
    setEvents([...events, newEvent]);
    closePopup();
  };

  const renderCalendarDays = () => {
    const totalDays = daysInMonth(
      selectedDate.getMonth(),
      selectedDate.getFullYear()
    );
    const startDay = startOfMonth(
      selectedDate.getMonth(),
      selectedDate.getFullYear()
    );
  
    let days = [];
    for (let i = 0; i < startDay - 1; i++) {
      days.push(<div className="calendar-day empty" key={`empty-${i}`} />);
    }
  
    for (let day = 1; day <= totalDays; day++) {
      const isToday =
        selectedDate.getFullYear() === today.getFullYear() &&
        selectedDate.getMonth() === today.getMonth() &&
        day === today.getDate();
  
      const eventsForDay = events.filter((event) => {
        const eventDate = new Date(event.date);
        return (
          eventDate.getFullYear() === selectedDate.getFullYear() &&
          eventDate.getMonth() === selectedDate.getMonth() &&
          eventDate.getDate() === day
        );
      });
  
      days.push(
        <div
          key={day}
              className={`calendar-day ${isToday ? "today" : ""}`}
          onClick={() => handleDayClick(day)}
        >
          {day}
          {eventsForDay.length > 0 && (
            <div className="event-list">
              {eventsForDay.map((event, index) => (
                <div key={index} className="event-item">
                  <span className="goldenText">{event.title}</span>{" "}
                  <span>{event.time}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }
  
    return days;
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button onClick={() => changeMonth(-1)}>&lt;</button>
        <span>
          {selectedDate.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </span>
        <button onClick={() => changeMonth(1)}>&gt;</button>
      </div>
      <div className="calendar-grid">
        <div className="calendar-day-name">Monday</div>
        <div className="calendar-day-name">Tuesday</div>
        <div className="calendar-day-name">Wednesday</div>
        <div className="calendar-day-name">Thursday</div>
        <div className="calendar-day-name">Friday</div>
        <div className="calendar-day-name">Saturday</div>
        <div className="calendar-day-name">Sunday</div>
        {renderCalendarDays()}
      </div>

    
</div>
);
};