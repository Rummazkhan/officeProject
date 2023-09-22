import { useEffect } from "react";

export const ButtonEnabler = (setIsButtonEnabled, startTime, endTime) => {
  const isTimeBetweenStartTimeandEndTime = () => {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    return currentHour >= startTime && currentHour < endTime;
  };

  useEffect(() => {
    setIsButtonEnabled(isTimeBetweenStartTimeandEndTime());

    const interval = setInterval(() => {
      setIsButtonEnabled(isTimeBetweenStartTimeandEndTime());
    }, 60000);

    return () => clearInterval(interval);
  });
};
