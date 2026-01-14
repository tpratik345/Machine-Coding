import { useRef, useState } from 'react'
import './Counter.css'

function Counter() {
  const timerRef = useRef();
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [inputHour, setInputHour] = useState('00');
  const [inputMins, setInputMins] = useState('00');
  const [inputSecs, setInputSecs] = useState('00');

  const [showBtn, setShowBtn] = useState({ start: true, continue: false, stop: false });

  const hours = Math.floor(totalSeconds / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;

  const displayHour = hours < 10 ? `0${hours}` : hours.toString();
  const displayMins = mins < 10 ? `0${mins}` : mins.toString();
  const displaySecs = secs < 10 ? `0${secs}` : secs.toString();

  function timer() {
    setTotalSeconds(prev => {
      if (prev < 1) {
        setShowBtn({ start: true, continue: false, stop: false });
        stopInterval();
        setIsRunning(false);
        return 0;
      }
      return prev - 1;
    });
  }

  function startInterval() {
    timerRef.current = setInterval(timer, 1000);;
  }

  function stopInterval() {
    clearInterval(timerRef.current);
  }

  function handleStart() {
    const total = parseInt(inputHour, 10) * 3600 +
      parseInt(inputMins, 10) * 60 +
      parseInt(inputSecs, 10);

    if (total === 0) return;

    setTotalSeconds(total);
    startInterval();
    setIsRunning(true);
    setShowBtn({ start: false, continue: false, stop: true });
  }

  function handleStop() {
    stopInterval();
    setIsRunning(false);
    setShowBtn({ start: false, continue: true, stop: false });
  }

  function handleContinue() {
    startInterval();
    setIsRunning(true);
    setShowBtn({ start: false, continue: false, stop: true });
  }

  function handleReset() {
    stopInterval();
    setTotalSeconds(0);
    setIsRunning(false);
    setInputHour('00');
    setInputMins('00');
    setInputSecs('00');
    setShowBtn({ start: true, continue: false, stop: false });
  }

  const displayValues = isRunning || totalSeconds > 0
    ? { hour: displayHour, mins: displayMins, secs: displaySecs }
    : { hour: inputHour, mins: inputMins, secs: inputSecs };

  return (
    <>
      <div className='container'>
        <div className='title'>Countdown Timer</div>
        <div className='timer'>
          <div className='time-labels'>
            <div className='time-label hours'>Hours</div>
            <div className='time-label minutes'>Minutes</div>
            <div className='time-label seconds'>Seconds</div>
          </div>

          <div className='time-inputs'>
            <input
              type='text'
              maxLength={2}
              placeholder='00'
              className='time-inputs-time input-hour'
              value={displayValues.hour}
              onChange={(e) => setInputHour(e.target.value)}
              onInput={(e) => { e.target.value = e.target.value.slice(0, 2) }}
            />
            <p className='time-inputs-colon'>:</p>
            <input
              type='text'
              maxLength={2}
              placeholder='00'
              className='time-inputs-time input-minutes'
              value={displayValues.mins}
              onChange={(e) => setInputMins(e.target.value)}
              onInput={(e) => { e.target.value = e.target.value.slice(0, 2) }}
            />
            <p className='time-inputs-colon'>:</p>
            <input
              type='text'
              maxLength={2}
              placeholder='00'
              value={displayValues.secs}
              onChange={(e) => setInputSecs(e.target.value)}
              className='time-inputs-time input-seconds'
              onInput={(e) => { e.target.value = e.target.value.slice(0, 2) }}
            />
          </div>

          <div className='buttons'>
            {showBtn.start && <button className='start' onClick={handleStart}>Start</button>}
            {showBtn.continue && <button className='continue' onClick={handleContinue}>Continue</button>}
            {showBtn.stop && <button className='stop' onClick={handleStop}>Stop</button>}
            <button className='reset' onClick={handleReset}>Reset</button> </div>
        </div>
      </div>
    </>
  )
}

export default Counter