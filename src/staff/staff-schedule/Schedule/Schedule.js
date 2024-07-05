import React, { useState, useEffect } from 'react';
import style from './Schedule.module.css';
import Calendar from '../Calendar/Calendar'; 


const schedules = [
    {
        time: "9:00",
        client: "Ms. Lisa",
        service: "HAIR CUT SPA SERVICE",
        period: "MORNING",
    },
    {
        time: "10:00",
        client: "Ms. Jenny",
        service: "NAIL CUT SPA SERVICE",
        period: "MORNING",
    },
    {
        time: "13:00",
        client: "Ms. Lisa",
        service: "HAIR WASH SPA SERVICE",
        period: "AFTERNOON",
    },
    {
        time: "16:00",
        client: "Ms. July",
        service: "NAIL CUT SPA SERVICE",
        period: "AFTERNOON",
    }
];

const Schedule = () => {

    const morningSchedules = schedules.filter(schedule => schedule.period === "MORNING");
    const afternoonSchedules = schedules.filter(schedule => schedule.period === "AFTERNOON");

    return (
        <>
            <Calendar />
            <div className={style.schedule}>
                <div className={style.period}>
                    <h3>MORNING</h3>
                    <div className={style.period_schedule}>
                        {morningSchedules.map((schedule, index) => (
                            <div key={index} className={style.schedule_item}>
                                <div className={style.time}>{schedule.time}</div>
                                <div className={style.details}>
                                    <p>{schedule.client}</p>
                                    <p className={style.service}>{schedule.service}</p>
                                    <button className={style.feedback_button}>View Feedback</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className={style.period}>
                    <h3>AFTERNOON</h3>
                    <div className={style.period_schedule}>
                        {afternoonSchedules.map((schedule, index) => (
                            <div key={index} className={style.schedule_item}>
                                <div className={style.time}>{schedule.time}</div>
                                <div className={style.details}>
                                    <p>{schedule.client}</p>
                                    <p className={style.service}>{schedule.service}</p>
                                    <button className={style.feedback_button}>View Feedback</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Schedule;
