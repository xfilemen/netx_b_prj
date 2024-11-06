"use client";

import { useState, useEffect } from "react";

const timer = (initialTime) => {
  const [time, setTime] = useState(initialTime);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval;

    if (isActive) {
        interval = setInterval(() => {
          const [minutes, seconds] = time.split(":").map(Number);
  
          if (seconds > 0) {
            setTime(`${String(minutes).padStart(2, "0")}:${String(seconds - 1).padStart(2, "0")}`);
            
          } else if (minutes > 0) {
            setTime(`${String(minutes - 1).padStart(2, "0")}:59`); 

          } else {

            clearInterval(interval); 
            setIsActive(false);
          }
        }, 1000); 
      }

    return () => clearInterval(interval); 
  }, [isActive, time]);

  const start = () => {
    setIsActive(true);
  };

  const stop = () => {
    setIsActive(false);
  };

  const reset = () => {
    setTime(initialTime);
    setIsActive(false);
  };

  const remove = () => {
    setTime('');
    setIsActive(false);
  };


  return { time, start, stop, reset, remove, isActive };
};

export default timer;
