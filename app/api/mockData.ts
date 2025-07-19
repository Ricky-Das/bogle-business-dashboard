export type Balance = {
  available: number;
  pending: number;
};

export type PaymentVolumeDatum = {
  date: string; // ISO date string YYYY-MM-DD
  ach: number;
  card: number;
};

export type TransactionStatus =
  | "failed"
  | "chargeback"
  | "successful"
  | "returned_ach"
  | "returned_other";

export type Transaction = {
  id: string;
  customer: string;
  paymentType: "ACH" | "Card" | "Other";
  total: number;
  status: TransactionStatus;
  dateAvailable: string; // ISO date
};

export type PayoutStatus = "in_transit" | "paid" | "failed";

export type Payout = {
  id: string;
  total: number;
  status: PayoutStatus;
  date: string; // ISO date
};

// --- Static Data -----------------------------------------------------------

const balance: Balance = {
  available: 12430.23,
  pending: 5210.5,
};

const today = new Date();

function daysAgo(n: number) {
  const d = new Date(today);
  d.setDate(today.getDate() - n);
  return d.toISOString().slice(0, 10);
}

const paymentVolume30d: PaymentVolumeDatum[] = Array.from({ length: 30 }).map(
  (_, i) => {
    const ach = Math.floor(500 + Math.random() * 1000);
    const card = Math.floor(2000 + Math.random() * 4000);
    return {
      date: daysAgo(29 - i),
      ach,
      card,
    };
  }
);

const transactions: Transaction[] = [
  {
    id: "tx_1001",
    customer: "Acme Corp",
    paymentType: "ACH",
    total: 1250.5,
    status: "successful",
    dateAvailable: daysAgo(1),
  },
  {
    id: "tx_1002",
    customer: "Globex",
    paymentType: "Card",
    total: 320.19,
    status: "chargeback",
    dateAvailable: daysAgo(2),
  },
  {
    id: "tx_1003",
    customer: "Soylent Co",
    paymentType: "ACH",
    total: 980.0,
    status: "failed",
    dateAvailable: daysAgo(3),
  },
  {
    id: "tx_1004",
    customer: "Initech",
    paymentType: "Card",
    total: 2120.44,
    status: "successful",
    dateAvailable: daysAgo(4),
  },
  {
    id: "tx_1005",
    customer: "Hooli",
    paymentType: "ACH",
    total: 450.22,
    status: "returned_ach",
    dateAvailable: daysAgo(0),
  },
];

const payouts: Payout[] = [
  { id: "po_2001", total: 5000, status: "paid", date: daysAgo(7) },
  { id: "po_2002", total: 3200, status: "paid", date: daysAgo(14) },
  { id: "po_2003", total: 7640, status: "in_transit", date: daysAgo(21) },
  { id: "po_2004", total: 4500, status: "failed", date: daysAgo(28) },
  { id: "po_2005", total: 6200, status: "paid", date: daysAgo(35) },
];

// --- Mock API functions ----------------------------------------------------

export function fetchBalance(): Promise<Balance> {
  return Promise.resolve(balance);
}

export function fetchPaymentVolume(): Promise<PaymentVolumeDatum[]> {
  return Promise.resolve(paymentVolume30d);
}

export function fetchIncomingTransactions(): Promise<Transaction[]> {
  return Promise.resolve(transactions);
}

export function fetchHistoricPayouts(): Promise<Payout[]> {
  return Promise.resolve(payouts);
}
