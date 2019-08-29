import React from 'react';

export const Exercise5x5 = ({ exerciseName, exerciseWeight, exerciseNo, exerciseSets, onRepCount }) => {

  const onRepCountS1 = () => {
    onRepCount(exerciseNo, 'set1');
  };
  const onRepCountS2 = () => {
    onRepCount(exerciseNo, 'set2');
  };
  const onRepCountS3 = () => {
    onRepCount(exerciseNo, 'set3');
  };
  const onRepCountS4 = () => {
    onRepCount(exerciseNo, 'set4');
  };
  const onRepCountS5 = () => {
    onRepCount(exerciseNo, 'set5');
  };

  const sets = [1,2,3,4,5]

  return (
    <div className="workout-exercise">
      <div className="exercise-title-5x5">
        <h2>{exerciseName}</h2>
        <h2>5x5 {exerciseWeight}kg</h2>
      </div>
      <div className="counter5x5">
        {sets.map((set) => (
          <button onClick={eval("onRepCountS"+set)} className="btn-exercise-count" key={exerciseName + set}>{eval("exerciseSets.set"+set)}</button>
        ))}
      </div>      
    </div>
  )
};