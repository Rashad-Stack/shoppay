import React, { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import { calculateDiff } from "./utils";

const defaultRemainingTime = {
  seconds: "00",
  minutes: "00",
  hours: "00",
  days: "00",
};

export default function CountDown({ date }) {
  const [timeInMs, setTimeInMs] = useState(date.getTime());
  const [remainingTime, setRemainingTime] = useState(defaultRemainingTime);

  useEffect(() => {
    setTimeInMs(date.getTime());
  }, [date]);

  useEffect(() => {
    const interval = setInterval(() => {
      updateRemainingTime(timeInMs);
    }, 1000);
    return () => clearInterval(interval);
  }, [timeInMs]);

  const updateRemainingTime = (timeInMs) => {
    setRemainingTime(calculateDiff(timeInMs));
  };

  return (
    <div className={styles.countdown}>
      {remainingTime?.days &&
        remainingTime?.days
          .split(" ")
          .map((day, i) => <span key={i}>{day}</span>)}
      <b>:</b>
      {remainingTime?.hours &&
        remainingTime?.hours
          .split(":")
          .map((hour, i) => <span key={i}>{hour}</span>)}
      <b>:</b>
      {remainingTime?.minutes &&
        remainingTime?.minutes
          .split(":")
          .map((m, i) => <span key={i}>{m}</span>)}
      <b>:</b>
      {remainingTime?.seconds &&
        remainingTime?.seconds
          .split(":")
          .map((s, i) => <span key={i}>{s}</span>)}
    </div>
  );
}
