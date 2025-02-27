import React, { useState, useEffect } from "react";

const CounterComponent = ({ targetCount }: { targetCount: number }) => {
  const [count, setCount] = useState(0);
  const [intervalTime, setIntervalTime] = useState(10); // Initial interval time
  const [speedFactor, setSpeedFactor] = useState(1); // Speed factor for increment

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount < targetCount) {
          const difference = targetCount - prevCount;

          // Adjust the speed: smaller difference means slower increments
          const increment = Math.max(Math.ceil(difference / 50), 1);

          // Gradually slow down as we near the target
          if (difference < 1000) {
            setIntervalTime(20); // Increase the interval for slower updates
            setSpeedFactor(0.9); // Reduce the speed of increments
          }

          // Ensure that we don't overshoot the target
          const newCount = Math.min(prevCount + increment * speedFactor, targetCount);

          return newCount;
        } else {
          clearInterval(interval); // Stop the interval when the target is reached
          return targetCount;
        }
      });
    }, intervalTime);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [targetCount, intervalTime, speedFactor]);

  return (
    <span className="counter">
      <span>{count.toLocaleString()}</span>
      <span>+</span>
    </span>
  );
};

export default CounterComponent;
