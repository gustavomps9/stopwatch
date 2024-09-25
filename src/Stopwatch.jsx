import React, {useState, useEffect, useRef} from "react";
function Stopwatch() {

   const [time, setTime] = useState(0)
   const [isRunning, setIsRunning] = useState(false)
   const intervalRef = useRef(null)
   const startTimeRef = useRef(0)

   useEffect(() => {

      if(isRunning){
         intervalRef.current = setInterval(() => {
            setTime(Date.now() - startTimeRef.current);
       }, 10);
      }

         return () => {
            clearInterval(intervalRef.current);
      	}
  
   }, [isRunning])

   function start() {
      setIsRunning(true);
      startTimeRef.current = Date.now() - time;
   }

   function stop() {
      setIsRunning(false);
   }

   function reset() {
      setTime(0);
      setIsRunning(false);
   }

   function formatTime() {
      const getSeconds = `0${(time / 1000).toFixed(0) % 60}`.slice(-2);
      const getMinutes = `0${Math.floor((time / 1000) / 60)}`.slice(-2);
      const getMilliseconds = `0${(time / 10).toFixed(0) % 100}`.slice(-2);
      return `${getMinutes} : ${getSeconds} : ${getMilliseconds}`;
   }


   return (
      <div className="stopwatch">
         <div className="display">{formatTime()}</div>
         <div className="controls">
            <button onClick={start} className="start-btn">Start</button>
            <button onClick={stop} className="stop-btn">Stop</button>
            <button onClick={reset} className="reset-btn">Reset</button>
         </div>
      </div>
   );
}

export default Stopwatch;