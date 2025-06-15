import { BudgetBreakdown } from "@/app/lib/model";
import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  PieLabelRenderProps,
  ResponsiveContainer,
  Legend,
} from "recharts";

type Props = {
  budget: BudgetBreakdown;
};

const COLORS: string[] = [
  "#4FD1C5",
  "#A78BFA",
  "#F6AD55",
  "#63B3ED",
  "#F56565",
];

const renderCustomLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: PieLabelRenderProps): React.ReactNode => {
  if (
    cx === undefined ||
    cy === undefined ||
    midAngle === undefined ||
    innerRadius === undefined ||
    outerRadius === undefined ||
    percent === undefined
  ) {
    return null;
  }

  const RADIAN = Math.PI / 180;

  const cxNum = Number(cx);
  const cyNum = Number(cy);
  const innerRadiusNum = Number(innerRadius);
  const outerRadiusNum = Number(outerRadius);

  const radius = innerRadiusNum + (outerRadiusNum - innerRadiusNum) * 0.5;
  const x = cxNum + radius * Math.cos(-midAngle * RADIAN);
  const y = cyNum + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      className="text-[12px] font-bold"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const renderLegend = (props: any) => {
  const { payload } = props;
  return (
    <ul
      style={{
        listStyle: "none",
        margin: "8px",
        padding: 0,
        display: "flex",
        justifyContent: "center",
        gap: "4px 12px",
        flexWrap: "wrap",
      }}
    >
      {payload.map((entry: any, index: number) => (
        <li
          key={`item-${index}`}
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: 8,
            fontSize: 12,
            color: "#E0E0E0",
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              backgroundColor: entry.color,
              marginRight: 4,
              borderRadius: 2,
              flexShrink: 0,
            }}
          />
          {entry.value}
        </li>
      ))}
    </ul>
  );
};

const ExpenseChart = ({ budget }: Props) => {
  const budgetData = Object.entries(budget).map(([key, value]) => ({
    name: key.charAt(0).toUpperCase() + key.slice(1),
    value,
  }));
  return (
    <ResponsiveContainer width={"100%"} height={240}>
      <PieChart>
        <Pie
          data={budgetData}
          cx={"50%"}
          cy={"50%"}
          innerRadius={40}
          labelLine={false}
          label={renderCustomLabel}
          outerRadius={80}
          dataKey="value"
        >
          {budgetData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend content={renderLegend} />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default ExpenseChart;
