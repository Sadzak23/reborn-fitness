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
          top: 20, right: 30, left: 0, bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="id" padding={{ right: 50 }} />
        <YAxis />
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
          top: 20, right: 30, left: 0, bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="id" padding={{ right: 50 }} />
        <YAxis />
        <Tooltip />
        <Area connectNulls type="monotone" dataKey={singleData[type].key} stroke={singleData[type].color} fill={singleData[type].color} />
      </AreaChart>
    );
  };
};

export const RadarWeightsChart = ({ data, data2 }) => {
  const currentWeights = [
    { exercise: "Barbell Row", value: data.barbellRow - data2.barbellRow },
    { exercise: "Bench Press", value: data.benchPress - data2.benchPress },
    { exercise: "Deadlift", value: data.deadlift - data2.deadlift },
    { exercise: "Overhead Press", value: data.overheadPress - data2.overheadPress },
    { exercise: "Squat", value: data.squat - data2.squat },
  ];
  return (
    <RadarChart cx={300} cy={250} outerRadius={150} width={500} height={500} data={currentWeights}>
      <PolarGrid />
      <PolarAngleAxis dataKey="exercise" />
      <PolarRadiusAxis />
      <Radar name="Mike" dataKey="value" stroke="#34f7aa" fill="#34f7aa" fillOpacity={0.6} />
    </RadarChart>
  );
};