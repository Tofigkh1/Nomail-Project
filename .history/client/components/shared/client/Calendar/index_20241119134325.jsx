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
  const [eventsForDay, setEventsForDay] = useState([]);
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

  const handleSaveEvent = (newEvent) => {
    setEventsForDay((prevEvents = []) => {
      const existingEventIndex = prevEvents.findIndex(
        (event) => event.title === newEvent.title && event.time === newEvent.time
      );
  
      if (existingEventIndex !== -1) {
        const updatedEvents = [...prevEvents];
        updatedEvents[existingEventIndex] = newEvent;
        return updatedEvents;
      } else {
        return [...prevEvents, newEvent];
      }
    });
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
            <button className="save-btn" onClick={() => handleSaveEvent({ title: "Yeni Etkinlik", time: "12:00" })}>
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
              <button onClick={closePopup}>
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
                  style={{ textIndent: '30px',paddingTop:'20px' }}
                  
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
        value={startDate.toISOString().substring(0, 10)}
        onChange={(e) => {
          const date = new Date(e.target.value);
          setStartDate(date);
        }}
      />


                <input
                  type="time"
                  className="timeInput"
                  value={startEventTime}
                  onChange={(e) => setstartEventTime(e.target.value)}
                  disabled={allDay}
                />



              </div>
              <div className="inputContainers">



              <input
        className="dateInput"
        type="date"
        value={endDate.toISOString().substring(0, 10)}
        onChange={(e) => {
          const date = new Date(e.target.value);
          setEndDate(date);
        }}
      />



                <input
                  type="time"
                  className="timeInput"
                  value={EndEventTime}
                  onChange={(e) => setEndEventTime(e.target.value)}
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
           
            </label>
            <h1>   All Day</h1>
          </div>
          <div className="secondContainer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
            >
              <g id="Group">
                <path
                  id="Vector (Stroke)"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4.5482 11.2297C4.76307 11.3488 4.84072 11.6195 4.72163 11.8343L3.83298 13.4378C3.71389 13.6526 3.44316 13.7303 3.22829 13.6112C3.01342 13.4921 2.93578 13.2214 3.05486 13.0065L3.94352 11.4031C4.0626 11.1882 4.33333 11.1106 4.5482 11.2297Z"
                  fill="black"
                />
                <path
                  id="Vector (Stroke)_2"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9.45095 11.2297C9.66582 11.1106 9.93655 11.1882 10.0556 11.4031L10.9443 13.0065C11.0634 13.2214 10.9857 13.4921 10.7709 13.6112C10.556 13.7303 10.2853 13.6526 10.1662 13.4378L9.27752 11.8343C9.15843 11.6195 9.23608 11.3488 9.45095 11.2297Z"
                  fill="black"
                />
                <path
                  id="Vector (Stroke)_3"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6.99953 2.11253C4.29984 2.11253 2.11131 4.30106 2.11131 7.00075C2.11131 9.70045 4.29984 11.889 6.99953 11.889C9.69923 11.889 11.8878 9.70045 11.8878 7.00075C11.8878 4.30106 9.69923 2.11253 6.99953 2.11253ZM1.22168 7.00075C1.22168 3.80973 3.80851 1.2229 6.99953 1.2229C10.1906 1.2229 12.7774 3.80973 12.7774 7.00075C12.7774 10.1918 10.1906 12.7786 6.99953 12.7786C3.80851 12.7786 1.22168 10.1918 1.22168 7.00075Z"
                  fill="black"
                />
                <path
                  id="Vector (Stroke)_4"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4.22752 1.36599C3.82858 1.21571 3.39482 1.18338 2.97801 1.27286C2.56119 1.36234 2.17892 1.56985 1.87681 1.87064C1.5747 2.17142 1.36551 2.55278 1.2742 2.9692C1.18289 3.38561 1.21331 3.81951 1.36184 4.21911C1.51037 4.61871 1.77073 4.96714 2.11186 5.22283C2.30843 5.37016 2.34835 5.64896 2.20101 5.84554C2.05367 6.04211 1.77488 6.08203 1.5783 5.93469C1.10057 5.57663 0.735956 5.08868 0.527951 4.52906C0.319947 3.96945 0.277341 3.36181 0.405217 2.77865C0.533092 2.19548 0.82605 1.66142 1.24913 1.2402C1.67222 0.81897 2.20756 0.528361 2.79128 0.40305C3.375 0.277738 3.98244 0.323014 4.54114 0.533476C5.09983 0.743938 5.58617 1.1107 5.94214 1.58999C6.08861 1.78721 6.04747 2.06583 5.85025 2.21231C5.65303 2.35878 5.37441 2.31764 5.22793 2.12042C4.97375 1.77817 4.62647 1.51628 4.22752 1.36599Z"
                  fill="black"
                />
                <path
                  id="Vector (Stroke)_5"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6.99953 0.33374C7.2452 0.333746 7.44434 0.532901 7.44434 0.778564L7.44432 1.6674C7.44431 1.91306 7.24515 2.11221 6.99949 2.1122C6.75383 2.1122 6.55468 1.91304 6.55469 1.66738L6.55471 0.778544C6.55471 0.53288 6.75387 0.333735 6.99953 0.33374Z"
                  fill="black"
                />
                <path
                  id="Vector (Stroke)_6"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6.9995 3.8894C7.24517 3.8894 7.44432 4.08855 7.44432 4.33422V7.00073C7.44432 7.24639 7.24517 7.44554 6.9995 7.44554C6.75384 7.44554 6.55469 7.24639 6.55469 7.00073V4.33422C6.55469 4.08855 6.75384 3.8894 6.9995 3.8894Z"
                  fill="black"
                />
                <path
                  id="Vector (Stroke)_7"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6.68497 6.6857C6.85868 6.51199 7.14032 6.51199 7.31403 6.6857L9.19954 8.57121C9.37325 8.74492 9.37325 9.02656 9.19954 9.20027C9.02583 9.37398 8.74419 9.37398 8.57048 9.20027L6.68497 7.31476C6.51126 7.14105 6.51126 6.85941 6.68497 6.6857Z"
                  fill="black"
                />
                <path
                  id="Vector (Stroke)_8"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9.45846 0.533476C10.0172 0.323014 10.6246 0.277738 11.2083 0.40305C11.792 0.528361 12.3274 0.81897 12.7505 1.2402C13.1736 1.66142 13.4665 2.19548 13.5944 2.77865C13.7223 3.36181 13.6797 3.96945 13.4717 4.52906C13.2636 5.08868 12.899 5.57663 12.4213 5.93469C12.2247 6.08203 11.9459 6.04211 11.7986 5.84554C11.6513 5.64896 11.6912 5.37016 11.8877 5.22283C12.2289 4.96714 12.4892 4.61871 12.6378 4.21911C12.7863 3.81951 12.8167 3.38562 12.7254 2.9692C12.6341 2.55278 12.4249 2.17142 12.1228 1.87064C11.8207 1.56985 11.4384 1.36234 11.0216 1.27286C10.6048 1.18338 10.171 1.21571 9.77208 1.36599C9.37313 1.51628 9.02585 1.77817 8.77167 2.12042C8.6252 2.31764 8.34658 2.35878 8.14936 2.21231C7.95213 2.06583 7.91099 1.78721 8.05747 1.58999C8.41343 1.1107 8.89977 0.743938 9.45846 0.533476Z"
                  fill="black"
                />
              </g>
            </svg>
            <select
              value={reminder}
              onChange={(e) => setReminder(e.target.value)}
            >
              <option value="Don't remind me">Dont remind me</option>
              <option value="5 minutes before">5 minutes before</option>
            </select>
          </div>
          <div className="inputContainers">
            <div className=" mt-9">
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
            </div>
         
            <input
                  style={{ paddingTop: '30px' }}
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