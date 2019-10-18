import React from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  AreaChart, Area, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
} from "recharts";

export const ExerciseChart = ({ data, type, lines }) => {
  
  const width = window.innerWidth > 950 ? 900 : window.innerWidth - 75
  // const width = window.screen.orientation.type === "portrait-primary" || window.screen.orientation.type === "portrait-secondary" ? screen.width - 75 : window.innerWidth > 950 ? 900 : screen.width - 75

  if (type === "View All") {
    return (
      <LineChart
        className="line-chart"
        width={width}
        height={300}
        data={data}
        margin={{
          top: 20, right: 10, left: 10, bottom: 10,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="id" tickMargin={12} />
        <YAxis domain={['dataMin -5', 'dataMax']} unit="kg" padding={{ top: 20 }} tickMargin={10} />
        <Tooltip />
        {lines.map(e =>
          e.val !== "View All" &&
          <Line connectNulls type="monotone" dataKey={e.val} stroke={e.color} fill={e.color} key={`line-${e.color}`} />
        )}
      </LineChart>
    )
  } else {
    return (
      <AreaChart
        width={width}
        height={300}
        data={data}
        margin={{
          top: 20, right: 10, left: 10, bottom: 10,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="id" tickMargin={12} />
        <YAxis domain={['dataMin -5', 'dataMax']} unit="kg" padding={{ top: 20 }} tickMargin={10} />
        <Tooltip />
        {lines.map(e =>
          e.val === type &&          
          <Area connectNulls type="monotone" dataKey={e.val} stroke={e.color} fill={e.color} key={`line-${e.color}`} />
        )}
      </AreaChart>
    );
  };
};

export const RadarWeightsChart = ({ data }) => {
  const progress = [
    { exercise: "Barbell Row", start: data.start["Barbell Row"], now: data.now["Barbell Row"] },
    { exercise: "Bench Press", start: data.start["Bench Press"], now: data.now["Bench Press"] },
    { exercise: "Deadlift", start: data.start.Deadlift, now: data.now.Deadlift },
    { exercise: "Overhead Press", start: data.start["Overhead Press"], now: data.now["Overhead Press"] },
    { exercise: "Squat", start: data.start.Squat, now: data.now.Squat },
  ];
  return (
    <RadarChart 
    className="radar5x5"
    outerRadius={window.innerWidth < 400 ? 75 : window.innerWidth > 700 ? 150 : 100}
    width={window.innerWidth < 400 ? 300 : window.innerWidth > 700 ? 500 : 400}
    height={window.innerWidth < 400 ? 230 : window.innerWidth > 700 ? 400 : 270}
    data={progress}>
      <PolarGrid />
      <PolarAngleAxis dataKey="exercise" />
      <PolarRadiusAxis />
      <Legend iconType="star" verticalAlign="top" margin={{ bottom: 5 }} className="radar5x5" />
      <Radar name="Start" dataKey="start" stroke="#ed1515" fill="#ed1515" fillOpacity={0.3} />
      <Radar name="Now" dataKey="now" stroke="#34f7aa" fill="#34f7aa" fillOpacity={0.3} />
    </RadarChart>
  );
};