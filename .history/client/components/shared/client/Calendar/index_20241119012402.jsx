"use client";
import { useState } from "react";
import "./Calendar.css";

export const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupDate, setPopupDate] = useState(null);
  const [reminder, setReminder] = useState("Hatırlatma yapılmasın");
  const [eventTitle, setEventTitle] = useState("");
  const [eventTime, setEventTime] = useState("08:00");
  const [allDay, setAllDay] = useState(false);
  const [events, setEvents] = useState([]);
  const [eventDescription, setEventDescription] = useState("");

  // Belirli bir ayda kaç gün olduğunu hesaplar
  const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();

  // Ayın ilk gününün hangi gün olduğunu bulur
  const startOfMonth = (month, year) => new Date(year, month, 1).getDay();

  const today = new Date();

  // Gün seçme ve etkinlik ekleme için popup açma
  const handleDayClick = (day) => {
    setPopupDate(
      new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day)
    );
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
  };

  // Aylar arasında geçiş
  const changeMonth = (direction) => {
    const newMonth = selectedDate.getMonth() + direction;
    setSelectedDate(new Date(selectedDate.getFullYear(), newMonth, 1));
  };

  // Etkinlik kaydetme
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

  // Takvim günlerini oluşturur
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
        <div className="calendar-day-name">Pazartesi</div>
        <div className="calendar-day-name">Salı</div>
        <div className="calendar-day-name">Çarşamba</div>
        <div className="calendar-day-name">Perşembe</div>
        <div className="calendar-day-name">Cuma</div>
        <div className="calendar-day-name">Cumartesi</div>
        <div className="calendar-day-name">Pazar</div>
        {renderCalendarDays()}
      </div>

      {popupVisible && (
        <div className="calendar-popup">
          <div className="popup-header">
            <input
              type="text"
              placeholder="Etkinlik Başlığı"
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
            />
            <textarea
              placeholder="Açıklama"
              value={eventDescription}
              onChange={(e) => setEventDescription(e.target.value)}
            />
            <input
              type="time"
              value={eventTime}
              onChange={(e) => setEventTime(e.target.value)}
            />
            <label>
              <input
                type="checkbox"
                checked={allDay}
                onChange={(e) => setAllDay(e.target.checked)}
              />
              Tüm Gün
            </label>
            <select
              value={reminder}
              onChange={(e) => setReminder(e.target.value)}
            >
              <option>Hatırlatma yapılmasın</option>
              <option>5 dakika önce</option>
              <option>1 saat önce</option>
            </select>
            <button onClick={handleSaveEvent}>Kaydet</button>
            <button onClick={closePopup}>Kapat</button>
          </div>
        </div>
      )}
    </div>
  );
};
