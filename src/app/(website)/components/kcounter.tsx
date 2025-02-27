import React, { useState, useEffect } from "react";

// Define the type for the props
interface CounterProps {
  targetCount: number;
}

const KCounterComponent: React.FC<CounterProps> = ({ targetCount }) => {
  // Explicitly type the state as number
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount < targetCount) {
          return prevCount + Math.ceil(targetCount / 100); // Adjust the speed of counting up
        } else {
          clearInterval(interval); // Stop when target is reached
          return targetCount;
        }
      });
    }, 100); // Adjust the interval speed (in milliseconds)

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [targetCount]);

  // Function to format the count with "k" for thousands
  const formatCount = (count: number): string => {
    return count >= 1000 ? (count / 1000).toFixed(0) + "k" : count.toString();
  };

  return (
    <span className="counter">
      <span>{formatCount(count)}</span>
      <span>+</span>
    </span>
  );
};

export default KCounterComponent;
