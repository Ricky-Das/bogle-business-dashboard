import React from "react";
import type { Balance } from "~/api/mockData";

interface Props {
  balance: Balance;
  onTransfer?: () => void;
}

export const BalanceSummary: React.FC<Props> = ({ balance, onTransfer }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
      <div className="col-span-2 flex flex-col sm:flex-row bg-white dark:bg-gray-800 shadow rounded-lg p-6 items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
            Available Balance
          </h2>
          <p className="text-3xl font-bold text-green-600 dark:text-green-400">
            {balance.available.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button
            onClick={onTransfer}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
          >
            Transfer
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 flex flex-col justify-between">
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
          Pending Balance
        </h2>
        <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
          {balance.pending.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </p>
      </div>
    </div>
  );
};
