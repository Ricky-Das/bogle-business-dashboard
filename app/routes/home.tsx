import { useEffect, useState } from "react";
import type { Route } from "./+types/home";
import {
  fetchBalance,
  fetchPaymentVolume,
  fetchIncomingTransactions,
  fetchHistoricPayouts,
  type Balance,
  type PaymentVolumeDatum,
  type Transaction,
  type Payout,
} from "~/api/mockData";
import { BalanceSummary } from "~/components/BalanceSummary";
import { PaymentVolumeChart } from "~/components/PaymentVolumeChart";
import { IncomingTransactionsTable } from "~/components/IncomingTransactionsTable";
import { HistoricPayoutsTable } from "~/components/HistoricPayoutsTable";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Dashboard | Business" },
    {
      name: "description",
      content:
        "View your balances, payment volume, incoming payments, and payouts.",
    },
  ];
}

export default function Home() {
  const [balance, setBalance] = useState<Balance | null>(null);
  const [volume, setVolume] = useState<PaymentVolumeDatum[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [payouts, setPayouts] = useState<Payout[]>([]);

  useEffect(() => {
    async function load() {
      const [b, v, t, p] = await Promise.all([
        fetchBalance(),
        fetchPaymentVolume(),
        fetchIncomingTransactions(),
        fetchHistoricPayouts(),
      ]);
      setBalance(b);
      setVolume(v);
      setTransactions(t);
      setPayouts(p);
    }
    load();
  }, []);

  if (!balance) {
    return (
      <main className="pt-16 p-4 container mx-auto">
        <p>Loading...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="p-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome back
          </h1>
          <p className="text-gray-600 text-lg">
            Here's what's happening with your business today.
          </p>
        </div>

        <div className="space-y-8">
          <BalanceSummary
            balance={balance}
            onTransfer={() => alert("Transfer initiated")}
          />

          <PaymentVolumeChart data={volume} />

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            <IncomingTransactionsTable transactions={transactions} />

            <HistoricPayoutsTable payouts={payouts} />
          </div>
        </div>
      </div>
    </main>
  );
}
