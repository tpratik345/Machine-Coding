import { useState } from 'react'
import './Counter.css'

function Counter() {
  const [timerValue, setTimerValue] = useState();
  const [hour, setHour] = useState('00');
  const [mins, setMins] = useState('00');
  const [secs, setSecs] = useState('00');
  const [showBtn, setShowBtn] = useState({ start: true, continue: false, stop: false });

  function handleReset() {
    setHour('00');
    setMins('00');
    setSecs('00');
    setShowBtn({ start: true, continue: false, stop: false });
    stopInterval();
  }

  function timer() {
    console.log(hour, mins, secs)
    if (hour === '00' && mins === '00' && secs === '00') {
      console.log('here');
      handleReset();
    } else if (secs !== '00') {
      setSecs(prevSecs => {
        if (prevSecs === '00') {
          // handleReset();
          return '00';
        }

        let intValue = parseInt(prevSecs, 10) - 1;

        if (intValue < 0) return '00';

        return intValue < 10 ? `0${intValue}` : intValue.toString();
      });
    } else if (mins !== '00' && secs === '00') {
      setMins(prevMins => {
        if (prevMins === '00') {
          return '00';
        }

        let intValue = parseInt(prevMins, 10) - 1;

        if (intValue < 0) return '00';

        return intValue < 10 ? `0${intValue}` : intValue.toString();
      });
    } else if (hour !== '00' && mins === '00' && secs === '00') {
      setHour(prevHour => {
        if (prevHour === '00') {
          return '00';
        }

        let intValue = parseInt(prevHour, 10) - 1;

        if (intValue < 0) return '00';

        return intValue < 10 ? `0${intValue}` : intValue.toString();
      });
    }
  }

  function startInterval() {
    const id = setInterval(timer, 1000);
    setTimerValue(id);
  }

  function stopInterval() {
    console.log(timerValue)
    clearInterval(timerValue);
  }

  function handleStart() {
    if (hour === '00' && mins === '00' && secs === '00') return;

    startInterval();

    setShowBtn({ start: false, continue: false, stop: true });
  }

  function handleContinue() {
    setShowBtn({ start: false, continue: false, stop: true });
  }

  function handleStop() {
    setShowBtn({ start: false, continue: true, stop: false });
  }

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
              value={hour}
              onChange={(e) => setHour(e.target.value)}
              onInput={(e) => { e.target.value = e.target.value.slice(0, 2) }}
            />
            <p className='time-inputs-colon'>:</p>
            <input
              type='text'
              maxLength={2}
              placeholder='00'
              className='time-inputs-time input-minutes'
              value={mins}
              onChange={(e) => setMins(e.target.value)}
              onInput={(e) => { e.target.value = e.target.value.slice(0, 2) }}
            />
            <p className='time-inputs-colon'>:</p>
            <input
              type='text'
              maxLength={2}
              placeholder='00'
              value={secs}
              onChange={(e) => setSecs(e.target.value)}
              className='time-inputs-time input-seconds'
              onInput={(e) => { e.target.value = e.target.value.slice(0, 2) }}
            />
          </div>

          <div className='buttons'>
            {showBtn.start && <button className='start' onClick={handleStart}>Start</button>}
            {showBtn.continue && <button className='continue' onClick={handleContinue}>Continue</button>}
            {showBtn.stop && <button className='stop' onClick={handleStop}>Stop</button>}
            <button className='reset' onClick={handleReset}>Reset</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Counter