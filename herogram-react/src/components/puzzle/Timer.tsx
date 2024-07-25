import { useEffect, useState } from "react";

function Timer({ maxTime }: { maxTime: number }) {
  const [time, setTime] = useState<number>(maxTime);
  useEffect(() => {
    const interval = setInterval(() => {
      setTime((v: number) => v - 1);
    }, 1000);
    return function () {
      clearInterval(interval);
    };
  });
  return (
    <div>
      {Math.floor(time / 60)}:{Math.floor(time % 60)}
    </div>
  );
}

export default Timer;
