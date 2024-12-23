"use client"
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
              Save
            </button>
            <div className="popup-external">
              <button className="discard-btn" onClick={closePopup}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="21"
                  viewBox="0 0 20 21"
                  fill="none"
                >
                  <path
                    d="M15.1855 8.49967L13.8925 16.0637C13.8397 16.3726 13.6828 16.6525 13.4492 16.8542C13.2157 17.0558 12.9205 17.1664 12.6156 17.1663H7.38505C7.08012 17.1664 6.78495 17.0558 6.55142 16.8542C6.31788 16.6525 6.16095 16.3726 6.1082 16.0637L4.81514 8.49967M15.8337 6.49967H12.1878M12.1878 6.49967V5.16634C12.1878 4.81272 12.0513 4.47358 11.8081 4.22353C11.565 3.97348 11.2353 3.83301 10.8915 3.83301H9.10912C8.76532 3.83301 8.43561 3.97348 8.1925 4.22353C7.9494 4.47358 7.81283 4.81272 7.81283 5.16634V6.49967M12.1878 6.49967H7.81283M4.16699 6.49967H7.81283"
                    stroke="#1D1A22"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Discard
              </button>
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="36"
                  height="36"
                  viewBox="0 0 36 36"
                  fill="none"
                >
                  <path
                    d="M24.0675 23.1827C24.1256 23.2407 24.1717 23.3097 24.2031 23.3855C24.2345 23.4614 24.2507 23.5427 24.2507 23.6249C24.2507 23.707 24.2345 23.7883 24.2031 23.8642C24.1717 23.94 24.1256 24.009 24.0675 24.067C24.0095 24.1251 23.9405 24.1712 23.8647 24.2026C23.7888 24.234 23.7075 24.2502 23.6253 24.2502C23.5432 24.2502 23.4619 24.234 23.386 24.2026C23.3102 24.1712 23.2412 24.1251 23.1832 24.067L18.0003 18.8835L12.8175 24.067C12.7003 24.1843 12.5412 24.2502 12.3753 24.2502C12.2095 24.2502 12.0504 24.1843 11.9332 24.067C11.8159 23.9498 11.75 23.7907 11.75 23.6249C11.75 23.459 11.8159 23.2999 11.9332 23.1827L17.1168 17.9999L11.9332 12.817C11.8159 12.6998 11.75 12.5407 11.75 12.3749C11.75 12.209 11.8159 12.0499 11.9332 11.9327C12.0504 11.8154 12.2095 11.7495 12.3753 11.7495C12.5412 11.7495 12.7003 11.8154 12.8175 11.9327L18.0003 17.1163L23.1832 11.9327C23.3004 11.8154 23.4595 11.7495 23.6253 11.7495C23.7912 11.7495 23.9503 11.8154 24.0675 11.9327C24.1848 12.0499 24.2507 12.209 24.2507 12.3749C24.2507 12.5407 24.1848 12.6998 24.0675 12.817L18.8839 17.9999L24.0675 23.1827Z"
                    fill="#1D1A22"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="popup-content">
            <input
              className="textInput"
              type="text"
              name="title"
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
              placeholder="Add a title"
            />
          </div>
          <div className="firstContainer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <g id="20/ph:clock-light">
                <path
                  id="Vector"
                  d="M9.99968 3.33325C8.68113 3.33325 7.3922 3.72424 6.29587 4.45679C5.19955 5.18933 4.34506 6.23052 3.84048 7.44869C3.3359 8.66687 3.20387 10.0073 3.46111 11.3005C3.71834 12.5937 4.35328 13.7816 5.28563 14.714C6.21798 15.6463 7.40587 16.2812 8.69907 16.5385C9.99228 16.7957 11.3327 16.6637 12.5509 16.1591C13.7691 15.6545 14.8103 14.8 15.5428 13.7037C16.2753 12.6074 16.6663 11.3185 16.6663 9.99992C16.6643 8.23244 15.9612 6.53796 14.7114 5.28817C13.4616 4.03837 11.7671 3.33533 9.99968 3.33325ZM9.99968 15.8823C8.83626 15.8823 7.69896 15.5373 6.73162 14.8909C5.76427 14.2446 5.01031 13.3259 4.56509 12.251C4.11987 11.1761 4.00338 9.99339 4.23035 8.85233C4.45732 7.71126 5.01756 6.66313 5.84022 5.84047C6.66289 5.0178 7.71102 4.45756 8.85209 4.23059C9.99315 4.00362 11.1759 4.12011 12.2508 4.56533C13.3256 5.01055 14.2443 5.76451 14.8907 6.73186C15.537 7.69921 15.882 8.8365 15.882 9.99992C15.8803 11.5595 15.26 13.0547 14.1572 14.1575C13.0544 15.2602 11.5592 15.8805 9.99968 15.8823ZM14.052 9.99992C14.052 10.1039 14.0106 10.2037 13.9371 10.2772C13.8636 10.3508 13.7638 10.3921 13.6598 10.3921H9.99968C9.89567 10.3921 9.79592 10.3508 9.72238 10.2772C9.64884 10.2037 9.60752 10.1039 9.60752 9.99992V6.33979C9.60752 6.23578 9.64884 6.13603 9.72238 6.06249C9.79592 5.98895 9.89567 5.94763 9.99968 5.94763C10.1037 5.94763 10.2034 5.98895 10.277 6.06249C10.3505 6.13603 10.3918 6.23578 10.3918 6.33979V9.60776H13.6598C13.7638 9.60776 13.8636 9.64908 13.9371 9.72262C14.0106 9.79616 14.052 9.89591 14.052 9.99992Z"
                  fill="black"
                />
              </g>
            </svg>
            <div className="inputContainer">
              <div className="inputContainers">
                <input
                  className="dateInput"
                  type="date"
                  value={popupDate.toISOString().substring(0, 10)}
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
              <div className="inputContainers">
                <input
                  className="dateInput"
                  type="date"
                  value={popupDate.toISOString().substring(0, 10)}
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
            </div>
            <label className="switch">
              <input
                type="checkbox"
                checked={allDay}
                onChange={(e) => setAllDay(e.target.checked)}
              />
              <span className="slider"></span>
              All Day
            </label>
          </div>
          <div className="secondContainer">
         
            <select
              value={reminder}
              onChange={(e) => setReminder(e.target.value)}
            >
              <option value="Don't remind me">Dont remind me</option>
              <option value="5 minutes before">5 minutes before</option>
            </select>
          </div>
          <div className="thirdContainer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="21"
              viewBox="0 0 20 21"
              fill="none"
            >
              <g id="20/quill:text-left">
                <path
                  id="Vector (Stroke)"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M3.33301 5.25008C3.33301 4.92792 3.58174 4.66675 3.88856 4.66675H16.1108C16.4176 4.66675 16.6663 4.92792 16.6663 5.25008C16.6663 5.57225 16.4176 5.83341 16.1108 5.83341H3.88856C3.58174 5.83341 3.33301 5.57225 3.33301 5.25008ZM3.33301 8.75008C3.33301 8.42792 3.58174 8.16675 3.88856 8.16675H11.6663C11.9732 8.16675 12.2219 8.42792 12.2219 8.75008C12.2219 9.07225 11.9732 9.33342 11.6663 9.33342H3.88856C3.58174 9.33342 3.33301 9.07225 3.33301 8.75008ZM3.33301 12.2501C3.33301 11.9279 3.58174 11.6667 3.88856 11.6667H16.1108C16.4176 11.6667 16.6663 11.9279 16.6663 12.2501C16.6663 12.5722 16.4176 12.8334 16.1108 12.8334H3.88856C3.58174 12.8334 3.33301 12.5722 3.33301 12.2501ZM3.33301 15.7501C3.33301 15.4279 3.58174 15.1667 3.88856 15.1667H11.6663C11.9732 15.1667 12.2219 15.4279 12.2219 15.7501C12.2219 16.0722 11.9732 16.3334 11.6663 16.3334H3.88856C3.58174 16.3334 3.33301 16.0722 3.33301 15.7501Z"
                  fill="black"
                />
              </g>
            </svg>
            <textarea
              className="textAreaInput"
              placeholder="Add a description"
              onChange={(e) => setEventDescription(e.target.value)}
            />
          </div>
        </div>
      )}
    </div>
  );
};