import './Counter.css'

function Counter() {
  return (
    <>
      <div className='container'>
        <div>Countdown Timer</div>
        <div className='timer'>
          <div className='time-labels'>
            <div className='hours'>Hours</div>
            <div className='minutes'>Minutes</div>
            <div className='seconds'>Seconds</div>
          </div>

          <div className='time-inputs'>
            <input 
              type='number'
              maxLength={2}
              placeholder='00'
              className='input-hour'
              onInput={this.value = this.value.slice(0, this.maxLength)}
              />
            <input 
              type='number'
              maxLength={2}
              placeholder='00'
              className='input-minutes'
              onInput={(e) => {e.target.value = e.target.value.slice(0, this.maxLength)} }
              />
            <input 
              type='number'
              maxLength={2}
              placeholder='00'
              className='input-seconds'
              onInput={this.value = this.value.slice(0, this.maxLength)}
              />
          </div>

          <div className='buttons'>
            <button>Start</button>
            {/* <button>Continue</button> */}
            <button>Reset</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Counter