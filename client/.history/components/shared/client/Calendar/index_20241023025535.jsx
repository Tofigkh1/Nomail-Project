import { useState } from "react";
import "./Calendar.css";

export const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupDate, setPopupDate] = useState(null);
  const [reminder, setReminder] = useState("Don't remind me");
  const [eventTitle, setEventTitle] = useState("");
  const [eventTime, setEventTime] = useState("08:00");
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

      {popupVisible && (
        <div className="calendar-popup">
          <div className="popup-header">
            <button className="save-btn" onClick={handleSaveEvent}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
              >
                <path
                  d="M13.333 16.3334H6.66634C6.18011 16.3334 5.7138 16.1403 5.36998 15.7964C5.02616 15.4526 4.83301 14.9863 4.83301 14.5001V6.50008C4.83301 6.01385 5.02616 5.54754 5.36998 5.20372C5.7138 4.8599 6.18011 4.66675 6.66634 4.66675H11.6663C11.7989 4.66686 11.926 4.71962 12.0197 4.81341L15.0197 7.83341C15.1135 7.92709 15.1662 8.05418 15.1663 8.18675V14.5001C15.1663 14.9863 14.9732 15.4526 14.6294 15.7964C14.2856 16.1403 13.8192 16.3334 13.333 16.3334ZM6.66634 5.66675C6.44533 5.66675 6.23337 5.75455 6.07709 5.91083C5.92081 6.06711 5.83301 6.27907 5.83301 6.50008V14.5001C5.83301 14.7211 5.92081 14.9331 6.07709 15.0893C6.23337 15.2456 6.44533 15.3334 6.66634 15.3334H13.333C13.554 15.3334 13.766 15.2456 13.9223 15.0893C14.0785 14.9331 14.1663 14.7211 14.1663 14.5001V8.37341L11.4597 5.66675H6.66634Z"
                  fill="white"
                />
                <path
                  d="M13.1664 15.8334H12.1664V11.6667H7.83303V15.8334H6.83303V11.5001C6.83303 11.2791 6.92083 11.0671 7.07711 10.9108C7.23339 10.7545 7.44535 10.6667 7.66637 10.6667H12.333C12.554 10.6667 12.766 10.7545 12.9223 10.9108C13.0786 11.0671 13.1664 11.2791 13.1664 11.5001V15.8334ZM10.313 8.33341H7.68637C7.57343 8.33254 7.46177 8.30943 7.35776 8.26541C7.25376 8.22138 7.15944 8.1573 7.0802 8.07682C7.00096 7.99634 6.93835 7.90104 6.89594 7.79637C6.85353 7.69169 6.83215 7.57969 6.83303 7.46675V5.16675H7.83303V7.33341H10.1664V5.16675H11.1664V7.46675C11.1672 7.57969 11.1459 7.69169 11.1035 7.79637C11.0611 7.90104 10.9984 7.99634 10.9192 8.07682C10.84 8.1573 10.7456 8.22138 10.6416 8.26541C10.5376 8.30943 10.426 8.33254 10.313 8.33341Z"
                  fill="white"
                />
              </svg>
            </button>
            <button className="close-btn" onClick={closePopup}>
              X
            </button>
          </div>
          <div className="popup-content">
            <input
              type="text"
              className="titleInput"
              placeholder="Event Title"
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
            />
            <textarea
              className="descriptionInput"
              placeholder="Event Description"
              value={eventDescription}
              onChange={(e) => setEventDescription(e.target.value)}
            ></textarea>
            <div className="inputContainers">
              <input
                className="dateInput"
                type="date"
                value={
                  popupDate ? popupDate.toISOString().substring(0, 10) : ""
                }
                onChange={(e) => {
                  const date = new Date(e.target.value);
                  setPopupDate(date);
                }}
              />
              <input
                type="time"
                className="timeInput"
                value={eventTime}
                onChange={(e) => setEventTime(e.target.value)}
                disabled={allDay}
              />
            </div>
            <div className="inputGroup">
              <input
                type="checkbox"
                checked={allDay}
                onChange={(e) => setAllDay(e.target.checked)}
              />
              <span>All Day Event</span>
            </div>
            <div className="inputGroup">
              <select
                value={reminder}
                onChange={(e) => setReminder(e.target.value)}
              >
                <option>Don't remind me</option>
                <option>5 minutes before</option>
                <option>15 minutes before</option>
                <option>30 minutes before</option>
                <option>1 hour before</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
