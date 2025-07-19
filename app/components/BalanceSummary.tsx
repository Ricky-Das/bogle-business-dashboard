import React from "react";
import type { Balance } from "~/api/mockData";

interface Props {
  balance: Balance;
  onTransfer?: () => void;
}

export const BalanceSummary: React.FC<Props> = ({ balance, onTransfer }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
      <div className="lg:col-span-2 bg-white shadow-sm border border-gray-200 rounded-xl p-8 flex flex-col sm:flex-row items-center justify-between">
        <div>
          <h2 className="text-lg font-medium text-gray-500 mb-3">
            Available Balance
          </h2>
          <p className="text-4xl font-bold text-gray-900 mb-1">
            {balance.available.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </p>
          <p className="text-sm text-green-600 font-medium">
            Ready for transfer
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button
            onClick={onTransfer}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-sm"
          >
            Transfer
          </button>
        </div>
      </div>

      <div className="bg-white shadow-sm border border-gray-200 rounded-xl p-8 flex flex-col justify-between">
        <h2 className="text-lg font-medium text-gray-500 mb-3">
          Pending Balance
        </h2>
        <p className="text-4xl font-bold text-gray-900 mb-1">
          {balance.pending.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </p>
        <p className="text-sm text-amber-600 font-medium">Processing</p>
      </div>
    </div>
  );
};
