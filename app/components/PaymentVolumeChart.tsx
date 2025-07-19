import React, { useMemo, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import type { PaymentVolumeDatum } from "~/api/mockData";

interface Props {
  data: PaymentVolumeDatum[];
}

const timelineOptions = [
  { label: "7d", days: 7 },
  { label: "30d", days: 30 },
];

export const PaymentVolumeChart: React.FC<Props> = ({ data }) => {
  const [days, setDays] = useState<number>(7);

  const filtered = useMemo(() => data.slice(-days), [data, days]);

  return (
    <div className="bg-white shadow-sm border border-gray-200 rounded-xl p-8 w-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-1">
            Payment Volume
          </h2>
          <p className="text-sm text-gray-500">
            Track your payment trends over time
          </p>
        </div>
        <div className="flex gap-2">
          {timelineOptions.map((opt) => (
            <button
              key={opt.label}
              onClick={() => setDays(opt.days)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
               ${
                 days === opt.days
                   ? "bg-blue-600 text-white shadow-sm"
                   : "bg-gray-100 text-gray-700 hover:bg-gray-200"
               }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="h-80 mt-6">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={filtered}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="#6b7280" />
            <YAxis tick={{ fontSize: 12 }} stroke="#6b7280" />
            <Tooltip
              formatter={(value: number) => `$${value.toLocaleString()}`}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="ach"
              stroke="#10b981"
              name="ACH"
              strokeWidth={3}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="card"
              stroke="#3b82f6"
              name="Card"
              strokeWidth={3}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
