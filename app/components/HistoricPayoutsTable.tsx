import React from "react";
import type { Payout } from "~/api/mockData";

interface Props {
  payouts: Payout[];
}

export const HistoricPayoutsTable: React.FC<Props> = ({ payouts }) => {
  const statusColorMap: Record<string, string> = {
    paid: "bg-green-100 text-green-800",
    in_transit: "bg-yellow-100 text-yellow-800",
    failed: "bg-red-100 text-red-800",
  };

  return (
    <div className="bg-white shadow-sm border border-gray-200 rounded-xl p-8 w-full">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-1">
          Historic Payouts
        </h2>
        <p className="text-sm text-gray-500">Your recent payout history</p>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="text-left text-gray-500 border-b border-gray-200">
              <th className="py-3 px-4 font-medium text-sm">Payout ID</th>
              <th className="py-3 px-4 font-medium text-sm">Total</th>
              <th className="py-3 px-4 font-medium text-sm">Status</th>
              <th className="py-3 px-4 font-medium text-sm">Date</th>
            </tr>
          </thead>
          <tbody>
            {payouts.map((p) => (
              <tr
                key={p.id}
                className="border-t border-gray-100 hover:bg-gray-50"
              >
                <td className="py-4 px-4 whitespace-nowrap font-medium text-gray-900">
                  {p.id}
                </td>
                <td className="py-4 px-4 whitespace-nowrap font-semibold text-gray-900">
                  {p.total.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </td>
                <td className="py-4 px-4 whitespace-nowrap">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      statusColorMap[p.status]
                    }`}
                  >
                    {p.status.replace(/_/g, " ")}
                  </span>
                </td>
                <td className="py-4 px-4 whitespace-nowrap text-gray-600">
                  {p.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
