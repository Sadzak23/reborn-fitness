import React from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  AreaChart, Area, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
} from "recharts";

export const ExerciseChart = ({ data, type }) => {
  const singleData = {
    "Barbell Row": { key: "Barbell Row", color: "#ed1515" },
    "Bench Press": { key: "Bench Press", color: "#275eff" },
    Deadlift: { key: "Deadlift", color: "#000" },
    "Overhead Press": { key: "Overhead Press", color: "#ff7f50" },
    Squat: { key: "Squat", color: "#34f7aa" },
  }

  if (type === "View all") {
    return (
      <LineChart
        width={900}
        height={300}
        data={data}
        margin={{
          top: 20, right: 10, left: 10, bottom: 10,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="id" padding={{ right: 50 }} tickMargin={12} />
        <YAxis domain={['dataMin -5', 'dataMax']} unit="kg" padding={{ top: 20 }} tickMargin={10} />
        <Tooltip />
        <Legend verticalAlign="top" height={36} />
        <Line connectNulls type="monotone" dataKey="Barbell Row" stroke="#ed1515" fill="#ed1515" />
        <Line connectNulls type="monotone" dataKey="Bench Press" stroke="#275eff" fill="#275eff" />
        <Line connectNulls type="monotone" dataKey="Deadlift" stroke="#000" fill="#000" />
        <Line connectNulls type="monotone" dataKey="Overhead Press" stroke="#ff7f50" fill="#ff7f50" />
        <Line connectNulls type="monotone" dataKey="Squat" stroke="#34f7aa" fill="#34f7aa" />
      </LineChart>
    )
  } else {
    return (
      <AreaChart
        width={900}
        height={300}
        data={data}
        margin={{
          top: 20, right: 10, left: 10, bottom: 10,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="id" padding={{ right: 50 }} tickMargin={12} />
        <YAxis domain={['dataMin -5', 'dataMax']} unit="kg" padding={{ top: 20 }} tickMargin={10} />
        <Tooltip />
        <Area connectNulls type="monotone" dataKey={singleData[type].key} stroke={singleData[type].color} fill={singleData[type].color} />
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
    <RadarChart className="radar5x5" outerRadius={150} width={500} height={500} data={progress}>
      <PolarGrid />
      <PolarAngleAxis dataKey="exercise" />
      <PolarRadiusAxis />
      <Legend iconType="star" verticalAlign="top" className="radar5x5" />
      <Radar name="Start" dataKey="start" stroke="#ed1515" fill="#ed1515" fillOpacity={0.3} />
      <Radar name="Now" dataKey="now" stroke="#34f7aa" fill="#34f7aa" fillOpacity={0.3} />
    </RadarChart>
  );
};