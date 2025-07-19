import React, { useMemo, useState } from "react";
import type { Transaction } from "~/api/mockData";

interface Props {
  transactions: Transaction[];
}

export const IncomingTransactionsTable: React.FC<Props> = ({
  transactions,
}) => {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const lower = search.toLowerCase();
    return transactions.filter((t) => t.customer.toLowerCase().includes(lower));
  }, [transactions, search]);

  const statusColorMap: Record<string, string> = {
    successful: "bg-green-100 text-green-800",
    failed: "bg-red-100 text-red-800",
    chargeback: "bg-yellow-100 text-yellow-800",
    returned_ach: "bg-purple-100 text-purple-800",
    returned_other: "bg-purple-100 text-purple-800",
  };

  return (
    <div className="bg-white shadow-sm border border-gray-200 rounded-xl p-8 w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-1">
            Incoming Payments
          </h2>
          <p className="text-sm text-gray-500">Recent customer transactions</p>
        </div>
        <input
          type="text"
          placeholder="Search by customer..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border border-gray-200 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="text-left text-gray-500 border-b border-gray-200">
              <th className="py-3 px-4 font-medium text-sm">Customer</th>
              <th className="py-3 px-4 font-medium text-sm">Payment Type</th>
              <th className="py-3 px-4 font-medium text-sm">Total</th>
              <th className="py-3 px-4 font-medium text-sm">Status</th>
              <th className="py-3 px-4 font-medium text-sm">Date Available</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((t) => (
              <tr
                key={t.id}
                className="border-t border-gray-100 hover:bg-gray-50"
              >
                <td className="py-4 px-4 whitespace-nowrap font-medium text-gray-900">
                  {t.customer}
                </td>
                <td className="py-4 px-4 whitespace-nowrap text-gray-600">
                  {t.paymentType}
                </td>
                <td className="py-4 px-4 whitespace-nowrap font-semibold text-gray-900">
                  {t.total.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </td>
                <td className="py-4 px-4 whitespace-nowrap">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      statusColorMap[t.status]
                    }`}
                  >
                    {t.status.replace(/_/g, " ")}
                  </span>
                </td>
                <td className="py-4 px-4 whitespace-nowrap text-gray-600">
                  {t.dateAvailable}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
