import React from 'react';
import './App.scss';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      session: 25,
      break: 5,
      timer: 1500,
      timerLabel: 'Session',
      timerState: 'stopped',
    }
    this.timerID = null;
    this.adjustSession = this.adjustSession.bind(this);
    this.adjustBreak = this.adjustBreak.bind(this);
    this.startStop = this.startStop.bind(this);
    this.countDown = this.countDown.bind(this)
    this.resetTimer = this.resetTimer.bind(this);
    this.clockify = this.clockify.bind(this);
  }


  adjustSession(value) {
    let newSession = this.state.session + parseInt(value);
    if (newSession > 0 && newSession < 61) {
      this.setState({
        session: newSession,
        timer: newSession * 60,
      })
    }
  }

  adjustBreak(value) {
    let newBreak = this.state.break + parseInt(value);
    if (newBreak > 0 && newBreak < 61) {
      this.setState({
        break: newBreak,
      })
    }
  }

  startStop() {
    if (this.state.timerState === 'stopped') {
      this.timerID = setInterval(this.countDown, 1000);
      this.setState({
        timerState: 'playing'
      });
    } else {
      clearInterval(this.timerID);
      this.setState({
        timerState: 'stopped'
      });
    }
  }

  countDown() {
    let timer = this.state.timer - 1;
    this.setState({
      timer: timer
    })
    if (timer === 0) { this.audioBeep.play() };
    if (timer < 0) {
      if (this.state.timerLabel === 'Session') {
        this.setState({
          timerLabel: 'Break',
          timer: this.state.break * 60,
        })
      } else {
        this.setState({
          timerLabel: 'Session',
          timer: this.state.session * 60,
        })
      }
    }
  }

  resetTimer() {
    this.setState({
      session: 25,
      break: 5,
      timer: 1500,
      timerLabel: 'Session',
      timerState: 'stopped',
    });
    clearInterval(this.timerID);
    this.timerID = null;
    this.audioBeep.pause();
    this.audioBeep.currentTime = 0;
  }

  clockify() {
    let minutes = Math.floor(this.state.timer / 60);
    let seconds = this.state.timer - minutes * 60;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return minutes + ':' + seconds;
  }

  render() {
    return (
      <div id="container">
        {/* HEADER */}
        <h1>Pomodoro Clock</h1>

        {/* TIME SETTINGS */}
        <div id="time-set">
          <div id="time-session">
            <p id="session-label">Session</p>
            <div class="time-adjust">
              <button id="session-increment" onClick={() => this.adjustSession('1')}><i className="fa fa-chevron-up" /></button>
              <h3 id="session-length">{this.state.session}</h3>
              <button id="session-decrement" onClick={() => this.adjustSession('-1')}><i className="fa fa-chevron-down" /></button>
            </div>
          </div>
          <div id="time-break">
            <p id="break-label">Break</p>
            <div class="time-adjust">
              <button id="break-increment" onClick={() => this.adjustBreak('1')}><i className="fa fa-chevron-up" /></button>
              <h3 id="break-length">{this.state.break}</h3>
              <button id="break-decrement" onClick={() => this.adjustBreak('-1')}><i className="fa fa-chevron-down" /></button>
            </div>

          </div>
        </div>

        {/* DISPLAY */}
        <div id="display">
          <h3 id="timer-label">{this.state.timerLabel}</h3>
          {/* Paused or running, the value in this field should always be displayed in mm:ss format (i.e. 25:00) */}
          <div id="time-left">{this.clockify()}</div>
          <button id="start_stop" onClick={this.startStop}>
            <i className="fa fa-play" />
            <i className="fa fa-pause" />
            <audio id="beep" src="https://onlineclock.net/audio/options/default.mp3" ref={(audio) => { this.audioBeep = audio }}></audio>
          </button>
          <button id="reset" onClick={this.resetTimer}>
            <i className="fa fa-refresh" />
          </button>
        </div>



      </div>
    )
  }
};

export default App;
