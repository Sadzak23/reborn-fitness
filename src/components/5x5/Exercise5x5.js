import React from 'react';

export const Exercise5x5 = ({ exerciseName, exerciseWeight, exerciseNo, exerciseSets, onRepCount }) => {
  const done = () => {
    const element = document.getElementById(exerciseName)
    if (exerciseSets.done === "5x5") {
      element.classList.remove('almost');
      element.classList.add('done');
      return (
        <h3>Great job! Next time lift {(exerciseWeight + 2.5)}kg</h3>
      )
    } else if (exerciseSets.done === "almost") {
      element.classList.remove('done');
      element.classList.add('almost');
      return (
        <h3>It's ok! You'll get it next time.</h3>
      )
    } else {
      element.classList.remove('done');
      element.classList.remove('almost');
    }
  }

  const sets = [1, 2, 3, 4, 5]
  return (
    <div id={exerciseName} className="workout-exercise">
      <div className="exercise-title-5x5">
        <h2>{exerciseName}</h2>
        {exerciseSets.done && done()}
        <h2>5x5 {exerciseWeight}kg</h2>
      </div>
      <div className="counter5x5">
        {sets.map((set) => (
          <button onClick={() => { onRepCount(exerciseNo, `set${set}`) }} className="btn-exercise-count" key={exerciseName + set}>{exerciseSets[`set${set}`]}</button>
        ))}
      </div>
    </div>
  )
};