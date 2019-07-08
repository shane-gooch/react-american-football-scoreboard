//TODO: STEP 1 - Import the useState hook.
import React, { useState, useEffect } from "react";
import "./App.css";
import BottomRow from "./BottomRow";
import { BottomRowContext } from "./BottomRowContext";

function App() {
  //TODO: STEP 2 - Establish your applictaion's state with some useState hooks.  You'll need one for the home score and another for the away score.

  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);
  const [down, setDown] = useState(1);
  const [quarter, setQuarter] = useState(1);
  const [toGo, setToGo] = useState(0);
  const [ballOn, setBallOn] = useState(0);
  const [timerMin, setTimerMin] = useState(14);
  const [timerSec, setTimerSec] = useState(59);
  const [timerOn, setTimerOn] = useState(false);

  useEffect(() => {
    let timer = null;
    if (timerOn) {
      timer = setInterval(() => setTimerSec(timer => timer - 1), 1000);
    }
    return () => {
      clearInterval(timer);
    };
  }, [timerOn]);

  const toggle = () => {
    setTimerOn(!timerOn);
  };

  const handleScore = (teamName, points) => {
    if (teamName === "Away") {
      setAwayScore(awayScore + points);
    } else {
      setHomeScore(homeScore + points);
    }
  };

  const endGame = e => {
    e.preventDefault();
    setHomeScore(0);
    setAwayScore(0);
    setDown(1);
    setQuarter(1);
    setToGo(0);
    setBallOn(0);
    setTimerSec(0);
    toggle();
    clearInterval(timerSec);
  };

  return (
    <div className="container">
      <section className="scoreboard">
        <div className="topRow">
          <div className="home">
            <h2 className="home__name">Lions</h2>

            {/* TODO STEP 3 - We need to change the hardcoded values in these divs to accept dynamic values from our state. */}

            <div className="home__score">{homeScore}</div>
          </div>
          <div className="timer">{timerSec}</div>
          <div className="away">
            <h2 className="away__name">Tigers</h2>
            <div className="away__score">{awayScore}</div>
          </div>
        </div>
        <BottomRowContext.Provider value={{ down, quarter, toGo, ballOn }}>
          <BottomRow />
        </BottomRowContext.Provider>
      </section>
      <div className="BottomContainer">
        <section className="buttons">
          <div className="homeButtons">
            {/* TODO STEP 4 - Now we need to attach our state setter functions to click listeners. */}
            <button
              className="homeButtons__touchdown"
              onClick={() => {
                handleScore("Home", 7);
              }}
            >
              Home Touchdown
            </button>
            <button
              className="homeButtons__fieldGoal"
              onClick={() => {
                handleScore("Home", 3);
              }}
            >
              Home Field Goal
            </button>
          </div>
          <div className="awayButtons">
            <button
              className="awayButtons__touchdown"
              onClick={() => {
                handleScore("Away", 7);
              }}
            >
              Away Touchdown
            </button>
            <button
              className="awayButtons__fieldGoal"
              onClick={() => {
                handleScore("Away", 3);
              }}
            >
              Away Field Goal
            </button>
          </div>
        </section>
        <div className="bottomButtons">
          <div className="downButtons">
            <h3>Down</h3>
            <button onClick={() => setDown(1)}>1</button>
            <button onClick={() => setDown(2)}>2</button>
            <button onClick={() => setDown(3)}>3</button>
            <button onClick={() => setDown(4)}>4</button>
          </div>
          <div>
            <form class="toGoForm">
              <input
                value={toGo}
                onChange={e => setToGo(e.target.value)}
                type="number"
                placeholder="Enter ToGo"
              />
              <input
                value={ballOn}
                onChange={e => setBallOn(e.target.value)}
                type="number"
                placeholder="Enter BallOn"
              />
            </form>
          </div>
          <div className="quarterButtons">
            <h3>Set Quarter</h3>
            {quarter < 4 ? (
              <button onClick={() => setQuarter(quarter + 1)}>^</button>
            ) : (
              <button onClick={e => endGame(e)}>End Game</button>
            )}
          </div>
          <button
            className={`timerButton ${timerOn ? "active" : "inactive"}`}
            onClick={toggle}
          >
            {timerOn ? "Pause" : "Start Timer"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
