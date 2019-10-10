import React, { useEffect } from 'react';

export const Exercise5x5 = ({ exerciseName, exerciseWeight, exerciseNo, exerciseSets, onRepCount }) => {

  const sets = [1, 2, 3, 4, 5]

  useEffect(() => {
    const element = document.getElementById(exerciseName)
    if (exerciseSets.done === "5x5") {
      element.classList.remove('almost');
      element.classList.add('done');
    } else if (exerciseSets.done === "almost") {
      element.classList.remove('done');
      element.classList.add('almost');
    } else {
      element.classList.remove('done');
      element.classList.remove('almost');
    }
  });

  const bottomMessage = () => {
    switch (exerciseSets.done) {
      case "":
        return "Click a button to enter rep number"
      case "5x5":
        return `Great job! Next time lift ${(exerciseWeight + 2.5)}kg`;
      case "almost":
        return "It's ok! You'll get it next time.";
    }
  };

  return (
    <div id={exerciseName} className="workout-exercise">
      <div className="exercise-title-5x5">
        <h2>{exerciseName}</h2>
        <h2>5x5 {exerciseWeight}kg</h2>
      </div>
      <div className="counter5x5">
        {sets.map((set) => (
          <button onClick={() => { onRepCount(exerciseNo, `set${set}`) }} className="btn-exercise-count" key={exerciseName + set}>{exerciseSets[`set${set}`]}</button>
        ))}
      </div>
      <h3 className="exercise-message5x5">{bottomMessage()}</h3>
    </div>
  )
};