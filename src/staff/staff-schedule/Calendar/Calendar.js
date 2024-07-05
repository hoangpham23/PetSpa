import React, { useState, useEffect } from 'react';
import style from './Calendar.module.css';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const Calendar = () => {
    const [startOfWeek, setStartOfWeek] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());

    useEffect(() => {
        const today = new Date();
        const currentWeekStart = new Date(today);
        currentWeekStart.setDate(today.getDate() - today.getDay() + 1);
        setStartOfWeek(currentWeekStart);
        setSelectedDate(today); // Khởi tạo selectedDate là ngày hôm nay
    }, []);

    const handlePrevWeek = () => {
        const newStartOfWeek = new Date(startOfWeek);
        newStartOfWeek.setDate(startOfWeek.getDate() - 7);
        setStartOfWeek(newStartOfWeek);
    };

    const handleNextWeek = () => {
        const newStartOfWeek = new Date(startOfWeek);
        newStartOfWeek.setDate(startOfWeek.getDate() + 7);
        setStartOfWeek(newStartOfWeek);
    };

    const handleClick = (index) => {
        const date = new Date(startOfWeek);
        date.setDate(startOfWeek.getDate() + index);
        setSelectedDate(date); // Cập nhật selectedDate khi click vào ngày
    };

    return (
        <>
        <div className={style.today}>
        <p>{selectedDate.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
        <p>Today</p>
    </div>
    <div className={style.week_calendar}>
        <button className={style.nav_button} onClick={handlePrevWeek}>&#9664;</button>
        {Array.from({ length: 7 }, (_, index) => {
            const date = new Date(startOfWeek);
            date.setDate(startOfWeek.getDate() + index);
            return (
                <div key={index} className={`${style.day} ${date.toDateString() === selectedDate.toDateString() ? style.active : ''}`} onClick={() => handleClick(index)}>
                    <p>{date.toLocaleDateString('en-US', { weekday: 'short' })}</p>
                    <p>{date.getDate()}</p>
                </div>
            );
        })}
        <button className={style.nav_button} onClick={handleNextWeek}>&#9654;</button>
    </div>
    </>
    );
};

export default Calendar;
