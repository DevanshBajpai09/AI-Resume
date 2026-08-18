import React, { useEffect, useState } from "react";
import api from "../configs/api";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Download,
  FileText,
  CreditCard,
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  Filter,
  Search,
  ExternalLink,
  IndianRupee,
  Receipt,
} from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import TransactionsSkeleton from "../Component/skeleton/TransactionsSkeleton";
import { useSelector } from "react-redux";

const statusConfig = {
  paid: {
    icon: CheckCircle,
    bg: "bg-[#F0F3EE]",
    text: "text-[#3F7D5A]",
    border: "border-[#D8E0D6]",
    label: "Paid",
  },

  failed: {
    icon: XCircle,
    bg: "bg-[#FAF1F0]",
    text: "text-[#B85450]",
    border: "border-[#E8D2D0]",
    label: "Failed",
  },

  created: {
    icon: Clock,
    bg: "bg-[#F7F6F1]",
    text: "text-[#8A7445]",
    border: "border-[#E3DDCC]",
    label: "Pending",
  },
};

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const { loading: authLoading } = useSelector(
    (state) => state.auth
  );

  const isOnline = useSelector(
    (state) => state.network.isOnline
  );

  // ================================
  // FETCH TRANSACTIONS
  // ================================

  const fetchTransactions = async () => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await api.get(
        "/api/payment/transactions",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTransactions(data);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to load transactions"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  // ================================
  // DOWNLOAD INVOICE
  // ================================

  const handleDownload = async (paymentId) => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await api.get(
        `/api/payment/invoice/${paymentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(
        new Blob([data])
      );

      const a = document.createElement("a");

      a.href = url;
      a.download = `invoice-${paymentId}.pdf`;

      document.body.appendChild(a);
      a.click();

      a.remove();
      window.URL.revokeObjectURL(url);

      toast.success("Invoice downloaded successfully!");
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to download invoice"
      );
    }
  };

  // ================================
  // FILTER
  // ================================

  const filteredTransactions =
    transactions.filter((txn) => {
      const matchesFilter =
        filter === "all" ||
        txn.status === filter;

      const searchValue =
        search.toLowerCase();

      const matchesSearch =
        txn.razorpay_payment_id
          ?.toLowerCase()
          .includes(searchValue) ||
        txn._id
          ?.toLowerCase()
          .includes(searchValue);

      return matchesFilter && matchesSearch;
    });

  // ================================
  // STATS
  // ================================

  const totalPaid = transactions
    .filter((t) => t.status === "paid")
    .reduce(
      (sum, t) => sum + t.amount / 100,
      0
    );

  const successfulTransactions =
    transactions.filter(
      (t) => t.status === "paid"
    ).length;

  const pendingTransactions =
    transactions.filter(
      (t) => t.status === "created"
    ).length;

  // ================================
  // LOADING
  // ================================

  if (authLoading || !isOnline || loading) {
    return <TransactionsSkeleton />;
  }

  return (
    <div className="min-h-screen bg-[#FBFAF6] text-[#171B24]">

      {/* =================================
          BACK
      ================================= */}

      <div className="max-w-6xl mx-auto px-6 pt-7">

        <Link
          to="/app"
          className="
            inline-flex
            items-center
            gap-2
            text-sm
            text-[#5B6070]
            hover:text-[#171B24]
            transition-colors
          "
        >
          <ArrowLeft className="size-4" />

          Back to Dashboard
        </Link>

      </div>

      {/* =================================
          MAIN
      ================================= */}

      <main className="max-w-6xl mx-auto px-6 py-10">

        {/* =================================
            HEADER
        ================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.3,
          }}
          className="mb-8"
        >

          <div className="flex items-center gap-3">

            <div
              className="
                w-10
                h-10
                -lg
                bg-[#F0F3EE]
                border
                border-[#D8E0D6]
                flex
                items-center
                justify-center
              "
            >
              <CreditCard
                className="size-5 text-[#3F7D5A]"
              />
            </div>

            <div>

              <h1 className="text-2xl font-semibold text-[#171B24]">
                Transactions
              </h1>

              <p className="text-sm text-[#5B6070] mt-1">
                View your payment history and invoices
              </p>

            </div>

          </div>

        </motion.div>

        {/* =================================
            STATS
        ================================= */}

        <div className="grid sm:grid-cols-3 gap-4 mb-6">

          {/* Total */}

          <div
            className="
              bg-white
              border
              border-[#DFDACC]
              -xl
              p-5
            "
          >

            <div className="flex items-center justify-between">

              <div>

                <p className="text-xs text-[#5B6070]">
                  Total Spent
                </p>

                <p className="text-2xl font-semibold text-[#171B24] mt-2 flex items-center">

                  <IndianRupee className="size-5" />

                  {totalPaid.toLocaleString()}

                </p>

              </div>

              <div
                className="
                  w-9
                  h-9
                  -lg
                  bg-[#F0F3EE]
                  border
                  border-[#D8E0D6]
                  flex
                  items-center
                  justify-center
                "
              >

                <Receipt
                  className="size-4 text-[#3F7D5A]"
                />

              </div>

            </div>

          </div>

          {/* Successful */}

          <div
            className="
              bg-white
              border
              border-[#DFDACC]
              -xl
              p-5
            "
          >

            <div className="flex items-center justify-between">

              <div>

                <p className="text-xs text-[#5B6070]">
                  Successful Payments
                </p>

                <p className="text-2xl font-semibold text-[#171B24] mt-2">
                  {successfulTransactions}
                </p>

              </div>

              <div
                className="
                  w-9
                  h-9
                  -lg
                  bg-[#F0F3EE]
                  border
                  border-[#D8E0D6]
                  flex
                  items-center
                  justify-center
                "
              >

                <CheckCircle
                  className="size-4 text-[#3F7D5A]"
                />

              </div>

            </div>

          </div>

          {/* Pending */}

          <div
            className="
              bg-white
              border
              border-[#DFDACC]
              -xl
              p-5
            "
          >

            <div className="flex items-center justify-between">

              <div>

                <p className="text-xs text-[#5B6070]">
                  Pending Payments
                </p>

                <p className="text-2xl font-semibold text-[#171B24] mt-2">
                  {pendingTransactions}
                </p>

              </div>

              <div
                className="
                  w-9
                  h-9
                  -lg
                  bg-[#F7F6F1]
                  border
                  border-[#E3DDCC]
                  flex
                  items-center
                  justify-center
                "
              >

                <Clock
                  className="size-4 text-[#8A7445]"
                />

              </div>

            </div>

          </div>

        </div>

        {/* =================================
            FILTER / SEARCH
        ================================= */}

        <div
          className="
            bg-white
            border
            border-[#DFDACC]
            -xl
            p-4
            mb-6
          "
        >

          <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">

            {/* Filters */}

            <div className="flex items-center gap-2 flex-wrap">

              <div className="flex items-center gap-2 mr-1">

                <Filter className="size-4 text-[#5B6070]" />

                <span className="text-sm text-[#5B6070]">
                  Filter
                </span>

              </div>

              {["all", "paid", "failed", "created"].map(
                (status) => {

                  const isActive =
                    filter === status;

                  const label =
                    status === "all"
                      ? "All"
                      : status === "paid"
                      ? "Paid"
                      : status === "failed"
                      ? "Failed"
                      : "Pending";

                  return (
                    <button
                      key={status}
                      onClick={() =>
                        setFilter(status)
                      }
                      className={`
                        px-3
                        py-1.5
                        -lg
                        text-xs
                        font-medium
                        border
                        transition-colors

                        ${
                          isActive
                            ? "bg-[#3F7D5A] text-white border-[#3F7D5A]"
                            : "bg-[#FBFAF6] text-[#5B6070] border-[#DFDACC] hover:bg-white"
                        }
                      `}
                    >
                      {label}
                    </button>
                  );
                }
              )}

            </div>

            {/* Search */}

            <div className="relative w-full md:w-64">

              <Search
                className="
                  absolute
                  left-3
                  top-1/2
                  -translate-y-1/2
                  size-4
                  text-[#8A8E98]
                "
              />

              <input
                type="text"
                placeholder="Search payment ID..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                className="
                  w-full
                  pl-9
                  pr-3
                  py-2
                  text-sm
                  bg-[#FBFAF6]
                  border
                  border-[#DFDACC]
                  -lg
                  text-[#171B24]
                  placeholder:text-[#8A8E98]
                  outline-none
                  focus:border-[#A9B8A7]
                  focus:ring-2
                  focus:ring-[#E8EEE5]
                  transition
                "
              />

            </div>

          </div>

        </div>

        {/* =================================
            EMPTY STATE
        ================================= */}

        {filteredTransactions.length === 0 && (

          <motion.div
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="
              bg-white
              border
              border-[#DFDACC]
              -xl
              py-16
              px-6
              text-center
            "
          >

            <div
              className="
                w-12
                h-12
                -lg
                bg-[#F7F6F1]
                border
                border-[#DFDACC]
                flex
                items-center
                justify-center
                mx-auto
                mb-4
              "
            >

              <FileText
                className="size-5 text-[#5B6070]"
              />

            </div>

            <h3 className="text-base font-semibold text-[#171B24]">
              No transactions found
            </h3>

            <p className="text-sm text-[#5B6070] mt-1 max-w-md mx-auto">

              {transactions.length === 0
                ? "You haven't made any payments yet. Your transaction history will appear here."
                : "No transactions match your current filters."}

            </p>

          </motion.div>

        )}

        {/* =================================
            TRANSACTIONS
        ================================= */}

        {filteredTransactions.length > 0 && (

          <div className="space-y-3">

            {filteredTransactions.map(
              (txn, index) => {

                const StatusIcon =
                  statusConfig[
                    txn.status
                  ]?.icon || Clock;

                const statusStyle =
                  statusConfig[
                    txn.status
                  ] || statusConfig.created;

                return (

                  <motion.div
                    key={txn._id}
                    initial={{
                      opacity: 0,
                      y: 10,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay:
                        index * 0.04,
                    }}
                    className="
                      bg-white
                      border
                      border-[#DFDACC]
                      -xl
                      overflow-hidden
                    "
                  >

                    <div className="p-5">

                      <div className="flex flex-col lg:flex-row lg:items-center gap-5">

                        {/* LEFT */}

                        <div className="flex-1 min-w-0">

                          <div className="flex items-start gap-3">

                            <div
                              className={`
                                w-9
                                h-9
                                -lg
                                flex
                                items-center
                                justify-center
                                border
                                flex-shrink-0
                                ${statusStyle.bg}
                                ${statusStyle.border}
                              `}
                            >

                              <StatusIcon
                                className={`
                                  size-4
                                  ${statusStyle.text}
                                `}
                              />

                            </div>

                            <div className="min-w-0">

                              <p className="text-sm font-medium text-[#171B24] truncate">

                                Payment ID:{" "}

                                {txn.razorpay_payment_id ||
                                  "—"}

                              </p>

                              <p className="text-xs text-[#8A8E98] font-mono mt-1">

                                #{txn._id?.slice(-8)}

                              </p>

                              <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-[#5B6070]">

                                <span className="flex items-center gap-1">

                                  <Calendar className="size-3.5" />

                                  {new Date(
                                    txn.createdAt
                                  ).toLocaleDateString(
                                    "en-US",
                                    {
                                      day: "numeric",
                                      month: "short",
                                      year: "numeric",
                                    }
                                  )}

                                </span>

                                <span className="flex items-center gap-1">

                                  <Clock className="size-3.5" />

                                  {new Date(
                                    txn.createdAt
                                  ).toLocaleTimeString(
                                    "en-US",
                                    {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    }
                                  )}

                                </span>

                              </div>

                            </div>

                          </div>

                        </div>

                        {/* AMOUNT */}

                        <div className="lg:text-right">

                          <p className="text-xs text-[#8A8E98]">
                            Amount
                          </p>

                          <p className="text-lg font-semibold text-[#171B24] mt-1 flex items-center lg:justify-end">

                            <IndianRupee className="size-4" />

                            {(txn.amount / 100).toLocaleString()}

                          </p>

                        </div>

                        {/* STATUS */}

                        <div>

                          <p className="text-xs text-[#8A8E98] mb-1">
                            Status
                          </p>

                          <span
                            className={`
                              inline-flex
                              items-center
                              gap-1.5
                              px-3
                              py-1.5
                              -lg
                              text-xs
                              font-medium
                              border
                              ${statusStyle.bg}
                              ${statusStyle.text}
                              ${statusStyle.border}
                            `}
                          >

                            <StatusIcon className="size-3.5" />

                            {statusStyle.label}

                          </span>

                        </div>

                        {/* ACTIONS */}

                        <div className="flex items-center gap-2">

                          <button
                            onClick={() =>
                              handleDownload(
                                txn._id
                              )
                            }
                            className="
                              inline-flex
                              items-center
                              gap-2
                              px-3
                              py-2
                              -lg
                              bg-[#3F7D5A]
                              text-white
                              text-xs
                              font-medium
                              hover:bg-[#356A4D]
                              transition-colors
                            "
                          >

                            <Download className="size-3.5" />

                            Invoice

                          </button>

                          {txn.razorpay_payment_id && (

                            <button
                              onClick={() =>
                                window.open(
                                  `https://dashboard.razorpay.com/app/payments/${txn.razorpay_payment_id}`,
                                  "_blank"
                                )
                              }
                              className="
                                inline-flex
                                items-center
                                justify-center
                                w-9
                                h-9
                                -lg
                                border
                                border-[#DFDACC]
                                bg-[#FBFAF6]
                                text-[#5B6070]
                                hover:bg-white
                                hover:text-[#171B24]
                                transition-colors
                              "
                              title="View payment"
                            >

                              <ExternalLink className="size-4" />

                            </button>

                          )}

                        </div>

                      </div>

                      {/* ORDER ID */}

                      {txn.orderId && (

                        <div
                          className="
                            mt-4
                            pt-4
                            border-t
                            border-[#DFDACC]
                          "
                        >

                          <p className="text-xs text-[#5B6070]">

                            <span className="font-medium text-[#171B24]">
                              Order ID:
                            </span>{" "}

                            {txn.orderId}

                          </p>

                        </div>

                      )}

                    </div>

                  </motion.div>

                );
              }
            )}

          </div>

        )}

        {/* =================================
            FOOTER
        ================================= */}

        {filteredTransactions.length > 0 && (

          <div className="mt-6 pt-5 border-t border-[#DFDACC]">

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-[#5B6070]">

              <p>

                Showing{" "}

                <span className="font-medium text-[#171B24]">
                  {filteredTransactions.length}
                </span>{" "}

                of{" "}

                <span className="font-medium text-[#171B24]">
                  {transactions.length}
                </span>{" "}

                transactions

              </p>

              <p className="flex items-center gap-1.5">

                <CheckCircle className="size-3.5 text-[#3F7D5A]" />

                {successfulTransactions} successful payments

              </p>

            </div>

          </div>

        )}

      </main>

    </div>
  );
};

export default Transactions;